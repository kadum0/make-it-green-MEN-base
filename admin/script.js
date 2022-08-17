

// send data 
// make article 
document.querySelector("#sendArticle").addEventListener("click", async (e)=>{
    // check if right data; 
    if(typeof document.querySelector("#articleTitle").value == 'string' && document.querySelector("#articleImg").files[0] && typeof document.querySelector("#articleContent").value == 'string'){
        console.log("all good")

        ////make
        let fd = new FormData()
        fd.append("articleTitle", document.querySelector("#articleTitle").value)
        fd.append('articleContent', document.querySelector("#articleContent").value)
        fd.append("articleImg", document.querySelector("#articleImg").files[0])
        ////send 
        await fetch("/makeArticle", {
            method: "POST", 
            body: fd
        })
        ////emtpy 
        document.querySelector("#articleTitle").value = ''
        document.querySelector("#articleContent").value = ''
        document.querySelector("#articleImg").files[0] = null

    }else{
        console.log(typeof document.querySelector("#articleTitle").value)
        console.log(document.querySelector("#articleImg").files[0])
        console.log(document.querySelector("#articleContent").value)
    }

    // make object 

    // send object 

    // empty container and object
})


// make and send donor 
document.querySelector("#sendDonor").addEventListener("click", async (e)=>{
    // check if right data; 
    if(typeof document.querySelector("#donorName").value == 'string' && document.querySelector("#donorLogo").files[0]){
        console.log("all good")

        ////make 
        let fd = new FormData()
        fd.append("donorName", document.querySelector("#donorName").value)
        fd.append("donorLogo", document.querySelector("#donorLogo").files[0])
        document.querySelector("#donorWebsite").value?fd.append("donorWebsite", document.querySelector("#donorWebsite").value):null
        
        console.log(fd)


        ////send 
        await fetch("/makeDonor", {
            method: "POST", 
            body: fd
        })

        ////empty 
        document.querySelector("#donorName").value = ''
        document.querySelector("#donorWebsite").value = ''
        document.querySelector("#donorLogo").files[0] = null

    }else{
        console.log(typeof document.querySelector("#donorName").value)
        console.log(document.querySelector("#donorLogo").files[0])
    }

    // make object 

    // send object 

    // empty container and object
})





// trying the code 

window.addEventListener("click", (e)=>{
    console.log(document.querySelector("#articleTitle").value)
    console.log(document.querySelector("#articleContent").value)

    // console.log(document.querySelector("#articleImg").files[0])
    
})




