/*新闻内容，富文本编辑器 */
let content=''

const { createEditor, createToolbar } = window.wangEditor

const editorConfig = {
    placeholder: '填写这里...',
    onChange(editor) {
      const html = editor.getHtml()
      //console.log('editor content', html)
      content=html
      // 也可以同步到 <textarea>
    }
}

const editor = createEditor({
    selector: '#editor-container',
    html: '<p><br></p>',
    config: editorConfig,
    mode: 'default', // or 'simple'
})

const toolbarConfig = {}

const toolbar = createToolbar({
    editor,
    selector: '#toolbar-container',
    config: toolbarConfig,
    mode: 'default', // or 'simple'
})

//预填******************************************************************************
//获取id
let id=new URL(location.href).searchParams.get("id")//******************** */
//console.log(id)


/*原创建新闻内容 *******************************************/
let photo=''
//表单提交
newsinfo.onsubmit=async function(evt){
    evt.preventDefault()
    //更新请求
    await fetch(`http://localhost:3000/news/${id}`,{
        method:"PATCH",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            title:newstitle.value,
            content,
            catagory:sort.value,
            photo,
        })
    }).then(res=>res.json())

    location.href="../newslist/index.html"
}
//图片检测
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
//**************** 预填
async function reader1() {
    let {title,catagory,content:mycontent,photo:cover} =await fetch(`http://localhost:3000/news/${id}`).then(res=>res.json())
    //console.log(obj)
    //填写
    document.getElementById("newstitle").value=title
    document.getElementById("sort").value=catagory
    //新闻内容
    editor.setHtml(`${mycontent}`)

    content=mycontent//防止不修改，提交空内容
    photo=cover//图片的
}
reader1()


