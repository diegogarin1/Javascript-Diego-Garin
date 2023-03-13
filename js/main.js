class Comida {
  constructor(id, nombre, precio) {
    this.id = id
    this.nombre = nombre
    this.precio = precio

  }
};

const taco = new Comida(1, 'Taco', 100)
const burrito = new Comida(2, 'Burrito', 150)
const nacho = new Comida(3, 'Nacho', 80)
const coca = new Comida(4, 'Coca cola', 70)

const comidas = [taco, burrito, nacho, coca]

const orden = [];

function pedirComida() {
  let comidaEscogida;
  comidaEscogida = prompt("¿Qué producto desea agregar a su pedido? (taco, burrito, nacho, coca cola)");
  const comida = comidas.find((comida) => comida.nombre.toLowerCase().trim() === comidaEscogida.toLowerCase().trim())

  if (comida) {
    pedirCantidad(comida.nombre);
  } else {
    alert('Escoge un producto correcto: taco, burrito, nacho o coca cola');
    pedirComida();
  }
}

function pedirCantidad(comidaEscogida) {
  let cantidadAñadida = parseInt(prompt(`¿Cuántas ${comidaEscogida}s desea agregar a su pedido?`));
  const comida = comidas.find((comida) => comida.nombre.toLowerCase().trim() === comidaEscogida.toLowerCase().trim())

  if (cantidadAñadida >= 0) {
    orden.push({ comida: comidaEscogida, cantidad: cantidadAñadida, precio: comida.precio });
    seguirPidiendo();
  } else {
    alert('Ingrese cantidad correcta:');
    pedirCantidad(comidaEscogida);
  }
}

function seguirPidiendo() {
  let seguir = prompt('¿Desea seguir pidiendo? (S/N)');
  if (seguir.toLowerCase() === 's') {
    pedirComida();
  } else if (seguir.toLowerCase() === 'n') {
    mostrarOrden();
  } else {
    alert('Ingrese una opción válida.');
    seguirPidiendo();
  }
}

function mostrarOrden() {
  let precioTotal = 0;
  alert(`Su orden es la siguiente:`);
  orden.forEach((item) => {
    alert(`${item.cantidad} ${item.comida}(s) a ${item.precio} cada una`);
    precioTotal += item.precio * item.cantidad;
  });
  alert(`El precio total de su orden es: ${precioTotal}`);
}

pedirComida();
