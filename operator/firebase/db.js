import {db, GeoPoint, serverTimestamp} from "./firebase";
import {reverseSearch} from "../nominatim/nominatim";

const getLatestRequestsRef = (limit, statuses, geoSearch) => {
  let request = db.collection("requests")

  if (statuses && statuses.length > 0)
    request = request.where("status", "in", statuses)

  const geoPoints = geoSearchToSearchPoints(geoSearch, 10)
  if (geoPoints) {
    request = request
      .where('location', '>', geoPoints[0])
      .where('location', '<', geoPoints[1])
      .orderBy("location", "desc")
  }

  request = request.orderBy("timestamp", "desc")
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

export const updateRequestGeoInfo = async (requestId, geoInfo) => {
  await db.collection("requests").doc(requestId)
    .update({
      geoInfo,
    })
}

export const getGeoInfo = async (requests) => {
  const promises = requests.map(async (r) => {
    if (r.geoInfo) {
      return [
        r.id,
        r.geoInfo,
      ]
    }

    const data = await reverseSearch({
      lat: r.location.latitude,
      lng: r.location.longitude,
    });

    updateRequestGeoInfo(r.id, data)

    return [
      r.id,
      data,
    ]
  });

  const resolved = await Promise.all(promises);
  return Object.fromEntries(resolved)
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
    howMany: data.howMany,
    details: data.details,
    status: data.status,
    geoInfo: data.geoInfo,
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
  const longitude = parseFloat(geoSearch[0].lon)

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
