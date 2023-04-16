

let productos = [];
fetch("./js/productos.json")
.then(response => response.json())
.then(data => {
  productos = data;
  filtrarTodos("todos");
  cargarOrden();
  establecerBotones();
})

console.log(productos);


//array pedido

let orden = []
function cargarOrden() {
  for (let element of Object.keys(localStorage)) {
    const objStorage = JSON.parse(localStorage.getItem(element))
    const prods = productos.find((com) => com.id === objStorage.id)

    if (prods) {
      const storageOrden = {
        id: prods.id,
        nombre: prods.nombre,
        precio: prods.precio,
        stock: prods.stock,
        cantidad: objStorage.cantidad,
      }

      orden.push(storageOrden)
    }
  }
}







let contenedorProductos = document.querySelector("#container-comidas");
const contenedorOrden = document.querySelector("#container-orden");




//Funciones para cargar productos al inicio

function mostrarProductos(products) {
  contenedorOrden.remove();
  products.forEach(producto => {
    let divproducto = document.createElement("div");
    divproducto.classList.add("card-producto")
    divproducto.innerHTML =
      `<img id="imagen-producto" src="${producto.img}" alt="${producto.nombre}">
     <h3>${producto.nombre}</h3>
     <p>${producto.descripcion}</p>
     <p>$${producto.precio}</p>
     <button id="${producto.id}" class="boton-agregar">Agregar</button>
`;
    contenedorProductos.append(divproducto);
  })}

  function filtrarTodos(todos) {
    const tipoSeleccionadoTodo = todos
    
    const productosFiltradosTodo = productos.filter(product => product.todos === tipoSeleccionadoTodo);
    
    mostrarProductos(productosFiltradosTodo);
  }

  function filtrarProductos(tipo) {
    const tipoSeleccionado = tipo
    
    const productosFiltrados = productos.filter(product => product.tipo === tipoSeleccionado);
    
    mostrarProductos(productosFiltrados);
  }





const verPedido = document.querySelector('#nav-pedido');


//funcion botones agregar
function establecerBotones() {
  const botonesAgregar = document.querySelectorAll('.boton-agregar')
  let totalCant1 = 0
  orden.forEach(prod => {
    totalCant1 += prod.cantidad})
  verPedido.innerText = `Ver Pedido | ${totalCant1}`
  botonesAgregar.forEach(boton => {

    boton.onclick = () => {
      const prod = productos.find((com) => com.id === boton.id)


      const comidaOrden = {

        id: prod.id,
        nombre: prod.nombre,
        precio: prod.precio,
        stock: prod.stock,
        cantidad: 1,
      }

      const comidaenOrden = orden.find(com => com.id === comidaOrden.id)
      let ComidaStorage = comidaOrden
      

      if (!comidaenOrden) {
        comidaOrden.stock--
        orden.push(comidaOrden)
        console.log(orden);
        localStorage.setItem(`${comidaOrden.id}`, JSON.stringify(ComidaStorage))
        let totalCant = 0
        orden.forEach(prod => {
          totalCant += prod.cantidad
        })
        verPedido.innerText = `Ver Pedido | ${totalCant}`
        Toastify({
          text: "Producto Agregado!",
          duration: 3000,
          destination: "https://github.com/apvarun/toastify-js",
          newWindow: true,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "left", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to right, #EB8389, #EB8398)",
          },
          onClick: function () { } // Callback after click
        }).showToast();
      } else if (comidaenOrden.stock >= 1 && comidaenOrden) {
        comidaenOrden.cantidad++;
        comidaenOrden.stock--;
        console.log(orden);
        const cantStorage = JSON.parse(localStorage.getItem(comidaenOrden.id));
        cantStorage.cantidad++;
        localStorage.setItem(comidaenOrden.id, JSON.stringify(cantStorage));
        
        let totalCant = 0
        orden.forEach(prod => {
          totalCant += prod.cantidad
        })
        verPedido.innerText = `Ver Pedido | ${totalCant}`
        Toastify({
          text: "Producto Agregado!",
          duration: 3000,
          destination: "https://github.com/apvarun/toastify-js",
          newWindow: true,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "left", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to right, #EB8389, #EB8398)",
          },
          onClick: function () { } // Callback after click
        }).showToast();

      } else if (comidaenOrden.stock === 0) {
        Toastify({
          text: "Sin stock",
          duration: 3000,
          destination: "https://github.com/apvarun/toastify-js",
          newWindow: true,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "left", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
          onClick: function () { } // Callback after click
        }).showToast();
      } else {
        Toastify({
          text: "Error",
          duration: 3000,
          destination: "https://github.com/apvarun/toastify-js",
          newWindow: true,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "left", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
          onClick: function () { } // Callback after click
        }).showToast();
      }
    }
  })
};




const main = document.querySelector('#main1');
const h2 = document.querySelector('#h2');
const tablapedido = document.querySelector('#tabla-pedido');


const cardComida = document.querySelectorAll('.card-comida');
const cardBebida = document.querySelectorAll('.card-bebida');
let parrafoVacio = document.querySelector('#parrafo-vacio');
let tbody = document.querySelector('#tbody')
//Boton Ver pedido

verPedido.onclick = () => {

  h2.remove();
  while (contenedorProductos.firstChild) {
    contenedorProductos.removeChild(contenedorProductos.lastChild);
  }
  contenedorOrden.remove();
  if (orden.length > 0) {
      while (contenedorProductos.firstChild) {
        contenedorProductos.removeChild(contenedorProductos.lastChild);
      }
      main.append(contenedorOrden)
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
  } else {
    contenedorOrden.remove();
    main.append(parrafoVacio)
    parrafoVacio.innerText = `Carrito Vacio`
  }

//Boton finalizar compra

  const finalizarCompra = document.querySelector('#finalizar-compra');
  finalizarCompra.onclick = () => {
    Swal.fire('Muchas gracias por tu compra!')
  }

}


//botones nav 


const menuCompleto = document.querySelector('#nav-completo');
menuCompleto.onclick = () => {
  contenedorOrden.remove();
  parrafoVacio.remove();
  while (contenedorProductos.firstChild) {
    contenedorProductos.removeChild(contenedorProductos.lastChild);
  };
  filtrarTodos("todos");
  establecerBotones();
};

const menuComidas = document.querySelector('#nav-comidas');
menuComidas.onclick = () => {
  contenedorOrden.remove();
  parrafoVacio.remove();
  while (contenedorProductos.firstChild) {
    contenedorProductos.removeChild(contenedorProductos.lastChild);
  };
  filtrarProductos("comida")
  establecerBotones();
};
const menuBebidas = document.querySelector('#nav-bebidas');
menuBebidas.onclick = () => {
  contenedorOrden.remove();
  parrafoVacio.remove();
  while (contenedorProductos.firstChild) {
    contenedorProductos.removeChild(contenedorProductos.lastChild);
  };
  filtrarProductos("bebida")
  establecerBotones();
}

const vacPedido = document.querySelector('#nav-vacpedido');
vacPedido.onclick = () => {
  contenedorOrden.remove();
  orden.length = 0;
  verPedido.innerText = `Ver Pedido | ${orden.length}`
  localStorage.clear();
  Swal.fire('Carrito vacio')
    main.append(parrafoVacio)
    parrafoVacio.innerText = `Carrito Vacio`

}



console.log(orden);