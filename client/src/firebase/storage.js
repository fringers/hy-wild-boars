import { storage } from './firebase';
import { currentUser } from './auth';

export const uploadFile = async (file) => {
  const userId = currentUser().uid;
  const randomId = makeid(6);
  const fileName = file.name;

  const ref = storage.ref(`requests/${userId}/${randomId}/${fileName}`);
  const snapshot = await ref.put(file);
  return await snapshot.ref.getDownloadURL();
};

function makeid(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
