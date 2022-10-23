# Web Image Optimizer

![](https://i.ibb.co/NpmDcR3/wio.webp)

[![Required Node.JS >= v14.17.0](https://img.shields.io/static/v1?label=node&message=%3E=14.17.0&logo=node.js&color=3f893e&style=flat)](https://nodejs.org/about/releases)

## 👀 Overview

📦 Ready for Linux out of the box

🎯 Based on the official [preact-ts](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-preact-ts) template, project structure will be familiar to you  

🌱 Easily extendable and customizable  

💪 Defacto does NOT support Node.js API in the renderer process, Node.js is implemented in the backend with security in mind

🔩 Supports C/C++ native addons  

🖥 Easy to implement multiple windows  

## 🛫 Quick development

```sh
npm run dev
```

## 🛫 Build and generate AppImage
```sh
npm run build
```


## 📂 Directory structure

Familiar Preact application structure, just with `electron` folder on the top :wink:  
*Files in this folder will be separated from your Preact application and built into `dist/electron`*  

```tree
├── electron                  Electron-related code
│   ├── main                  Main-process source code
│   ├── preload               Preload-scripts source code
│   └── resources             Resources for the production build
│       ├── icon.icns             Icon for the application on macOS
│       ├── icon.ico              Icon for the application
│       ├── installerIcon.ico     Icon for the application installer
│       └── uninstallerIcon.ico   Icon for the application uninstaller
│
├── release                   Generated after production build, contains executables
│   └── {version}
│       ├── {os}-unpacked     Contains unpacked application executable
│       └── Setup.{ext}       Installer for the application
│
├── public                    Static assets
└── src                       Renderer source code, your Preact application
```

## 🚨 Be aware

This project does NOT integrate the Node.js API in the renderer process by default. If you DO NOT want to follow **Electron Security Concerns**, you might want to enable Node Integration. This way you will NOT have to expose the needed API by yourself.  

## ❔ FAQ

- [dependencies vs devDependencies](https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#dependencies-vs-devdependencies)
- [Using C/C++ native addons in renderer](https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#load-nodejs-cc-native-modules)
- [Node.js ESM packages](https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#nodejs-esm-packages) (e.g. `execa` `node-fetch`)