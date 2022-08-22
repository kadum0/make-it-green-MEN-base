


////get articles 
window.onload = async()=>{

    ////get data 
    let d = await fetch('/articles')
    let artilces = await d.json()

    console.log(artilces)
    document.querySelector("#articles").innerHTML = "" 

    Object.values(artilces).forEach(e=>{
        console.log(e)

    //     let article = `
    //     <a href="/blog/${e.title}">
    //     <div class="article">
    //         <h2 class="title">${e.title} </h2>
    //         <img src="${e.logo}">
    //         <div class="content">${e.content}</div>
    //     </div>
    // </a>
    // `

            // <img style='background:url("${e.img}")' class='article-img'> 
        // <img src='${e.img}' class="article-img"'>


    let article = `
    <a href='/blog/${e.title}' class='article'>
        <img style='background-image:url("${e.img}")' class='article-img'> 
    <div>
            <div class="content">
                <h2>${e.title}</h2>
                <p>${e.content}</p>
            </div>
    </div>
</a>
`

    document.querySelector("#articles").innerHTML += article

    })
}

