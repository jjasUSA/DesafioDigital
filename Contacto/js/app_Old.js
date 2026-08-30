// app.js

document.addEventListener("DOMContentLoaded", () => {

    // ============================
    // ELEMENTOS DEL DOM
    // ============================
    const formulario = document.getElementById("miFormulario");
    const mensaje = document.getElementById("mensaje");

    // ============================
    // EXPRESIONES REGULARES
    // ============================

    // Nombre: solo letras y espacios
    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,50}$/;

    // Email válido
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Teléfono español: exactamente 9 números
    const regexTelefono = /^[0-9]{9}$/;

    // Código Postal España: 5 números
    const regexCP = /^[0-9]{5}$/;

    // ============================
    // EVENTO SUBMIT
    // ============================
    formulario.addEventListener("submit", (e) => {

        e.preventDefault();

        // ============================
        // OBTENER VALORES
        // ============================
        const nombre = formulario.querySelector('input[type="text"]').value.trim();
        const email = formulario.querySelector('input[type="email"]').value.trim();
        const telefono = formulario.querySelector('input[type="tel"]').value.trim();
        const cp = formulario.querySelector('input[type="number"]').value.trim();
        const asunto = formulario.querySelector("select").value;
        const mensajeTexto = formulario.querySelector("textarea").value.trim();

        // ============================
        // VALIDACIONES
        // ============================

        // VALIDAR NOMBRE
        if (!regexNombre.test(nombre)) {
            mostrarMensaje("❌ El nombre solo puede contener letras y espacios.", false);
            return;
        }

        // VALIDAR EMAIL
        if (!regexEmail.test(email)) {
            mostrarMensaje("❌ Introduce un correo electrónico válido.", false);
            return;
        }

        // VALIDAR TELÉFONO
        if (telefono !== "" && !regexTelefono.test(telefono)) {
            mostrarMensaje("❌ El teléfono debe contener exactamente 9 números.", false);
            return;
        }

        // VALIDAR CÓDIGO POSTAL
        if (!regexCP.test(cp)) {
            mostrarMensaje("❌ El código postal debe tener 5 números.", false);
            return;
        }

        // VALIDAR ASUNTO
        if (asunto === "") {
            mostrarMensaje("❌ Debes seleccionar un asunto.", false);
            return;
        }

        // VALIDAR MENSAJE
        if (mensajeTexto.length < 10) {
            mostrarMensaje("❌ El mensaje debe tener al menos 10 caracteres.", false);
            return;
        }

        // ============================
        // SIMULACIÓN ENVÍO
        // ============================

        mostrarMensaje("⏳ Enviando mensaje...", true);

        setTimeout(() => {

            mostrarMensaje("✅ Mensaje enviado correctamente.", true);

            // Resetear formulario
            formulario.reset();

        }, 2000);

    });

    // ============================
    // FUNCIÓN MENSAJES
    // ============================
    function mostrarMensaje(texto, correcto) {

        mensaje.style.display = "block";
        mensaje.textContent = texto;

        if (correcto) {
            mensaje.style.color = "#00ff99";
            mensaje.style.border = "2px solid #00ff99";
            mensaje.style.boxShadow = "0 0 15px #00ff99";
        } else {
            mensaje.style.color = "#ff4d4d";
            mensaje.style.border = "2px solid #ff4d4d";
            mensaje.style.boxShadow = "0 0 15px #ff4d4d";
        }
    }

});