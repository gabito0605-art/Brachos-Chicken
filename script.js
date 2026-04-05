// Archivo: script.js

let cart = JSON.parse(localStorage.getItem('brachos_cart')) || [];

// Ejecutar renderCart al cargar la página para mostrar lo que ya estaba guardado
document.addEventListener('DOMContentLoaded', renderCart);


// Abre y cierra el panel lateral
function toggleCart() {
    document.getElementById('cart-panel').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

// Agrega un objeto al array del carrito
function addToCart(name, price) {
    cart.push({ name, price });
    saveAndRender();

}

// Elimina un producto basado en su posición en el array
function removeFromCart(index) {
    cart.splice(index, 1);
    saveAndRender();
}

function saveAndRender() {
    localStorage.setItem('brachos_cart', JSON.stringify(cart));
    renderCart();
}

// Actualiza toda la interfaz de la cesta
function renderCart() {
    const cartList = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.querySelector('.checkout-btn');

    if (checkoutBtn) {
        if (cart.length === 0) {
            checkoutBtn.style.display = 'none';  // Lo oculta por completo
        } else {
            checkoutBtn.style.display = 'block'; // Lo vuelve a mostrar
        }
    }

    if(!cartList) return;

    // Limpiamos la lista actual
    cartList.innerHTML = '';
    let totalValue = 0;

    // Recorremos el carrito para dibujar cada item
    cart.forEach((item, index) => {
        totalValue += item.price;
        
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                <span>$${item.price}</span>
            </div>
            <button class="delete-btn" onclick="removeFromCart(${index})">Eliminar</button>
        `;
        cartList.appendChild(li);
    });

    // Actualizamos los contadores globales
        cartCount.innerText = cart.length;
    cartTotal.innerText = totalValue.toFixed(2)
}

function toggleCart() {
    document.getElementById('cart-panel').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

//menu responsive


function toggleNav() {
  const nav = document.getElementById("mySidenav");
  // Si está cerrado, ábrelo. Si está abierto, ciérralo.
  if (nav.style.width === "99.99%") {
    nav.style.width = "0";
  } else {
    nav.style.width = "99.99%";
  }
}

// Cerrar automáticamente al hacer clic en cualquier enlace del menú
document.querySelectorAll('.sidenav a').forEach(link => {
  link.addEventListener('click', () => {
    // Solo cerramos si el menú está abierto
    const nav = document.getElementById("mySidenav");
    if (nav.style.width === "250px") {
      toggleNav();
    }
  });
});



// Este código solo corre cuando entras a la página de pagos
document.addEventListener('DOMContentLoaded', () => {
    const summaryContainer = document.getElementById('compra-final');
    const amountInput = document.getElementById('amount');
    
    // Traemos se guardo en la otra página
    const cart = JSON.parse(localStorage.getItem('brachos_cart')) || [];

    if (cart.length === 0) {
        summaryContainer.innerHTML = '<div style="padding:20px; text-align:center;"><h3 style="text-decoration: underline solid #C2171D;">Tu carrito está vacío</h3><br><br><a href="index.html" class="agregar" style="margin: 30px;">Volver al menú</a></div>';
        return;
    }

    // Creamos el diseño del resumen
    let total = 0;
    let itemsHtml = '';

    cart.forEach(item => {
        total += item.price;
        itemsHtml += `
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 5px; padding-left: 15px; padding-rigth: 15px">
                <span class="cart-item" style=" padding-left: 15px; padding-rigth: 15px;">${item.name}</span>
                <strong class="cart-item" style=" font-family: monospace;">$${item.price.toFixed(2)}</strong>
            </div>`;
    });

    // Inyectamos todo el HTML en el div right-placeholder
    summaryContainer.innerHTML = `
        <div style=" font-family: Arial, sans-serif; background-color: #C2171D; border: 4px solid #FCBB0D">
            <h2 style="text-align: center; margin-bottom: 1rem; padding: 6px; color: white; text-decoration: underline solid #FCBB0D">Tu Pedido</h2>
            <hr>
            ${itemsHtml}
            <div style=" position: sticky; bottom: 0; display: flex; justify-content: space-between; margin-top: 20px; font-size: 1.2em; font-weight: bold; background: #FCBB0D; border-bottom-radius:15px; width: 100%;">
                <span class="total" style="color:black">Total a pagar:</span>
                <span class="total" style="color: black ">$${total.toFixed(2)}</span>
            </div>
        </div>`;
    // Actualizamos el monto total automáticamente 
    if(amountInput) {
        amountInput.value = total.toFixed(2);
    }

    //para procesar el pago y mostrar la ventana 
    const paymentForm = document.getElementById('payment-form');
    const thanksModal = document.getElementById('Gracias');

    paymentForm.addEventListener('submit', function(event) {
        // Evitamos que la página se recargue para poder mostrar el mensaje
        event.preventDefault(); 

        // Borramos el contenido del carrito 
        localStorage.removeItem('brachos_cart');

        // Mostramos la ventana flotante de agradecimiento
        if(thanksModal) {
            thanksModal.style.display = 'flex';
        }
    });
});







// Este código solo corre cuando entras a la página de pagos en su version movil
document.addEventListener('DOMContentLoaded', () => {
    const summaryContainer = document.getElementById('compra-final-movil');
    const amountInput = document.getElementById('amount');
    
    // Traemos lo que guardaste en la otra página
    const cart = JSON.parse(localStorage.getItem('brachos_cart')) || [];

    if (cart.length === 0) {
        summaryContainer.innerHTML = '<div style="padding:20px; text-align:center;"><h3 style="text-decoration: underline solid #C2171D;">Tu carrito está vacío</h3><br><br><a href="index.html" class="agregar" style="margin: 30px;">Volver al Inicio</a></div>';
        return;
    }

    // Creamos el diseño del resumen
    let total = 0;
    let itemsHtml = '';

    cart.forEach(item => {
        total += item.price;
        itemsHtml += `
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 5px; padding-left: 15px; padding-rigth: 15px">
                <span class="cart-item" style=" padding-left: 15px; padding-rigth: 15px;">${item.name}</span>
                <strong class="cart-item" style=" font-family: monospace;">$${item.price.toFixed(2)}</strong>
            </div>`;
    });

    // Inyectamos todo el HTML en el div right-placeholder
    summaryContainer.innerHTML = `
        <div style=" font-family: Arial, sans-serif; background-color: #C2171D; border: 4px solid #FCBB0D">
            <h2 style="text-align: center; margin-bottom: 1rem; padding: 6px; color: white; text-decoration: underline solid #FCBB0D">Tu Pedido</h2>
            <hr>
            ${itemsHtml}
            <div style=" position: sticky; bottom: 0; display: flex; justify-content: space-between; margin-top: 20px; font-size: 1.2em; font-weight: bold; background: #FCBB0D; border-bottom-radius:15px; width: 100%;">
                <span class="total" style="color:black">Total a pagar:</span>
                <span class="total" style="color: black ">$${total.toFixed(2)}</span>
            </div>
        </div>
    `;

    // Actualizamos monto total automáticamente
    if(amountInput) {
        amountInput.value = total.toFixed(2);
    }
});



