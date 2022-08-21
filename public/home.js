

////make objects 
        ////getting icon; icon is special object not just an image
        let conFinished = L.icon({
            iconUrl: "https://github.com/pointhi/leaflet-color-markers/blob/master/img/marker-icon-2x-green.png?raw=true",
            shadowSize: [50, 64], // size of the shadow
            shadowAnchor: [4, 62], // the same for the shadow
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [0, -30] 
        });
        let conUnfinished = L.icon({
            iconUrl: "https://github.com/pointhi/leaflet-color-markers/blob/master/img/marker-icon-2x-red.png?raw=true",
            shadowSize: [50, 64], // size of the shadow
            shadowAnchor: [4, 62], // the same for the shadow
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [0, -30] 
        });

        let nextCampPin = L.icon({
            iconUrl: "https://github.com/pointhi/leaflet-color-markers/blob/master/img/marker-icon-2x-yellow.png?raw=true",
            shadowSize: [50, 64], // size of the shadow
            shadowAnchor: [4, 62], // the same for the shadow
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [0, -30] 
        });


///ui-js


// ui-js-data; 
// initialize the map; 
const map = L.map('map').setView([33.396600, 44.356579], 9); //leaflet basic map



/////get the home data; map statics 
window.onload= async ()=>{
    let fetchedMapStatics = await fetch("/mapStatics")
    console.log(fetchedMapStatics)
    let mapStatics = await fetchedMapStatics.json()
    console.log(mapStatics)

// [...mapStatics].foreach(e=>{console})

// console.log(mapStatics.red.length)
// mapStatics.green

    Object.values(mapStatics).forEach(e=>{
        console.log(e)
    })
    //insert red
    Object.values(mapStatics.red).forEach(e=>{
        // L.marker(e.coords)
        m = L.marker(e.coords, {
            icon: conUnfinished, 
            popupAnchor: [-10, -30] 
        }).bindPopup(`<h3> ❤المساهمين</h3> ${e.aNames + e.bName}`).addTo(map)
    })

    // insert green
    Object.values(mapStatics.green).forEach(e=>{
        // L.marker(e.coords)
        m = L.marker(e.coords, {
            icon: conFinished, 
            popupAnchor: [-10, -30] 
        }).bindPopup(`<h3> ❤المساهمين</h3> ${e.aNames + e.bName}`).addTo(map)
    })

    // insert yellow 
    // Object.values(mapStatics.yellow).forEach(e=>{
    //     // L.marker(e.coords)
    //     m = L.marker(e.coords, {
    //         icon: nextCampPin, 
    //         popupAnchor: [-10, -30] 
    //     }).bindPopup(`<h3> ❤المساهمين</h3> ${e.aNames}`).addTo(map)
    // })


    document.querySelector("#greenPinCounter").textContent = mapStatics.green.length
    document.querySelector("#redPinCounter").textContent = mapStatics.red.length



    // get map api key
        //////get api key 
        let rApiKey = await fetch("/map-api-key")
        let apiKey = await rApiKey.json()
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: apiKey.apiKey
    }).addTo(map);
    
    control = L.Control.geocoder().addTo(map);
    


    // insert pins 


    
}

