const productos = [
  { id: 1, nombre: "Café 500g", precio: 56000, imagen:"cafe-500.jpg" },
  { id: 2, nombre: "Café 250g", precio: 31000, imagen:"cafe-250.jpg" },
  { id: 3, nombre: "Frutos Rojos", precio: 19500, imagen:"frutos-rojos.jpg" },
  { id: 4, nombre: "Frutos Amarillos", precio: 19500, imagen:"frutos-amarillos.jpg" },
];

let carrito = [];

const productosGrid = document.getElementById('productos-grid');

productos.forEach(p => {
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `
    <img src="${p.imagen}" alt="${p.nombre}">
    <h3>${p.nombre}</h3>
    <p>$${p.precio}</p>
    <button onclick="agregarAlCarrito(${p.id}, event)">Agregar</button>
  `;
  productosGrid.appendChild(div);
});

function agregarAlCarrito(id, event) {
  const producto = productos.find(p => p.id === id);
  const item = carrito.find(p => p.id === id);

  if(item) item.cantidad +=1;
  else carrito.push({...producto, cantidad:1});

  actualizarCarrito();

  // Animación volando
  const boton = event.target;
  const img = boton.parentElement.querySelector('img');
  const flyImg = img.cloneNode(true);
  const rect = img.getBoundingClientRect();
  flyImg.style.left = rect.left + "px";
  flyImg.style.top = rect.top + "px";
  flyImg.style.width = rect.width + "px";
  flyImg.style.height = rect.height + "px";
  flyImg.classList.add('fly');
  document.body.appendChild(flyImg);
  setTimeout(()=> flyImg.remove(), 1000);

  mostrarMensaje(`${producto.nombre} agregado al carrito`);
}

function actualizarCarrito() {
  const lista = document.getElementById('lista-carrito');
  lista.innerHTML = '';

  carrito.forEach(p=>{
    const div = document.createElement('div');
    div.innerHTML = `
      ${p.nombre} - $${p.precio} x ${p.cantidad}
      <button onclick="cambiarCantidad(${p.id}, -1)">-</button>
      <button onclick="cambiarCantidad(${p.id}, 1)">+</button>
      <button onclick="eliminarProducto(${p.id})">Eliminar</button>
    `;
    lista.appendChild(div);
  });

  const total = carrito.reduce((acc,p)=> acc + p.precio*p.cantidad, 0);
  document.getElementById('total').textContent = total;
}

function cambiarCantidad(id, valor) {
  const item = carrito.find(p=>p.id===id);
  if(!item) return;

  item.cantidad += valor;
  if(item.cantidad<=0) eliminarProducto(id);
  actualizarCarrito();
}

function eliminarProducto(id) {
  carrito = carrito.filter(p=>p.id!==id);
  actualizarCarrito();
}

function vaciarCarrito() {
  carrito=[];
  actualizarCarrito();
}

function mostrarMensaje(texto) {
  const mensaje = document.getElementById('mensaje');
  mensaje.textContent = texto;
  mensaje.style.display='block';
  setTimeout(()=> mensaje.style.display='none', 2000);
}
// SLIDER AUTOMÁTICO
let indiceSlide = 0;
const slides = document.querySelectorAll('.slide');

function mostrarSlide() {
  slides.forEach((s, i) => s.classList.remove('activo'));
  slides[indiceSlide].classList.add('activo');
  indiceSlide = (indiceSlide + 1) % slides.length;
}

setInterval(mostrarSlide, 3000); // Cambia cada 3 segundos
if (window.innerWidth <= 600) {
  document.getElementById("carrito-flotante").classList.add("oculto");
}
function toggleCarrito() {
  const carrito = document.getElementById("carrito-flotante");
  carrito.classList.toggle("activo");
}
