const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  // Function to minimize the window
  minimizeWindow: () => ipcRenderer.send("window:minimize"),

  // Function to close the window
  closeWindow: () => ipcRenderer.send("window:close"),

  // Function to handle notifications (example)
  sendNotification: (title, body) => {
    ipcRenderer.send("notification:send", { title, body });
  },

  // Add more APIs as needed
});
