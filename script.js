// Cargar el SDK MiniKit de World
const mini = new window.MiniKit();

// Esperar a que World App active el entorno
mini.ready().then(() => {
  // Obtener información del usuario actual
  const user = mini.getUser();

  // Mostrar el nombre o dirección del usuario en pantalla
  const el = document.getElementById("user-info");
  if (user) {
    el.innerText = `Hola, ${user.displayName || user.walletAddress || "usuario"} 👋`;
  } else {
    el.innerText = "No se pudo obtener el usuario";
  }
}).catch((error) => {
  console.error("Error al iniciar MiniKit:", error);
  document.getElementById("user-info").innerText = "Error al cargar la mini‑app.";
});
