// categoria.js - Plantilla Maestra Dinámica
async function startCategoria() {
    try { 
        await initDB(); 
        if (window.ui && window.ui.applyGlobalConfig) {
            await window.ui.applyGlobalConfig();
        }
    } catch(e) {}
    
    if (window.ui && window.ui.init) ui.init();

    // Obtener ID de la URL
    const params = new URLSearchParams(window.location.search);
    const catId = params.get('id');

    if (!catId) {
        window.location.href = 'index.html';
        return;
    }

    renderCategoryContent(catId, 0);
}

async function renderCategoryContent(catId, attempts) {
    const cont = document.getElementById('product-container');
    const titleEl = document.getElementById('cat-banner-title');
    const subtitleEl = document.getElementById('cat-banner-subtitle');
    const descEl = document.getElementById('cat-banner-desc');
    const filterBar = document.getElementById('cat-sub-filters');

    if (!cont) {
        if (attempts < 10) setTimeout(() => renderCategoryContent(catId, attempts + 1), 200);
        return;
    }

    // 1. Obtener datos de la categoría para el Banner
    const categories = await window.dbActions.getCategories();
    const category = categories.find(c => c.id == catId);

    if (category) {
        document.title = `BULIS | ${category.name}`;
        titleEl.innerText = category.name.toUpperCase();
        subtitleEl.innerText = category.subtitle || 'MODA Y TENDENCIA';
        descEl.innerText = category.description || 'Explora nuestra colección exclusiva.';
    }

    // 2. Obtener Sub-categorías para los filtros
    const subs = await window.dbActions.getSubCategories(catId);
    renderSubFilters(subs, filterBar, catId);

    // 3. Obtener Productos (Intentando por ID primero)
    let products = await window.dbActions.getProductsByCategoryId(catId);
    
    // Fallback inteligente para transición: intentamos por nombre actual y por el nombre del enlace antiguo
    if ((!products || products.length === 0) && category) {
        const currentName = category.name.toLowerCase();
        const oldName = category.link ? category.link.replace('.html', '').toLowerCase() : '';
        
        products = await window.dbActions.getProducts(currentName);
        
        if (!products || products.length === 0) {
            products = await window.dbActions.getProducts(oldName);
        }

        // Tercer fallback: Si es un nombre compuesto (ej: ROPA URBAN), probar solo con la primera palabra (ROPA)
        if ((!products || products.length === 0) && currentName.includes(' ')) {
            const firstWord = currentName.split(' ')[0];
            products = await window.dbActions.getProducts(firstWord);
        }
    }

    if (products && products.length > 0) {
        ui.updateProducts(products);
        renderProducts(products, cont);
        setupDynamicFilters(products, cont);
    } else {
        cont.innerHTML = `<p style="grid-column: 1/-1; text-align:center; padding: 60px 20px; color: #888; font-size: 1.1rem;">Estamos preparando las mejores novedades en ${category ? category.name : 'esta sección'}. ¡Muy pronto disponible!</p>`;
    }

    // Ocultar loader al terminar
    if (window.ui && window.ui.hideLoader) window.ui.hideLoader();
}

function renderSubFilters(subs, container, catId) {
    if (!container) return;
    container.innerHTML = '<button class="sub-filter active" data-sub="all">TODO</button>';
    subs.forEach(s => {
        const btn = document.createElement('button');
        btn.className = 'sub-filter';
        btn.dataset.sub = s.name.toLowerCase();
        btn.innerText = s.name.toUpperCase();
        container.appendChild(btn);
    });
}

function setupDynamicFilters(allProducts, cont) {
    const subFilters = document.querySelectorAll('.sub-filter');
    subFilters.forEach(btn => {
        btn.onclick = () => {
            subFilters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const subQuery = btn.dataset.sub;
            const filtered = subQuery === 'all' ? allProducts : allProducts.filter(p => (p.sub || '').toLowerCase() === subQuery);
            renderProducts(filtered, cont);
        };
    });
}

function generateProductHtml(product) {
    try {
        const price = product.price || 0;
        const prev_price = product.prev_price || 0;
        const hasDiscount = product.discount && product.discount !== "null" && product.discount !== "";
        let priceHtml = hasDiscount 
            ? `<span class="original-price">S/${Number(prev_price).toFixed(2)}</span><span class="product-price">S/${Number(price).toFixed(2)}</span>`
            : `<span class="product-price">S/${Number(price).toFixed(2)}</span>`;
        let badgeHtml = hasDiscount ? `<div class="sale-badge">${product.discount}</div>` : '';
        return `
            <div class="product-card animate-on-scroll">
                <div class="product-image">
                    ${badgeHtml}
                    <img src="${product.image}" onerror="this.src='https://via.placeholder.com/400x400/eeeeee/000000?text=BULIS'">
                </div>
                <div class="product-title">${product.name}</div>
                <div class="price-container">
                    ${priceHtml}
                </div>
                <button class="btn-add" onclick="openProductModal(${product.id})">VER DETALLES</button>
            </div>
        `;
    } catch(e) { return ""; }
}

function renderProducts(products, cont) {
    cont.innerHTML = '';
    products.forEach((product, i) => {
        const html = generateProductHtml(product);
        if (html) {
            const div = document.createElement('div');
            div.innerHTML = html;
            const card = div.firstElementChild;
            card.style.transitionDelay = `${(i % 4) * 0.1}s`;
            cont.appendChild(card);
        }
    });
    if (window.ui && window.ui.initAnimations) window.ui.initAnimations();
}

startCategoria();
