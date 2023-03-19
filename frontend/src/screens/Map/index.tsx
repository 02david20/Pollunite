import * as React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import {
  collection,
  doc,
  DocumentData,
  getFirestore,
  limit,
  onSnapshot,
  query,
  QuerySnapshot,
} from "firebase/firestore";
import { auth } from "../../services/firebaseAuth";
import { LocationGeofencingEventType } from "expo-location";
import { returnMarkerStyle } from "./helper";
import { markerStyles, styles } from "./styles";
import Modal from "react-native-modal";
import CustomButton from "../../components/CustomButton";
import { LogBox } from "react-native";
import { useNavigation } from "@react-navigation/native";

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

  const [locations, setLocations] = useState<any>();
  const [reports, setReports] = useState<any>();
  const [locationClick, setLocationClick] = useState<number[]>();

  useEffect(() => {
    onSnapshot(
      query(collection(getFirestore(), "reports")),
      (querySnapshot) => {
        let temp: any = [];
        querySnapshot.forEach((report) =>
          temp.push({
            ...report.data(),
            id: report.id,
          })
        );

        setReports(temp);
        setLocations(
          temp.map((report: any) => ({
            latitude: report.lat,
            longitude: report.lng,
          }))
        );
      }
    );
  }, []);

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

  const navigation = useNavigation();
  const handleRegionChangeComplete = (region: any) => {
    return;
  };
  const getClusterMarkersResolved = (cluster) => {
    const cluster_id = cluster.properties.cluster_id;
    let markers = superRef.current?.getLeaves(cluster_id);
    let data;

    markers = markers
      ?.map((elem: any, index) => elem.geometry.coordinates)
      .map((elem) => ({
        latitude: elem[1],
        longitude: elem[0],
      }));
    data = reports.filter((elem) =>
      markers.some(
        (marker) => marker.latitude == elem.lat && marker.longitude == elem.lng
      ) && elem.isResolved
    );
    return data.length
  }

  const handleRenderCluster = (cluster: any) => {
    const { id, geometry, onPress, properties } = cluster;
    const points = properties.point_count;
    const resolved = getClusterMarkersResolved(cluster)
    const ratio = resolved/points;
    let clusterColor;
    if(ratio <= 0.5) {
      clusterColor = "red";
    }else if(0.5 < ratio && ratio <= 0.8) {
      clusterColor = "orange";
    }else {
      clusterColor = "green";
    }
    const clusterTextColor = "white";
    const { width, height, fontSize, size } = returnMarkerStyle(points);
    return (
      <Marker
        key={`cluster-${id}`}
        coordinate={{
          longitude: geometry.coordinates[0],
          latitude: geometry.coordinates[1],
        }}
        style={{ zIndex: points + 1 }}
        onPress={onPress}
      >
        <TouchableOpacity
          activeOpacity={0.5}
          style={[markerStyles.container, { width, height }]}
        >
          <View
            style={[
              markerStyles.wrapper,
              {
                backgroundColor: clusterColor,
                width,
                height,
                borderRadius: width / 2,
              },
            ]}
          />
          <View
            style={[
              markerStyles.cluster,
              {
                backgroundColor: clusterColor,
                width: size,
                height: size,
                borderRadius: size / 2,
              },
            ]}
          >
            <Text
              style={[
                markerStyles.text,
                {
                  color: clusterTextColor,
                  fontSize,
                },
              ]}
            >
              {points}
            </Text>
          </View>
        </TouchableOpacity>
      </Marker>
    );
  };

  const handleOnClusterPress = async (cluster: any) => {
    await setLocationClick(cluster.geometry.coordinates);
    await toggleModal();

    const cluster_id = cluster.properties.cluster_id;
    let markers = superRef.current?.getLeaves(cluster_id);
    let data;

    markers = markers
      ?.map((elem: any, index) => elem.geometry.coordinates)
      .map((elem) => ({
        latitude: elem[1],
        longitude: elem[0],
      }));
    data = reports.filter((elem) =>
      markers.some(
        (marker) => marker.latitude == elem.lat && marker.longitude == elem.lng
      )
    );

    console.log(data.length);
  };
  const handleOnMarkerPress = async (marker: any, report: any) => {
    await setLocationClick([report["latitude"], report["longitude"]]);
    toggleModal();
    const data = [report]
    console.log(data.length);
    
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
        minZoom={18}
        maxZoom={20}
        maxZoomLevel={18}
        minPoints={2}
        radius={60}
        onRegionChangeComplete={handleRegionChangeComplete}
        superClusterRef={superRef}
        showsScale={true}
        onClusterPress={handleOnClusterPress}
        renderCluster={handleRenderCluster}
      >
        {locations &&
          locations.map((report: any, index: number) => (
            <Marker
              key={index}
              coordinate={report}
              onPress={(e) => handleOnMarkerPress(e, report)}
            ></Marker>
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
                navigation.navigate("ViewArea", locationClick);
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
