const formulario = document.getElementById("miFormulario");
const mensaje = document.getElementById("mensaje");

formulario.addEventListener("submit", function (e) {
  e.preventDefault(); // Simula el envío
  alert("Formulario enviado correctamente");
  mensaje.textContent = "Confirmación: Formulario enviado correctamente";
  mensaje.style.display = "block";

  // Borrar (resetear) el formulario
  this.reset();

  // Ocultar el mensaje después de 3 segundos
  setTimeout(() => {
    mensaje.style.display = "none";
  }, 3000);
});


function goHome() {
  window.location.href = "index.html";
}

// AMPLIACION

function abrirImagen(src) {

  document.getElementById("modalImagen").style.display = "flex";

  document.getElementById("imagenAmpliada").src = src;
}

function cerrarImagen() {

  document.getElementById("modalImagen").style.display = "none";
}


// AMPLIACION
