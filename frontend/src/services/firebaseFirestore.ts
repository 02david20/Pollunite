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
import { toBlob } from './imageService';

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

const createReport = async ({
    uid, 
    name,
    avatarUrl, 
    imagePath,
    desc,
    lat,
    lng, 
    tags,
}): Promise<string> => {
    const reportsRef = collection(db, 'reports');
    const data = {
        uid,
        name,
        avatarUrl,
        desc,
        lat,
        lng,
        tags,
        timestamp: serverTimestamp(),
        isResolved: false
    }
    
    const reportRef = await addDoc(reportsRef, data);
    const image = await toBlob(imagePath);
    
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