//用户列表
let user=localStorage.getItem("token")
//
let list =[]//全局
//显示用户
async function render() {
    list= await fetch("http://localhost:3000/users").then(res=>res.json())
    //console.log(list)
    //映射
    listbody.innerHTML=list.map(item=>`
        <tr>
            <th scope="row">${item.username}</th>
            <td>
                <img src="${item.photo}" style="width:80px ;height:80px; border-radius:50%">
            </td>
            <td>
                <button type="button" class="btn btn-primary btn-edit" ${item.default?"disabled":" "} id="${item.id}" >编辑</button>
                <button type="button" class="btn btn-danger btn-del" ${item.default?"disabled":" " }  id="${item.id}" >删除</button>
            </td>
        </tr>
        `
    ).join("")
}
render()

/*用户*/
let photodata=' '
let updataid=0
//实例模态框
const editModel = new bootstrap.Modal(document.getElementById('editModal'))
const delModel = new bootstrap.Modal(document.getElementById('delModal'))

const listbody=document.getElementById("listbody")
listbody.onclick=function(evt){
    //事件委托，事件源

    if(evt.target.className.includes("btn-edit"))//编辑用户
    {
         //模态框
         editModel.toggle()
         //预填

        updataid=evt.target.id

        let {username,password,introduce,photo}=list.filter(item=>item.id==updataid)[0]//**************

        document.getElementById("edit-name").value= username      
        document.getElementById("edit-password").value=password
        document.getElementById("edit-introduce").value=introduce

        photodata=photo    
         //更新 post
    }
    else if(evt.target.className.includes("btn-del"))//删除用户
    {

        updataid=evt.target.id

        delModel.toggle()
        
    }
} 

/*相片看改变*/
photofile.onchange= function(ev){

    //
    let reader=new FileReader()//对象

    reader.readAsDataURL(ev.target.files[0])//方法，转换
    
    reader.onload=function(e){

        photodata=e.target.result
    }//转完了
}
/*编辑用户*/
const confirm=document.getElementById("confirm")
confirm.onclick=async function(){
    //console.log(111)

    await fetch(`http://localhost:3000/users/${updataid}`,{
        method:"PATCH",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            username:document.getElementById("edit-name").value,
            password:document.getElementById("edit-password").value,
            introduce:document.getElementById("edit-introduce").value,
            photo:photodata
        })
    }).then(res=>res.json())

    editModel.toggle()
    //重新加载
    render()
}

/*删除用户*/
const delconfirm=document.getElementById("delconfirm")
delconfirm.onclick=async function(){
    //console.log(666)
    await fetch(`http://localhost:3000/users/${updataid}`,{
        method:"delete"
    }).then(res=>res.json())

    delModel.toggle()

    render()
} 


