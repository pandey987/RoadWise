// PointsGenerator.jsx

function generatePointsInRegion(topLeft, topRight, bottomRight, bottomLeft, distance) {
    const points = [];
    
    let end = bottomLeft[0];
    let cur = topLeft[0];
    let long = topLeft[1];
    let rightendlat= topRight[0];
    while (cur <= end) {
      let x = cur;
      let ct = 0;
      let r=0;
      while (x <= rightendlat) {
          r++;
          x += distance;
      }
       x=cur;
      let fac=topRight[1]-topLeft[1];
      while (x <= rightendlat) {
          ct++;
          let temp = long + (ct * fac)/r;
          points.push({ latitude: x, longitude: temp });
          x += distance;
      }
      cur += distance;
    }
    
    return points;
  }
  
  export default function PointsGenerator({ cornerCoordinates, distance }) {
    const topLeft = cornerCoordinates[0];
    const topRight = cornerCoordinates[1];
    const bottomRight = cornerCoordinates[2];
    const bottomLeft = cornerCoordinates[3];
    
    const pointsInRegion = generatePointsInRegion(topLeft, topRight, bottomRight, bottomLeft, distance);
    console.log("hello");
    console.log(pointsInRegion);
    

    
    // Rendering the points here
    return (
      <div>
        {pointsInRegion.map((point, index) => (
          <div key={index}>
            Latitude: {point.latitude}, Longitude: {point.longitude}
          </div>
        ))}
      </div>
    );
  }
  