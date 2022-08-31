const electron=require('electron')
const app=electron.app;
const BrowserWindow=electron.BrowserWindow;
const path=require('path');
const url=require('url');


let win;
function createWindow(){
    win=new BrowserWindow({title:'Parent Window',width:800,height:800});
    
    let secondWindow=new BrowserWindow({parent:win,modal:false,title:'child Window',frame:true,show:false})
    secondWindow.loadURL('https://github.com/aminos02/ElectronJs/blob/main/index.js')
    secondWindow.once('ready-to-show',()=>{
        secondWindow.show();
    })

}

app.on('ready',createWindow)

app.on('window-all-closed',()=>{
    if(process.platform!=='darwin'){
        app.quit()
    }
});

app.on('activate',()=>{
    if(win==null)createWindow()
})
