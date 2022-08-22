

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

let pathObjects = []
let pathList 

/////////public line; stuff 

function displayLines (pd){
    console.log("get routes; ", pd)
    
    Object.values(pd).forEach(e=>console.log(e.path))

    ///deploy them; store
    Object.values(pd).forEach(e => {

        let obje 

        if(typeof e.path[0]!="number"){

            console.log(e.path)
            obje = L.polyline(e.path, {
                // color: "red",
            }).addTo(map)
            // oldObjects.push(pathId) //dont need old objects
            // pathob.addEventListener("click", (e) => console.log(e.target))
        } else { ////labels part 
            console.log("....label....")

            obje = L.circle(e.path, {
                fillColor: '#3388FF',
                fillOpacity: 0.8,
                radius: 100
            }).addTo(map)
        }

        pathObjects.push(obje)
        obje.addEventListener("mouseover", (e)=>{
            pathObjects.forEach(e=>{e.setStyle({color: "#3388FF", fillColor: "#3388FF"})})
            let i = e.target
            map.removeLayer(e.target)
            i.addTo(map)
            pathObjects.push(i)
            i.setStyle({color:"rgb(223, 39, 39)", fillColor: "rgb(223, 39, 39)"})
        })
        obje.addEventListener("click", (e)=>{
            pathObjects.forEach(e=>{e.setStyle({color: "#3388FF", fillColor: "#3388FF"})})
            let i = e.target
            map.removeLayer(e.target)
            i.addTo(map)
            pathObjects.push(i)
            i.setStyle({color:"rgb(223, 39, 39)", fillColor: "rgb(223, 39, 39)"})
        })
    })


    
}
function hideLines(pd){
    pd.forEach(e=>{
        map.removeLayer(e)
    })
}
//////button that shows the lines 
document.querySelector(".displayLines").addEventListener("click", (e)=>{
    console.log(e.target.classList)

    e.target.classList.toggle("add")
    if(e.target.classList.contains("add")){
        e.target.style.background = "#ff2a2a"
        displayLines(pathList)
        // e.target.parentElement.append(suggetstMakeLinesBtn)
        document.querySelector(".suggest").style.display = "block"
    }else{
        hideLines(pathObjects)
        // e.target.style.background = "#27f060"
        e.target.style.background = '#68C451'
        // e.target.parentElement.lastElementChild.remove()
        document.querySelector(".suggest").style.display = "none"
    }
})


// ui-js-data; 
// initialize the map; 
const map = L.map('map').setView([33.396600, 44.356579], 9); //leaflet basic map



/////get the home data; map statics 
window.onload= async ()=>{

    // get map statics
    let fetchedMapStatics = await fetch("/mapStatics")
    console.log(fetchedMapStatics)
    let mapStatics = await fetchedMapStatics.json()
    console.log(mapStatics)

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

    pathList = mapStatics.routes

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
    let routesNumber = mapStatics.routes.filter(e=>typeof e.path[0]!="number")
    document.querySelector("#routes").textContent = routesNumber.length
    /////direct deploy 
    displayLines(mapStatics.routes)
    document.querySelector(".displayLines").classList.add('add')
    document.querySelector(".displayLines").background = "#ff2a2a"


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
    



    // get articles 
    let getarticles = await fetch('/articles')
    let articles = await getarticles.json()
    console.log(articles)

    // deploy artciles; 
        // make objects; imgs 

        let articleTemp =  `

    <a href='/blog/${articles[0].title}' class='article'
        <div>
                <img style='background:url("${articles[0].img}")'> 
                <div class="content">
                    <h2>${articles[0].title}</h2>
                    <p>${articles[0].content}</p>
                </div>
        </div>
    </a>

    <a href='/blog/${articles[1].title}' class='article'
        <div>
                <img style='background:url("${articles[1].img}")'> 
                <div class="content">
                    <h2>${articles[1].title}</h2>
                    <p>${articles[1].content}</p>
                </div>
        </div>
    </a>

    <a href='/blog/${articles[2].title}' class='article'
        <div>
                <img style='background:url("${articles[2].img}")'> 
                <div class="content">
                    <h2>${articles[2].title}</h2>
                    <p>${articles[2].content}</p>
                </div>
        </div>
    </a>
    `
    document.querySelector('.article-samples').innerHTML = articleTemp


    // get donors
    let getDonors = await fetch('/donors')
    let donors = await getDonors.json()
    console.log(donors)
    console.log(donors[0].logo)

    ///deploy donors 
        ///make elements

    let donorsTemp = `
        <div class="donor">
            <img style='background:url("${donors[0].logo}")'> 
            <h2 class="donor-name">${donors[0].donorName}</h2>
        </div>

        <div class="donor">
            <img style='background:url("${donors[1].logo}")'> 
            <h2 class="donor-name">${donors[1].donorName}</h2>
        </div>
        <div class="donor">
            <img style='background:url("${donors[2].logo}")'> 
            <h2 class="donor-name">${donors[2].donorName}</h2>
        </div>
    `
        ////insert elements
    document.querySelector('.donor-samples').innerHTML = donorsTemp


}

