import React, {useState, useEffect} from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import styled from "styled-components";

const containerStyle = {
  width: '100%',
  height: '100%'
};


const Map = ({acceptingPatients, walkInClinics, appointmentClinics, clinics}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAP_KEY,
  })

  const [markers, setMarkers] = useState([])
  const [infoWindowMarker, setInfoWindowMarker] = useState(null);
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);

 
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

  if (loadError) {
    console.log(loadError);
    return;
  }

  // const divStyle = {
  //   background: `white`,
  //   border: `1px solid #ccc`,
  //   padding: 15
  // }

  const onClickMapHandler = (marker) => {
    console.log(marker.clinicName);
    setInfoWindowMarker(marker);
    setShowingInfoWindow(true);
  }

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >

      {infoWindowMarker && 
        <InfoWindow
          position={{lat: Number(infoWindowMarker.lat), lng: Number(infoWindowMarker.lng)}}
          visible={showingInfoWindow}
          onCloseClick={() => setInfoWindowMarker(null)}
          options={{pixelOffset: new window.google.maps.Size(0,-30)}}
        >
          {/* <div style={divStyle}> */}
          <InfoWindowContainer>
            <p>{infoWindowMarker.clinicName}</p>
            <p>{infoWindowMarker.clinicAddress}</p>
          </InfoWindowContainer>

          {/* </div> */}
        </InfoWindow>
      }

        {markers.map((marker) => {
          return (
            <div>
              <Marker
                position={{lat: Number(marker.lat), lng: Number(marker.lng)}}
                onClick={(() => onClickMapHandler(marker))}
              />
            </div>
          )
        })}

        <></>
      </GoogleMap>
  ) : <></>
}

const InfoWindowContainer = styled.div`
  text-align: center;
  background: white;
  padding: 0px;
  margin: 0px;
`;

// export default React.memo(Map);
export default Map;
