// Inicializar MiniKit
const mini = new window.MiniKit();

// Seleccionamos el elemento HTML donde mostraremos los datos
const userInfoEl = document.getElementById("user-info");

// Esperar a que World App cargue el entorno MiniApp
mini.ready().then(() => {
  const user = mini.getUser();

  if (user && user.walletAddress) {
    const username = user.username || "Usuario sin nombre";
    const wallet = user.walletAddress;
    const os = user.deviceOS || "Desconocido";
    const version = user.worldAppVersion || "n/a";

    userInfoEl.innerText = `
      👋 Hola, ${username}
      💼 Wallet: ${wallet}
      📱 Sistema: ${os}
      🔢 Versión de World App: ${version}
    `;
  } else {
    userInfoEl.innerText = "No se pudo obtener la información del usuario dentro de World App.";
  }

}).catch((error) => {
  console.error("Error al iniciar MiniKit:", error);
  userInfoEl.innerText = "Esta MiniApp solo funciona dentro de la aplicación World App.";
});
