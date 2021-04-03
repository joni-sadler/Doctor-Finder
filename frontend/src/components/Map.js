import React, { useState, useEffect } from "react";
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
  const [markers, setMarkers] = useState([]);
  const [originMarker, setOriginMarker] = useState({});
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

  const isLoaded = true;

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
