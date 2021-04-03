import React, { useState, useEffect } from "react";
// import {
//   GoogleMap,
//   useJsApiLoader,
//   Marker,
//   InfoWindow,
// } from "@react-google-maps/api";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import styled from "styled-components";
import {
  onSmallPhoneMediaQuery,
  onDesktopMediaQuery,
  onTabletMediaQuery,
} from "../utils/responsive";

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
  // const { isLoaded, loadError } = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: process.env.REACT_APP_MAP_KEY,
  // });

  const [markers, setMarkers] = useState([]);
  const [originMarker, setOriginMarker] = useState({});
  const [infoWindowMarker, setInfoWindowMarker] = useState(null);
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [originPoint, setOriginPoint] = useState({});

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

  // if (loadError) {
  //   console.log(loadError);
  //   return;
  // }

  const isLoaded = true;

  const onClickMapHandler = (marker) => {
    console.log(marker.clinicName);
    setInfoWindowMarker(marker);
    setShowingInfoWindow(true);
  };

  if (clinics) {
    clinics.forEach((clinic) => {
      clinicCoordinates.push({ latitude: clinic.lat, longitude: clinic.lng });
    });
  }

  if (walkInClinics) {
    walkInClinics.forEach((clinic) => {
      clinicCoordinates.push({ latitude: clinic.lat, longitude: clinic.lng });
    });
  }

  if (appointmentClinics) {
    appointmentClinics.forEach((clinic) => {
      clinicCoordinates.push({ latitude: clinic.lat, longitude: clinic.lng });
    });
  }

  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  return isLoaded ? (
    <MapWrapper>
      {/* <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        {infoWindowMarker && (
          <InfoWindow
            position={{
              lat: Number(infoWindowMarker.lat),
              lng: Number(infoWindowMarker.lng),
            }}
            visible={showingInfoWindow}
            onCloseClick={() => setInfoWindowMarker(null)}
            options={{
              pixelOffset: new window.google.maps.Size(0, -30),
            }}
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
      </GoogleMap> */}
      <MapContainer center={[45.51, -73.65]} zoom={12} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />{" "}
        {markers.map((marker) => {
          return (
            <div>
              <Marker position={[Number(marker.lat), Number(marker.lng)]}>
                <Popup>{marker.clinicName}</Popup>
              </Marker>
            </div>
          );
        })}
      </MapContainer>
    </MapWrapper>
  ) : null;
};

const MapWrapper = styled.div`
  height: 500px;
  position: relative;
  & *:focus {
    outline: none;
  }
  ${onTabletMediaQuery()} {
    height: 50%;
  }
  ${onSmallPhoneMediaQuery()} {
    height: 70%;
    overflow: hidden;
  }
`;

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
