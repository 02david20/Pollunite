import {
    collection,
    doc,
    setDoc,
    getFirestore,
    addDoc,
    serverTimestamp
} from 'firebase/firestore';
import app from './firebaseApp';

import {
    uploadReportImage
} from './firebaseStorage';

const db = getFirestore(app);

type LatLng = {
    latitude: Number,
    longitude: Number,
};

const addUser = async (uid: string, email: string) => {
    const usersRef = collection(db, 'users');
    const userRef = doc(usersRef, uid);
    await setDoc(userRef, {
        email,
    });
    return userRef;
}

const createReport = async (
    uid: string, 
    userName: string, 
    image: File, 
    location: LatLng, 
    tag: [string]
    ): Promise<string> => {
    const reportsRef = collection(db, 'reports');
    const reportRef = await addDoc(reportsRef, {
        uid,
        userName,
        location,
        tag,
        timestamp: serverTimestamp()
    });

    const imageUrl = await uploadReportImage(reportRef.id, image);
    await setDoc(reportRef, {
        imageUrl
    });

    return reportRef.id;
}

export {
    addUser,
    createReport
}