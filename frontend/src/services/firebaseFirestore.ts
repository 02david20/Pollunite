import {
    collection,
    doc,
    setDoc,
    getFirestore
} from 'firebase/firestore';
import app from './firebaseApp';

const db = getFirestore(app);

const addUser = async (uid: string, email: string) => {
    const usersRef = collection(db, 'users');
    const userRef = doc(usersRef, uid);
    await setDoc(userRef, {
        email,
    });
    return userRef;
}

export {
    addUser
}