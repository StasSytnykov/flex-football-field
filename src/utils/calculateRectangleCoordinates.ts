const width = 90;
const height = 140;

export const calculateRectangleCoordinates = (
  center: google.maps.LatLng | undefined
) => {
  if (center) {
    const latDistance = height / 111111;
    const lngDistance =
      width / (111111 * Math.cos((center.lat() * Math.PI) / 180));
    const north = new google.maps.LatLng(
      center.lat() + latDistance / 2,
      center.lng()
    );
    const south = new google.maps.LatLng(
      center.lat() - latDistance / 2,
      center.lng()
    );
    const east = new google.maps.LatLng(
      center.lat(),
      center.lng() + lngDistance / 2
    );
    const west = new google.maps.LatLng(
      center.lat(),
      center.lng() - lngDistance / 2
    );
    return {
      north: north.lat(),
      east: east.lng(),
      south: south.lat(),
      west: west.lng(),
    };
  } else {
    return {
      north: 0,
      east: 0,
      south: 0,
      west: 0,
    };
  }
};
