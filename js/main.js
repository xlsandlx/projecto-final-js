// // PRODUCTOS
// const productos = [
//     // Abrigos
//     {
//         id: "abrigo-01",
//         titulo: "Abrigo 01",
//         imagen: "./img/abrigos/01.jpg",
//         categoria: {
//             nombre: "Abrigos",
//             id: "abrigos"
//         },
//         precio: 1000
//     },

let productos;
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");


// function cargarProductos(productosElegidos) {

//     contenedorProductos.innerHTML = "";

//     productosElegidos.forEach(producto => {

//         const div = document.createElement("div");
//         div.classList.add("producto");
//         div.innerHTML = `
//             <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
//             <div class="producto-detalles">
//                 <h3 class="producto-titulo">${producto.titulo}</h3>
//                 <p class="producto-precio">$${producto.precio}</p>
//                 <button class="producto-agregar" id="${producto.id}">Agregar</button>
//             </div>
//         `;

//         contenedorProductos.append(div);
//     })

//     actualizarBotonesAgregar();
// }

// cargarProductos(productos);
const buscarProductos = async () => {
    contenedorProductos.innerHTML = "";
    
    const productosFetch = await fetch('https://fakestoreapi.com/products')
    const productosJson = await productosFetch.json()
    productos = productosJson;
    productos.forEach(prod=>{
        const {category,id,image,price,title} = prod
                const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${image}" alt="${title}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${title}</h3>
                <p class="producto-precio">$${price}</p>
                <button class="producto-agregar" id="${id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })
    actualizarBotonesAgregar();

}
buscarProductos()
// botonesCategorias.forEach(boton => {
//     boton.addEventListener("click", (e) => {

//         botonesCategorias.forEach(boton => boton.classList.remove("active"));
//         e.currentTarget.classList.add("active");

//         if (e.currentTarget.id != "todos") {
//             const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
//             tituloPrincipal.innerText = productoCategoria.categoria.nombre;
//             const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
//             cargarProductos(productosBoton);
//         } else {
//             tituloPrincipal.innerText = "Todos los productos";
//             cargarProductos(productos);
//         }

//     })
// });


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        const categoriaElegida = e.currentTarget.id

        contenedorProductos.innerHTML = "";

        if (categoriaElegida != "todos") {
            const buscarPorCategoria = async () => {
                const productosFetch = await fetch(`https://fakestoreapi.com/products/category/${categoriaElegida}`)
                const productosJson = await productosFetch.json()
                productosJson.forEach(prod=>{
                    const {category,id,image,price,title} = prod
                            const div = document.createElement("div");
                    div.classList.add("producto");
                    div.innerHTML = `
                        <img class="producto-imagen" src="${image}" alt="${title}">
                        <div class="producto-detalles">
                            <h3 class="producto-titulo">${title}</h3>
                            <p class="producto-precio">$${price}</p>
                            <button class="producto-agregar" id="${id}">Agregar</button>
                        </div>
                    `;
            
                    contenedorProductos.append(div);
                })
                actualizarBotonesAgregar();
                
            }
            buscarPorCategoria()
        } else {
            buscarProductos();
        }

    })
});


function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
} else {
    productosEnCarrito = [];
}

// function agregarAlCarrito(e) {
//     const idBoton = e.currentTarget.id;
//     const productoAgregado = productos.find(producto => producto.id === idBoton);

//     if(productosEnCarrito.some(producto => producto.id === idBoton)) {
//         const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
//         productosEnCarrito[index].cantidad++;
//     } else {
//         productoAgregado.cantidad = 1;
//         productosEnCarrito.push(productoAgregado);
//     }

//     actualizarNumerito();

//     localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
// }
const carrito = [];


function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoCarrito = async () => {
        const carritoFetch = await fetch(`https://fakestoreapi.com/products/${idBoton}`)
        const carritoJson = await carritoFetch.json()

        const productoAgregado = carritoJson;
        const productoEnCarrito = carrito.find((producto) => producto.id === id);
        console.log(productoEnCarrito)
        if(productoEnCarrito) {
            const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
            productosEnCarrito[index].cantidad++;
        } else {
            productosEnCarrito.push(productoAgregado);
        }
    }
    productoCarrito ()
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

