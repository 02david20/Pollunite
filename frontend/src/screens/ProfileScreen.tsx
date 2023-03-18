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
import { View, Pressable } from 'react-native';
import {
    Text,
    TextInput,
    Avatar
} from "@react-native-material/core";
import * as ImagePicker from 'expo-image-picker';
import { updateProfileImage } from '../services/firebaseFirestore'

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

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
        });

        if (!result.canceled) {
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function() {
                  resolve(xhr.response);
                };
                xhr.onerror = function(e) {
                  console.log(e);
                  reject(new TypeError('Network request failed'));
                };
                xhr.responseType = 'blob';
                xhr.open('GET', result.assets![0]?.uri, true);
                xhr.send(null);
            });
            
            updateProfileImage(currentUser?.uid, blob);
        }
    };

    return (
        <View style={{
            marginTop: 300,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            rowGap: 25
        }}>
            <Pressable onPress={pickImage}>
                <Avatar
                    image={!profile?.imageUrl? require("../../assets/imgs/avatar.png") : { uri: profile?.imageUrl }}
                    size={150} 
                />
            </Pressable>
            <Text style={{fontStyle: 'italic'}}>Touch to change avatar</Text>
            <View style={{
                flex: 1,
                width: "80%",
                justifyContent: 'flex-start',
                alignItems: 'stretch',
                rowGap: 10
            }}>
                <TextInput 
                    variant="standard" 
                    label="Email" 
                    style={{ width: "100%" }} 
                    value={profile?.email}
                    editable={false} 
                />
                <TextInput 
                    variant="standard" 
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