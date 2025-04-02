//
let  user=localStorage.getItem("token")
/*新闻列表*/
let list=[]
let catagorylist=["最新动态","典型案例","通知公告"]
async function render() {
    list =await fetch(`http://localhost:3000/news?author=${JSON.parse(user).username}`).then(res=>res.json())
    //console.log(list)
    listbody.innerHTML=list.map(item=>`
        <tr>
            <th scope="row">${item.title}</th>
            <td>
                <span>${catagorylist[item.catagory]}</span>
            </td>
            <td>
                <button type="button" class="btn btn-success btn-look" id="${item.id}" >预览</button>
                <button type="button" class="btn btn-primary btn-edit" id="${item.id}" >编辑</button>
                <button type="button" class="btn btn-danger btn-del"  id="${item.id}" >删除</button>
            </td>
        </tr>
        `
    ).join("")
}

render()

/*预览新闻*/
//实例模态框
const lookModel = new bootstrap.Modal(document.getElementById('lookModal'))
const delModel = new bootstrap.Modal(document.getElementById('delModal'))

let id=0
listbody.onclick= function(evt){
    id=evt.target.id
    //console.log(id)
    /*预览新闻*/
    if(evt.target.className.includes("btn-look")){
        console.log("预览")
        /*加载*********/
        let news=list.filter(item=>item.id==id)[0]//fetch(`http://localhost:3000/news?id=${id}`).then(res=>res.json())//可以用函数，更好
        //console.log(news.content)
        let modal_body=document.getElementById("modal_body")
        //console.log(modal_body.innerHTML)
        modal_body.innerHTML=`${news.content} `

        let title=document.getElementById("exampleModalLabel")
        title.innerHTML=` 标题：${news.title}`

        lookModel.toggle()
    }
    else if(evt.target.className.includes("btn-edit")){/*编辑新闻*/
        console.log("编辑")
        //新界面
        location.href=`../editnews/index.html?id=${id}`
        //预填

        //更新

    }
    else if(evt.target.className.includes("btn-del")){/* 删除新闻*/
        console.log("删除")
        //模态框
        //确认
        delModel.toggle()
    }
}

/*删除新闻**/
const delconfirm=document.getElementById("delconfirm")
delconfirm.onclick=async function(){
    //console.log(id)
    await fetch(`http://localhost:3000/news/${id}`,{
        method:"delete"
    }).then(res=>res.json())
    //
    delModel.toggle()

    render()
} 


