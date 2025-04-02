//
async function render(){
    let id=new URL(location.href).searchParams.get("id")

    let {title,author,content}=await fetch(`http://localhost:3000/news/${id}`).then(res=>res.json())

    document.getElementById("title").innerHTML=`${title}`
    document.getElementById("author").innerHTML=`${author}`
    document.getElementById("news-content").innerHTML=`${content}`
}

render()