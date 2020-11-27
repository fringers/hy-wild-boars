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
  });
};
