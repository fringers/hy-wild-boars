import {auth} from "./firebase";

export const signIn = async (email, password) => {
    try {
        return await auth.signInWithEmailAndPassword(email, password)
    } catch (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error(`${errorCode}: ${errorMessage}`)
    }
}

export const signOut = async () => {
    return auth.signOut()
}

export const currentUser = () => {
    return auth.currentUser
}

export const onAuthStateChanged = (callback) => {
    auth.onAuthStateChanged(callback)
}
