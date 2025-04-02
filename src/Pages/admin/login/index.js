const logininfo=document.querySelector('#logininfo');

logininfo.onsubmit= async function(evt){
    evt.preventDefault();

    loginbad.style.display="none"

    let name=document.getElementById('username').value;
    let password=document.getElementById('password').value;
    //
    let res= await fetch(`http://localhost:3000/users?username=${name}&password=${password}`).then(res=>res.json())
    //
    if(res.length>0){
        //问题：1.只提交也跳，2.匹配一个也跳************************
        //不能直接网站跳
        localStorage.setItem("token",JSON.stringify({
            ...res[0],
            password:"*****"
        }))
        //
        location.href="../home/index.html"
    }
    else{
        //失败
        loginbad.style.display="block"  
    }
}