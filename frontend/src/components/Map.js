import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Geocode from "react-geocode";
import styled from "styled-components";

// const sortByDistance = require("sort-by-distance");

const containerStyle = {
  width: "100%",
  height: "100%",
};

const Map = ({
  acceptingPatients,
  walkInClinics,
  appointmentClinics,
  clinics,
  postalCode,
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_MAP_KEY,
  });

  Geocode.setApiKey(process.env.REACT_APP_GEOCODING_API_KEY);

  const [markers, setMarkers] = useState([]);
  const [originMarker, setOriginMarker] = useState({});
  const [infoWindowMarker, setInfoWindowMarker] = useState(null);
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [originPoint, setOriginPoint] = useState({});
  // const [clinicCoordinates, setClinicCoordinates] = useState([]);
  const [closestClinic, setClosestClinic] = useState([]);

  const clinicCoordinates = [];

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
      setMarkers(appointmentClinics);
      return markers;
    }
  }, [appointmentClinics]);

  useEffect(() => {
    if (clinics) {
      setMarkers(clinics);
      return markers;
    }
  }, [clinics]);

  useEffect(() => {
    if (originPoint) {
      setOriginMarker(originPoint);
      return originMarker;
    }
  }, [originPoint]);

  const center = {
    lat: 45.522944,
    lng: -73.603893,
  };

  if (loadError) {
    console.log(loadError);
    return;
  }

  const onClickMapHandler = (marker) => {
    console.log(marker.clinicName);
    setInfoWindowMarker(marker);
    setShowingInfoWindow(true);
  };

  Geocode.fromAddress(postalCode).then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      setOriginPoint({ latitude: lat, longitude: lng });
    },
    (error) => {
      console.error(error);
    }
  );

  clinics.forEach((clinic) => {
    clinicCoordinates.push({ latitude: clinic.lat, longitude: clinic.lng });
  });

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
      {infoWindowMarker && (
        <InfoWindow
          position={{
            lat: Number(infoWindowMarker.lat),
            lng: Number(infoWindowMarker.lng),
          }}
          visible={showingInfoWindow}
          onCloseClick={() => setInfoWindowMarker(null)}
          options={{ pixelOffset: new window.google.maps.Size(0, -30) }}
        >
          <InfoWindowContainer>
            <InfoWindowText>{infoWindowMarker.clinicName}</InfoWindowText>
            <InfoWindowText>{infoWindowMarker.clinicAddress}</InfoWindowText>
          </InfoWindowContainer>
        </InfoWindow>
      )}

      {originPoint && (
        <Marker
          position={{
            lat: Number(originPoint.latitude),
            lng: Number(originPoint.longitude),
          }}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          }}
        />
      )}

      {markers.map((marker) => {
        return (
          <div>
            <Marker
              position={{ lat: Number(marker.lat), lng: Number(marker.lng) }}
              onClick={() => onClickMapHandler(marker)}
            />
          </div>
        );
      })}

      <></>
    </GoogleMap>
  ) : (
    <></>
  );
};

const InfoWindowContainer = styled.div`
  text-align: center;
  background: white;
  padding: 0px;
  margin: 0px;
`;

const InfoWindowText = styled.p`
  font-size: 12px;
  font-weight: 400;
`;

export default Map;
