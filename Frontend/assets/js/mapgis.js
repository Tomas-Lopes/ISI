 
    require([
      "esri/config",
      "esri/Map",
      "esri/views/MapView",
  
      "esri/Graphic",
      "esri/layers/GraphicsLayer"
  
      ], function(esriConfig,Map, MapView, Graphic, GraphicsLayer) {
  
    esriConfig.apiKey = "AAPK4794dac93f2f4bfb9d5c5bc14c437164XR9J186t8cbfv7LaCox9yDhOY2MhlkPIatcbgP88-kkUORDpAZr1jen-wKBkGAhN";
  
    const map = new Map({
      basemap:"arcgis-topographic" //Basemap layer service
    });
  
    const view = new MapView({
      map: map,
      center: [-8.293912, 41.450346], //Longitude, latitude
      zoom: 11,
      container: "viewDiv"
   });
  
   const graphicsLayer = new GraphicsLayer();
   map.add(graphicsLayer);
  
   const point = { //Create a point
      type: "point",
      longitude: -8.293912,
      latitude: 41.450346
   };
   const simpleMarkerSymbol = {
      type: "simple-marker",
      color: [226, 119, 40],  // Orange
      outline: {
          color: [255, 255, 255], // White
          width: 1
      }
   };
  
   const pointGraphic = new Graphic({
      geometry: point,
      symbol: simpleMarkerSymbol
   });
   graphicsLayer.add(pointGraphic);
  
  
   });
 