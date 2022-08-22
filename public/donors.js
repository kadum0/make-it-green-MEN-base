
////js


//// get data 
window.onload = async ()=>{

    let d = await fetch("/donors")
    let donors = await await d.json()

    console.log(donors)

    ////deploy; 
    // ([...donorName]).forEach(e=>console.log(e.donorName))
    // Object.values(donors).forEach(e=>console.log(e.donorName))
    
    document.querySelector('#donors').innerHTML = ''

    Object.values(donors).forEach(donor=>{
        console.log(donor)
        ////make
        let div = `
        <a href="${donor.website}" target="_blank">
            <div class="donor">
                <h3 class="name">${donor.donorName}</h3>
                <img src="${donor.logo}" alt="">
            </div>
        </a>
`
document.querySelector('#donors').innerHTML += div
        
        ////content 


        ////insert 
    })

}


// 



