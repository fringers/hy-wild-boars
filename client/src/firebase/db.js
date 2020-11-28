import { db, GeoPoint, serverTimestamp } from './firebase';
import { currentUser } from './auth';

export const sendRequest = async (photoUrl, position, isDead, details) => {
  await db.collection('requests').add({
    photoUrl,
    isDead,
    details,
    location: new GeoPoint(position.coords.latitude, position.coords.longitude),
    userId: currentUser().uid,
    timestamp: serverTimestamp(),
    status: 'NEW',
  });
};

const docToRequest = (doc) => {
  const data = doc.data();
  return {
    id: doc.id,
    timestamp: data.timestamp.toDate(),
    userId: data.userId,
    photoUrl: data.photoUrl,
    location: data.location,
    isDead: data.isDead,
    details: data.details,
    status: data.status,
  };
};

const docToMessage = (doc) => {
  const data = doc.data()
  return {
    id: doc.id,
    text: data.text,
    sender: data.sender,
    timestamp: data.timestamp.toDate(),
  }
}

export const getRequests = async () => {
  const snapshot = await db
    .collection('requests')
    .where('userId', '==', currentUser().uid)
    .orderBy('timestamp', 'asc')
    .get();
  return snapshot.docs.map(docToRequest);
};

export const getRequestById = async (requestId) => {
  const doc = await db.collection('requests').doc(requestId).get();
  return docToRequest(doc);
};

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
      sender: 'USER',
      timestamp: serverTimestamp(),
    })
}
