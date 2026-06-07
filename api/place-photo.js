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
const REVIEWED_PLACE_PHOTOS = {
  "ChIJSXTcQ7w46IgRC48Z6MW1VMY": {
    photoUri: "https://lh3.googleusercontent.com/place-photos/AJRVUZPSZRJjDgvI-DAucoUGWgjZTs7KQvPtUhjFaFTJUm9VQqdMCpLHh-YDJg7dBmFDHhtkHHFZtc2NSo_UzceG7l_LTKy6LUraa4BvSpCnv6jc3YgWx5ZYwwxEHuAt5Gb__pqvkQg-HRnoi70EZQ=s4800-w900",
    attribution: "Backwater Fins",
    place: {
      id: "ChIJSXTcQ7w46IgRC48Z6MW1VMY",
      name: "Backwater Fins",
      address: "13982 W Ozello Trail, Crystal River, FL 34429, USA",
      googleMapsUri: "https://maps.google.com/?cid=14291247379160600331",
      websiteUri: "https://backwater-fins.com/",
      businessStatus: "OPERATIONAL"
    }
  },
  "ChIJTdi9T0JH6IgRIWAUMlvjfWc": {
    photoUri: "https://lh3.googleusercontent.com/place-photos/AJRVUZMchUXMVQraXlTSt2dz0MVnHwoS4Itr2F6IICRo_CqZ_SuTvO83tm8Vf_RNxOUaeyCmbS0U3gH2Sj2FtlP2MBb7i-RMkSFlQPjJ9UOIjBF6WU1ZQCroNHTVA9dJ6WKGe1RoLYKZl4pJeNdG80soBZn0Ag=s4800-w900",
    attribution: "Jim Burgraff",
    place: {
      id: "ChIJTdi9T0JH6IgRIWAUMlvjfWc",
      name: "Peck's Old Port Cove",
      address: "139 N Ozello Trail, Crystal River, FL 34429, USA",
      googleMapsUri: "https://maps.google.com/?cid=7457366538817134625",
      websiteUri: "https://pecksoldportcove.com/",
      businessStatus: "OPERATIONAL"
    }
  },
  "ChIJIZPrH-w-6IgRN5iLFslzTbM": {
    photoUri: "https://lh3.googleusercontent.com/place-photos/AJRVUZO51WUi4eruvflT-Gq6pl90EMHz4A7tBxI2xuf9Go4TeI1khd6Xf2H5aDrGAl04zlbB3C7LHHM5QMnkcjjIGo7updakA3ClYo759dbQf2QoHoFLlN0hBNwwqrpPsbTAAb8isq6Wm_K28iZtFCo=s4800-w900",
    attribution: "Ed Flowers",
    place: {
      id: "ChIJIZPrH-w-6IgRN5iLFslzTbM",
      name: "The Freezer",
      address: "5590 S Boulevard Dr, Homosassa, FL 34448, USA",
      googleMapsUri: "https://maps.google.com/?cid=12920110213499689015",
      websiteUri: "https://the-freezer-homosassa.com/",
      businessStatus: "OPERATIONAL"
    }
  },
  "ChIJHRpO3XRB6IgR5YtISIJwLZI": {
    photoUri: "https://lh3.googleusercontent.com/place-photos/AJRVUZO6JtDLLkOjojJGfC9CzPWkNno81u1NSg_-lhmHOczQrTp-EYMfF_mwh5NDRbv9inKauv53mC6Uji7S-FEBG6_slXgg3x8YJc_LPUgNk5ANWR__Ycgckt2Fz65xwZAfzhQSNBl_y-xRCV5WhNhxv_YP=s4800-w900",
    attribution: "Chris H.",
    place: {
      id: "ChIJHRpO3XRB6IgR5YtISIJwLZI",
      name: "The Biscuit Barn",
      address: "1960 US-19, Crystal River, FL 34428, USA",
      googleMapsUri: "https://maps.google.com/?cid=10533198808350231525",
      websiteUri: "https://www.biscuitbarn.net/",
      businessStatus: "OPERATIONAL"
    }
  },
  "ChIJuwLPiyhB6IgRDqcbiGTqmtA": {
    photoUri: "https://lh3.googleusercontent.com/place-photos/AJRVUZP8gKfDdSI_DWVv531uNocRvDprRr8eUZEJ_aVQXg5Q-H9QprTLPpQHc0ZlnfeFcJKRoe_-pQD8_TMmE1-V413K4Vsmvp88XaJASk6Og2RjZWwhaTGcyC_JXX22wUwwkufmSEfY_AaypjBwE0rw1ULNNQ=s4800-w900",
    attribution: "Brittany Cole",
    place: {
      id: "ChIJuwLPiyhB6IgRDqcbiGTqmtA",
      name: "Sadie's Corner Kitchen",
      address: "353 NE 2nd St, Crystal River, FL 34429, USA",
      googleMapsUri: "https://maps.google.com/?cid=15031584423803594510",
      websiteUri: "https://m.facebook.com/SadiesCornerKitchen/",
      businessStatus: "OPERATIONAL"
    }
  }
};

function reviewedPlacePhoto(placeId) {
  const cleanId = String(placeId || "").trim().replace(/^places\//, "");
  const reviewed = REVIEWED_PLACE_PHOTOS[cleanId];
  if (!reviewed) return null;
  return {
    photoUri: reviewed.photoUri,
    attributions: reviewed.attribution ? [{ displayName: reviewed.attribution }] : [],
    place: reviewed.place,
    reviewedFallback: true
  };
}

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
    const reviewed = reviewedPlacePhoto(placeId);
    if (reviewed) {
      if (wantsJson) {
        res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate=604800");
        return res.status(200).json(reviewed);
      }
      res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate=604800");
      return res.redirect(302, reviewed.photoUri);
    }
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
    const reviewed = reviewedPlacePhoto(placeId);
    if (reviewed) {
      if (wantsJson) {
        res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate=86400");
        return res.status(200).json(reviewed);
      }
      res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate=86400");
      return res.redirect(302, reviewed.photoUri);
    }
    return res.status(502).json({ error: error.message || "Place photo lookup failed." });
  }
}
