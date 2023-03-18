import * as React from 'react'
import { View, Text, Button } from 'react-native'
import { Marker } from 'react-native-maps'
import MapView from 'react-native-map-clustering'
import styles from './styles'
import { PROVIDER_GOOGLE } from 'react-native-maps'
import { useEffect, useState } from 'react'
import * as Location from 'expo-location'

const MapScreen = (): JSX.Element => {
    const [position, setPosition] = useState<any>({
        latitude: 100,
        longitude: 100,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })
    const [errorMsg, setErrorMsg] = useState<String>();
    const reports  = [
        {"latitude":10.8789364,"longitude":106.8098019},
        {"latitude":10.8749335,"longitude":106.8208019},
        {"latitude":10.8739366,"longitude":106.8108019},
        {"latitude":10.8789367,"longitude":106.8098019},
        {"latitude":12.8789364,"longitude":107.8098019},
        {"latitude":13.8789364,"longitude":102.8098019},
        {"latitude":20.8789364,"longitude":103.8098019},
        {"latitude":30.8789364,"longitude":104.8098019},
    ] 
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access location was denied')
            }else{
                try{
                    let location = await Location.getCurrentPositionAsync({});
                    setPosition({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    })
                }catch(e){
                    alert('We could not find your position. Please make sure your location service provider is on');
                    console.log('Error while trying to get location: ', e);
                }
            }
            })()
        ;
      }, []);


    let text:String = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (position) {
        text = JSON.stringify(position);
    } 
    

    return (
        <View style={styles.container}>
            <MapView
                provider = {PROVIDER_GOOGLE}
                initialRegion={position}
                style={styles.map}
                region = {position}
                mapType = "hybrid"
                showsMyLocationButton = {true}
            >
                
            {reports.map((report, index) => (
                <Marker coordinate={report} 
                        key = {index}>
                
                </Marker>
            ))}

            </MapView>
        </View>
    )
}

export default MapScreen