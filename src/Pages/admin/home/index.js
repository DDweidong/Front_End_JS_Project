//
let user=''
async function readertab2(){
    user=localStorage.getItem("token")
    let y_id=JSON.parse(user).id
    let {username,password,photo:photodata1,introduce}=await fetch(`http://localhost:3000/users/${y_id}`).then(res=>res.json())
    //首页main
      document.getElementById("usertext").innerHTML=`
      <img src="${photodata1}" alt="" id="photo">
      <div class="userinfo">
          <span id="userName" style="font-size:20px">${username}</span>
          <p id="des"><pre>${introduce||"这个人很赖"}</pre></p>
      </div>
      `
    //用户编辑
    document.getElementById("userself").innerHTML=`
    <button type="button" class="btn btn-primary btn-edit" ${JSON.parse(user).default?"disabled":" "} id="${JSON.parse(user).id}" >编辑</button>
    <button type="button" class="btn btn-primary " style="margin-left: 20px;">
      <a href="/src/Pages/web/news/index.html" target="_blank" rel="noopener noreferrer"
         style="text-decoration: none; color: #fff;" 
      >新闻首页</a>
    </button>
    `
}
readertab2()

//用户编辑点击
let edit=document.getElementById("userself")
edit.onclick=function(evt){
    
    if(evt.target.className.includes("btn-edit")){
      location.href=`../usermanage/user/index.html?id=${evt.target.id}`
    }
}

/*数据显示，数据可视化 */
//统计不同类别新闻数据
let catagorylist=['最新动态','典型案例','通知公告']
let data=[]
async function getdata(){
  let res=await fetch(`http://localhost:3000/news/?author=${JSON.parse(user).username}`).then(res=>res.json())
  //统计，分类
  let count0=0,count1=0,count2=0
  res.map(item=>   
    
    {
      if(item.catagory=="0") count0+=1
      if(item.catagory=="1") count1+=1
      if(item.catagory=="2") count2+=1
      
    }
   )
   data.push({value:count0,name:catagorylist[0]})
   data.push({value:count1,name:catagorylist[1]})
   data.push({value:count2,name:catagorylist[2]})

  renderechars(data)

}
getdata()

function renderechars(arr){
  // 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('datamain'));
// 指定图表的配置项和数据
option = {
    title: {
      text: '当前用户发布的新闻',
      subtext: '不同分类的占比',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: arr,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
}


