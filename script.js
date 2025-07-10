// Inicializar MiniKit
const mini = new window.MiniKit();

// Elemento del DOM donde se mostrará el usuario
const userInfoEl = document.getElementById("user-info");

// Esperar a que el entorno esté listo (solo ocurre dentro de World App)
mini.ready().then(() => {
  const user = mini.getUser();

  // Comprobamos si existe user y walletAddress
  if (user && user.walletAddress) {
    const username = user.username || "usuario anónimo";
    const wallet = user.walletAddress;
    const os = user.deviceOS || "desconocido";
    const version = user.worldAppVersion || "n/a";

    userInfoEl.innerText = `Hola, ${username} 👋\nWallet: ${wallet}\nOS: ${os}\nVersión: ${version}`;
  } else {
    userInfoEl.innerText = "No se pudo obtener la información del usuario.";
  }

}).catch((error) => {
  console.error("Error al iniciar MiniKit:", error);
  userInfoEl.innerText = "Esta MiniApp solo funciona dentro de World App.";
});
