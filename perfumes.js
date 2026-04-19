const perfumesProducts = [
    { id: 1, name: "Lattafa Asad 100ml", prevPrice: 150.00, price: 120.00, discount: "-20%", sub: "hombre", image: "img/perfume-1.png" },
    { id: 2, name: "Club De Nuit Intense Man 105ml", prevPrice: null, price: 210.00, discount: null, sub: "hombre", image: "img/perfume-2.png" },
    { id: 3, name: "Bharara King 100ml", prevPrice: null, price: 185.00, discount: null, sub: "hombre", image: "img/perfume-3.png" },
    { id: 4, name: "Afnan 9 PM 100ml", prevPrice: 200.00, price: 160.00, discount: "-20%", sub: "hombre", image: "img/perfume-4.png" },
    { id: 5, name: "Lattafa Yara 100ml", prevPrice: 130.00, price: 99.00, discount: "-24%", sub: "mujer", image: "img/perfume-1.png" },
    { id: 6, name: "Lattafa Raghba 100ml", prevPrice: null, price: 85.00, discount: null, sub: "unisex", image: "img/perfume-3.png" },
    { id: 7, name: "Maison Alhambra Jean Lowe Immortal", prevPrice: 180.00, price: 140.00, discount: "-22%", sub: "hombre", image: "img/perfume-2.png" },
    { id: 8, name: "Lattafa Bade'e Al Oud Amethyst", prevPrice: null, price: 115.00, discount: null, sub: "unisex", image: "img/perfume-4.png" }
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

async function renderProducts(sub = 'all') {
    container.innerHTML = '';
    const filtered = sub === 'all' ? perfumesProducts : perfumesProducts.filter(p => p.sub === sub);

    filtered.forEach(product => {
        const hasDiscount = product.discount !== null;
        let priceHtml = hasDiscount 
            ? `<span class="original-price">S/${product.prevPrice.toFixed(2)}</span><span class="product-price">S/${product.price.toFixed(2)}</span>`
            : `<span class="product-price">S/${product.price.toFixed(2)}</span>`;
        let badgeHtml = hasDiscount ? `<div class="sale-badge">${product.discount}</div>` : '';

        const card = document.createElement('div');
        card.className = 'product-card animate-on-scroll';
        // Añadir un pequeño retraso para un efecto escalonado
        card.style.transitionDelay = `${(filtered.indexOf(product) % 4) * 0.1}s`;
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

    // Re-inicializar animaciones después de renderizar
    initAnimations();
}

subFilters.forEach(btn => {
    btn.addEventListener('click', () => {
        subFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProducts(btn.dataset.sub);
    });
});

window.addToCart = function(id) {
    const product = perfumesProducts.find(p => p.id === id);
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

// Intersection Observer para animaciones al scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

function initAnimations() {
    const animElements = document.querySelectorAll('.animate-on-scroll');
    animElements.forEach(el => observer.observe(el));
}

renderProducts();
initAnimations();
