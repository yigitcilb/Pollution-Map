import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./styles/mapView.css";
import pollutionicon from  "./images/pollution.jpg"
import { useEffect, useState, useContext } from "react";
import L from "leaflet";
import "leaflet.heat";
import { PollutionDataContext } from './pollContext';

 

const mapView = () => {
  const position = [41.0851, 29.0444]; 
  const [heatmapData, setHeatmapData] = useState([]); 
  const { polData, addPolData, deletePoldata } = useContext(PollutionDataContext);
  const [locations, setLocations] = useState([]);
  const normalize = (value, min, max) => {
    return (value - min) / (max - min);
  };

  const minMaxValues = {
    PM2: { min: 0, max: 500 },
    PM10: { min: 0, max: 500 },
    NO2: { min: 0, max: 400 },
    SO2: { min: 0, max: 100 },
    O3: { min: 0, max: 200 },
  };



useEffect(() => {
    const newLocations = polData.map((data, index) => {
        const MP2 = data.MP2 ?? 0;
        const MP10 = data.MP10 ?? 0;
        const NO2 = data.NO2 ?? 0;
        const SO2 = data.SO2 ?? 0;
        const O3 = data.O3 ?? 0;
        const normalizedPM2 = normalize(data.PM2, minMaxValues.PM2.min, minMaxValues.PM2.max);
        const normalizedPM10 = normalize(data.PM10, minMaxValues.PM10.min, minMaxValues.PM10.max);
        const normalizedNO2 = normalize(data.NO2, minMaxValues.NO2.min, minMaxValues.NO2.max);
        const normalizedSO2 = normalize(data.SO2, minMaxValues.SO2.min, minMaxValues.SO2.max);
        const normalizedO3 = normalize(data.O3, minMaxValues.O3.min, minMaxValues.O3.max);
        const heatvalue = (normalizedPM2 + normalizedPM10 + normalizedO3 + normalizedSO2 + normalizedNO2)/5;

        return {
            position: [data.lat, data.long],
            popup: `Marker ${index + 1}`,
            MP2, MP10, NO2, SO2, O3,
            heatvalue
        };
        
        
    });
    setLocations(newLocations);
    const tempListe = [];


    for (let i = 0; i < newLocations.length; i++) {
        tempListe.push([parseFloat(newLocations[i].position[0]), parseFloat(newLocations[i].position[1]), newLocations[i].heatvalue]);
    }
    console.log(tempListe);
    var data = {
        max: 1,
        data: tempListe
    };
    setHeatmapData(data);

}, [polData]);


  const customIcon = new L.Icon({
    iconUrl: pollutionicon, 
    iconSize: [20, 20], 
    iconAnchor: [15, 30], 
    popupAnchor: [0, -30], 
    className: "pollution-icon"
  });

  
  return (
    <MapContainer center={position} zoom={13} className="map-container">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {heatmapData.length > 0 && (
        <L.heatLayer data={heatmapData} radius={25} blur={15} maxZoom={17} />
      )}

      {locations.map((loc, index) => (
        <Marker key={index} position={loc.position} icon={customIcon}>
          <Popup>{loc.popup}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};


export default mapView;