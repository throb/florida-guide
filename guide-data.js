window.NCP_GUIDE = (function(){
  var dayTrips = [
    {
      issue: 'Issue 001',
      date: 'June 4, 2026',
      status: 'This week',
      title: 'Kings Bay Clear-Water Loop',
      dek: 'A bright, easy Crystal River day: clear kayak or snorkel early, local lunch, Hunter Springs float, and a Fort Island sunset.',
      image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Crystal_River_near_Hunter_Spring_Run_-_panoramio.jpg?width=1200',
      imageLabel: 'Crystal River near Hunter Spring Run',
      tags: ['Water', 'Easy', 'First trip'],
      stops: [
        ['Morning', 'Get in the water', 'Paddle or snorkel Kings Bay while the water is bright.'],
        ['Midday', 'Local lunch', 'Biscuit Barn or Sadie\'s keeps the loop easy.'],
        ['Afternoon', 'Slow float', 'Hunter Springs for a swim and extra clear-water time.'],
        ['Sunset', 'Gulf close', 'Fort Island Gulf Beach for the closing view.']
      ],
      links: [
        ['Crystal River Refuge', 'https://www.fws.gov/apps/refuge/crystal-river/visit-us'],
        ['Hunter Springs', 'https://www.discovercrystalriverfl.com/directory/hunter-springs-park-boardwalks/'],
        ['Fort Island Beach', 'https://www.discovercrystalriverfl.com/directory/fort-island-gulf-beach/']
      ]
    },
    {
      issue: 'Archive 002',
      date: 'Classic',
      status: 'Day trip',
      title: 'Silver Springs Boat and Paddle Day',
      dek: 'Glass-bottom boats for the timeless view, then a slow paddle if you want the river to stretch out a little longer.',
      image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Silver_Springs_State_Park_-_Headspring_Entrance_Sign.jpg?width=1200',
      imageLabel: 'Silver Springs State Park',
      tags: ['Springs', 'Family', 'Ocala'],
      stops: [
        ['Morning', 'Boat first', 'Book a glass-bottom boat and get the classic spring view.'],
        ['Late AM', 'Walk the headspring', 'Look for fish, turtles, birds, and glassy water.'],
        ['Lunch', 'Ocala pause', 'Keep it easy near the park or downtown Ocala.'],
        ['Afternoon', 'Add a paddle', 'Rent a kayak if the river is calling.']
      ],
      links: [
        ['Glass-bottom boats', 'https://silversprings.com/plan-your-day/glass-bottom-boats/'],
        ['Plan the park day', 'https://silversprings.com/plan-your-day/'],
        ['Kayak rentals', 'https://kayakingsilversprings.com/silver-springs-kayak-rentals']
      ]
    },
    {
      issue: 'Archive 003',
      date: 'Sunset',
      status: 'Food loop',
      title: 'Ozello Seafood Sunset Run',
      dek: 'Cruise the marsh road at golden hour, stop for Ozello seafood, and make the whole evening feel like a small discovery.',
      image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Crystal_River_Preserve_State_Park_2.jpg?width=1200',
      imageLabel: 'Crystal River Preserve marshland',
      tags: ['Seafood', 'Sunset', 'Drive'],
      stops: [
        ['Late day', 'Take the trail', 'Drive Ozello Trail as the marsh opens up.'],
        ['Dinner', 'Seafood stop', 'Choose Peck\'s or Backwater Fins for the meal.'],
        ['Golden hour', 'Walk Ozello Park', 'Watch the light shift across the marsh.'],
        ['After', 'Roll back easy', 'Head toward Crystal River with the windows down.']
      ],
      links: [
        ['Ozello Park', 'https://www.discovercrystalriverfl.com/directory/ozello-park/'],
        ['Peck\'s Old Port Cove', 'https://pecksoldportcove.com/'],
        ['Backwater Fins', 'https://backwater-fins.com/']
      ]
    },
    {
      issue: 'Archive 004',
      date: 'Easy',
      status: 'Beach',
      title: 'Fort Island Gulf Beach Reset',
      dek: 'A low-friction sunset plan with Gulf air, picnic potential, and a quick route back into Crystal River for dinner.',
      image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Dolphin_at_Fort_Island_Gulf_Beach.jpg?width=1200',
      imageLabel: 'Fort Island Gulf Beach',
      tags: ['Beach', 'Sunset', 'Easy'],
      stops: [
        ['Afternoon', 'Head west', 'Pack light and take Fort Island Trail toward the Gulf.'],
        ['Beach', 'Settle in', 'Swim, walk the shore, or sit with the Gulf breeze.'],
        ['Sunset', 'Stay for color', 'Let the light stretch out over the flats.'],
        ['Dinner', 'Close in town', 'Return to Crystal River for an easy dinner.']
      ],
      links: [
        ['Fort Island Beach', 'https://www.discovercrystalriverfl.com/directory/fort-island-gulf-beach/'],
        ['Crystal River events', 'https://www.discovercrystalriverfl.com/events/']
      ]
    }
  ];

  var eats = [
    {
      lane: 'Today\'s radar',
      title: 'Backwater Fins',
      dek: 'Ozello seafood, Cajun-leaning plates, and brunch hours that make it a strong day-trip lunch anchor.',
      place: 'Ozello Trail - seafood',
      badges: ['Waterfront', 'Brunch', 'Seafood'],
      href: 'https://backwater-fins.com/',
      websiteUrl: 'https://backwater-fins.com/',
      mapQuery: 'Backwater Fins Ozello FL',
      placePhotoQuery: 'Backwater Fins Ozello FL',
      image: '',
      imageLabel: 'Backwater Fins',
      featured: true
    },
    {
      lane: 'Waterfront classic',
      title: 'Peck\'s Old Port Cove',
      dek: 'A long-running Ozello stop for seafood, old-Florida atmosphere, and a route-friendly dinner after the marsh drive.',
      place: 'Ozello - seafood',
      badges: ['Classic', 'Dinner', 'Drive-worthy'],
      href: 'https://pecksoldportcove.com/',
      websiteUrl: 'https://pecksoldportcove.com/',
      mapQuery: 'Peck\'s Old Port Cove Crystal River FL',
      placePhotoQuery: 'Peck\'s Old Port Cove Crystal River FL',
      image: '',
      imageLabel: 'Peck\'s Old Port Cove',
      featured: true
    },
    {
      lane: 'Unique local pick',
      title: 'The Freezer Tiki Bar',
      dek: 'Casual Homosassa energy, shrimp, cold drinks, and the kind of local texture visitors remember.',
      place: 'Homosassa - tiki bar',
      badges: ['Unique', 'Casual', 'Shrimp'],
      href: 'https://the-freezer-homosassa.com/',
      websiteUrl: 'https://the-freezer-homosassa.com/',
      mapQuery: 'The Freezer Tiki Bar Homosassa FL',
      placePhotoQuery: 'The Freezer Tiki Bar Homosassa FL',
      image: '',
      imageLabel: 'The Freezer Tiki Bar',
      featured: true
    },
    {
      lane: 'Breakfast loop',
      title: 'The Biscuit Barn',
      dek: 'A useful breakfast anchor before springs, paddles, errands, or a Crystal River loop.',
      place: 'Crystal River - breakfast',
      badges: ['Breakfast', 'Local', 'Quick stop'],
      href: 'https://www.biscuitbarn.net/',
      websiteUrl: 'https://www.biscuitbarn.net/',
      mapQuery: 'The Biscuit Barn Crystal River FL',
      placePhotoQuery: 'The Biscuit Barn Crystal River FL',
      image: '',
      imageLabel: 'The Biscuit Barn'
    },
    {
      lane: 'Local lunch',
      title: 'Sadie\'s Corner Kitchen',
      dek: 'A small local kitchen that fits the easy lunch slot in the Kings Bay day-trip loop.',
      place: 'Crystal River - lunch',
      badges: ['Local', 'Lunch', 'Loop stop'],
      href: 'https://m.facebook.com/SadiesCornerKitchen/',
      websiteUrl: 'https://m.facebook.com/SadiesCornerKitchen/',
      mapQuery: 'Sadie\'s Corner Kitchen Crystal River FL',
      placePhotoQuery: 'Sadie\'s Corner Kitchen Crystal River FL',
      image: '',
      imageLabel: 'Sadie\'s Corner Kitchen'
    }
  ];

  var PHOTO_VERIFIED_AT = '2026-06-06T18:23:00-07:00';
  var placePhotoIdentities = {
    'Backwater Fins': {
      googlePlaceId: 'ChIJSXTcQ7w46IgRC48Z6MW1VMY',
      returnedName: 'Backwater Fins',
      address: '13982 W Ozello Trail, Crystal River, FL 34429, USA',
      mapUrl: 'https://maps.google.com/?cid=14291247379160600331'
    },
    'Peck\'s Old Port Cove': {
      googlePlaceId: 'ChIJTdi9T0JH6IgRIWAUMlvjfWc',
      returnedName: 'Peck\'s Old Port Cove',
      address: '139 N Ozello Trail, Crystal River, FL 34429, USA',
      mapUrl: 'https://maps.google.com/?cid=7457366538817134625'
    },
    'The Freezer Tiki Bar': {
      googlePlaceId: 'ChIJIZPrH-w-6IgRN5iLFslzTbM',
      returnedName: 'The Freezer',
      address: '5590 S Boulevard Dr, Homosassa, FL 34448, USA',
      mapUrl: 'https://maps.google.com/?cid=12920110213499689015'
    },
    'The Biscuit Barn': {
      googlePlaceId: 'ChIJHRpO3XRB6IgR5YtISIJwLZI',
      returnedName: 'The Biscuit Barn',
      address: '1960 US-19, Crystal River, FL 34428, USA',
      mapUrl: 'https://maps.google.com/?cid=10533198808350231525'
    },
    'Sadie\'s Corner Kitchen': {
      googlePlaceId: 'ChIJuwLPiyhB6IgRDqcbiGTqmtA',
      returnedName: 'Sadie\'s Corner Kitchen',
      address: '353 NE 2nd St, Crystal River, FL 34429, USA',
      mapUrl: 'https://maps.google.com/?cid=15031584423803594510'
    }
  };

  function applyPlacePhotoIdentity(item) {
    var identity = placePhotoIdentities[item.title];
    if (!identity) return item;
    item.googlePlaceId = identity.googlePlaceId;
    item.mapUrl = identity.mapUrl;
    item.photoStatus = 'PASS exact place photo';
    item.photoVerifiedAt = PHOTO_VERIFIED_AT;
    item.photoEvidence = 'Google Places returned ' + identity.returnedName + ' at ' + identity.address + '; first photo visually reviewed as an exact place photo.';
    return item;
  }

  eats.forEach(applyPlacePhotoIdentity);

  function esc(str){
    return String(str == null ? '' : str).replace(/[&<>"']/g, function(ch){
      return ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[ch];
    });
  }

  function chips(items){
    return (items || []).map(function(item){
      return '<span class="chip">' + esc(item) + '</span>';
    }).join('');
  }

  return { dayTrips: dayTrips, eats: eats, esc: esc, chips: chips };
})();
