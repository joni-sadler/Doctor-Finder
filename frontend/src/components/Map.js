import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import styled from "styled-components";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const Map = ({
  acceptingPatients,
  walkInClinics,
  appointmentClinics,
  clinics,
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_MAP_KEY,
  });

  const [markers, setMarkers] = useState([]);
  const [infoWindowMarker, setInfoWindowMarker] = useState(null);
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [userPosition, setUserPosition] = useState({});

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
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            console.log(result.state);
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
          result.onchange = function () {
            console.log(result.state);
          };
        });
    } else {
      alert("Sorry Not available!");
    }
  }, []);

  function geoFindMe() {
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const mapLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      console.log(`Latitude: ${latitude} °, Longitude: ${longitude} °`);
      console.log(mapLink);
    }
    function error(err) {
      console.log(err);
      console.log("Unable to retrieve your location");
    }
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      console.log("Locating…");
      var options = {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 1000000,
      };
      navigator.geolocation.getCurrentPosition(success, error, options);
    }
  }

  console.log(navigator);

  navigator.geolocation.getCurrentPosition((position) => console.log(position));

  function success(position) {
    console.log(position);
  }

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

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

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onClick={geoFindMe}
    >
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
