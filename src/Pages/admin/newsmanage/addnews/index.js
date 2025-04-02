//文本编辑器，上传图片和视频没有配置 */
let user=localStorage.getItem("token")
/*新闻内容 */
let content=''

const { createEditor, createToolbar } = window.wangEditor

const editorConfig = {
    placeholder: '填写这里...',
    onChange(editor) {
      const html = editor.getHtml()
     
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

let photo=''
/*表单提交*/
newsinfo.onsubmit=async function(evt){
    evt.preventDefault()
    //
    await fetch("http://localhost:3000/news",{
        method:"post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            title:newstitle.value,
            content,
            catagory:sort.value,
            photo,
            //作者
            author:JSON.parse(user).username
        })
    }).then(res=>res.json())

    location.href="../newslist/index.html"
}

photofile.onchange= function(ev){
    //
    let reader=new FileReader()//对象

    reader.readAsDataURL(ev.target.files[0])//方法，转换
    
    reader.onload=function(e){
        photo=e.target.result
    }//转完了
}



