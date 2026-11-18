// Tostadero Alcor · lógica mínima de la tienda (agencia anterior)
var carrito = {};

function precioTexto(n) { return n.toFixed(2).replace('.', ',') + ' €'; }

function pintarCarrito() {
  var ul = document.getElementById('lineas-carrito');
  var total = 0;
  ul.innerHTML = '';
  Object.keys(carrito).forEach(function (id) {
    var l = carrito[id];
    total += l.precio * l.cantidad;
    var li = document.createElement('li');
    li.innerHTML = '<span class="cantidad"><button data-id="' + id + '" data-d="-1">-</button> ' + l.cantidad +
      ' <button data-id="' + id + '" data-d="1">+</button></span> ' + l.nombre + ' · ' + precioTexto(l.precio * l.cantidad);
    ul.appendChild(li);
  });
  document.getElementById('total').textContent = precioTexto(total);
}

function avisar(texto) {
  var a = document.getElementById('aviso');
  a.textContent = texto;
  a.style.display = 'block';
  setTimeout(function () { a.style.display = 'none'; }, 2500);
}

document.querySelectorAll('.anadir').forEach(function (b) {
  b.addEventListener('click', function () {
    var p = b.closest('.producto');
    var id = p.dataset.id;
    if (!carrito[id]) carrito[id] = { nombre: p.dataset.nombre, precio: parseFloat(p.dataset.precio), cantidad: 0 };
    carrito[id].cantidad++;
    pintarCarrito();
    avisar('Añadido al carrito');
  });
});

document.getElementById('lineas-carrito').addEventListener('click', function (e) {
  if (e.target.tagName !== 'BUTTON') return;
  var id = e.target.dataset.id;
  carrito[id].cantidad += parseInt(e.target.dataset.d, 10);
  if (carrito[id].cantidad <= 0) delete carrito[id];
  pintarCarrito();
});

document.querySelectorAll('.filtro').forEach(function (f) {
  f.addEventListener('click', function () {
    document.querySelectorAll('.filtro').forEach(function (x) { x.classList.remove('activo'); });
    f.classList.add('activo');
    var t = f.textContent;
    document.querySelectorAll('.producto').forEach(function (p) {
      var txt = p.querySelector('.secundario').textContent;
      var ver = t === 'Todo' ||
        (t === 'Café en grano' && txt.indexOf('Grano') >= 0) ||
        (t === 'Café molido' && txt.indexOf('Molido') >= 0) ||
        (t === 'Accesorios' && txt.indexOf('Accesorio') >= 0);
      p.style.display = ver ? '' : 'none';
    });
  });
});

document.getElementById('confirmar').addEventListener('click', function () {
  var ok = true;
  ['email', 'cp'].forEach(function (id) { document.getElementById(id).classList.remove('error'); });
  var email = document.getElementById('email');
  var cp = document.getElementById('cp');
  if (email.value.indexOf('@') < 0) { email.classList.add('error'); ok = false; }
  if (!/^\d{5}$/.test(cp.value)) { cp.classList.add('error'); ok = false; }
  if (!document.getElementById('privacidad').checked) ok = false;
  if (ok) avisar('Pedido confirmado. Gracias.');
});
