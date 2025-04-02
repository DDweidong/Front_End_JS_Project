document.getElementById("news").style.color="blue"

//模糊查询
let list=document.getElementById("list-group")
let search=document.getElementById("topbar-search")
search.oninput=async function(){

    if(!search.value) {
      list.style.display="none"
      return 
    }
    list.style.display="block"
    let data=await fetch("http://localhost:3000/news?title_like="+search.value).then(res=>res.json())
    //
    data=data.filter((item)=>(item.title).includes(search.value))

    list.innerHTML=data.map(item=>`
        <li class="list-group-item"><a style="font-style: normal;" href="../detail/index.html?id=${item.id}">${item.title}</a></li>
      `).join("")
}
//失焦
search.onblur=function(){
  setTimeout(()=>{
    list.style.display="none"
    search.value=''
  },300)

}

/////新闻内容
async function render(){//也要等list,再tab
  await renderlist()
  rendertab()
}

//新闻列表
let showlist=[]
async function renderlist(){
  showlist=await fetch("http://localhost:3000/news").then(res=>res.json())
  showlist.reverse()
  //console.log(showlist)
  let card=document.getElementById("card-show")
  card.innerHTML=showlist.slice(0,4).map(item=>`
    <div class="card" id="${item.id}">
      <div style="background-image: url(${item.photo})"; class="cover card-p"></div>
        <div class="card-body">
          <h5 class="card-title" style="font-size: 22px;"><strong>标题：</strong>${item.title}</h5>
          <p class="card-text" style="font-size: 12px; color:gray"><strong>作者：</strong>${item.author}</p>
        </div>
    </div>
    `).join("")

    //点进去
    for(let item of document.querySelectorAll(".card")){
      //console.log(item)
      item.onclick=function(){//点击
        location.href=`../detail/index.html?id=${item.id}`
      }
    }
}

/////新闻分类
function rendertab(){
    //console.log(showlist)
    let t0=[],t1=[],t2=[] 
    showlist.map(item=>{
      if(item.catagory==0) t0.push(item)
      if(item.catagory==1) t1.push(item)
      if(item.catagory==2) t2.push(item)
    })
  let cataobj=[t0,t1,t2]

    //手动分组
    let tabs=[tab0,tab1,tab2]
    tabs.forEach((item,index)=>{          //*****?
      item.innerHTML=cataobj[index]?.map(it=>`
          <div class="listitem" id="${it.id}">
            <img src="${it.photo}">
            <div style="font-size: 22px;"><strong>标题：</strong>${it.title}</div>
            <p class="card-text" style="font-size: 12px; color:gray"><strong>作者：</strong>${it.author}</p>
          </div>
        `).join("")||""
    })

    //点进去
    for(let item of document.querySelectorAll(".listitem")){
      //console.log(item)
      item.onclick=function(){//点击
        location.href=`../detail/index.html?id=${item.id}`
      }
    }
}

render()