import * as React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import MapView from "react-native-map-clustering";
import { Marker, Callout } from "react-native-maps";
import styles from "./styles";
import { PROVIDER_GOOGLE } from "react-native-maps";
import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import Modal from "react-native-modal";
import CustomButton from "../../components/CustomButton";

import { LogBox } from "react-native";

// Ignore log notification by message
LogBox.ignoreLogs(["Warning: ..."]);

//Ignore all log notifications
LogBox.ignoreAllLogs();

const MapScreen = (): JSX.Element => {
  const mapRef = useRef();
  const superRef = useRef();
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [position, setPosition] = useState<any>({
    latitude: 50,
    longitude: 50,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [locationClick, setLocationClick] = useState<number[]>();
  const [zoom, setZoom] = useState<number>();
  const [errorMsg, setErrorMsg] = useState<String>();
  const [reports, setReports] = useState([
    { latitude: 10.8757936, longitude: 106.8091124 },
    { latitude: 10.8758056, longitude: 106.8090912 },
    { latitude: 10.8749335, longitude: 106.8208019 },
    { latitude: 10.8739366, longitude: 106.8108019 },
    { latitude: 10.8739466, longitude: 106.8108019 },
    { latitude: 10.8789367, longitude: 106.9098019 },
    { latitude: 10.8789367, longitude: 106.9098019 },
    { latitude: 10.8789367, longitude: 106.9098019 },
    { latitude: 10.8799367, longitude: 106.8098019 },
    { latitude: 12.8789364, longitude: 107.8098019 },
    { latitude: 12.8989364, longitude: 107.8098019 },
    { latitude: 13.8789364, longitude: 102.8098019 },
    { latitude: 20.8789364, longitude: 103.8098019 },
    { latitude: 30.8789364, longitude: 104.8098019 },
  ]);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        alert("Permission to access location was denied");
      } else {
        try {
          let location = await Location.getCurrentPositionAsync({});

          setPosition({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        } catch (e) {
          alert(
            "We could not find your position. Please make sure your location service provider is on"
          );
          console.log("Error while trying to get location: ", e);
        }
      }
    })();
  }, []);

  const handleRegionChangeComplete = (region: any) => {
    return;
  };

  let marker1: any;
  const handleOnClusterPress = async (cluster: any) => {
    
    await setLocationClick(cluster.geometry.coordinates);
    await toggleModal();
    await console.log(cluster);
  };
  const handleOnMarkerPress = async (marker: any) => {
    console.log(marker);
    const p = await superRef.current!.points[0].geometry.coordinates;
    await setLocationClick(p);
    toggleModal();
  };
  return (
    <>
      {/* <GooglePlacesAutocomplete 
        placeholder="Enter Location" 
        minLength={2} 
        fetchDetails={true} 
        query={{ 
          key: "AIzaSyBXCLq-NHW-3e66Mhhthq3d5KgVS0C96oc", 
          language: "vi" 
        }} 
      /> */}
      <MapView
        initialRegion={position}
        style={{ flex: 1 }}
        mapType="hybrid"
        region={position}
        showsUserLocation={true}
        minZoom={20}
        maxZoom={20}
        maxZoomLevel={18}
        minPoints={2}
        radius={60}
        //onRegionChangeComplete={handleRegionChangeComplete}
        superClusterRef={superRef}
        showsScale={true}
        onClusterPress={handleOnClusterPress}
        //onMarkerPress={handleOnMarkerPress}

      >
        {reports.map((report: any, index: number) => (
          <Marker key={index} coordinate={report} ={handleOnMarkerPress}></Marker>
        ))}
      </MapView>
      <Modal
        testID={"modal"}
        isVisible={isModalVisible}
        /* onSwipeComplete={toggleModal} */
        swipeDirection={["up", "left", "right", "down"]}
        style={styles.view}
      >
        <View className="p-3 flex-col pt-auto bg-white items-center">
          {locationClick && (
            <View className="flex-col items-center">
              <Text className="text-2xl font-bold mb-4">Location</Text>
              <Text className="text-md font-light mb-4">
                Latitude: {locationClick[0]}
              </Text>
              <Text className="text-md font-light mb-4">
                Longitude: {locationClick[1]}
              </Text>
            </View>
          )}
          <View className="flex-row space-between items-center align-center mt-5">
            <CustomButton
              label="View Detail"
              onPress={() => {
                alert(
                  "Your giftcode is being sent to your email.This may take 5 minutes or more"
                );
              }}
            />
            <CustomButton label="Close" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default MapScreen;
