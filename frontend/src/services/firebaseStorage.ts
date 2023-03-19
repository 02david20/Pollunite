import {
    getStorage,
    ref,
    uploadBytes,
    uploadString,
    getDownloadURL
} from 'firebase/storage';

const storage = getStorage();

const uploadReportImage = async (id: string, image: any): Promise<string> => {
    const imageRef = ref(storage, `report/${id}/image.png`);
    await uploadBytes(imageRef, image);
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
}

const uploadProfileImage = async (uid: any, image: any): Promise<string> => {
    const imageRef = ref(storage, `profile/${uid}/avatar.png`);
    await uploadBytes(imageRef, image);
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
}

export {
    uploadReportImage,
    uploadProfileImage
}
