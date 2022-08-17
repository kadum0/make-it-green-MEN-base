

window.onload = async()=>{

    ////get data 
    let d = await fetch('/articles')
    let artilces = await d.json()

    console.log(artilces)

    Object.keys(artilces).forEach(e=>{
        console.log(e)

        let article = `
        <a href="/${e.title}">
        <div class="article">
            <h2 class="title">${e.title} </h2>
            <img src="${e.logo}">
            <div class="content">${e.content}</div>
        </div>
    </a>
    `
    document.querySelector("#articles").innerHTML += article

    })
}

