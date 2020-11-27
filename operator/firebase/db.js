import {db} from "./firebase";

export const watchLatestRequests = (limit, callback) => {
  return db.collection("requests")
    // .orderBy("timestamp", "desc")
    .limit(limit)
    .onSnapshot((snapshot) => {
      const requests = [];
      snapshot.forEach((doc) => {
        requests.push(docToRequest(doc));
      });

      callback(requests)
    })
}

export const getRequest = async (requestId) => {
  const doc = await db.collection("requests").doc(requestId).get()
  return docToRequest(doc)
}

const docToRequest = (doc) => {
  const data = doc.data()
  return {
    id: doc.id,
    // timestamp: data.timestamp.toDate(),
    // userId: data.userId,
    // photoUrl: data.photoUrl,
    location: data.location,
    // isDead: data.isDead,
    // details: data.details,
  }
}
