import { useEffect, useState } from 'react';
import {
    onSnapshot,
    doc,
    getFirestore,
    DocumentData
} from 'firebase/firestore';
import {
    auth
} from '../services/firebaseAuth';
import { View } from 'react-native';
import {
    Text,
    TextInput,
    Avatar
} from "@react-native-material/core";

const ProfileScreen = (): JSX.Element => {
    const [profile, setProfile] = useState<DocumentData|undefined>({});

    const db = getFirestore();
    const currentUser = auth.currentUser;

    useEffect(() => {
        const profileRef = doc(db, `users/${currentUser?.uid}`);
        onSnapshot(profileRef, (profileSnapshot) => {
            const data = profileSnapshot.data();
            setProfile(data);
        })
    }, []);

    return (
        <View style={{
            marginTop: 300,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            rowGap: 25
        }}>
            <Avatar
                image={!profile?.imageUrl? require("../../assets/imgs/avatar.png") : { uri: profile?.imageUrl }}
            />
            <View style={{
                flex: 1,
                width: "80%",
                justifyContent: 'flex-start',
                alignItems: 'stretch',
                rowGap: 10
            }}>
                <TextInput 
                    variant="outlined" 
                    label="Email" 
                    style={{ width: "100%" }} 
                    value={profile?.email}
                    editable={false} 
                />
                <TextInput 
                    variant="outlined" 
                    label="Name" 
                    style={{ width: "100%" }} 
                    value={profile?.name}
                    editable={false} 
                />
            </View>
        </View>
    )
}

export default ProfileScreen;
