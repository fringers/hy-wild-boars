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

export const getRequests = async () => {
  const snapshot = await db
    .collection('requests')
    .where('userId', '==', currentUser().uid)
    .orderBy('timestamp', 'asc')
    .get();
  return snapshot.docs.map(docToRequest);
};
