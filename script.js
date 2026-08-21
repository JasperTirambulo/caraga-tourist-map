const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
});

const cartoLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
  attribution: '© OpenStreetMap © CARTO'
});

const esriSatLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

const map = L.map('map', {
  center: [8.9472, 125.5398],
  zoom: 8,
  layers: [osmLayer]
});

let currentUserCoords = [8.9472, 125.5398];
let userMarker = null;
let activeRedPolyline = null;
let currentSelectedSpot = null;
let wishlist = [];

const categoryGroups = {
  "Beaches & Islands": L.layerGroup().addTo(map),
  "Waterfalls & Rivers": L.layerGroup().addTo(map),
  "Mountains & Nature": L.layerGroup().addTo(map),
  "Heritage & Culture": L.layerGroup().addTo(map)
};

const baseMaps = {
  "OpenStreetMap Standard": osmLayer,
  "CartoDB Voyager": cartoLayer,
  "Esri World Satellite": esriSatLayer
};

const overlayMaps = {
  "Beaches & Islands": categoryGroups["Beaches & Islands"],
  "Waterfalls & Rivers": categoryGroups["Waterfalls & Rivers"],
  "Mountains & Nature": categoryGroups["Mountains & Nature"],
  "Heritage & Culture": categoryGroups["Heritage & Culture"]
};

let geojsonLayer = L.geoJSON(caragaGeoJSON, {
  style: function() {
    return {
      color: '#0284c7',
      weight: 2,
      fillColor: '#38bdf8',
      fillOpacity: 0.15
    };
  },
  onEachFeature: function(feature, layer) {
    layer.on({
      mouseover: function(e) {
        const l = e.target;
        l.setStyle({
          weight: 3,
          color: '#f59e0b',
          fillColor: '#fef08a',
          fillOpacity: 0.4
        });
        l.bringToFront();
      },
      mouseout: function(e) {
        geojsonLayer.resetStyle(e.target);
      },
      click: function(e) {
        map.fitBounds(e.target.getBounds());
      }
    });
    layer.bindTooltip(`<b>${feature.properties.name} Province</b>`);
  }
}).addTo(map);

overlayMaps["Caraga Boundaries"] = geojsonLayer;

L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);

let markersMap = {};

// Custom SVG category icons
function getCategoryIcon(category) {
  let iconSymbol = '📍';
  let bgColor = '#0284c7';

  if (category === 'Beaches & Islands') { iconSymbol = '🏖️'; bgColor = '#0284c7'; }
  else if (category === 'Waterfalls & Rivers') { iconSymbol = '🌊'; bgColor = '#0ea5e9'; }
  else if (category === 'Mountains & Nature') { iconSymbol = '⛰️'; bgColor = '#16a34a'; }
  else if (category === 'Heritage & Culture') { iconSymbol = '🏛️'; bgColor = '#d97706'; }

  return L.divIcon({
    className: 'custom-cat-icon',
    html: `<div style="background-color:${bgColor}; width:30px; height:30px; border-radius:50%; border:2px solid white; display:flex; align-items:center; justify-content:center; font-size:14px; box-shadow:0 2px 6px rgba(0,0,0,0.3); animation: bounce 2s infinite;">${iconSymbol}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });
}

function setUserMarker(lat, lng, label) {
  if (userMarker) {
    map.removeLayer(userMarker);
  }
  
  const userIcon = L.divIcon({
    className: 'user-location-marker',
    html: '<div style="background-color:#2563eb; width:18px; height:18px; border-radius:50%; border:3px solid white; box-shadow:0 0 8px rgba(37,99,235,0.8);"></div>',
    iconSize: [18, 18],
    iconAnchor: [9, 9]
  });

  userMarker = L.marker([lat, lng], { icon: userIcon })
    .addTo(map)
    .bindPopup(`<b>Your Location:</b> ${label}`);
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function updateUserLocation() {
  const locationInput = document.getElementById('user-location').value.trim();
  if (!locationInput) return;

  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationInput + ', Philippines')}`)
    .then(res => res.json())
    .then(data => {
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        currentUserCoords = [lat, lon];
        setUserMarker(lat, lon, locationInput);
        map.flyTo([lat, lon], 10);
        if (currentSelectedSpot) recalculateRouteDetails();
      } else {
        alert("Location not found. Defaulting to Butuan City.");
        currentUserCoords = [8.9472, 125.5398];
        setUserMarker(8.9472, 125.5398, "Butuan City");
      }
    })
    .catch(() => {
      setUserMarker(currentUserCoords[0], currentUserCoords[1], locationInput);
    });
}

function displaySpots(spotsToRender) {
  const container = document.getElementById('spots-container');
  container.innerHTML = '';

  Object.values(categoryGroups).forEach(group => group.clearLayers());
  markersMap = {};

  spotsToRender.forEach(spot => {
    const isWishlisted = wishlist.some(w => w.id === spot.id);
    const card = document.createElement('div');
    card.className = 'spot-card';
    card.innerHTML = `
      <div class="img-wrapper" onclick="zoomToLocation(${spot.lat}, ${spot.lng}, ${spot.id}, '${spot.category}')">
        <img src="${spot.image}" alt="${spot.name}" class="spot-img" onerror="this.src='https://via.placeholder.com/300x180?text=Image+Missing'">
        <span class="badge-tag">${spot.badge}</span>
        <span class="zoom-hint">📍 Click to route</span>
      </div>
      <div class="spot-content">
        <div class="card-header-flex">
          <span class="category-tag">${spot.category}</span>
          <span class="rating-tag">${spot.rating}</span>
        </div>
        <h3>${spot.name}</h3>
        <p>${spot.description}</p>
        <div class="spot-details">
          <p><strong>Fee:</strong> ${spot.entrance_fee}</p>
          <p><strong>Best Season:</strong> ${spot.best_season}</p>
          <p><strong>Family Note:</strong> ${spot.family_friendly}</p>
        </div>
        <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist(event, ${spot.id})">
          ${isWishlisted ? '❤️ In Itinerary' : '🤍 Add to Trip'}
        </button>
      </div>
    `;
    container.appendChild(card);

    const marker = L.marker([spot.lat, spot.lng], { icon: getCategoryIcon(spot.category) })
      .bindPopup(`
        <div class="rich-popup">
          <img src="${spot.image}" onerror="this.src='https://via.placeholder.com/200x90?text=Image+Missing'">
          <h4>${spot.name}</h4>
          <p><strong>Rating:</strong> ${spot.rating}</p>
          <p><strong>Fee:</strong> ${spot.entrance_fee}</p>
          <p><button style="margin-top:5px; background:#0284c7; color:#fff; border:none; padding:4px 8px; border-radius:4px; cursor:pointer;" onclick="zoomToLocation(${spot.lat}, ${spot.lng}, ${spot.id}, '${spot.category}')">Route from My Location</button></p>
        </div>
      `);

    if (categoryGroups[spot.category]) {
      categoryGroups[spot.category].addLayer(marker);
    }
    markersMap[spot.id] = marker;
  });
}

function handleSearch() {
  const query = document.getElementById('search-input').value.toLowerCase();
  const filtered = touristSpots.filter(spot => 
    spot.name.toLowerCase().includes(query) || 
    spot.description.toLowerCase().includes(query) ||
    spot.category.toLowerCase().includes(query)
  );
  displaySpots(filtered);
}

function zoomToLocation(lat, lng, spotId, category) {
  if (categoryGroups[category] && !map.hasLayer(categoryGroups[category])) {
    map.addLayer(categoryGroups[category]);
  }

  currentSelectedSpot = touristSpots.find(s => s.id === spotId);

  if (activeRedPolyline) {
    map.removeLayer(activeRedPolyline);
  }

  activeRedPolyline = L.polyline([currentUserCoords, [lat, lng]], {
    color: '#dc2626',
    weight: 5,
    opacity: 0.9,
    dashArray: '10, 10'
  }).addTo(map);

  const bounds = L.latLngBounds([currentUserCoords, [lat, lng]]);
  map.fitBounds(bounds, { padding: [50, 50] });

  if (markersMap[spotId]) {
    markersMap[spotId].openPopup();
  }

  recalculateRouteDetails();
  document.getElementById('route-info-panel').classList.remove('hidden');
}

function recalculateRouteDetails() {
  if (!currentSelectedSpot) return;

  const mode = document.getElementById('transport-mode').value;
  const spot = currentSelectedSpot;
  const distanceKm = calculateDistance(currentUserCoords[0], currentUserCoords[1], spot.lat, spot.lng);
  
  // Speed variables based on transport choice
  const speed = mode === 'private' ? 55 : 35; // Private vs Bus/Van average speeds
  let hours = distanceKm / speed;
  if (spot.requires_ferry) hours += 1.5;
  
  const totalMinutes = Math.round(hours * 60);
  const displayHours = Math.floor(totalMinutes / 60);
  const displayMins = totalMinutes % 60;
  const timeString = `${displayHours > 0 ? displayHours + 'h ' : ''}${displayMins} mins`;

  // Cost variables based on transport choice
  const ratePerKm = mode === 'private' ? 12 : 5; // Gas cost vs Public fare
  let transportCost = Math.round(distanceKm * ratePerKm);
  if (spot.requires_ferry) transportCost += 450;

  const entranceCost = spot.base_fee;
  const totalCost = transportCost + entranceCost;

  document.getElementById('info-destination-title').innerText = spot.name;
  document.getElementById('info-origin').innerText = document.getElementById('user-location').value || 'Current Location';
  document.getElementById('info-distance').innerText = `${distanceKm.toFixed(1)} km`;
  document.getElementById('info-travel-time').innerText = timeString;
  document.getElementById('info-entrance-fee').innerText = `₱${entranceCost.toLocaleString()}`;
  document.getElementById('info-transport-cost').innerText = `₱${transportCost.toLocaleString()} (${mode === 'private' ? 'Gas' : 'Bus/Van Fare'})`;
  document.getElementById('info-total-cost').innerText = `₱${totalCost.toLocaleString()}`;
}

function closeRoutePanel() {
  document.getElementById('route-info-panel').classList.add('hidden');
  if (activeRedPolyline) {
    map.removeLayer(activeRedPolyline);
  }
}

// Wishlist Functionality
function toggleWishlist(event, spotId) {
  event.stopPropagation();
  const spot = touristSpots.find(s => s.id === spotId);
  const index = wishlist.findIndex(w => w.id === spotId);

  if (index > -1) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push(spot);
  }

  updateWishlistUI();
  handleSearch(); // Refresh list buttons
}

function toggleWishlistDrawer() {
  document.getElementById('wishlist-drawer').classList.toggle('hidden');
}

function updateWishlistUI() {
  document.getElementById('wishlist-count').innerText = wishlist.length;
  const container = document.getElementById('wishlist-items-container');

  if (wishlist.length === 0) {
    container.innerHTML = '<p class="empty-msg">No destinations added yet. Click ❤️ on any card to add!</p>';
    document.getElementById('wishlist-total-cost').innerText = '₱0';
    return;
  }

  container.innerHTML = '';
  let totalTripCost = 0;

  wishlist.forEach(item => {
    const dist = calculateDistance(currentUserCoords[0], currentUserCoords[1], item.lat, item.lng);
    const estCost = Math.round(dist * 10) + item.base_fee;
    totalTripCost += estCost;

    const div = document.createElement('div');
    div.className = 'wishlist-item';
    div.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <p style="font-size:0.75rem; color:#64748b;">Est. Budget: ₱${estCost.toLocaleString()}</p>
      </div>
      <button onclick="toggleWishlist(event, ${item.id})" style="border:none; background:none; cursor:pointer; color:#ef4444;">❌</button>
    `;
    container.appendChild(div);
  });

  document.getElementById('wishlist-total-cost').innerText = `₱${totalTripCost.toLocaleString()}`;
}

function filterByCategory(categoryName) {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    if (btn.innerText === categoryName || (categoryName === 'All' && btn.innerText === 'All Spots')) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  if (categoryName === 'All') {
    displaySpots(touristSpots);
    map.flyTo([8.9472, 125.5398], 8);
  } else {
    const filtered = touristSpots.filter(spot => spot.category === categoryName);
    displaySpots(filtered);
    
    if (filtered.length > 0) {
      const activeMarkers = filtered.map(s => markersMap[s.id]).filter(Boolean);
      if (activeMarkers.length > 0) {
        const group = L.featureGroup(activeMarkers);
        map.fitBounds(group.getBounds().pad(0.2));
      }
    }
  }
}

setUserMarker(currentUserCoords[0], currentUserCoords[1], "Butuan City");
displaySpots(touristSpots);