const ropaProducts = [
    { id: 1, name: "Polo Essentials Fear Of God - Abbey Stone", prevPrice: 120.00, price: 89.00, discount: " -25%", category: "ropa", image: "img/125SP254190F_CLASSIC_FIT_T-SHIRT-ABBEY_STONE_2_1920x_88e71190-8ba2-45b3-a0c2-1fd29cb7ba6c.webp" },
    { id: 2, name: "Premium Streetwear LS - Black", prevPrice: null, price: 110.00, discount: null, category: "ropa", image: "img/polo-negro.png" },
    { id: 3, name: "Hoodie Luxe Oversize - Beige", prevPrice: 190.00, price: 159.00, discount: " -16%", category: "ropa", image: "img/hoodie-beige.png" },
    { id: 4, name: "Polera Oversize Custom", prevPrice: 200.00, price: 140.00, discount: "-30%", category: "ropa", image: "img/polera-negra.png" }
];

const perfumesProducts = [
    { id: 5, name: "Perfume Lattafa Asad 100ml", prevPrice: 150.00, price: 120.00, discount: " -20%", category: "perfumes", image: "img/perfume-1.png" },
    { id: 6, name: "Perfume Club De Nuit Intense Man", prevPrice: null, price: 210.00, discount: null, category: "perfumes", image: "img/perfume-2.png" },
    { id: 7, name: "Perfume Bharara King 100ml", prevPrice: null, price: 185.00, discount: null, category: "perfumes", image: "img/perfume-3.png" },
    { id: 8, name: "Afnan 9 PM 100ml Original", prevPrice: 200.00, price: 160.00, discount: " -20%", category: "perfumes", image: "img/perfume-4.png" }
];

// Unimos ambos arreglos para el funcionamiento global del carrito
const allProducts = [...ropaProducts, ...perfumesProducts];

const ropaContainer = document.getElementById('ropa-container');
const perfumesContainer = document.getElementById('perfumes-container');
const cartBtn = document.getElementById('cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCartBtn = document.getElementById('close-cart');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountEl = document.getElementById('cart-count');
const cartTotalPriceEl = document.getElementById('cart-total-price');
const cartTotalHeaderEl = document.getElementById('cart-total-header');

let cart = [];

function generateProductHtml(product) {
    const hasDiscount = product.discount !== null;
    let priceHtml = hasDiscount 
        ? `<span class="original-price">S/${product.prevPrice.toFixed(2)}</span><span class="product-price">S/${product.price.toFixed(2)}</span>`
        : `<span class="product-price">S/${product.price.toFixed(2)}</span>`;
    let badgeHtml = hasDiscount ? `<div class="sale-badge">${product.discount}</div>` : '';

    return `
        <div class="product-card">
            <div class="product-image">
                ${badgeHtml}
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400x400/eeeeee/000000?text=BULIS'">
            </div>
            <div class="product-title">${product.name}</div>
            <div class="price-container">
                ${priceHtml}
            </div>
            <button class="btn-add" onclick="addToCart(${product.id})">COMPRAR AHORA</button>
        </div>
    `;
}

// Inyectar HTML en los contenedores correspondientes como secciones separadas
function renderSections() {
    ropaContainer.innerHTML = ropaProducts.map(p => generateProductHtml(p)).join('');
    perfumesContainer.innerHTML = perfumesProducts.map(p => generateProductHtml(p)).join('');
}

window.addToCart = function(productId) {
    const product = allProducts.find(p => p.id === productId);
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
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <img src="${item.image}" onerror="this.src='https://via.placeholder.com/80/eeeeee/000000'">
                <div>
                    <div style="font-weight:500; font-size:0.9rem;">${item.name}</div>
                    <div style="color:var(--text-muted); font-size:0.85rem; margin-bottom:5px;">S/ ${item.price.toFixed(2)}</div>
                    <button style="background:none; border:none; text-decoration:underline; font-size:0.8rem; cursor:pointer;" onclick="removeFromCart(${index})">Eliminar</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemDiv);
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

// Inicializar página
renderSections();
