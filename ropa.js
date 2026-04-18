const ropaProducts = [
    { id: 1, name: "Polo Essentials Fear Of God - Abbey Stone", prevPrice: 120.00, price: 89.00, discount: "-25%", sub: "polos", image: "img/125SP254190F_CLASSIC_FIT_T-SHIRT-ABBEY_STONE_2_1920x_88e71190-8ba2-45b3-a0c2-1fd29cb7ba6c.webp" },
    { id: 2, name: "Polo Premium Streetwear - Black", prevPrice: null, price: 110.00, discount: null, sub: "polos", image: "img/polo-negro.png" },
    { id: 3, name: "Polo Essentials Oversize - White", prevPrice: 130.00, price: 95.00, discount: "-27%", sub: "polos", image: "img/polo-blanco.png" },
    { id: 4, name: "Polo Boxy Fit - Cement", prevPrice: null, price: 89.00, discount: null, sub: "polos", image: "img/polo-gris.png" },
    { id: 5, name: "Hoodie Luxe Oversize - Beige", prevPrice: 190.00, price: 159.00, discount: "-16%", sub: "poleras", image: "img/hoodie-beige.png" },
    { id: 6, name: "Polera Oversize Custom - Noir", prevPrice: 200.00, price: 140.00, discount: "-30%", sub: "poleras", image: "img/polera-negra.png" },
    { id: 7, name: "Polera Heavyweight - Grey", prevPrice: null, price: 169.00, discount: null, sub: "poleras", image: "img/polera-gris.png" },
    { id: 8, name: "Short Sweat Essential - Black", prevPrice: 100.00, price: 79.00, discount: "-21%", sub: "shorts", image: "img/short-negro.png" },
    { id: 9, name: "Short Cargo Premium - Beige", prevPrice: null, price: 89.00, discount: null, sub: "shorts", image: "img/short-beige.png" }
];

const container = document.getElementById('product-container');
const subFilters = document.querySelectorAll('.sub-filter');
const cartBtn = document.getElementById('cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCartBtn = document.getElementById('close-cart');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountEl = document.getElementById('cart-count');
const cartTotalPriceEl = document.getElementById('cart-total-price');
const cartTotalHeaderEl = document.getElementById('cart-total-header');

let cart = [];

function renderProducts(sub = 'all') {
    container.innerHTML = '';
    const filtered = sub === 'all' ? ropaProducts : ropaProducts.filter(p => p.sub === sub);

    filtered.forEach(product => {
        const hasDiscount = product.discount !== null;
        let priceHtml = hasDiscount 
            ? `<span class="original-price">S/${product.prevPrice.toFixed(2)}</span><span class="product-price">S/${product.price.toFixed(2)}</span>`
            : `<span class="product-price">S/${product.price.toFixed(2)}</span>`;
        let badgeHtml = hasDiscount ? `<div class="sale-badge">${product.discount}</div>` : '';

        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                ${badgeHtml}
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400x400/eeeeee/000000?text=BULIS'">
            </div>
            <div class="product-title">${product.name}</div>
            <div class="price-container">${priceHtml}</div>
            <button class="btn-add" onclick="addToCart(${product.id})">COMPRAR AHORA</button>
        `;
        container.appendChild(card);
    });
}

subFilters.forEach(btn => {
    btn.addEventListener('click', () => {
        subFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProducts(btn.dataset.sub);
    });
});

window.addToCart = function(id) {
    const product = ropaProducts.find(p => p.id === id);
    cart.push(product);
    updateCartUI();
    openCart();
};

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    updateCartUI();
};

function updateCartUI() {
    cartCountEl.innerText = cart.length;
    cartItemsContainer.innerHTML = '';
    let total = 0;
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="color:#666;">Tu carrito está vacío.</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <img src="${item.image}" onerror="this.src='https://via.placeholder.com/80/eeeeee/000000'">
                <div>
                    <div style="font-weight:500; font-size:0.9rem;">${item.name}</div>
                    <div style="color:#666; font-size:0.85rem;">S/ ${item.price.toFixed(2)}</div>
                    <button style="background:none; border:none; text-decoration:underline; font-size:0.8rem; cursor:pointer;" onclick="removeFromCart(${index})">Eliminar</button>
                </div>
            `;
            cartItemsContainer.appendChild(div);
        });
    }
    cartTotalPriceEl.innerText = `S/ ${total.toFixed(2)}`;
    cartTotalHeaderEl.innerText = `S/ ${total.toFixed(2)}`;
}

function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
}
function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('show');
    document.body.style.overflow = '';
}

cartBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

renderProducts();
