document.addEventListener('DOMContentLoaded', () => {
    const buyNowButtons = document.querySelectorAll('.buy-now');
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const placeOrderButton = document.querySelector('.place-order');
    const orderPopup = document.getElementById('order-popup');
    const closePopup = document.querySelector('.popup .close');

    // Sample products with basic details
    const products = {
        earphones: {
            name: 'Earphones',
            price: 29.99,
            image: 'earbuds.png' // Path to the product image
        },
        speakers: {
            name: 'Speakers',
            price: 49.99,
            image: 'speaker.png' // Path to the product image
        },
        headphones: {
            name: 'Headphones',
            price: 50.00,
            image: 'headphones.png' // Path to the product image
        } 
    };

    // Function to update the cart UI
    function updateCartUI() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsContainer.innerHTML = ''; // Clear previous cart items
        let total = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${item.name}</h3>
                    <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                </div>
                <div class="cart-item-quantity">
                    <input type="number" value="${item.quantity}" min="1" class="cart-item-quantity-input">
                </div>
                <button class="remove-item">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += item.price * item.quantity;

            // Event listener for removing items
            cartItem.querySelector('.remove-item').addEventListener('click', () => {
                removeCartItem(item.name);
            });

            // Event listener for changing quantity
            cartItem.querySelector('.cart-item-quantity-input').addEventListener('input', (event) => {
                updateItemQuantity(item.name, parseInt(event.target.value, 10));
            });
        });

        totalPriceElement.textContent = total.toFixed(2);
    }

    // Function to remove a cart item
    function removeCartItem(itemName) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.name !== itemName);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
    }

    // Function to update item quantity
    function updateItemQuantity(itemName, newQuantity) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const item = cart.find(item => item.name === itemName);
        if (item) {
            item.quantity = newQuantity > 0 ? newQuantity : 1; // Ensure quantity is at least 1
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartUI();
        }
    }

    // Add product to cart
    buyNowButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productKey = button.getAttribute('data-product');
            const product = products[productKey];

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingProduct = cart.find(item => item.name === product.name);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Product added to cart!');
            updateCartUI(); // Update UI to reflect the added product
        });
    });

    // Display cart items on cart page
    if (cartItemsContainer) {
        updateCartUI();

        // Place order
        placeOrderButton.addEventListener('click', () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }

            // Simulate order placement
            localStorage.removeItem('cart');
            orderPopup.style.display = 'flex';
        });

        // Close popup
        if (closePopup) {
            closePopup.addEventListener('click', () => {
                orderPopup.style.display = 'none';
                window.location.href = 'index.html';
            });
        }
    }
});
