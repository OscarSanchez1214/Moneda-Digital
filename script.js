const mini = new window.MiniKit();
const currentUserEl = document.getElementById("current-user");
const resultEl = document.getElementById("resultado-busqueda");

mini.ready().then(() => {
  const user = mini.getUser();

  if (user && user.walletAddress) {
    currentUserEl.innerText = `👋 Hola, ${user.username || "usuario"}\nWallet: ${user.walletAddress}`;
  } else {
    currentUserEl.innerText = "No se pudo obtener el usuario actual.";
  }

}).catch((err) => {
  console.error(err);
  currentUserEl.innerText = "Esta MiniApp solo funciona dentro de World App.";
});

function buscarUsuario() {
  const input = document.getElementById("search").value.trim();

  if (!input) {
    resultEl.innerText = "Ingresa una dirección o nombre.";
    return;
  }

  const isAddress = input.startsWith("0x");

  const buscar = isAddress
    ? mini.getUserByAddress(input)
    : mini.getUserByUsername(input);

  buscar.then((user) => {
    if (!user) {
      resultEl.innerText = "Usuario no encontrado.";
      return;
    }

    resultEl.innerHTML = `
      👤 Nombre: ${user.username || "sin nombre"}<br>
      💼 Wallet: ${user.walletAddress}<br>
      🖼️ <img src="${user.profilePictureUrl || ''}" alt="Foto" width="80">
    `;
  }).catch((err) => {
    console.error("Error al buscar usuario:", err);
    resultEl.innerText = "Error al buscar usuario.";
  });
}

