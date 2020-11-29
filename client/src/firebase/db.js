import { db, GeoPoint, serverTimestamp } from './firebase';
import { currentUser } from './auth';

export const sendRequest = async (
  photoUrl,
  position,
  isDead,
  howMany,
  details,
  young
) => {
  await db.collection('requests').add({
    photoUrl,
    isDead,
    howMany,
    details,
    location: new GeoPoint(position.coords.latitude, position.coords.longitude),
    userId: currentUser().uid,
    timestamp: serverTimestamp(),
    status: 'NEW',
    young,
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
    howMany: data.howMany,
    details: data.details,
    status: data.status,
    young: data.young,
  };
};

const docToMessage = (doc) => {
  const data = doc.data();
  return {
    id: doc.id,
    text: data.text,
    sender: data.sender,
    timestamp: data.timestamp?.toDate(),
  };
};

export const getRequests = async () => {
  const snapshot = await db
    .collection('requests')
    .where('userId', '==', currentUser().uid)
    .orderBy('timestamp', 'desc')
    .get();
  return snapshot.docs.map(docToRequest);
};

export const getRequestById = async (requestId) => {
  const doc = await db.collection('requests').doc(requestId).get();
  return docToRequest(doc);
};

export const updateRequestStatus = async (requestId, status) => {
  await db.collection('requests').doc(requestId).update({
    status,
  });
};

export const watchRequestMessages = (requestId, callback) => {
  return db
    .collection('requests')
    .doc(requestId)
    .collection('requestMessages')
    .orderBy('timestamp', 'asc')
    .onSnapshot((snapshot) => callback(snapshot.docs.map(docToMessage)));
};

export const addRequestMessage = async (requestId, message) => {
  await db
    .collection('requests')
    .doc(requestId)
    .collection('requestMessages')
    .add({
      text: message,
      sender: 'USER',
      timestamp: serverTimestamp(),
    });
};
