process.env.DIST_ELECTRON = join(__dirname, '../..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : join(process.env.DIST_ELECTRON, '../public')

process.env.NODE_ENV === "production"

const isDev = process.env.NODE_ENV === "development" ? true : false
const isMac = process.platform === "darwin" ? true : false


import { app, BrowserWindow, shell, ipcMain, Menu, dialog } from 'electron';
import os, { release } from 'os'
import path, { join } from 'path'
import sharp from "sharp"

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

let win: BrowserWindow | null = null
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')

async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    icon: join(process.env.PUBLIC, 'favicon.svg'),
    webPreferences: {
      preload,
      nodeIntegration: false,
      contextIsolation: true,
      devTools: !app.isPackaged
    },
  })

  if (app.isPackaged) {
    win.loadFile(indexHtml)
  } else {
    win.loadURL(url)
    // win.webContents.openDevTools()
  }

  const template = [];

  template.push(
    ...(isMac ? [{ role: "appMenu" }] : []),
  );
  template.push({ role: 'fileMenu' });
  template.push(...(isDev ? [{
    label: "Developer",
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  }] : []),);
  template.push({
    label: 'View',
    submenu: [
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  });

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  ipcMain.on("shrink-message", (_event, args) => {
    dialog.showOpenDialog({ title: 'Choose an Image', properties: ['openFile'] })
      .then((res) => {
        if (res.canceled) {
          console.log("No file selected");
        } else {
          const filePath = res.filePaths[0];
          const fileExt = path.basename(filePath);
          const imageOut = path.join(os.homedir(), `Pictures/${fileExt}.cmiz`);
  
          if (path.extname(filePath).match(/\.(jpe?g)$/i)) {
            sharp(filePath)
              .jpeg({
                mozjpeg: true,
                quality: args.imageQuality
              })
              .toFile(imageOut, (err: Error, info: sharp.OutputInfo) => {
                if (err) {
                  console.error(err);
                }
                console.log(info);
                win.webContents.send("shrinkRes", "JPG Optimized");
              })
          }
          else if (path.extname(filePath).match(/\.(png)$/i)) {
            sharp(filePath)
              .png({
                quality: args.imageQuality
              })
              .toFile(imageOut, (err: Error, info: sharp.OutputInfo) => {
                if (err) {
                  console.error(err);
                  win.webContents.send("shrinkRes", "Error!");
                  return;
                }
                console.log(info);
                win.webContents.send("shrinkRes", "PNG Optimized");
              })
          } 
          else {
            win.webContents.send("shrinkRes", "Error!");
          }
        }
      })
  })

  //This is the imagePath from rendererProcess
  ipcMain.on("convert-message", () => {
    dialog.showOpenDialog({ title: 'Choose an Image', properties: ['openFile'] })
      .then((res) => {
        if (res.canceled) {
          console.log("No file was selected")
        } else {
          const filePath = res.filePaths[0];
          const fileName = path.basename(filePath, path.extname(filePath));
          const imageOut = path.join(os.homedir(), `Pictures/${fileName}.webp`);

          sharp(filePath)
            .webp({ quality: 75 })
            .toFile(imageOut, (err: Error, info: sharp.OutputInfo) => {
              if (err) {
                console.error(err);
                win.webContents.send("convertRes", "Error!");
                return;
              }
              console.log(info);
              win.webContents.send("convertRes", "Image Converted");
          })
        }
    })
      
  })


  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})
