// ropa.js - Ropa Category Page: Autocurativo
async function startRopa() {
    try { 
        await initDB(); 
        if (window.ui && window.ui.applyGlobalConfig) {
            window.ui.applyGlobalConfig();
        }
    } catch(e) {}
    if (window.ui && window.ui.init) ui.init();
    renderWithRetryRopa(0);
}


function renderWithRetryRopa(attempts) {
    const cont = document.getElementById('product-container');
    if (!cont) {
        if (attempts < 10) setTimeout(() => renderWithRetryRopa(attempts + 1), 200);
        return;
    }
    const allProducts = window.dbActions.getProducts('ropa');
    if (allProducts && allProducts.length > 0) {
        ui.updateProducts(allProducts);
        renderRopaProducts(allProducts, cont);
        setupFilters(allProducts, cont);
    } else if (attempts < 20) {
        setTimeout(() => renderWithRetryRopa(attempts + 1), 500);
    }
}

function setupFilters(allProducts, cont) {
    const subFilters = document.querySelectorAll('.sub-filter');
    subFilters.forEach(btn => {
        btn.onclick = () => {
            subFilters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const sub = btn.dataset.sub;
            const filtered = sub === 'all' ? allProducts : allProducts.filter(p => p.sub === sub);
            renderRopaProducts(filtered, cont);
        };
    });
}

function generateProductHtml(product) {
    try {
        const price = product.price || 0;
        const prevPrice = product.prevPrice || 0;
        const hasDiscount = product.discount && product.discount !== "null" && product.discount !== "";
        let priceHtml = hasDiscount 
            ? `<span class="original-price">S/${Number(prevPrice).toFixed(2)}</span><span class="product-price">S/${Number(price).toFixed(2)}</span>`
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

function renderRopaProducts(products, cont) {
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

startRopa();
