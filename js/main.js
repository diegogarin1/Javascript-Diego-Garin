const comidas = {
    "taco": 100,
    "burrito": 150,
    "nacho": 80,
    "coca cola": 70
  };

  //Funciones

  function pedirComida() {
    let comida;
    do {
      comida = prompt("¿Qué producto desea agregar a su pedido? (taco, burrito, nacho, coca cola)");
    } while (!comidas.hasOwnProperty(comida));
    return comida;
  }
  
  function pedirCantidad(comida) {
    let cantidad;
    do {
      cantidad = parseInt(prompt(`¿Cuántas ${comida}s desea agregar a su pedido?`));
    } while (isNaN(cantidad) || cantidad <= 0);
    return cantidad;
  }
  
  //Almacenar orden

  const orden = {};

  //Ejecutar orden

  let continuarOrdenando = true;
while (continuarOrdenando) {
  const comida = pedirComida();
  const cantidad = pedirCantidad(comida);
  orden[comida] = (orden[comida]) + cantidad;
  continuarOrdenando = confirm("¿Desea seguir ordenando?");
  console.log(orden)
}

//Mostrar orden

let total = 0;
for (const [comida, cantidad] of Object.entries(orden)) {
  const precio = comidas[comida];
  const subtotal = precio * cantidad;
  total += subtotal;
 alert(`${cantidad} ${comida}s - $${precio} c/u - subtotal: $${subtotal}`);
}
alert(`TOTAL: $${total}`);

