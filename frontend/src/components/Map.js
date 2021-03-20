import React, {useState, useEffect} from 'react'
import styled from "styled-components";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';


const containerStyle = {
  width: '100%',
  height: '100%'
};


const Map = ({acceptingPatients, walkInClinics, appointmentClinics, clinics}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAP_KEY,
  })

  const [map, setMap] = useState(null)
  const [markers, setMarkers] = useState([])

 
  useEffect(() => {
    if (walkInClinics) {
      setMarkers(walkInClinics);
      return markers;
    }
  }, [walkInClinics]);


  useEffect(() => {
    if (acceptingPatients) {
      setMarkers(acceptingPatients);
      return markers;
    }
  }, [acceptingPatients]);


  useEffect(() => {
    if (appointmentClinics) {
      setMarkers(appointmentClinics)
      return markers;
    }
  }, [appointmentClinics]);

  
  useEffect(() => {
    if (clinics) {
      setMarkers(clinics)
      return markers;
    }
  }, [clinics]);

  
  const center = {
    lat: 45.522944,
    lng: -73.603893,
  };
  
  // const position = {
  //   lat: 45.522944,
  //   lng: -73.603893,
  // }

  // const onLoad = React.useCallback(function callback(map) {
  //   const bounds = new window.google.maps.LatLngBounds();
  //   map.fitBounds(bounds);
  //   setMap(map)
  // }, [])

  // const onUnmount = React.useCallback(function callback(map) {
  //   setMap(null)
  // }, [])

  if (loadError) {
    console.log(loadError);
    return;
  }

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        // onLoad={onLoad}
        // onUnmount={onUnmount}
      >

        {markers.map((marker) => {
          return (
            <Marker
            position={{lat: Number(marker.lat), lng: Number(marker.lng)}}
          />
          )
        })}

        <></>
      </GoogleMap>
  ) : <></>
}


// export default React.memo(Map);
export default Map;
