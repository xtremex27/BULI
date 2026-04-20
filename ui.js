// ui.js - Lógica compartida de UI para BULIS
let cart = [];
let allProducts = [];

// Referencias a elementos (se inicializan en initUI)
let els = {};

let selectedProduct = null;
let selectedSize = null;
let selectedColor = null;

// Inicialización de UI
function initUI() {
    // Capturar elementos al inicializar (evita errores si el script está en el head)
    els = {
        cartBtn: document.getElementById('cart-btn'),
        cartSidebar: document.getElementById('cart-sidebar'),
        closeCartBtn: document.getElementById('close-cart'),
        cartOverlay: document.getElementById('cart-overlay'),
        cartItemsContainer: document.getElementById('cart-items'),
        cartCount: document.getElementById('cart-count'),
        cartTotalPrice: document.getElementById('cart-total-price'),
        cartTotalHeader: document.getElementById('cart-total-header'),
        modalOverlay: document.getElementById('product-modal-overlay'),
        closeModalBtn: document.getElementById('close-modal'),
        modalAddBtn: document.getElementById('modal-add-btn'),
        menuToggle: document.getElementById('menu-toggle'),
        navSidebar: document.getElementById('nav-sidebar'),
        closeMenuBtn: document.getElementById('close-menu'),
        mobileNavCont: document.getElementById('mobile-dynamic-nav')
    };

    if (els.cartBtn) els.cartBtn.addEventListener('click', openCart);
    if (els.closeCartBtn) els.closeCartBtn.addEventListener('click', closeCart);
    if (els.cartOverlay) els.cartOverlay.addEventListener('click', () => { closeCart(); closeMobileMenu(); });
    
    if (els.menuToggle) els.menuToggle.addEventListener('click', openMobileMenu);
    if (els.closeMenuBtn) els.closeMenuBtn.addEventListener('click', closeMobileMenu);
    
    if (els.closeModalBtn) els.closeModalBtn.onclick = closeModal;
    if (els.modalOverlay) els.modalOverlay.onclick = (e) => { if (e.target === els.modalOverlay) closeModal(); };
    
    if (els.modalAddBtn) {
        els.modalAddBtn.onclick = () => {
            if (selectedProduct.sizes && !selectedSize) {
                alert('Por favor selecciona una talla.');
                return;
            }
            if (selectedProduct.colors && !selectedColor) {
                alert('Por favor selecciona un color.');
                return;
            }

            const item = {
                ...selectedProduct,
                selectedSize,
                selectedColor,
                tempId: Date.now()
            };

            cart.push(item);
            updateCartUI();
            closeModal();
            openCart();
        };
    }

    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) checkoutBtn.onclick = checkoutToWhatsApp;

    initAnimations();
}

// Modal Logic
window.openProductModal = async function(productId) {
    // Usar allProducts si ya están cargados, sino pedirlos
    let product = allProducts.find(p => p.id == productId);
    
    if (!product) {
        const products = await window.dbActions.getProducts();
        product = products.find(p => p.id == productId);
    }
    
    if (!product) {
        console.error("Producto no encontrado:", productId);
        return;
    }

    selectedProduct = product;
    selectedSize = null;
    selectedColor = null;

    // Asegurar que los elementos existen antes de asignar
    const modalImg = document.getElementById('modal-img');
    const modalCat = document.getElementById('modal-category');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalPrev = document.getElementById('modal-prev-price');
    const modalDesc = document.getElementById('modal-desc');

    if (modalImg) modalImg.src = product.image;
    if (modalCat) modalCat.innerText = product.category;
    if (modalTitle) modalTitle.innerText = product.name;
    if (modalPrice) modalPrice.innerText = `S/ ${Number(product.price).toFixed(2)}`;
    
    if (modalPrev) {
        const prevPrice = product.prev_price || 0;
        if (prevPrice > 0) {
            modalPrev.innerText = `S/ ${Number(prevPrice).toFixed(2)}`;
            modalPrev.style.display = 'inline';
        } else {
            modalPrev.style.display = 'none';
        }
    }

    if (modalDesc) modalDesc.innerText = product.desc || "Sin descripción disponible.";

    // Render Options
    const sizesCont = document.getElementById('modal-sizes');
    const colorsCont = document.getElementById('modal-colors');
    if (sizesCont) sizesCont.innerHTML = '';
    if (colorsCont) colorsCont.innerHTML = '';

    if (product.sizes && sizesCont) {
        product.sizes.split(',').forEach(s => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerText = s.trim();
            btn.onclick = () => {
                document.querySelectorAll('#modal-sizes .option-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                selectedSize = s.trim();
            };
            sizesCont.appendChild(btn);
        });
    }

    if (product.colors && colorsCont) {
        product.colors.split(',').forEach(c => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerText = c.trim();
            btn.onclick = () => {
                document.querySelectorAll('#modal-colors .option-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                selectedColor = c.trim();
            };
            colorsCont.appendChild(btn);
        });
    }

    if (els.modalOverlay) els.modalOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
};

function closeModal() {
    if (els.modalOverlay) els.modalOverlay.classList.remove('show');
    document.body.style.overflow = '';
}

// Cart Logic
window.removeFromCart = function(tempId) {
    cart = cart.filter(item => item.tempId !== tempId);
    updateCartUI();
};

function updateCartUI() {
    if (!els.cartCount) return;
    els.cartCount.innerText = cart.length;
    els.cartItemsContainer.innerHTML = '';
    let total = 0;
    
    if (cart.length === 0) {
        els.cartItemsContainer.innerHTML = '<p style="color:#666; text-align:center; padding:20px;">Tu carrito está vacío.</p>';
    } else {
        cart.forEach((item) => {
            total += item.price;
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <img src="${item.image}" onerror="this.src='https://via.placeholder.com/80/eeeeee/000000'">
                <div>
                    <div style="font-weight:500; font-size:0.9rem;">${item.name}</div>
                    <div style="font-size:0.75rem; color:#888;">${item.selectedSize ? 'Talla: ' + item.selectedSize : ''} ${item.selectedColor ? '| Color: ' + item.selectedColor : ''}</div>
                    <div style="color:var(--text-main); font-weight:600; font-size:0.85rem; margin-top:3px;">S/ ${item.price.toFixed(2)}</div>
                    <button style="background:none; border:none; text-decoration:underline; font-size:0.8rem; cursor:pointer; color:#e74c3c;" onclick="removeFromCart(${item.tempId})">Eliminar</button>
                </div>
            `;
            els.cartItemsContainer.appendChild(itemDiv);
        });
    }

    if (els.cartTotalPrice) els.cartTotalPrice.innerText = `S/ ${total.toFixed(2)}`;
    if (els.cartTotalHeader) els.cartTotalHeader.innerText = `S/ ${total.toFixed(2)}`;
}

function openCart() {
    if (els.cartSidebar) els.cartSidebar.classList.add('open');
    if (els.cartOverlay) els.cartOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    if (els.cartSidebar) els.cartSidebar.classList.remove('open');
    if (els.cartOverlay) els.cartOverlay.classList.remove('show');
    document.body.style.overflow = '';
}

// Mobile Menu Logic
function openMobileMenu() {
    if (els.navSidebar) els.navSidebar.classList.add('open');
    if (els.cartOverlay) els.cartOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    if (els.navSidebar) els.navSidebar.classList.remove('open');
    if (els.cartOverlay) els.cartOverlay.classList.remove('show');
    document.body.style.overflow = '';
}

// WhatsApp
async function checkoutToWhatsApp() {
    if (cart.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    const phone = await window.dbActions.getConfig('whatsapp') || '51933489344';
    let message = "¡Hola BULIS! 🔷\nQuiero realizar un pedido:\n\n";
    
    cart.forEach(item => {
        const cleanPath = item.image.replace('./', '');
        message += `*${item.name}*\n`;
        if (item.selectedSize || item.selectedColor) {
            message += `   Detalle: ${item.selectedSize || ''} ${item.selectedColor || ''}\n`;
        }
        message += `   Imagen: ${window.location.origin}/${cleanPath}\n`;
        message += `   Precio: S/ ${item.price.toFixed(2)}\n\n`;
    });

    const total = cart.reduce((acc, item) => acc + item.price, 0);
    message += `*Total a pagar: S/ ${total.toFixed(2)}*\n\n`;
    message += "Quedo a la espera de sus datos para el pago. ¡Gracias!";

    const encodedUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(encodedUrl, '_blank');
}

function initAnimations() {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const animElements = document.querySelectorAll('.animate-on-scroll');
    animElements.forEach(el => observer.observe(el));
}

// CMS: Dynamic Injection
async function applyGlobalConfig() {
    // Helpers para obtener dato de DB o Default
    const name = await window.dbActions.getConfig('store_name') || window.dbDefaults.config['store_name'];
    const logo = await window.dbActions.getConfig('store_logo') || window.dbDefaults.config['store_logo'];
    const marqueeData = await window.dbActions.getConfig('marquee_items') || window.dbDefaults.config['marquee_items'];
    const address = await window.dbActions.getConfig('store_address') || window.dbDefaults.config['store_address'];
    const mapsLink = await window.dbActions.getConfig('store_maps_link') || window.dbDefaults.config['store_maps_link'];
    const primaryColor = await window.dbActions.getConfig('primary_color') || window.dbDefaults.config['primary_color'];
    const bannerTitle = await window.dbActions.getConfig('banner_title') || window.dbDefaults.config['banner_title'];
    const bannerSub = await window.dbActions.getConfig('banner_subtitle') || window.dbDefaults.config['banner_subtitle'];

    // Theme (Inject CSS Variable)
    document.documentElement.style.setProperty('--text-main', primaryColor);

    // Title & Brand
    document.title = `${name} | Tienda Oficial`;
    document.querySelectorAll('.store-name-text').forEach(el => el.innerText = name);
    if (document.getElementById('main-logo')) document.getElementById('main-logo').src = logo;

    // Home Banner Hero
    if (document.getElementById('hero-title')) document.getElementById('hero-title').innerText = bannerTitle;
    if (document.getElementById('hero-subtitle')) document.getElementById('hero-subtitle').innerText = bannerSub;

    // Marquee
    const marqueeCont = document.getElementById('main-marquee');
    if (marqueeCont && marqueeData) {
        const items = marqueeData.split(';').map(i => i.trim()).filter(i => i !== '');
        const fullContent = [...items, ...items].map(text => `<span>${text}</span>`).join('');
        marqueeCont.innerHTML = fullContent;
    }

    // Dynamic Navigation
    const navCont = document.getElementById('dynamic-nav');
    const mobileNavCont = document.getElementById('mobile-dynamic-nav');
    
    let cats = await window.dbActions.getCategories();

    if (navCont || mobileNavCont) {
        let navHtml = `<a href="index.html">INICIO</a>`;
        cats.forEach(c => {
            navHtml += `<a href="${c.link}">${c.name}</a>`;
        });
        if (navCont) navCont.innerHTML = navHtml;
        if (mobileNavCont) mobileNavCont.innerHTML = navHtml;
    }

    // Home Category Grid
    const gridCont = document.getElementById('category-grid');
    if (gridCont) {
        gridCont.innerHTML = '';
        cats.forEach(c => {
            const card = document.createElement('a');
            card.href = c.link;
            card.className = 'category-card';
            const bgHtml = c.image ? `<div class="category-bg" style="background-image: url('${c.image}');"></div>` : '';
            card.innerHTML = `${bgHtml}<h4>${c.name}</h4>`;
            gridCont.appendChild(card);
        });
    }

    // --- DINAMISMO DE PÁGINA DE CATEGORÍA ---
    const currPath = window.location.pathname.split('/').pop() || 'index.html';
    const currCat = cats.find(c => c.link === currPath);
    
    if (currCat) {
        // Actualizar Banner de la página (Ropa, Perfumes, etc)
        const bSub = document.querySelector('.page-banner .banner-subtitle');
        const bTitle = document.querySelector('.page-banner .banner-title');
        const bDesc = document.querySelector('.page-banner .banner-desc');
        
        if (bSub) bSub.innerText = currCat.subtitle || '';
        if (bTitle) bTitle.innerText = `CATÁLOGO ${currCat.name.toUpperCase()}`;
        if (bDesc) bDesc.innerText = currCat.description || '';

        // Actualizar Filtros de Sub-categoría
        const filterBar = document.querySelector('.sub-filter-bar');
        if (filterBar) {
            const subs = await window.dbActions.getSubCategories(currCat.id);
            if (subs.length > 0) {
                let filterHtml = `<button class="sub-filter active" data-sub="all">TODO</button>`;
                subs.forEach(s => {
                    filterHtml += `<button class="sub-filter" data-sub="${s.name.toLowerCase()}">${s.name.toUpperCase()}</button>`;
                });
                filterBar.innerHTML = filterHtml;
                // Re-bind events (ropa.js / perfumes.js handle the actual click logic if called after)
            }
        }
    }
}


window.ui = {
    init: initUI,
    updateProducts: (products) => { allProducts = products; },
    initAnimations: initAnimations,
    applyGlobalConfig: applyGlobalConfig
};
