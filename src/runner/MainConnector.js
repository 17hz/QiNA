const { ipcMain, dialog, shell, Menu } = require("electron");
const settings = require('electron-settings');
const path = require("path")
const moment = require('moment');
const qn = require('qn');
const {clipboard} = require('electron')

const transliteration = require("transliteration")

ipcMain.on("openLink", (event, arg) => {
  shell.openItem(arg);
});

ipcMain.on("SaveKeys",(event,arg) => {
    settings.set("Keys",{
        Access:arg.Access,
        Secret:arg.Secret,
        Bucket:arg.Bucket,
        Domain:arg.Domain
    })
})

ipcMain.on("getKeys", (event,arg) => {
   let keys = settings.get("Keys")
   event.sender.send("LoadKeys",keys)
})


ipcMain.on('upFile', (event, arg) => {
    let val = settings.get('Keys')

     let returnMsg;
    console.log(arg)
      if (val == undefined) {
        returnMsg = {
          state: false,
          err: '未配置'
        }
        event.sender.send('qina', returnMsg) 
        return false;
      }
  
      if (val.Access == null || val.Bucket == null || val.Domain == null || val.Secret == null) {
        returnMsg = {
          state: false,
          err: '配置不全'
        }
        event.sender.send('qina', returnMsg)
        return false;
      }
  
      var key = transliteration.slugify(arg.Name) + '(' + moment().format() + ')' + path.extname(arg.Name);
      var filePath = path.normalize(arg.Path);
  
      var client = qn.create({
        accessKey: val.Access,
        secretKey: val.Secret,
        bucket: val.Bucket,
        origin: val.Domain,
      });
  
      console.log('qn 开始上传');
      client.uploadFile(filePath, {
        key: key
      }, function(err, ret) {
        console.log(ret);
  
        if (!err) {
          returnMsg = {
            state: true,
            hash: ret.hash,
            key: ret.key
          }
  
          settings.set('Files', {
            name: ret.key,
            domain: val.Domain
          })
          console.log(returnMsg);
          event.sender.send('qina', returnMsg)
        } else {
          returnMsg = {
            state: false,
            err: err
          }
          console.log(returnMsg);
          event.sender.send('qina', returnMsg)
        }
  
      });
  
  
  })


  ipcMain.on('getLink', (event, arg) => {
   let val =  settings.get('Files');
      event.sender.send('Files', val);
      clipboard.writeText(val.domain+"/"+val.name)
  })