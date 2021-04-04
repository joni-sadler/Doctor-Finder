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

const CACHED_POINTS = {
  H2T3A2: { lat: 45.5260031, lng: -73.6084592 },
  H3A2B3: { lat: 45.50773, lng: -73.57914 },
  H2Y1C6: { lat: 45.50882, lng: -73.554138 },
  H2S3S3: { lat: 45.53646, lng: -73.61476 },
};

const Map = ({
  acceptingPatients,
  walkInClinics,
  appointmentClinics,
  clinics,
  postalCode,
}) => {
  const [markers, setMarkers] = useState([]);
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
    if (postalCode) {
      console.log(CACHED_POINTS);

      const cached_point = CACHED_POINTS[postalCode];
      if (cached_point) {
        console.log("using cached point");
        console.log(cached_point);
        setOriginPoint(cached_point);
      } else {
        console.log("network geocode request");
        fetch(
          `http://open.mapquestapi.com/geocoding/v1/address?key=H1yZSGy8Azm4pZPGPaBiul1tm6f9pmHK&location=${postalCode}`,
          {
            method: "GET",
          }
        )
          .then((res) => res.json())
          .then((res) => {
            const point = res.results[0].locations[0].latLng;
            console.log(point);
            CACHED_POINTS[postalCode] = point;
            setOriginPoint(point);
          });
      }
    }
  }, [postalCode]);

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

  return (
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
                <Popup>
                  {marker.clinicName} <br /> {marker.clinicAddress}
                </Popup>
              </Marker>
            </div>
          );
        })}
        {originPoint.lat && (
          <Marker position={[originPoint.lat, originPoint.lng]}>
            <Popup>Your location</Popup>
          </Marker>
        )}
      </MapContainer>
    </MapWrapper>
  );
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

export default Map;
