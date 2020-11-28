import {db, GeoPoint, serverTimestamp} from "./firebase";

const getLatestRequestsRef = (limit, statuses, geoSearch) => {
  let request = db.collection("requests")

  if (statuses && statuses.length > 0)
    request = request.where("status", "in", statuses)

  const geoPoints = geoSearchToSearchPoints(geoSearch, 10)
  if (geoPoints) {
    console.log(geoPoints)
    request = request
      .where('location', '>', geoPoints[0])
      .where('location', '<', geoPoints[1])
      .orderBy("location", "desc")
  }

  request.orderBy("timestamp", "desc")
    .limit(limit)

  return request
}

export const watchLatestRequests = (limit, statuses, geoSearch, callback) => {
  return getLatestRequestsRef(limit, statuses, geoSearch)
    .onSnapshot((snapshot) => {
      callback(snapshot.docs.map(docToRequest))
    })
}

export const getRequest = async (requestId) => {
  const doc = await db.collection("requests").doc(requestId).get()
  return docToRequest(doc)
}

export const updateRequestStatus = async (requestId, status) => {
  await db.collection("requests").doc(requestId)
    .update({
      status,
    })
}

export const getRequestMessages = async (requestId) => {
  const snapshot = await db.collection("requests").doc(requestId)
    .collection("requestMessages")
    .orderBy("timestamp", "asc")
    .get()

  return snapshot.docs.map(docToMessage)
}

export const addRequestMessage = async (requestId, message) => {
  await db.collection("requests").doc(requestId)
    .collection("requestMessages")
    .add({
      text: message,
      sender: 'OPERATOR',
      timestamp: serverTimestamp(),
    })
}

const docToRequest = (doc) => {
  const data = doc.data()
  return {
    id: doc.id,
    timestamp: data.timestamp.toDate(),
    userId: data.userId,
    photoUrl: data.photoUrl,
    location: data.location,
    isDead: data.isDead,
    details: data.details,
    status: data.status,
  }
}

const docToMessage = (doc) => {
  const data = doc.data()
  return {
    id: doc.id,
    text: data.text,
    sender: data.sender,
    timestamp: data.timestamp.toDate(),
  }
}

const geoSearchToSearchPoints = (geoSearch, distance) => {
  if (!geoSearch || geoSearch.length === 0)
    return null

  // ~1 mile of lat and lon in degrees
  const lat = 0.0144927536231884
  const lon = 0.0181818181818182

  const latitude = parseFloat(geoSearch[0].lat)
  console.log(latitude)
  const longitude = parseFloat(geoSearch[0].lon)
  console.log(longitude)

  const lowerLat = latitude - (lat * distance)
  const lowerLon = longitude - (lon * distance)

  const greaterLat = latitude + (lat * distance)
  const greaterLon = longitude + (lon * distance)

  const lesserGeopoint = new GeoPoint(lowerLat , lowerLon)
  const greaterGeopoint = new GeoPoint(greaterLat , greaterLon)

  return [
    lesserGeopoint,
    greaterGeopoint,
  ]
}
