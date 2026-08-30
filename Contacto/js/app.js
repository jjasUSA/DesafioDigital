document.addEventListener("DOMContentLoaded", () => {

    // ============================
    // ELEMENTOS
    // ============================

    const formulario = document.getElementById("miFormulario");
    const mensaje = document.getElementById("mensaje");
    const listaMensajes = document.getElementById("listaMensajes");

    const nombreInput = document.getElementById("nombre");
    const emailInput = document.getElementById("email");
    const telefonoInput = document.getElementById("telefono");
    const cpInput = document.getElementById("cp");
    const asuntoInput = document.getElementById("asunto");
    const mensajeInput = document.getElementById("mensajeTexto");

    const botonNuevo = document.getElementById("nuevoMensaje");

    let editandoID = null;

    // ============================
    // REGEX
    // ============================

    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,50}$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexTelefono = /^[0-9]{9}$/;
    const regexCP = /^[0-9]{5}$/;

    // ============================
    // INICIO
    // ============================

    mostrarMensajes();

    // ============================
    // SUBMIT FORM
    // ============================

    formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = nombreInput.value.trim();
        const email = emailInput.value.trim();
        const telefono = telefonoInput.value.trim();
        const cp = cpInput.value.trim();
        const asunto = asuntoInput.value;
        const mensajeTexto = mensajeInput.value.trim();

        if (!regexNombre.test(nombre)) {
            return mostrarMensaje("❌ Nombre inválido", false);
        }

        if (!regexEmail.test(email)) {
            return mostrarMensaje("❌ Email inválido", false);
        }

        if (telefono !== "" && !regexTelefono.test(telefono)) {
            return mostrarMensaje("❌ Teléfono inválido", false);
        }

        if (!regexCP.test(cp)) {
            return mostrarMensaje("❌ Código postal inválido", false);
        }

        if (mensajeTexto.length < 10) {
            return mostrarMensaje("❌ Mensaje demasiado corto", false);
        }

        const nuevoMensaje = {
            id: editandoID || Date.now(),
            nombre,
            email,
            telefono,
            cp,
            asunto,
            mensajeTexto
        };

        let mensajes = JSON.parse(localStorage.getItem("mensajes")) || [];

        if (editandoID) {
            mensajes = mensajes.map(m =>
                m.id === editandoID ? nuevoMensaje : m
            );
            mostrarMensaje("✅ Mensaje actualizado", true);
        } else {
            mensajes.push(nuevoMensaje);
            mostrarMensaje("✅ Mensaje guardado", true);
        }

        localStorage.setItem("mensajes", JSON.stringify(mensajes));

        formulario.reset();
        editandoID = null;

        mostrarMensajes();
    });

    // ============================
    // NUEVO MENSAJE
    // ============================

    botonNuevo.addEventListener("click", () => {
        formulario.reset();
        editandoID = null;
        mensaje.style.display = "none";
    });

    // ============================
    // MOSTRAR MENSAJES
    // ============================

    function mostrarMensajes() {

        const mensajes = JSON.parse(localStorage.getItem("mensajes")) || [];

        listaMensajes.innerHTML = "";

        if (mensajes.length === 0) {
            listaMensajes.innerHTML = "<p>No hay mensajes guardados.</p>";
            return;
        }

        mensajes.forEach(m => {

            const div = document.createElement("div");

            div.classList.add("mensaje-item");

            div.innerHTML = `
                <h3>${m.nombre}</h3>
                <p><strong>Asunto:</strong> ${m.asunto}</p>

                <button onclick="leerMensaje(${m.id})">Leer</button>
                <button onclick="editarMensaje(${m.id})">Editar</button>
                <button onclick="eliminarMensaje(${m.id})">Eliminar</button>
            `;

            listaMensajes.appendChild(div);
        });
    }

    // ============================
    // LEER
    // ============================

    window.leerMensaje = function (id) {

        const mensajes = JSON.parse(localStorage.getItem("mensajes")) || [];

        const m = mensajes.find(x => x.id === id);

        if (!m) return;

        nombreInput.value = m.nombre;
        emailInput.value = m.email;
        telefonoInput.value = m.telefono;
        cpInput.value = m.cp;
        asuntoInput.value = m.asunto;
        mensajeInput.value = m.mensajeTexto;
    };

    // ============================
    // EDITAR
    // ============================

    window.editarMensaje = function (id) {

        const mensajes = JSON.parse(localStorage.getItem("mensajes")) || [];

        const m = mensajes.find(x => x.id === id);

        if (!m) return;

        editandoID = id;

        nombreInput.value = m.nombre;
        emailInput.value = m.email;
        telefonoInput.value = m.telefono;
        cpInput.value = m.cp;
        asuntoInput.value = m.asunto;
        mensajeInput.value = m.mensajeTexto;

        mostrarMensaje("✏️ Modo edición activado", true);
    };

    // ============================
    // ELIMINAR
    // ============================

    window.eliminarMensaje = function (id) {

        let mensajes = JSON.parse(localStorage.getItem("mensajes")) || [];

        mensajes = mensajes.filter(m => m.id !== id);

        localStorage.setItem("mensajes", JSON.stringify(mensajes));

        mostrarMensajes();

        mostrarMensaje("🗑️ Mensaje eliminado", false);
    };

    // ============================
    // MENSAJE UI
    // ============================

    function mostrarMensaje(texto, ok) {

        mensaje.style.display = "block";
        mensaje.textContent = texto;

        if (ok) {
            mensaje.style.color = "#00ff99";
            mensaje.style.border = "2px solid #00ff99";
        } else {
            mensaje.style.color = "#ff4d4d";
            mensaje.style.border = "2px solid #ff4d4d";
        }
    }

});