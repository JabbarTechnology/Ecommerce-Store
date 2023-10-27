document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItems = document.getElementById('cart-items');
    const quantityInputs = document.querySelectorAll('.quantity-input');
    const checkoutButton = document.querySelector('.checkout-button');

    function updateCartSummary() {
        const cartItems = document.querySelectorAll('#cart-items li');
        let subtotal = 0;

        cartItems.forEach(function (item) {
            const price = parseFloat(item.querySelector('span:nth-child(2)').textContent.replace('Price: $', ''));
            const quantity = parseInt(item.querySelector('span:nth-child(3)').textContent, 10);
            const productTotal = price * quantity;
            subtotal += productTotal;
            item.querySelector('span:nth-child(4)').textContent = `Product Total: $${productTotal.toFixed(2)}`;
        });

        const taxRate = 0.08; // Assuming an 8% tax rate
        const tax = subtotal * taxRate;
        const total = subtotal - tax;

        document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }

    addToCartButtons.forEach(function (button, index) {
        button.addEventListener('click', function () {
            const product = this.parentElement;
            const productName = product.querySelector('h2').textContent;
            const productPrice = product.querySelector('.price').textContent;
            const quantity = quantityInputs[index].value;
            const price = parseFloat(productPrice.replace('Price: $', ''));
            const productTotal = price * quantity;

            const cartItem = document.createElement('li');
            cartItem.innerHTML = `
                <span>${productName}</span>
                <span>Price: $${price.toFixed(2)}</span>
                <span>${quantity}</span>
                <span>Product Total: $${productTotal.toFixed(2)}</span>
                <button class="remove-from-cart">Remove</button>
            `;

            cartItems.appendChild(cartItem);
            updateCartSummary();

            const removeFromCartButton = cartItem.querySelector('.remove-from-cart');
            removeFromCartButton.addEventListener('click', function () {
                cartItems.removeChild(cartItem);
                updateCartSummary();
            });
        });
    });

    quantityInputs.forEach(function (input, index) {
        input.addEventListener('change', function () {
            const product = this.parentElement.parentElement;
            const productPrice = product.querySelector('span:nth-child(2)').textContent;
            const quantity = input.value;
            const price = parseFloat(productPrice.replace('Price: $', ''));
            const productTotal = price * quantity;
            const cartItem = cartItems.querySelectorAll('li')[index];

            cartItem.querySelector('span:nth-child(3)').textContent = quantity;
            cartItem.querySelector('span:nth-child(4)').textContent = `Product Total: $${productTotal.toFixed(2)}`;
            updateCartSummary();
        });
    });

    checkoutButton.addEventListener('click', function () {
        const cartItems = document.querySelectorAll('#cart-items li');
        let purchaseMessage = 'You have purchased:\n';

        cartItems.forEach(function (item) {
            purchaseMessage += `${item.querySelector('span').textContent} x${item.querySelector('span:nth-child(3)').textContent} - ${item.querySelector('span:nth-child(4)').textContent}\n`;
        });

        alert(purchaseMessage); // Display the purchase message in an alert
        // Clear the shopping cart
        cartItems.forEach(function (item) {
            cartItems.removeChild(item);
        });

        // Scroll to the home section
        const homeSection = document.getElementById('home');
        homeSection.scrollIntoView({ behavior: 'smooth' });
    });

    const navigationLinks = document.querySelectorAll('nav a');

    navigationLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});


