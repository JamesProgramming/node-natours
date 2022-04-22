/* eslint-disable */

export const displayMap = (locations) => {
  mapboxgl.accessToken =
  'pk.eyJ1IjoiamFtZXNjb29sMTIzIiwiYSI6ImNsMjgxZnBoczA1MDQzanIxaTBvZXZheXcifQ.v_cz3tbsyrZbnKwRq34TRQ';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/jamescool123/cl2847j60002a15mt7xsiaadr',
  scrollZoom: false,
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
  // Create marker
  const el = document.createElement('div');
  el.className = 'marker';

  // Add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  new mapboxgl.Popup({
    offset: 30,
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);
  // Entend the map bounds to include the current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: { top: 200, bottom: 150, left: 100, right: 100 },
});

}

