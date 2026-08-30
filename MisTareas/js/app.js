// <!-- REVISION OK 12-05-2026 -->
// --------------------------------------------------------
// USUARIO ACTIVO (PROTECCION)
let usuarioActivo = localStorage.getItem("usuarioActivo");

if (!usuarioActivo) {
    window.location.href = "login.html";
}

// --------------------------------------------------------
// ELEMENTOS
const formTarea = document.getElementById('form-tarea');
const inputTarea = document.getElementById('nueva-tarea');
const listaTareas = document.getElementById('lista');
const contador = document.getElementById('contador');

const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');

let filtro = 'todas';

// ======================
// USUARIOS
// ======================
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

document.getElementById("usuario-activo").textContent =
    "Usuario: " + usuarioActivo;

// --------------------------------------------------------
// GUARDAR TAREAS
function guardarTareas() {
    let user = usuarios.find(u => u.usuario === usuarioActivo);
    if (!user) return;
    let tareas = [];
    document.querySelectorAll("#lista li").forEach(li => {

        tareas.push({
            texto: li.querySelector("span").textContent,
            completada: li.style.textDecoration === "line-through"
        });
    });
    user.tareas = tareas;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// --------------------------------------------------------
// CONTADOR
function actualizarContador() {
    let pend = 0;
    let comp = 0;
    document.querySelectorAll("#lista li").forEach(li => {

        if (li.style.textDecoration === "line-through") {
            comp++;
        } else {
            pend++;
        }
    });
    contador.textContent =
        `Pendientes: ${pend} / Completadas: ${comp}`;
}


// --------------------------------------------------------
// AGREGAR TAREA
formTarea.addEventListener("submit", e => {
    e.preventDefault();
    const texto = inputTarea.value.trim();

    if (texto === "") return;
    const li = document.createElement("li");

    // TEXTO
    const span = document.createElement("span");
    span.textContent = texto;

    // BOTÓN ELIMINAR
    const btn = document.createElement("button");
    btn.textContent = "Eliminar";

    btn.onclick = () => {
        li.remove();
        guardarTareas();
        actualizarContador();
    };

    li.appendChild(span);
    li.appendChild(btn);

    listaTareas.appendChild(li);
    inputTarea.value = "";

    guardarTareas();
    actualizarContador();
});


// --------------------------------------------------------
// MARCAR COMPLETADA
listaTareas.addEventListener("click", e => {
    if (e.target.tagName === "LI" || e.target.tagName === "SPAN") {
        let li = e.target.tagName === "LI"
            ? e.target
            : e.target.parentElement;
        if (li.style.textDecoration === "line-through") {
            li.style.textDecoration = "none";
        } else {
            li.style.textDecoration = "line-through";
        }
        guardarTareas();
        actualizarContador();
    }
});


// --------------------------------------------------------
// FILTROS
function setActive(e) {
    document.querySelectorAll(".menu-btn")
        .forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    filtro =
        e.target.id === "btn1"
            ? "todas"
            : e.target.id === "btn2"
                ? "pendientes"
                : "completadas";
    document.querySelectorAll("#lista li").forEach(li => {
        let comp = li.style.textDecoration === "line-through";
        if (filtro === "todas") li.style.display = "flex";
        if (filtro === "pendientes") li.style.display = comp ? "none" : "flex";
        if (filtro === "completadas") li.style.display = comp ? "flex" : "none";
    });
}
btn1.onclick = setActive;
btn2.onclick = setActive;
btn3.onclick = setActive;


// --------------------------------------------------------
// CARGAR TAREAS
window.onload = () => {
    let user = usuarios.find(u => u.usuario === usuarioActivo);
    if (!user) return;
    user.tareas.forEach(t => {
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.textContent = t.texto;
        if (t.completada) {
            li.style.textDecoration = "line-through";
        }
        const btn = document.createElement("button");
        btn.textContent = "Eliminar";
        btn.onclick = () => {
            li.remove();
            guardarTareas();
            actualizarContador();
        };
        li.appendChild(span);
        li.appendChild(btn);
        listaTareas.appendChild(li);
    });

    actualizarContador();
};

// --------------------------------------------------------
// CERRAR SESIÓN
function cerrarSesion() {
    localStorage.removeItem("usuarioActivo");
    window.location.href = "login.html";
}
// --------------------------------------------------------