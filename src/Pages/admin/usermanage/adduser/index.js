let user=localStorage.getItem("token")
//添加用户
let photo=' '
adduserinfo.onsubmit= async function(e){
    e.preventDefault()
    
    //post ->async
    await fetch("http://localhost:3000/users",{
        method:"post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            username:pusername.value,
            password:password.value,
            introduce:introduce.value,
            photo
        })
    }).then(res=>res.json())
    
    location.href="../userlist/index.html"
}

photofile.onchange= function(ev){
    console.log(ev.target.files[0])
    //
    let reader=new FileReader()//对象

    reader.readAsDataURL(ev.target.files[0])//方法，转换
    
    reader.onload=function(e){
        //console.log(e.target.result)
        photo=e.target.result
    }//转完了
}
