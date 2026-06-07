const PLACES_SEARCH_URL = "https://places.googleapis.com/v1/places:searchText";
const PLACES_DETAILS_URL = "https://places.googleapis.com/v1/places/";
const PLACE_FIELD_MASK = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.googleMapsUri",
  "places.websiteUri",
  "places.businessStatus",
  "places.types",
  "places.photos.name",
  "places.photos.authorAttributions"
].join(",");
const PLACE_DETAIL_FIELD_MASK = [
  "id",
  "displayName",
  "formattedAddress",
  "googleMapsUri",
  "websiteUri",
  "businessStatus",
  "types",
  "photos.name",
  "photos.authorAttributions"
].join(",");

async function findPlacePhoto(query, apiKey) {
  const expectedName = String(query || "").split(",")[0].trim();
  const searchResponse = await fetch(PLACES_SEARCH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": PLACE_FIELD_MASK
    },
    body: JSON.stringify({
      textQuery: query,
      maxResultCount: 5
    })
  });

  if (!searchResponse.ok) {
    throw new Error(`Places search failed: ${searchResponse.status}`);
  }

  const searchPayload = await searchResponse.json();
  const places = Array.isArray(searchPayload?.places) ? searchPayload.places : [];
  const place = chooseBestPlace(places, expectedName);
  if (!place) return null;
  return getPhotoFromPlace(place, apiKey);
}

async function findPlacePhotoById(placeId, apiKey) {
  const cleanId = String(placeId || "").trim().replace(/^places\//, "");
  if (!cleanId) return null;

  const detailResponse = await fetch(`${PLACES_DETAILS_URL}${encodeURIComponent(cleanId)}`, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": PLACE_DETAIL_FIELD_MASK
    }
  });

  if (!detailResponse.ok) {
    throw new Error(`Place details failed: ${detailResponse.status}`);
  }

  const place = await detailResponse.json();
  return getPhotoFromPlace(place, apiKey);
}

function normalizeName(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\b(the|restaurant|bar|grill|tiki|cafe|coffee|roasters|bakery|kitchen)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function chooseBestPlace(places, expectedName) {
  const expected = normalizeName(expectedName);
  if (!expected) return places[0];

  return places.find((place) => normalizeName(place?.displayName?.text) === expected)
    || places.find((place) => {
      const actual = normalizeName(place?.displayName?.text);
      return actual && (actual.includes(expected) || expected.includes(actual));
    })
    || null;
}

async function getPhotoFromPlace(place, apiKey) {
  const photo = place?.photos?.[0];
  const photoName = photo?.name;
  if (!photoName) return null;

  const mediaUrl = new URL(`https://places.googleapis.com/v1/${photoName}/media`);
  mediaUrl.searchParams.set("maxWidthPx", "1200");
  mediaUrl.searchParams.set("skipHttpRedirect", "true");

  const mediaResponse = await fetch(mediaUrl, {
    headers: {
      "X-Goog-Api-Key": apiKey
    }
  });

  if (!mediaResponse.ok) {
    throw new Error(`Place photo lookup failed: ${mediaResponse.status}`);
  }

  const mediaPayload = await mediaResponse.json();
  return {
    photoUri: mediaPayload?.photoUri || null,
    attributions: photo.authorAttributions || [],
    place: {
      id: place?.id || null,
      name: place?.displayName?.text || null,
      address: place?.formattedAddress || null,
      googleMapsUri: place?.googleMapsUri || null,
      websiteUri: place?.websiteUri || null,
      businessStatus: place?.businessStatus || null,
      types: place?.types || []
    }
  };
}

export default async function handler(req, res) {
  const query = String(req.query.query || "").trim();
  const placeId = String(req.query.placeId || req.query.googlePlaceId || "").trim();
  const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.GOOGLE_PLACES_API_KEY;
  const wantsJson = req.query.format === "json";

  if (!query && !placeId) {
    return res.status(400).json({ error: "Missing place photo query or placeId." });
  }

  if (!apiKey) {
    return res.status(501).json({ error: "Google Maps API key is not configured." });
  }

  try {
    const photo = placeId ? await findPlacePhotoById(placeId, apiKey) : await findPlacePhoto(query, apiKey);
    if (wantsJson) {
      res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate=604800");
      return res.status(photo?.photoUri ? 200 : 404).json({
        photoUri: photo?.photoUri || null,
        attributions: photo?.attributions || [],
        place: photo?.place || null,
        fallback: false
      });
    }
    if (!photo?.photoUri) return res.status(404).json({ error: "No exact place photo found." });
    res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate=604800");
    return res.redirect(302, photo.photoUri);
  } catch (error) {
    console.error(error);
    return res.status(502).json({ error: error.message || "Place photo lookup failed." });
  }
}
