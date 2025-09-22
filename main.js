const { app, BrowserWindow, session } = require("electron");

let mainWindow;

app.disableHardwareAcceleration();

app.on("ready", () => {
  const persistentSession = session.fromPartition("persist:harlyy");

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: __dirname + "/preload.js",
      session: persistentSession,
    },
  });

  // Load Harlyy website
  mainWindow.loadURL("https://www.harlyy.com/login");

  mainWindow.setMenuBarVisibility(false);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
