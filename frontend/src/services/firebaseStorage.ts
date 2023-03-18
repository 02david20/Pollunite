import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
} from 'firebase/storage';

const storage = getStorage();

const uploadReportImage = async (id: string, image: File): Promise<string> => {
    const imageRef = ref(storage, `report/${id}/image.png`);
    await uploadBytes(imageRef, image);
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
}

const uploadProfileImage = async (uid: string, image: File): Promise<string> => {
    const imageRef = ref(storage, `profile/${uid}/avatar.png`);
    await uploadBytes(imageRef, image);
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
}

export {
    uploadReportImage,
    uploadProfileImage
}
