import {
    collection,
    doc,
    setDoc,
    getFirestore,
    addDoc,
    serverTimestamp,
    getDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    query,
    where,
    getDocs
} from 'firebase/firestore';
import app from './firebaseApp';

import {
    uploadReportImage,
    uploadProfileImage,
    uploadResolveImage
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
        isResolved: false,
        upvote: []
    }
    
    const reportRef = await addDoc(reportsRef, data);
    const image = await toBlob(imagePath);
    
    const imageUrl = await uploadReportImage(reportRef.id, image);
    await updateDoc(reportRef, {
        imageUrl
    });

    return reportRef.id;
}

const createResolve = async ({
    uid, 
    name,
    avatarUrl, 
    imagePath,
    desc,
    lat,
    lng,
    clusterKey
}): Promise<string> => {
    const resolvesRef = collection(db, 'resolves');
    const data = {
        uid,
        name,
        avatarUrl,
        desc,
        lat,
        lng,
        clusterKey,
        timestamp: serverTimestamp(),
        confirm: []
    }
    
    const resolveRef = await addDoc(resolvesRef, data);
    const image = await toBlob(imagePath);
    
    const imageUrl = await uploadResolveImage(resolveRef.id, image);
    await updateDoc(resolveRef, {
        imageUrl
    });

    return resolveRef.id;
}

const getResolve = async (keys: any) => {
    const q = query(collection(db, 'resolves'), where("clusterKey", "in", keys));
    const querySnapshot = await getDocs(q);
    const res: any[] = [];
    querySnapshot.forEach(d => {
        const temp = d.data();
        temp.timestamp = temp.timestamp.toDate().toISOString().slice(0,10);
        res.push({
            id: d.id,
            ...temp
        });
    });
    return res;
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

const upvoteReport = async (id: string, uid: string) => {
    const reportRef = doc(db, `reports/${id}`);
    await updateDoc(reportRef, {
        upvote: arrayUnion(uid)
    });
}

const removeUpvoteReport = async (id: string, uid: string) => {
    const reportRef = doc(db, `reports/${id}`);
    await updateDoc(reportRef, {
        upvote: arrayRemove(uid)
    });
}

const confirmResolve = async (id: string, uid: string) => {
    const resolveRef = doc(db, `resolves/${id}`);
    await updateDoc(resolveRef, {
        confirm: arrayUnion(uid)
    });
}

const removeConfirmResolve = async (id: string, uid: string) => {
    const resolveRef = doc(db, `resolves/${id}`);
    await updateDoc(resolveRef, {
        confirm: arrayRemove(uid)
    });
}

export {
    addUser,
    createReport,
    updateProfileImage,
    toggleResolvedStatus,
    upvoteReport,
    removeUpvoteReport,
    uploadResolveImage,
    confirmResolve,
    removeConfirmResolve,
    createResolve,
    getResolve
}