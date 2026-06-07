(function(){
      var bar = document.getElementById('bar');
      var progress = document.getElementById('progress');
      var sections = Array.prototype.slice.call(document.querySelectorAll('main section:not([hidden])'));
      var rail = document.getElementById('rail');

      sections.forEach(function(s){
        var label = s.getAttribute('data-screen-label') || s.id;
        var a = document.createElement('a');
        a.href = '#' + s.id; a.setAttribute('data-target', s.id);
        a.setAttribute('aria-label', label);
        a.setAttribute('title', label);
        a.innerHTML = '<span>' + label + '</span>';
        if (rail) rail.appendChild(a);
      });
      var railLinks = rail ? Array.prototype.slice.call(rail.children) : [];
      var weekNavLinks = Array.prototype.slice.call(document.querySelectorAll('.week-nav a[data-target]'));

      var dayTrips = [
        {
          issue: 'Issue 001',
          date: 'June 4, 2026',
          status: 'This week',
          title: 'Kings Bay Clear-Water Loop',
          dek: 'A bright, easy Crystal River day: clear kayak or snorkel early, local lunch, Hunter Springs float, and a Fort Island sunset.',
          image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Crystal_River_near_Hunter_Spring_Run_-_panoramio.jpg?width=1100',
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
          image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Silver_Springs_State_Park_-_Headspring_Entrance_Sign.jpg?width=1100',
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
          image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Crystal_River_Preserve_State_Park_2.jpg?width=1100',
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
          image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Dolphin_at_Fort_Island_Gulf_Beach.jpg?width=1100',
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
          place: 'Ozello Trail · seafood',
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
          place: 'Ozello · seafood',
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
          place: 'Homosassa · tiki bar',
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
          place: 'Crystal River · breakfast',
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
          place: 'Crystal River · lunch',
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
        return (items || []).map(function(item){ return '<span class="chip">' + esc(item) + '</span>'; }).join('');
      }
      async function loadCityPulseData(){
        try {
          var response = await fetch('/api/city-pulse?city=nature-coast');
          if(!response.ok) throw new Error('City Pulse data unavailable');
          var data = await response.json();
          document.documentElement.dataset.contentSource = data.liveError ? 'seed-fallback' : 'city-pulse-api';

          if(data.issue){
            var issueLabel = data.issue.label || data.issue.slug || 'Pilot Issue';
            var iss = document.querySelector('.bar-cta .iss');
            if(iss) iss.textContent = issueLabel;
            var datelineIssue = document.querySelector('.mast .dateline span:nth-child(2)');
            if(datelineIssue) datelineIssue.textContent = issueLabel;
          }

          if(data.sources && data.sources.length){
            var footerSources = document.querySelector('footer .src');
            if(footerSources){
              footerSources.innerHTML =
                'Built on source discipline: official calendars, tourism boards, parks feeds, and direct business pages. Social finds are leads, not facts.<br>' +
                'Sources: ' + data.sources.slice(0, 6).map(function(source){
                  return '<a href="' + esc(source.url) + '" target="_blank" rel="noopener">' + esc(source.name) + '</a>';
                }).join(' · ');
            }
          }
        } catch(error) {
          document.documentElement.dataset.contentSource = 'inline-fallback';
          console.warn(error);
        }
      }
      loadCityPulseData();
      function renderDayTrips(){
        var archive = document.getElementById('daytrip-archive');
        if(!archive) return;
        archive.innerHTML = dayTrips.map(function(trip){
          var legs = trip.stops.map(function(stop, idx){
            return '<div class="leg">' +
              '<div class="leg-top"><span class="t">' + esc(stop[0]) + '</span></div>' +
              '<div class="dotline"><i></i>' + (idx < trip.stops.length - 1 ? '<span class="ln"></span>' : '') + '</div>' +
              '<h4>' + esc(stop[1]) + '</h4>' +
              '<p>' + esc(stop[2]) + '</p>' +
            '</div>';
          }).join('');
          var links = (trip.links || []).map(function(link){
            return '<a class="biz" href="' + esc(link[1]) + '" target="_blank" rel="noopener">' + esc(link[0]) + ' <span class="ar">↗</span></a>';
          }).join('');
          return '<article class="archive-trip rv">' +
            '<div class="archive-trip-head">' +
              '<div class="archive-trip-copy">' +
                '<div class="card-top"><span class="card-kicker">' + esc(trip.status) + ' · ' + esc(trip.issue) + '</span><span class="card-date">' + esc(trip.date) + '</span></div>' +
                '<h3>' + esc(trip.title) + '</h3>' +
                '<p>' + esc(trip.dek) + '</p>' +
                '<div class="card-tags">' + chips(trip.tags) + '</div>' +
              '</div>' +
              '<div class="ph"><img alt="' + esc(trip.imageLabel || trip.title) + '" data-photo src="' + esc(trip.image) + '"><span class="tag">PHOTO · ' + esc(trip.imageLabel || trip.title) + '</span></div>' +
            '</div>' +
            '<div class="trip">' + legs + '</div>' +
            '<div class="bizlinks"><span class="bl-label">Plan this itinerary</span><div class="bl-row">' + links + '<a class="biz sponsor" href="#advertise">Sponsor this itinerary <span class="tagad">Sponsor</span></a></div></div>' +
          '</article>';
        }).join('');
      }
      function renderEats(){
        var radar = document.getElementById('eats-radar');
        var evergreen = document.getElementById('eats-evergreen');
        if(!radar || !evergreen) return;
        function mapUrl(item){
          return item.mapUrl || 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(item.mapQuery || (item.title + ' ' + (item.place || 'Nature Coast Florida')));
        }
        function websiteUrl(item){
          return item.websiteUrl || item.href || '#';
        }
        function placePhotoImageUrl(item){
          var placeId = item.googlePlaceId || item.placeId;
          if(!placeId && !item.placePhotoQuery) return '';
          return '/api/place-photo?' + (placeId ? 'placeId=' + encodeURIComponent(placeId) : 'query=' + encodeURIComponent(item.placePhotoQuery));
        }
        function placePhotoMetaUrl(item){
          var placeId = item.googlePlaceId || item.placeId;
          if(!placeId && !item.placePhotoQuery) return '';
          return '/api/place-photo?format=json&' + (placeId ? 'placeId=' + encodeURIComponent(placeId) : 'query=' + encodeURIComponent(item.placePhotoQuery));
        }
        function imageSrc(item){
          return placePhotoImageUrl(item) || (item.photoStatus === 'PASS reviewed fallback' ? item.image : '');
        }
        function imageAttrs(item){
          var attrs = ' onerror="this.onerror=null;this.classList.add(\'photo-failed\');if(this.parentNode)this.parentNode.classList.add(\'photo-missing\');"';
          var metaUrl = placePhotoMetaUrl(item);
          if(metaUrl) attrs += ' data-place-photo-meta="' + esc(metaUrl) + '"';
          return attrs;
        }
        function actions(item){
          return '<div class="eat-actions">' +
            '<a href="' + esc(mapUrl(item)) + '" target="_blank" rel="noopener">MAP</a>' +
            '<a href="' + esc(websiteUrl(item)) + '" target="_blank" rel="noopener">WEBSITE</a>' +
          '</div>';
        }
        function card(item){
          return '<article class="eat-card rv' + (item.featured ? ' featured' : '') + '">' +
            '<div class="ph eat-media"><img alt="' + esc(item.imageLabel || item.title) + '" data-photo src="' + esc(imageSrc(item)) + '"' + imageAttrs(item) + '><span class="tag photo-credit">PHOTO · ' + esc(item.title) + '</span></div>' +
            '<div class="eat-body">' +
              '<div class="card-top"><span class="card-kicker">' + esc(item.lane) + '</span></div>' +
              '<h4>' + esc(item.title) + '</h4>' +
              '<p>' + esc(item.dek) + '</p>' +
              '<div class="rating-row"><span>' + esc(item.place) + '</span></div>' +
              '<div class="card-tags">' + chips(item.badges) + '</div>' +
              actions(item) +
            '</div>' +
          '</article>';
        }
        radar.innerHTML = eats.filter(function(item){ return item.featured; }).map(card).join('');
        evergreen.innerHTML = eats.filter(function(item){ return !item.featured; }).map(card).join('');
        document.querySelectorAll('#eats img[data-place-photo-meta]').forEach(function(img){
          fetch(img.getAttribute('data-place-photo-meta')).then(function(response){
            if(!response.ok) throw new Error('Place photo unavailable');
            return response.json();
          }).then(function(payload){
            var names = (payload.attributions || []).map(function(attr){ return attr.displayName; }).filter(Boolean);
            var credit = img.parentNode ? img.parentNode.querySelector('.photo-credit') : null;
            if(credit && names.length) credit.textContent = 'Photo: ' + names.join(', ');
          }).catch(function(){});
        });
      }
      renderDayTrips();
      renderEats();

      function initTodayModule(){
        var date = new Date();
        var names = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var month = date.toLocaleDateString(undefined, { month:'long' });
        var todayCard = document.getElementById('today-card');
        var dayName = todayCard ? todayCard.querySelector('.day-name') : null;
        var dayDate = todayCard ? todayCard.querySelector('.day-date') : null;
        if(dayName) dayName.textContent = names[date.getDay()];
        if(dayDate) dayDate.textContent = month + ' ' + date.getDate();
        document.querySelectorAll('.daycell').forEach(function(cell){
          cell.classList.toggle('is-today', Number(cell.getAttribute('data-day')) === date.getDay());
        });
      }
      initTodayModule();

      function setActiveSection(id){
        railLinks.forEach(function(l){ l.classList.toggle('active', l.getAttribute('data-target') === id); });
        weekNavLinks.forEach(function(l){ l.classList.toggle('active', l.getAttribute('data-target') === id); });
      }
      function currentSectionId(){
        var doc = document.documentElement;
        if(window.scrollY + window.innerHeight >= doc.scrollHeight - 4){
          return sections[sections.length - 1] ? sections[sections.length - 1].id : null;
        }
        var viewportTop = bar ? bar.getBoundingClientRect().bottom : 0;
        var viewportBottom = window.innerHeight;
        var current = null;
        var bestScore = -Infinity;
        sections.forEach(function(section){
          var rect = section.getBoundingClientRect();
          var visible = Math.max(0, Math.min(rect.bottom, viewportBottom) - Math.max(rect.top, viewportTop));
          var nearHeader = Math.max(0, 120 - Math.abs(rect.top - viewportTop));
          var score = visible + nearHeader;
          if(score > bestScore){
            bestScore = score;
            current = section;
          }
        });
        return current ? current.id : null;
      }
      function onScroll(){
        var st = window.scrollY || document.documentElement.scrollTop;
        var h = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = (h > 0 ? (st / h) * 100 : 0) + '%';
        bar.classList.toggle('stuck', st > 12);
        setActiveSection(currentSectionId());
      }
      window.addEventListener('scroll', onScroll, { passive:true });
      onScroll();
      if(location.hash){
        window.setTimeout(function(){
          var target = document.getElementById(location.hash.slice(1));
          if(target){
            target.scrollIntoView({ block:'start', behavior:'auto' });
            onScroll();
          }
        }, 80);
      }

      var rio = new IntersectionObserver(function(entries){
        entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); rio.unobserve(e.target); } });
      }, { threshold:0.12, rootMargin:'0px 0px -8% 0px' });
      document.querySelectorAll('.rv').forEach(function(el){ rio.observe(el); });

      /* photos: reveal real img, fall back to labeled placeholder on error */
      document.querySelectorAll('img[data-photo]').forEach(function(img){
        function ok(){ img.classList.add('loaded'); var ph = img.closest('.ph'); if(ph) ph.classList.add('has-img'); }
        function fail(){ if(img.parentNode) img.parentNode.removeChild(img); }
        if(img.complete && img.naturalWidth > 0){ ok(); }
        else if(img.complete && img.naturalWidth === 0){ fail(); }
        img.addEventListener('load', ok);
        img.addEventListener('error', fail);
      });

      /* day-trip gamification */
      var legs = Array.prototype.slice.call(document.querySelectorAll('#trip .leg'));
      var badge = document.getElementById('badge');
      var legcount = document.getElementById('legcount');
      var legbar = document.getElementById('legbar');
      var resetBtn = document.getElementById('resetlegs');
      var costLo = document.getElementById('cost-lo');
      var costHi = document.getElementById('cost-hi');
      var TKEY = 'ncp_trip_kingsbay';
      var done = {};
      try { done = JSON.parse(localStorage.getItem(TKEY) || '{}') || {}; } catch(e){ done = {}; }

      function persist(){ try { localStorage.setItem(TKEY, JSON.stringify(done)); } catch(e){} }
      function render(animate){
        var count = 0;
        var lo = 0;
        var hi = 0;
        legs.forEach(function(leg){
          var id = leg.getAttribute('data-leg');
          var isDone = !!done[id];
          leg.classList.toggle('done', isDone);
          if(isDone) count++;
          lo += Number(leg.getAttribute('data-lo') || 0);
          hi += Number(leg.getAttribute('data-hi') || 0);
        });
        legcount.textContent = String(count);
        legbar.style.width = (count/legs.length*100) + '%';
        if(costLo) costLo.textContent = String(lo);
        if(costHi) costHi.textContent = String(hi);
        resetBtn.hidden = count === 0;
        if(count === legs.length){ badge.classList.add('show'); }
        else { badge.classList.remove('show'); }
      }
      function toggle(leg){
        var id = leg.getAttribute('data-leg');
        if(done[id]) delete done[id]; else done[id] = 1;
        persist(); render(true);
      }
      legs.forEach(function(leg){
        leg.addEventListener('click', function(){ toggle(leg); });
      });
      resetBtn.addEventListener('click', function(ev){ ev.stopPropagation(); done = {}; persist(); render(); });
      render(false);

      /* reader tip flow */
      var tipForm = document.getElementById('tipform');
      var tipOk = document.getElementById('tip-ok');
      if(tipForm && tipOk){
        tipForm.addEventListener('submit', function(ev){
          ev.preventDefault();
          var spot = document.getElementById('tip-spot');
          if(!spot || !spot.value.trim()){
            if(spot) spot.focus();
            return;
          }
          var tip = {
            spot: spot.value.trim(),
            note: (document.getElementById('tip-note') || {}).value || '',
            name: (document.getElementById('tip-name') || {}).value || '',
            email: (document.getElementById('tip-email') || {}).value || '',
            at: new Date().toISOString()
          };
          try {
            var list = JSON.parse(localStorage.getItem('ncp_reader_tips') || '[]');
            list.unshift(tip);
            localStorage.setItem('ncp_reader_tips', JSON.stringify(list.slice(0, 20)));
          } catch(e){}
          tipForm.classList.add('hide');
          tipOk.classList.add('show');
        });
      }

      /* join flow */
      var form = document.getElementById('joinform');
      var confirmed = document.getElementById('confirmed');
      var detail = document.getElementById('confirm-detail');
      var emailEl = document.getElementById('email');
      var KEY = 'ncp_pilot_email';
      function showConfirmed(email){
        form.classList.add('hide'); confirmed.classList.add('show');
        detail.textContent = 'Issue 002 is headed to ' + email + ' this Friday.';
      }
      var saved = null;
      try { saved = localStorage.getItem(KEY); } catch(e){}
      if(saved){ showConfirmed(saved); }
      form.addEventListener('submit', async function(ev){
        ev.preventDefault();
        var val = (emailEl.value || '').trim();
        if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val)){ emailEl.focus(); emailEl.style.borderColor = 'oklch(0.6 0.18 25)'; return; }
        try {
          var response = await fetch('/api/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: val,
              city: 'nature-coast',
              source: 'site-signup',
              path: location.pathname,
              userAgent: navigator.userAgent
            })
          });
          var result = await response.json().catch(function(){ return {}; });
          if(!response.ok) throw new Error(result.error || 'Signup is unavailable right now.');
          try { localStorage.setItem(KEY, val); } catch(e){}
          showConfirmed(val);
        } catch(error) {
          detail.textContent = error.message || 'Signup is unavailable right now.';
          confirmed.classList.add('show');
        }
      });
    })();
