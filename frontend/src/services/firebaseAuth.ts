import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from 'firebase/auth';
import { addUser } from './firebaseFirestore';

const auth = getAuth();

const signIn = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
}

const signUp = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await addUser(userCredential.user.uid, email);
    return userCredential.user;
}

export {
    auth,
    signIn,
    signUp
}
