import React from 'react';
import MapComponent from './MapComponent';
import PointsGenerator from './PointsGenerator';

const App = () => {
  const cornerCoordinates = [
    [13.726997377681485, 79.59108966461423], // Top left corner
    [13.726997396204709, 79.59108997169879], // Top right corner
    [13.726998729932575, 79.59108997421589], // Bottom right corner
    [13.726998722522637, 79.59108966461423]  // Bottom left corner
  ];
  
  const distance = 0.000089748; // 10 cm = 0.000089748 degrees use kiya hai
  
  return (
    <div>
      {/* <h1>My Map Application</h1> */}
      <PointsGenerator cornerCoordinates={cornerCoordinates} distance={distance} />
      <MapComponent />
    </div>
  );
};

export default App;