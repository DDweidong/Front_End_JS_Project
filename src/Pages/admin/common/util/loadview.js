 function readertab(sidebar){
    if(localStorage.getItem("token")){
        //topbar渲染
        fetch('/src/pages/admin/common/components/topbar/topbar.html').then(res=>res.text()).then(
            res=>{
                document.querySelector("#topbar").innerHTML=res
                //
                let user=localStorage.getItem("token")
                //名字
                let username=document.getElementById('username')
                username.innerText=JSON.parse(user).username
                //图片
                userphoto.src=JSON.parse(user).photo
                //退出
                const out=document.querySelector('#out')
                out.click=function(){
                    localStorage.clear()
                    location.href="/src/pages/admin/login/index.html"
                }    
            }
        )
        //sidemenu渲染
        fetch('/src/pages/admin/common/components/sidemenu/sidemenu.html').then(res=>res.text()).then(
            res=>{
                document.querySelector(".sidemenu").innerHTML=res
                //用户权限
                if(JSON.parse(user).role!=="admin")
                {
                    document.getElementById("clearUserpart").remove();
                }
                //加载后，再渲染，侧边栏
                const part=(location.href).split('/')
                const tar=part[part.length-2]
                document.getElementById(tar).style.color="blue"
            }
        )
        //
    }
    else{
        location.href="/src/pages/admin/login/index.html"
    }
}

readertab()