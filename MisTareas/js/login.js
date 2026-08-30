// <!-- REVISION OK 12-05-2026 -->

function login() {

    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;
    // --------------------------------------------------------
    if (usuario === "" || password === "") {
        alert("Completa los campos");
        return;
    }
    // --------------------------------------------------------
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // BUSCAR SOLO POR USUARIO
    let user = usuarios.find(u => u.usuario === usuario);

    // --------------------------------------------------------
    // ❌ NO EXISTE USUARIO → LO CREAS
    if (!user) {
        let nuevoUsuario = {
            usuario: usuario,
            password: password,
            tareas: []
        };
        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

    } else {
        // ❌ USUARIO EXISTE → COMPROBAR CONTRASEÑA
        if (user.password !== password) {
            alert("Contraseña incorrecta");
            return;
        }
    }
    // ✅ LOGIN CORRECTO: Se almacena en el NAVEGADOR
    localStorage.setItem("usuarioActivo", usuario);

    // --------------------------------------------------------
    // limpiar inputs
    document.getElementById("usuario").value = "";
    document.getElementById("password").value = "";
    // --------------------------------------------------------

    window.location.href = "tareas.html";
}


//  ✅ ❌












// function login() {

//     const usuario = document.getElementById("usuario").value;
//     const password = document.getElementById("password").value;

//     if (usuario === "" || password === "") {
//         alert("Completa los campos");
//         return;
//     }

//     let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

//     let existe = usuarios.find(u =>
//         u.usuario === usuario &&
//         u.password === password
//     );

//     // Si no existe → crear usuario
//     if (!existe) {

//         let nuevoUsuario = {
//             usuario: usuario,
//             password: password,
//             tareas: []
//         };

//         usuarios.push(nuevoUsuario);

//         localStorage.setItem("usuarios", JSON.stringify(usuarios));
//     }

//     // Guardar sesión
//     localStorage.setItem("usuarioActivo", usuario);

//     // Limpiar inputs (AQUÍ SÍ VA BIEN)
//     document.getElementById("usuario").value = "";
//     document.getElementById("password").value = "";

//     // Entrar al gestor
//     window.location.href = "tareas.html";
// }