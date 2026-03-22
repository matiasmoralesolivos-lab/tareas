let tareas = [
  { id: 6, descripcion: "Estudiar", completado: true },
  { id: 23, descripcion: "Ir al super", completado: false },
  { id: 24, descripcion: "terminar desafio", completado: false },
];
console.log("Tareas iniciales:", tareas);
let ultimoId = 0;

function generarId() {
  ultimoId++;
  return ultimoId;
}

function agregarTarea() {
  const input = document.getElementById("inputTarea");
  const texto = input.value.trim();

  if (texto === "") {
    alert("La tarea no puede estar vacía");
    return;
  }

  tareas.push({
    id: generarId(),
    descripcion: texto,
    completado: false,
  });

  input.value = "";
  render();
}

function toggleTarea(id) {
  const tarea = tareas.find((t) => t.id === id);
  tarea.completado = !tarea.completado;
  render();
}

function eliminarTarea(id) {
  tareas = tareas.filter((t) => t.id !== id);
  render();
}

function actualizarResumen() {
  const total = tareas.length;

  const realizadas = tareas.filter((t) => t.completado).length;

  document.getElementById("total").textContent = total;
  document.getElementById("realizadas").textContent = realizadas;
}

function render() {
  const contenedor = document.getElementById("listaTareas");
  contenedor.innerHTML = "";

  tareas.forEach((tarea) => {
    const div = document.createElement("div");
    div.className = "fila";

    div.innerHTML = `
      <span>${tarea.id}</span>

      <span class="${tarea.completado ? "tachado" : ""}">
        ${tarea.descripcion}
        ${tarea.completado ? " (realizado)" : ""}
      </span>

      <div>
        <input type="checkbox" 
          ${tarea.completado ? "checked" : ""} 
          onchange="toggleTarea(${tarea.id})">

        <span class="eliminar" onclick="eliminarTarea(${tarea.id})">❌</span>
      </div>
    `;

    contenedor.appendChild(div);
  });

  actualizarResumen();
}

render();
