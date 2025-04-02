async function readertab2(){
        //获取id
        let user=localStorage.getItem("token")
        let y_id=JSON.parse(user).id
        let {username,password,photo:photodata1,introduce,role}=await fetch(`http://localhost:3000/users/${y_id}`).then(res=>res.json())
}

readertab2()

//预填
let photo=' '
let id=0
async function render(){
    id=new URL(location.href).searchParams.get("id")

    let {username,password,photo:photodata,introduce}=await fetch(`http://localhost:3000/users/${id}`).then(res=>res.json())

    document.getElementById("pusername").value=username
    document.getElementById("password").value=password
    document.getElementById("introduce").value=introduce
    photo=photodata
}
render()

//自行修改用户
adduserinfo.onsubmit= async function(e){
    e.preventDefault()

    //post ->async
    let pusername=document.getElementById("pusername").value
    let pw=document.getElementById("password").value
    let int=document.getElementById("introduce").value

    await fetch(`http://localhost:3000/users/${id}`,{
        method:"PATCH",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            username:pusername,
            password:pw,
            introduce:int,
            photo
        })
    }).then(res=>res.json())

    //renderagain()
    readertab2()

    location.href="../../home/index.html"
}

photofile.onchange= function(ev){
    console.log(ev.target.files[0])
    //
    let reader=new FileReader()//对象

    reader.readAsDataURL(ev.target.files[0])//方法，转换
    
    reader.onload=function(e){

        photo=e.target.result
    }//转完了
}
