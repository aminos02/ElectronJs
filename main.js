const electron=require('electron')
const app=electron.app;
const BrowserWindow=electron.BrowserWindow;
const path=require('path');
const url=require('url');
console.log('from main.js')

let winOne,winTwo;
function createWindow(){
    winOne=new BrowserWindow();
    winOne.loadURL(url.format({
        pathname:path.join(__dirname,'index1.html'),
        protocol:'file',
        slashes:true
    }));
    winOne.webContents.openDevTools();
    winOne.on('closed',()=>{
        winOne=null;
    });

    winTwo=new BrowserWindow();
    winTwo.loadURL(url.format({
        pathname:path.join(__dirname,'index2.html'),
        protocol:'file',
        slashes:true
    }));
    winTwo.webContents.openDevTools();
    winTwo.on('closed',()=>{
        winTwo=null;
    });
}

app.on('ready',createWindow)

app.on('window-all-closed',()=>{
    if(process.platform!=='darwin'){
        app.quit()
    }
});

app.on('activate',()=>{
    if(winOne && winTwo==null)createWindow()
})
