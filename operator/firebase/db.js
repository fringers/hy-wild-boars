import {db, serverTimestamp} from "./firebase";

const getLatestRequestsRef = (limit, statuses) => {
  let request = db.collection("requests")

  if (statuses && statuses.length > 0)
    request = request.where("status", "in", statuses)

  request.orderBy("timestamp", "desc")
    .limit(limit)

  return request
}

export const watchLatestRequests = (limit, statuses, callback) => {
  return getLatestRequestsRef(limit, statuses)
    .onSnapshot((snapshot) => {
      callback(snapshot.docs.map(docToRequest))
    })
}

export const getRequest = async (requestId) => {
  const doc = await db.collection("requests").doc(requestId).get()
  return docToRequest(doc)
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
    // userId: data.userId,
    // photoUrl: data.photoUrl,
    location: data.location,
    // isDead: data.isDead,
    // details: data.details,
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
