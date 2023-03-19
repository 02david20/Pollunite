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
  onSnapshot,
  query,
  QuerySnapshot,
} from "firebase/firestore";
import { auth } from "../../services/firebaseAuth";
import { LocationGeofencingEventType } from "expo-location";
import { returnMarkerStyle } from "./helper";
import {markerStyles} from "./styles";


const MapScreen = (): JSX.Element => {
  const mapRef = useRef();
  const superRef = useRef();

  const [position, setPosition] = useState<any>({
    latitude: 50,
    longitude: 50,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [zoom, setZoom] = useState<number>();
  const [locations, setLocations] = useState<any>();
  const [reports, setReports] = useState<any>();


  useEffect(() => {
    onSnapshot(
      query(collection(getFirestore(), "reports")),
      (querySnapshot) => {
        let temp: any = [];
        querySnapshot.forEach((report) => temp.push(Object.create({
          ...report.data(),
          id: report.id
        })));

        setReports(temp);
        setLocations(
          temp.map((report: any) =>
            Object.create({
              latitude: report.lat,
              longitude: report.lng,
            })
          )
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

  const handleRegionChangeComplete = (region: any) => {
    return;
  };

  const handleOnClusterPress = (cluster: any) => {
    const clusters = superRef.current!.getClusters([-180, -85, 180, 85], 20);
  };

  const handleRenderCluster = (cluster: any) => {
    const { id, geometry, onPress, properties } = cluster;
    const points = properties.point_count;
    const clusterColor = "red";
    const clusterTextColor = "white";
    const { width, height, fontSize, size } = returnMarkerStyle(points);
    return (
      <Marker
        key={`cluster-${id}`}
        coordinate={{
          longitude: geometry.coordinates[0],
          latitude: geometry.coordinates[1]
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
            <Marker key={index} coordinate={report}></Marker>
          ))}
      </MapView>
    </>
  );
};

export default MapScreen;
