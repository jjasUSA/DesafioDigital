let palabras = JSON.parse(localStorage.getItem("palabras")) || [];

// ================= GUARDAR =================

function guardarDatos() {
    localStorage.setItem("palabras", JSON.stringify(palabras));
}

// ================= INICIO =================

window.onload = function () {
    mostrarVocabulario();
};

// ================= MENU =================

function mostrarSeccion(seccion) {

    if (seccion === "vocabulario") {
        mostrarVocabulario();
    }

    if (seccion === "examen") {
        mostrarExamen();
    }
}

// ================= VOCABULARIO =================

function mostrarVocabulario() {

    let html = `
        <h2>📚 Vocabulario</h2>

        <input id="ing" placeholder="Inglés">

        <input id="esp" placeholder="Español">

        <div class="toolbar">

            <button onclick="agregarPalabra()">
                ➕ Añadir
            </button>

            <button onclick="borrarTodo()">
                🧨 Borrar TODO
            </button>

            <button onclick="recuperarLocal()">
                🔄 Recuperar
            </button>

            <button onclick="exportarJSON()">
                💾 Exportar
            </button>

        </div>

        <div class="toolbar">

            <label class="file-btn">

                📂 Importar archivo

                <input 
                    type="file"
                    onchange="importarJSON(event)"
                >

            </label>

        </div>

        <h3>Lista</h3>
    `;

    palabras.forEach((p, i) => {

        html += `
            <div class="caja">

                <div class="fila">

                    <div>

                        <span class="palabra-ingles">
                            ${i + 1}. ${p.ing}
                        </span>

                        - ${p.esp}

                    </div>

                    <div class="botones">

                        <button onclick="reproducirAudio('${p.ing}')">
                            🔊
                        </button>

                        <button onclick="editar(${i})">
                            ✏️
                        </button>

                        <button onclick="eliminar(${i})">
                            ❌
                        </button>

                    </div>

                </div>

            </div>
        `;
    });

    document.getElementById("contenido").innerHTML = html;
}

// ================= AÑADIR =================

function agregarPalabra() {

    let ing = document.getElementById("ing").value.trim();

    let esp = document.getElementById("esp").value.trim();

    if (!ing || !esp) {
        alert("Rellena campos");
        return;
    }

    palabras.push({
        ing,
        esp
    });

    guardarDatos();

    mostrarVocabulario();
}

// ================= ELIMINAR =================

function eliminar(i) {

    palabras.splice(i, 1);

    guardarDatos();

    mostrarVocabulario();
}

// ================= BORRAR TODO =================

function borrarTodo() {

    if (!confirm("⚠️ ¿Seguro que quieres borrar TODO?")) {
        return;
    }

    palabras = [];

    guardarDatos();

    mostrarVocabulario();
}

// ================= EDITAR =================

function editar(i) {

    let p = palabras[i];

    let html = `
        <h2>✏️ Editar</h2>

        <input id="ing" value="${p.ing}">

        <input id="esp" value="${p.esp}">

        <button onclick="guardarEdicion(${i})">
            💾 Guardar
        </button>

        <button onclick="mostrarVocabulario()">
            ⬅️ Volver
        </button>
    `;

    document.getElementById("contenido").innerHTML = html;
}

function guardarEdicion(i) {

    palabras[i].ing =
        document.getElementById("ing").value.trim();

    palabras[i].esp =
        document.getElementById("esp").value.trim();

    guardarDatos();

    mostrarVocabulario();
}

// ================= AUDIO =================

function reproducirAudio(texto) {

    let voz =
        new SpeechSynthesisUtterance(texto);

    voz.lang = "en-US";

    speechSynthesis.speak(voz);
}

// ================= RECUPERAR =================

function recuperarLocal() {

    let datos =
        localStorage.getItem("palabras");

    if (!datos) {
        alert("No hay datos");
        return;
    }

    palabras = JSON.parse(datos);

    mostrarVocabulario();
}

// ================= EXPORTAR =================

function exportarJSON() {

    let blob = new Blob(
        [JSON.stringify(palabras, null, 2)],
        {
            type: "application/json"
        }
    );

    let url = URL.createObjectURL(blob);

    let a = document.createElement("a");

    a.href = url;

    a.download = "palabras.json";

    a.click();

    URL.revokeObjectURL(url);
}

// ================= IMPORTAR =================

function importarJSON(event) {

    let file = event.target.files[0];

    if (!file) return;

    let reader = new FileReader();

    reader.onload = function (e) {

        try {

            palabras =
                JSON.parse(e.target.result);

            guardarDatos();

            mostrarVocabulario();

        } catch {

            alert("JSON inválido");
        }
    };

    reader.readAsText(file);
}

// ================= EXAMEN =================

function mostrarExamen() {

    let html = `
        <h2>📝 Examen</h2>

        <input
            id="num"
            type="number"
            min="1"
            placeholder="Número preguntas"
        >

        <button
            class="btn-green"
            onclick="iniciarExamen()"
        >
            Empezar
        </button>
    `;

    document.getElementById("contenido").innerHTML = html;
}

// ================= INICIAR =================

function iniciarExamen() {

    let num =
        parseInt(
            document.getElementById("num").value
        );

    if (palabras.length === 0) {

        alert("IMPOSIBLE pues no has vocabulario");

        return;
    }

    if (!num || num <= 0) {

        alert("Número inválido");

        return;
    }

    if (num > palabras.length) {

        alert("No hay suficientes palabras");

        return;
    }

    let seleccionadas =
        [...palabras]
            .sort(() => Math.random() - 0.5)
            .slice(0, num);

    window.examenActual = seleccionadas;

    let html = `<h3>Test</h3>`;

    seleccionadas.forEach((p, i) => {

        let opciones =
            generarOpciones(p);

        html += `
            <div class="caja">

                <div class="palabra-ingles">
                    ${i + 1}. ${p.ing}
                </div>
        `;

        opciones.forEach(op => {

            html += `
                <div class="opcion">

                    <label>

                        <input
                            type="radio"
                            name="p${i}"
                            value="${op}"
                        >

                        ${op}

                    </label>

                </div>
            `;
        });

        html += `</div>`;
    });

    html += `
        <button
            class="btn-green"
            onclick="corregir()"
        >
            Corregir
        </button>
    `;

    document.getElementById("contenido").innerHTML = html;
}

// ================= OPCIONES =================

function generarOpciones(correcta) {

    let ops = [correcta.esp];

    while (ops.length < 4) {

        let r =
            palabras[
                Math.floor(
                    Math.random() * palabras.length
                )
            ].esp;

        if (!ops.includes(r)) {
            ops.push(r);
        }
    }

    return ops.sort(() => Math.random() - 0.5);
}

// ================= CORREGIR =================

function corregir() {

    let nota = 0;
    let falladas = 0;
    let enBlanco = 0;

    examenActual.forEach((p, i) => {

        let radios =
            document.getElementsByName(`p${i}`);

        let caja =
            document.querySelectorAll(".caja")[i];

        let seleccion = null;

        radios.forEach(r => {

            if (r.checked) {
                seleccion = r;
            }
        });

        // 🔵 SIN RESPUESTA

        if (!seleccion) {

            caja.classList.add("azul");

            enBlanco++;

            radios.forEach(r => {

                let label = r.parentElement;

                if (r.value === p.esp) {

                    label.style.background =
                        "#ccffcc";

                    label.style.color = "#000";

                    label.style.padding = "4px";

                    label.style.borderRadius =
                        "6px";
                }
            });

            return;
        }

        // 🟢 CORRECTA

        if (seleccion.value === p.esp) {

            caja.classList.add("verde");

            nota++;
        }

        // 🌸 FALLADA

        else {

            caja.classList.add("rosa");

            falladas++;

            radios.forEach(r => {

                let label = r.parentElement;

                // correcta

                if (r.value === p.esp) {

                    label.style.background =
                        "#ccffcc";

                    label.style.color = "#000";
                }

                // marcada

                if (r.checked) {

                    label.style.background =
                        "#ffb6c1";

                    label.style.color = "#000";
                }

                label.style.padding = "4px";

                label.style.borderRadius = "6px";
            });
        }
    });

    alert(
        `🟢 Acertadas: ${nota}
❌ Falladas: ${falladas}
🔵 En blanco: ${enBlanco}
📊 Total: ${examenActual.length}`
    );
}