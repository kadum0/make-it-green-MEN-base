

////make objects 

///ui-js



/////get the home data; map statics 
window.onload= async ()=>{
    let fetchedMapStatics = await fetch("/mapStatics")
    console.log(fetchedMapStatics)
    let mapStatics = await fetchedMapStatics.json()
    console.log(mapStatics)

// [...mapStatics].foreach(e=>{console})

console.log(mapStatics.red.length)
// mapStatics.green

    // Object.entries(mapStatics).forEach(e=>{
    //     console.log(e)
    // })

    document.querySelector("#greenPinCounter").textContent = mapStatics.green.length
    document.querySelector("#redPinCounter").textContent = mapStatics.red.length

}

