let cart = [];

// Función para agregar un producto al carrito
function addToCart(id, name, price) {
    const existingProduct = cart.find(item => item.id === id);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    renderCart();
}

// Función para eliminar un producto del carrito
function removeFromCart(id) {
    const productIndex = cart.findIndex(item => item.id === id);
    if (productIndex !== -1) {
        if (cart[productIndex].quantity > 1) {
            cart[productIndex].quantity--;
        } else {
            cart.splice(productIndex, 1);
        }
    }
    renderCart();
}

// Función para calcular los descuentos del carrito
function calculatePromotions(total) {
    let discount = 0;

    // Promoción: Producto 1
    const product1 = cart.find(item => item.id === 1);
    if (product1) {
        // 5% de descuento en 5-10 unidades
        if (product1.quantity >= 5 && product1.quantity <= 10) {
            discount += product1.quantity * product1.price * 0.05;
        }

        // Compra 2 y lleva el tercero con 30% de descuento
        if (product1.quantity >= 3) {
            const discountUnits = Math.floor(product1.quantity / 3);
            discount += discountUnits * product1.price * 0.30;
        }
    }

    // Promoción: 20% de descuento en compras superiores a $100
    if (total > 100) {
        discount += total * 0.20;
    }

    return discount;
}

// Función para renderizar el carrito en pantalla
function renderCart() {
    const cartContainer = document.querySelector('.cart');
    const totalElement = document.getElementById('cart-total');
    const discountElement = document.getElementById('cart-discount');

    cartContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="img/chorizo.png" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Precio: $${item.price.toFixed(2)}</p>
            <p>Cantidad: ${item.quantity}</p>
            <p>Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
            <button onclick="removeFromCart(${item.id})">Eliminar</button>
        `;
        cartContainer.appendChild(cartItem);

        total += item.price * item.quantity;
    });

    // Calcular promociones
    const discount = calculatePromotions(total);
    const finalTotal = total - discount;

    // Actualizar total y descuento en pantalla
    discountElement.textContent = `Descuento: -$${discount.toFixed(2)}`;
    totalElement.textContent = `Total: $${finalTotal.toFixed(2)}`;
}
