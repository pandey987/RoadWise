import React, { useEffect,useState } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj'; // Import fromLonLat function
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature'; 
import Point from 'ol/geom/Point'; // Import Point class
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { useGeographic } from 'ol/proj'; // Import useGeographic function
import Button from './Button';
import { set } from 'ol/transform';

const  MapComponent = () => {
  
  const [clickedCoordinates, setClickedCoordinates] = useState([]);
  const [roadCoordinates, setroadCoordinates] = useState([]);
  const [finalCoordinates, setfinalCoordinates] = useState([]);
  const  [pointss, setPoints] = useState([]);
  const [arr, setArray] = useState(0);
  const [pointalt, setPointalt] = useState([]);
  const [pathtoprint, setPathtoprint] = useState([]);
  const [distance,setDistance] = useState([]);
  // Call useGeographic() to configure OpenLayers for [longitude, latitude] coordinates

  function findLeastCostPath2(map, clickedCoordinates, roadCoordinates, finalCoordinate,curr_i,curr_j,target_i,target_j) {
    
    class PriorityQueue {
      constructor() {
        this.queue = [];
      }
    
      enqueue(element, priority) {
        this.queue.push({ element, priority });
        this.queue.sort((a, b) => a.priority - b.priority); // Sort based on priority
      }
    
      dequeue() {
        return this.queue.shift(); // Remove and return the highest priority element
      }
    
      size() {
        return this.queue.length;
      }
    }
    
    function calculateDistance2(lat1, lon1, lat2, lon2) {
      const R = 6371; // Radius of the earth in km
      const dLat = deg2rad(lat2 - lat1);
      const dLon = deg2rad(lon2 - lon1);
      const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; // Distance in km
      return distance;
  }
  
  function deg2rad(deg) {
      return deg * (Math.PI / 180);
  }
  

    function checkValidPoint(i, j) {
        return i >= 0 && i < map.length && j >= 0 && j < map[0].length;
    }
    function checkclickedcoordinate(i,j){
      for(let k=0;k<clickedCoordinates.length;k++){
        if(map[i][j][0]==clickedCoordinates[k][1] && map[i][j][1]==clickedCoordinates[k][0]){
          return 1;
        }
      }
      return 0;
    }
    function checkroadcoordinate(i,j){
      for(let k=0;k<roadCoordinates.length;k++){
        if(map[i][j][0]==roadCoordinates[k][1] && map[i][j][1]==roadCoordinates[k][0]){
          return 1;
        }
      }
      return 0;
    }
    function djikstra(map, clickedCoordinates, roadCoordinates, finalCoordinate,curr_i,curr_j,target_i,target_j,visited)
    {
      const pq = new PriorityQueue();
    const enqueue = (element, priority) => {
      // Enqueue the element with its priority
      pq.enqueue({ element, priority });
    };

      console.log("visited me daalne se pehle ")
        visited[curr_i][curr_j] = 1;
        console.log("current: ",curr_i,curr_j);
        console.log("visited me daalne ke baad")
        
        pq.enqueue([curr_i,curr_j],1);
        pq.enqueue([27,15],0);
        const numRows = map.length; // Change this to your desired number of rows
const numCols = map[0].length; 

// Initialize the 2D array
const parent = [];

// Loop through each row
for (let i = 0; i < numRows; i++) {
    // Initialize the current row
    parent[i] = [];

    // Loop through each column in the current row
    for (let j = 0; j < numCols; j++) {
        // Initialize the current element with a default value
        parent[i][j] = [0,0]; // You can assign any default value here
    }
}
const dist = [];

// Loop through each row
for (let i = 0; i < numRows; i++) {
    // Initialize the current row
    dist[i] = [];

    // Loop through each column in the current row
    for (let j = 0; j < numCols; j++) {
        // Initialize the current element with a default value
        dist[i][j] = 1e7; // You can assign any default value here
    }
}


  console.log("parent ke baad")
        
        console.log("djiksta ke andar")
        console.log("pq",pq);
        let top = pq.dequeue();
        let costs = top.priority;
        console.log("top",top);
        console.log("top.element",top.element);
        console.log("top.priority",top.priority);
       
             top= pq.dequeue();
         costs = top.priority;
        console.log("top2",top);
        console.log("top.element2",top.element);
        console.log("top.priority2",top.priority);
            
        pq.enqueue([curr_i,curr_j],0);
        
        while(pq.size()>0)
          {
            console.log("pq",pq);
            
             top = pq.dequeue();
             console.log("top inside: ",top)
            let cost = top.priority;
            console.log("hello");
            console.log("cost ",cost)
             var xi = top.element[0];
              console.log("hello");
             console.log("x",xi)
            console.log("hello");
             var yi = top.element[1];
             console.log("x: ",xi," y: ",yi)
             if(xi==target_i && yi==target_j){
              
              break;
            }



            console.log("check1 par kar diya")
            
            visited[xi][yi] = 1;
            let dx = [-1, 0, 1, 0];
            let dy = [0, 1, 0, -1];
            for(let i=0;i<4;i++){
              let newx = xi + dx[i];
              let newy = yi + dy[i];
              console.log("newx: ",newx," newy: ",newy)

              if(checkValidPoint(newx,newy) && visited[newx][newy]==0)
                {
                  console.log("entry newx: ",newx," newy: ",newy)
                  visited[newx][newy] = 1;
              if(checkclickedcoordinate(newx,newy)==1)
                {
                  pq.enqueue([newx,newy],1e7);
                  console.log("clicked newx: ",newx," newy: ",newy)
                  visited[newx][newy] = 1;
                }
              else if(checkroadcoordinate(newx,newy)==1)
                {
                  console.log("road newx: ",newx," newy: ",newy)
                  pq.enqueue([newx,newy],cost);
                  if(cost<dist[newx][newy])
                  {
                    
                    dist[newx][newy] = cost;
                    parent[newx][newy] = [xi,yi];
                    pq.enqueue([newx,newy],cost+1);
                }}
                else
                {
                  console.log("else newx: ",newx," newy: ",newy)
                  pq.enqueue([newx,newy],cost+1);
                  if(cost+1<dist[newx][newy])
                  {
                    dist[newx][newy] = cost+calculateDistance2(map[xi][yi][0],map[xi][yi][1],map[newx][newy][0],map[newx][newy][1]);
                    parent[newx][newy] = [xi,yi];
                }
                console.log("pq",pq.size());
                
              
              }
            }

            }
        }
          
          console.log("loop ke bahar")
          console.log("yaha pe : ", parent[25][17])
          let path = [];
          console.log("target: ",target_i,target_j)
          let x = target_i;
          let y = target_j;
          console.log("x: ",x," y: ",y)
          setDistance(dist[target_i][target_j]);
          console.log("current: ",curr_i,curr_j)
          while(x!=curr_i || y!=curr_j){
            console.log("x: ",x," y: ",y)
            path.push([x,y]);
            console.log("yahape aaya")
            let par=parent[x][y];
            console.log("par: ",par)
            x = par[0];
            y = par[1];

          }
          path.push([curr_i,curr_j]);
          console.log("path inside 2",path);
          return path;
        
    }
    
    
  
  console.log("visited se pehle")
  const rows = map.length; // Change this to your desired number of rows
const columns = map[0].length; // Change this to your desired number of columns

// Declare and initialize the 2D array
const visited = [];
for (let i = 0; i < rows; i++) {
  visited[i] = new Array(columns).fill(false); // Initialize each row with 'false'
}
  console.log("visited ke baad")
  let path=[]
  path=djikstra(map, clickedCoordinates, roadCoordinates, finalCoordinate,curr_i,curr_j,target_i,target_j,visited);
  console.log("path after djikstra",path);
  return path;
}

  function findLeastCostPath(pointss, clickedcoordinates, roadcoordinates, finalcoordinates) {
    const numRows = pointss.length / 31;
    const numCols = 31;

    // Convert 1D array to 2D array
    const map = [];
    for (let i = 0; i < numRows; i++) {
        map.push(pointss.slice(i * numCols, (i + 1) * numCols));
    }
    console.log("map",map);
    let curr_i;
    let curr_j;
    let target_i;
    let target_j;
    let start=finalCoordinates[0];
    let end=finalCoordinates[1];
    for(let i=0;i<map.length;i++){
      for(let j=0;j<map[0].length;j++){
        if(map[i][j][1]==start[0] && map[i][j][0]==start[1]){
          curr_i=i;
          curr_j=j;
        }
      }}
      for(let i=0;i<map.length;i++){
        for(let j=0;j<map[0].length;j++){
          if(map[i][j][1]==end[0] && map[i][j][0]==end[1]){
            target_i=i;
            target_j=j;
          }
        }}


    
      


    // Create graph with initial costs
    let path=findLeastCostPath2(map, clickedcoordinates, roadcoordinates, finalcoordinates,curr_i,curr_j,target_i,target_j);
    console.log("map",map); 
    console.log("path inside 1",path);
    let path2=[]
    for(let i=path.length-1;i>=0;i--){
      path2.push(map[path[i][0]][path[i][1]]);  
    }
    return path2;
  }



  

  const handleRestricted = () => {
    console.log("arr",arr);
    setArray(1);
    console.log("arr",arr);
  }
  const handleRoad = () => {
    console.log("arr",arr);
    setArray(2);
    console.log("arr",arr);
  }
  const handlePoints = () => {
    console.log("arr",arr);
    setArray(3);
    console.log("arr",arr);
  }
  const handletest = () => {
    setArray(4);
    console.log("arr",arr);
  }
  const handleconfigure = () => {
    setArray(6);
    
  }
  const handlecost = () => {
    console.log("distance",distance);
    alert("The cost of the path is "+distance*100*0.2*5000*3.5);
  }

  const handlesubmit = () => {
    console.log("submit");
    if(finalCoordinates.length<2){
      alert("Please select atleast 2 points")
    }
    else{
    console.log("submit2");
      console.log("pointss",pointss);
    const path=findLeastCostPath(pointss,clickedCoordinates,roadCoordinates,finalCoordinates);
    console.log("path in submit",path);
    setPathtoprint(path);

    }
  }
  useGeographic();
  
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // in meters
}

function generatePoints(corner1, corner2, corner3, corner4) {
    const corners = [corner1, corner2, corner3, corner4];
    const points = [];
    const points2=[]
    // Calculate the distances between corners
    let i_lat=corner1[0]
    let i_long=corner1[1]
    const increment_vertical=(corner1[0]-corner4[0])/30
    const increment_horizontal=(corner2[1]-corner1[1])/30
    for(let i=0;i<=30;i++){
      let row=[]
      for(let j=0;j<=30;j++){
        
        points.push([i_lat,i_long])
        row.push([i_lat,i_long])
        i_long+=increment_horizontal
      }
      points2.push(row)
      i_lat-=increment_vertical
      i_long=corner1[1]
    }
    console.log("points",points);
    setPointalt(points2);
    
    return points;
}

function calculateDistance(coord1, coord2) {
  console.log("coord1",coord1);
  console.log("coord2",coord2);
  const dLat = coord2[1] - coord1[0];
  const dLon = coord2[0] - coord1[1];
  console.log("dlat",dLat);
  console.log("dlon",dLon);
  const distance = Math.sqrt(dLat * dLat + dLon * dLon);
  console.log("distance",distance);
  return distance;
}

function findClosestPoint(points, coordinate) {
  let minDistance = 10000;
  let closestPoint = null;

  for (const point of points) {
      const distance = calculateDistance(point, coordinate);
      if (distance < minDistance) {
          minDistance = distance;
          closestPoint = point;
      }
  }
  console.log("closest",closestPoint);
  return closestPoint;
}

  useEffect(() => {
    let topLeft=[13.72295, 79.57303]; // Top left corner
      let topRight=[13.72287, 79.60753]; // Top right corner
      let bottomRight=[13.70278, 79.60753]; // Bottom right corner
      let bottomLeft=[13.70287, 79.597294]
      const distance = 0.000089748;
      const pointsInRegion = generatePoints(topLeft, topRight, bottomRight, bottomLeft);
      console.log("hell",pointsInRegion);
      setPoints(pointsInRegion);
      console.log(pointsInRegion,"hello",pointss);
  }, []);
  useEffect(() => {
    console.log("pointsh",pointss);
    console.log("pointsh2",pointalt);
    setClickedCoordinates(JSON.parse(localStorage.getItem('clickedCoordinates')) || []);
    setroadCoordinates(JSON.parse(localStorage.getItem('roadCoordinates')) || []);
    setfinalCoordinates(JSON.parse(localStorage.getItem('finalCoordinates')) || []);
    setPointalt(JSON.parse(localStorage.getItem('pointalt')) || []);
  }, [pointss]);

  useEffect(() => {
    
    const layers = [
      new TileLayer({
        source: new OSM()
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://localhost:8080/geoserver/WS_test/wms',
          params: { 'LAYERS': 'IITTP2', 'TILED': false },
          serverType: 'geoserver',
          transition: 0
        })
      }),
    ];

    const map = new Map({
      layers: layers,
      target: 'map',
      view: new View({
        center: ([   79.60753,13.70278]), 
        zoom: 14
      })
    });
    
    const redDot2 = new VectorLayer({
      source: new VectorSource({
        features: [
          new Feature({
            geometry: new Point([  79.57303,13.72295])
          })
        ]
      }),
      
      style: new Style({
        image: new CircleStyle({
          radius: 5,
          fill: new Fill({ color: 'red' }),
          stroke: new Stroke({ color: 'black', width: 1 })
        })
      })
    });
    map.addLayer(redDot2);
      
    for(let i=0;i<pathtoprint.length;i++){
      let newcoords = pathtoprint[i];
      let newcoords2 = [newcoords[1],newcoords[0]];
      console.log("newcoords",newcoords2);
      const redDot2 = new VectorLayer({
        source: new VectorSource({
          features: [
            new Feature({
              geometry: new Point(newcoords2)
            })
          ]
        }),
        style: new Style({
          image: new CircleStyle({
            radius: 5,
            fill: new Fill({ color: 'green' }),
            stroke: new Stroke({ color: 'black', width: 1 })
          })
        })
      });
      map.addLayer(redDot2);}
    
    

    if(arr==1){
    for(let i=0;i<clickedCoordinates.length;i++){
      let newcoords = clickedCoordinates[i];
      let newcoords2 = [newcoords[0],newcoords[1]];
    const redDot2 = new VectorLayer({
      source: new VectorSource({
        features: [
          new Feature({
            geometry: new Point(newcoords2)
          })
        ]
      }),
      
      style: new Style({
        image: new CircleStyle({
          radius: 5,
          fill: new Fill({ color: 'red' }),
          stroke: new Stroke({ color: 'black', width: 1 })
        })
      })
    });
    map.addLayer(redDot2);}}
    if(arr==2){
      for(let i=0;i<roadCoordinates.length;i++){
        let newcoords = roadCoordinates[i];
        let newcoords2 = [newcoords[0],newcoords[1]];
        console.log("roadnewcoords",newcoords);
      const redDot2 = new VectorLayer({
        source: new VectorSource({
          features: [
            new Feature({
              geometry: new Point(newcoords2)
            })
          ]
        }),
        
        style: new Style({
          image: new CircleStyle({
            radius: 5,
            fill: new Fill({ color: 'red' }),
            stroke: new Stroke({ color: 'black', width: 1 })
          })
        })
      });
      map.addLayer(redDot2);}}
      if(arr==3){
        for(let i=0;i<finalCoordinates.length;i++){
          let newcoords = finalCoordinates[i];
          let newcoords2 = [newcoords[0],newcoords[1]];
        const redDot2 = new VectorLayer({
          source: new VectorSource({
            features: [
              new Feature({
                geometry: new Point(newcoords2)
              })
            ]
          }),
          style: new Style({
            image: new CircleStyle({
              radius: 5,
              fill: new Fill({ color: 'red' }),
              stroke: new Stroke({ color: 'black', width: 1 })
            })
          })
        });
        map.addLayer(redDot2);}}
        if(arr==4){ 
          console.log("yaha tak aa gaya",pointss);
          for(let i=0;i<pointss.length;i++){
            console.log("yaha tak aa gaya2",pointss);
            let newcoords = pointss[i];
            let newcoords2 = [newcoords[1],newcoords[0]];
            console.log("yaha tak aa gaya3",newcoords2);
          const redDot2 = new VectorLayer({
            source: new VectorSource({
              features: [
                new Feature({
                  geometry: new Point(newcoords2)
                })
              ]
            }),
            style: new Style({
              image: new CircleStyle({
                radius: 5,
                fill: new Fill({ color: 'red' }),
                stroke: new Stroke({ color: 'black', width: 1 })
              })
            })
          });
          console.log("yaha tak aa gaya4",redDot2);
          map.addLayer(redDot2);}}
          if(arr==6){
            for(let i=0;i<pointalt.length;i++){
              let newcoords = pointalt[i];
              let newcoords2 = [newcoords[0],newcoords[1]];
            const redDot2 = new VectorLayer({
              source: new VectorSource({
                features: [
                  new Feature({
                    geometry: new Point(newcoords2)
                  })
                ]
              }),
              style: new Style({
                image: new CircleStyle({
                  radius: 5,
                  fill: new Fill({ color: 'red' }),
                  stroke: new Stroke({ color: 'black', width: 1 })
                })
              })
            });
            map.addLayer(redDot2);}}

    map.on('click', function (evt) {
      const coordinate = evt.coordinate;
      console.log("hi1",coordinate)
      console.log("pointss",pointss);
      const lonLat =findClosestPoint(pointss,coordinate);
      console.log("lonlat",lonLat);
      const latitude = lonLat[0];
      const longitude = lonLat[1];
      let altitudes;
      let append=[]
      console.log(latitude);
        console.log(longitude);
       
        append=[longitude,latitude]
   
      
      
      
      
      console.log("append" , append);
      console.log("arr",arr);
      if(arr==0){
        return;
      }
      if(arr==1){
        let newarr=clickedCoordinates;
        console.log("newarr",newarr);
        newarr.push(append);
        console.log("newarr2",newarr); 
      setClickedCoordinates(newarr);}

      if(arr==2){
        let newarr=roadCoordinates;
        console.log("newarrroad",newarr);
        newarr.push(append);
        console.log("newarrroad2",newarr);
        setroadCoordinates(newarr);
      }
      if(arr==3){
        let newarr=finalCoordinates;
        console.log("newarrfinal",newarr);
        newarr.push(append);
        if(newarr.length>2){
          newarr.shift()}
        console.log("newarrfinal2",newarr);
        setfinalCoordinates(newarr);
      }
      if(arr==6){
        let newarr=pointalt;
        console.log("newarrroad",newarr);
        newarr.push(append);
        console.log("newarrroad2",newarr);
        setPointalt(newarr);
      }
      console.log("fnc",finalCoordinates);
        console.log("clc",clickedCoordinates);
        console.log("rdc",roadCoordinates);
        console.log("pointalt",pointalt);
        localStorage.setItem('clickedCoordinates', JSON.stringify(clickedCoordinates));
        localStorage.setItem('roadCoordinates', JSON.stringify(roadCoordinates));
        localStorage.setItem('finalCoordinates', JSON.stringify(finalCoordinates));
        localStorage.setItem('pointalt', JSON.stringify(pointalt));

      let newcoords = [longitude, latitude];

      console.log("hi2",newcoords)
      const redDot = new VectorLayer({
        source: new VectorSource({
          features: [
            new Feature({
              geometry: new Point(newcoords)
            })
          ]
        }),
        
        style: new Style({
          image: new CircleStyle({
            radius: 5,
            fill: new Fill({ color: 'red' }),
            stroke: new Stroke({ color: 'black', width: 1 })
          })
        })
      });

      map.addLayer(redDot);
   
    });

    return () => {
      map.setTarget(null);
    };
  }, [clickedCoordinates,roadCoordinates,finalCoordinates,arr,pathtoprint]);

  const handleResetClick = () => {
    if(arr==1){
    setClickedCoordinates([]); }
    if(arr==2){
      setroadCoordinates([]); }
      if(arr==3){
        setfinalCoordinates([]); }
  };
const handleClearLastClick = () => {
  if(arr==1){
  const updatedCoordinates = clickedCoordinates.slice(0, -1);
  setClickedCoordinates(updatedCoordinates)}
  if(arr==2){
    const updatedCoordinates = roadCoordinates.slice(0, -1);
    setroadCoordinates(updatedCoordinates)}
    if(arr==3){
      const updatedCoordinates = finalCoordinates.slice(0, -1);
      setfinalCoordinates(updatedCoordinates)}
};


  return <div>
     <div id="map" style={{ height: '800px', width: '1600px' }}></div>;
     <Button style={{ marginRight: '20px' }} text="Clear" onClick={handleClearLastClick}/><Button style={{ marginRight: '20px' }} text="Reset" onClick={handleResetClick}/><Button  style={{ marginRight: '20px' }} text="Restricted Point" onClick={handleRestricted}/>
     <Button  style={{ marginRight: '20px' }} text="Road Points" onClick={handleRoad}/>
     <Button  style={{ marginRight: '20px' }} text="Main Points" onClick={handlePoints}/>
     <Button style={{ marginRight: '20px' }} text="Submit" onClick={handlesubmit}/>
     <Button  style={{ marginRight: '20px' }} text="Test" onClick={handletest}/>
     
     <Button style={{ marginRight: '20px' }} text='cost' onClick={handlecost}/>
  </div>
};

export default MapComponent;