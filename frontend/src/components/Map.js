import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  FeatureGroup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import styled from "styled-components";

// Cached points used for testing to minimize requests to the map
const CACHED_POINTS = {
  H2T3A2: { lat: 45.5260031, lng: -73.6084592 },
  H3A2B3: { lat: 45.50773, lng: -73.57914 },
  H2Y1C6: { lat: 45.50882, lng: -73.554138 },
  H2S3S3: { lat: 45.53646, lng: -73.61476 },
};

// acceptingPatients, walkInClinics, appointmentClinics, clinics, and postalCode can all passed in as props depending on which page the map appears on
const Map = ({
  acceptingPatients,
  walkInClinics,
  appointmentClinics,
  clinics,
  postalCode,
}) => {
  const [markers, setMarkers] = useState([]);
  const [originPoint, setOriginPoint] = useState([]);

  // Set empty array that will store coordinates of the relevant clinics
  const clinicCoordinates = [];

  // Set markers based on varying clinic criteria (accepts walk-ins, accepts new patients, etc)
  useEffect(() => {
    if (walkInClinics) {
      setMarkers(walkInClinics);
      return markers;
    }
  }, [walkInClinics, markers]);

  useEffect(() => {
    if (acceptingPatients) {
      setMarkers(acceptingPatients);
      return markers;
    }
  }, [acceptingPatients, markers]);

  useEffect(() => {
    if (appointmentClinics) {
      setMarkers(appointmentClinics);
      return markers;
    }
  }, [appointmentClinics, markers]);

  useEffect(() => {
    if (clinics) {
      setMarkers(clinics);
      return markers;
    }
  }, [clinics, markers]);

  // Check to see if postal code the user enters is already stored in the cache
  // If not, retrieve the coordinates from Open Mapquest API and use them to set origin point to display location on map
  useEffect(() => {
    if (postalCode) {
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

  // Push relevant lat and lng positions into clinicCoordinates array based on which clinics are being queried
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

  // Specify icon for map marker
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  // Set red fill to indicate user location
  const fillRedOptions = { color: "red", fillColor: "red" };

  return (
    <MapWrapper>
      <MapContainer center={[45.49, -73.6]} zoom={12} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />{" "}
        {originPoint.lat && (
          <FeatureGroup pathOptions={fillRedOptions}>
            <Popup>Your location</Popup>
            <Circle
              center={originPoint}
              pathOptions={fillRedOptions}
              radius={100}
            />
          </FeatureGroup>
        )}
        {markers.length > 0 && (
          <div>
            {markers.map((marker) => {
              return (
                <FeatureGroup key={marker._id}>
                  <Popup>
                    <div style={popupContent}>
                      {marker.clinicName}
                      <br /> {marker.clinicAddress}
                    </div>
                  </Popup>
                  <Marker position={[marker.lat, marker.lng]}></Marker>
                </FeatureGroup>
              );
            })}
          </div>
        )}
      </MapContainer>
    </MapWrapper>
  );
};

const MapWrapper = styled.div`
  height: 100%;
  position: relative;
  & *:focus {
    outline: none;
  }
`;

const popupContent = {
  textAlign: "center",
  height: "35px",
};

export default Map;
