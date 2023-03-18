import * as React from 'react'
import { View, Text, Button } from 'react-native'
import MapView from 'react-native-map-clustering'
import { Marker } from 'react-native-maps'
import styles from './styles'
import { PROVIDER_GOOGLE } from 'react-native-maps'
import { useEffect, useRef, useState } from 'react'
import * as Location from 'expo-location'



const MapScreen = (): JSX.Element => {
    const mapRef = useRef();
    const superRef = useRef();
    const [position, setPosition] = useState<any>({
        latitude: 50,
        longitude: 50,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })
    const [zoom, setZoom] = useState<number>();
    const [errorMsg, setErrorMsg] = useState<String>();
    const [reports, setReports] = useState([
        {"latitude":10.8757936,"longitude":106.8091124},
        {"latitude":10.8758056,"longitude":106.8090912},
        {"latitude":10.8749335,"longitude":106.8208019},
        {"latitude":10.8739366,"longitude":106.8108019},{"latitude":10.8739466,"longitude":106.8108019},
        {"latitude":10.8789367,"longitude":106.9098019},
        {"latitude":10.8789367,"longitude":106.9098019},
        {"latitude":10.8789367,"longitude":106.9098019},
        {"latitude":10.8799367,"longitude":106.8098019},
        {"latitude":12.8789364,"longitude":107.8098019},
        {"latitude":12.8989364,"longitude":107.8098019},
        {"latitude":13.8789364,"longitude":102.8098019},
        {"latitude":20.8789364,"longitude":103.8098019},
        {"latitude":30.8789364,"longitude":104.8098019},
    ]) 
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

    const handleRegionChangeComplete = (region:any) => {
        return;
        
    }

    const handleOnClusterPress = (cluster:any) => {
        console.log(cluster);
        
    }

    return (
        <>
            <MapView 
                initialRegion={position} 
                style={{ flex: 1 }}
                mapType = "hybrid"
                region={position}
                showsUserLocation = {true}
                minZoom = {20}
                maxZoom = {20}
                maxZoomLevel = {18}
                minPoints = {2}
                radius = {60}
                onRegionChangeComplete = {handleRegionChangeComplete}
                superClusterRef = {superRef}
                showsScale = {true}
                onClusterPress = {handleOnClusterPress}
            >

                {
                    reports.map((report:any, index:number) => (
                        <Marker
                            key = {index} 
                            coordinate={report} 
                        >
                            
                        </Marker>
                    ))
                }
            </MapView>
        </>

    )
}

export default MapScreen

