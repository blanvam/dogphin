const earthRadius = 6378137
const toRad = (value) => (value * Math.PI) / 180
const robustAcos = (value) => {
  if (value > 1) {
    return 1
  }
  if (value < -1) {
    return -1
  }
  return value
}

// Calculates the distance between two points.
// This method is simple but also more inaccurate
export default getDistance = (from, to, accuracy = 1) => {
  accuracy = typeof accuracy !== 'undefined' && !isNaN(accuracy) ? accuracy : 1

  const fromLat = from.latitude
  const fromLon = from.longitude
  const toLat = to.latitude
  const toLon = to.longitude
  const distance =
      Math.acos(
          robustAcos(
              Math.sin(toRad(toLat)) * Math.sin(toRad(fromLat)) +
                  Math.cos(toRad(toLat)) *
                      Math.cos(toRad(fromLat)) *
                      Math.cos(toRad(fromLon) - toRad(toLon))
          )
      ) * earthRadius;
  return Math.round(distance / accuracy) * accuracy;
}
