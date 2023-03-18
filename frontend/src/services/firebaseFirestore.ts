import {
    collection,
    doc,
    setDoc,
    getFirestore,
    addDoc,
    serverTimestamp,
    getDoc,
    updateDoc
} from 'firebase/firestore';
import app from './firebaseApp';

import {
    uploadReportImage,
    uploadProfileImage
} from './firebaseStorage';

const db = getFirestore(app);

type LatLng = {
    latitude: Number,
    longitude: Number,
};

const addUser = async (uid: string, name: string, email: string) => {
    const usersRef = collection(db, 'users');
    const userRef = doc(usersRef, uid);
    await setDoc(userRef, {
        name,
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
        timestamp: serverTimestamp(),
        isResolved: false
    });

    const imageUrl = await uploadReportImage(reportRef.id, image);
    await updateDoc(reportRef, {
        imageUrl
    });

    return reportRef.id;
}

const updateProfileImage = async (uid: any, image: any) => {
    const imageUrl = await uploadProfileImage(uid, image);
    const userRef = doc(db, `users/${uid}`);
    await updateDoc(userRef, {
        imageUrl
    });
    return imageUrl;
}

const toggleResolvedStatus = async (id: string) => {
    const reportRef = doc(db, `reports/${id}`);
    const reportSnapshot = await getDoc(reportRef);
    if (reportSnapshot.exists()) {
        await updateDoc(reportRef, {
            isResolved: !reportSnapshot.data().isResolved
        });
    }
}

export {
    addUser,
    createReport,
    updateProfileImage,
    toggleResolvedStatus
}