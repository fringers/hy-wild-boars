import { auth } from './firebase';

export const signIn = async () => {
  try {
    await auth.signInAnonymously();
  } catch (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.error(`${errorCode}: ${errorMessage}`);
  }
};

export const currentUser = () => {
  return auth.currentUser;
};

export const onAuthStateChanged = (callback) => {
  auth.onAuthStateChanged(callback);
};
