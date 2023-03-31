class Producto {
  constructor(id, nombre, precio, stock, img, descripcion) {
    this.id = id
    this.nombre = nombre
    this.precio = precio
    this.stock = stock
    this.img = img
    this.descripcion = descripcion

  }
};

const comidas = [
  new Producto("comida1", 'Taco Asada', 100, 10, "./images/623Beef.jpg", "Tacos de carne asada con salsa"),
  new Producto("comida2", 'Burrito', 150, 10, "./images/Burrito_V.jpg", "Burrito de carne asada"),
  new Producto("comida3", 'Nacho', 80, 10, "./images/Chips.jpg", "Chips de maiz con salsa"),
  new Producto("comida4", 'Taco Pastor', 70, 10, "./images/big.jpg", "Tacos al pastor con salsa"),
]

const bebidas = [
  new Producto("bebida1", 'Coca Cola', 40, 10, "./images/cocacola.jpeg", "Coca-Cola 500ml"),
  new Producto("bebida2", 'Cerveza Pacifico', 50, 10, "./images/pacifico.jpg", "Cerveza Pacifico 330ml"),
]

const productos = comidas.concat(bebidas)

console.log(productos);
//array pedido

let orden = []
for(let element of Object.keys(localStorage)) {
const objStorage = JSON.parse(localStorage.getItem(element))
if(objStorage === productos.id)
      orden.push(objStorage);
  }
console.log(orden);




//CARGAR PRODUCTOS

const contenedorOrden = document.querySelector("#container-orden");

let contenedorProductos = document.querySelector("#container-comidas");
function cargarProductos() {
  contenedorOrden.remove()
  function cargarComida() {
    comidas.forEach(comida => {
      let divcomida = document.createElement("div");
      divcomida.classList.add("card-comida")
      divcomida.innerHTML =
        `<img id="imagen-comida" src="${comida.img}" alt="${comida.nombre}">
       <h3>${comida.nombre}</h3>
       <p>${comida.descripcion}</p>
       <p>$${comida.precio}</p>
       <button id="${comida.id}" class="boton-agregar">Agregar</button>
`;
      contenedorProductos.append(divcomida);
    })
  }
  cargarComida();

  function cargarBebida() {
    bebidas.forEach(bebida => {
      let divbebida = document.createElement("div");
      divbebida.classList.add("card-bebida")
      divbebida.innerHTML =
        `<img id="imagen-comida" src="${bebida.img}" alt="${bebida.nombre}">
     <h3>${bebida.nombre}</h3>
     <p>${bebida.descripcion}</p>
     <p>$${bebida.precio}</p>
     <button id="${bebida.id}" class="boton-agregar">Agregar</button>
`;
      contenedorProductos.append(divbebida);
    })

  }
  cargarBebida();

}



cargarProductos();


//botones nav (no funciona por ahora)

//const menuCompleto = document.querySelector('#nav-completo');
//menuCompleto.onclick = () => {
//  contenedorProductos.remove();
//  main.append(cargarProductos());
//};
//const menuComidas = document.querySelector('#nav-comidas');
//menuComidas.onclick = () => {
//  contenedorProductos.remove();
//  cargarComida();
//};
//const menuBebidas = document.querySelector('#nav-bebidas');
//menuBebidas.onclick = () => {
//  contenedorProductos.remove();
//  cargarBebida();
//}


//funcion botones agregar
const botonesAgregar = document.querySelectorAll('.boton-agregar')

botonesAgregar.forEach(boton => {

  boton.onclick = () => {
    const prod = comidas.find((com) => com.id === boton.id)


    const comidaOrden = {

      id: prod.id,
      nombre: prod.nombre,
      precio: prod.precio,
      stock: prod.stock,
      cantidad: 1,
    }

    const comidaenOrden = orden.find(com => com.id === comidaOrden.id)


    if (!comidaenOrden) {
      comidaOrden.stock--
      orden.push(comidaOrden)
      const ComidaStorage = comidaOrden
      localStorage.setItem(`${comidaOrden.id}`,JSON.stringify(ComidaStorage))
      } else if (comidaenOrden.stock >= 1) {
      comidaenOrden.cantidad++
      comidaenOrden.stock--
    } else { //futuro toast con notificacion sin stock
    }



    console.log(orden)
  }
})



const verPedido = document.querySelector('#nav-pedido');
const main = document.querySelector('#main1');
const h2 = document.querySelector('#h2');


verPedido.onclick = () => {

  h2.remove();
  contenedorProductos.remove();
  main.append(contenedorOrden)
  const tbody = document.querySelector('#tbody')

  let totalPrecio = 0
  let totalCantidad = 0
  const tablaBody = orden.forEach(prod => {
    totalCantidad += prod.cantidad
    totalPrecio += prod.cantidad * prod.precio
    tbody.innerHTML += `<tr>
        <td>${prod.nombre}</td>
        <td>${prod.cantidad}</td>
        <td>$${prod.precio * prod.cantidad}</td>
      </tr>`

  })



  tbody.append(tablaBody);
  const parrafo = document.querySelector('#parrafo-orden')
  parrafo.innerText = `El total de su orden es: ${totalCantidad} productos y el precio final es de $${totalPrecio}`

}



const vacPedido = document.querySelector('#nav-vacpedido');



vacPedido.onclick = () => {
orden = []
}




