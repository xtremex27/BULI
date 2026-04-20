// script.js - Home Page Logic: Autocurativo
async function startHome() {
    try {
        await initDB();
        if (window.ui && window.ui.applyGlobalConfig) {
            window.ui.applyGlobalConfig();
        }
    } catch(e) { 
        console.warn("initDB falló, continuando con fallback...");
    }
    
    if (window.ui && window.ui.init) {
        ui.init();
    }
    
    renderWithRetry(0);
}


async function renderWithRetry(attempts) {
    const ropaCont = document.getElementById('ropa-container');
    const perfCont = document.getElementById('perfumes-container');
    
    if (!ropaCont || !perfCont) {
        if (attempts < 10) setTimeout(() => renderWithRetry(attempts + 1), 200);
        return;
    }

    const allProducts = await window.dbActions.getProducts();
    
    if (allProducts && allProducts.length > 0) {
        ui.updateProducts(allProducts);
        renderHomeSections(allProducts, ropaCont, perfCont);
    } else if (attempts < 20) {
        setTimeout(() => renderWithRetry(attempts + 1), 500);
    }
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
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400x400/eeeeee/000000?text=BULIS'">
                </div>
                <div class="product-title">${product.name}</div>
                <div class="price-container">
                    ${priceHtml}
                </div>
                <button class="btn-add" onclick="openProductModal(${product.id})">VER DETALLES</button>
            </div>
        `;
    } catch(e) {
        return "";
    }
}

function renderHomeSections(allProducts, ropaCont, perfCont) {
    ropaCont.innerHTML = '';
    perfCont.innerHTML = '';

    const ropa = allProducts.filter(p => p.category === 'ropa').slice(0, 12);
    const perfumes = allProducts.filter(p => p.category === 'perfumes').slice(0, 12);

    ropa.forEach((p, i) => {
        const html = generateProductHtml(p);
        if (html) {
            const div = document.createElement('div');
            div.innerHTML = html;
            const card = div.firstElementChild;
            card.style.transitionDelay = `${(i % 4) * 0.1}s`;
            ropaCont.appendChild(card);
        }
    });

    perfumes.forEach((p, i) => {
        const html = generateProductHtml(p);
        if (html) {
            const div = document.createElement('div');
            div.innerHTML = html;
            const card = div.firstElementChild;
            card.style.transitionDelay = `${(i % 4) * 0.1}s`;
            perfCont.appendChild(card);
        }
    });

    if (window.ui && window.ui.initAnimations) window.ui.initAnimations();
}

startHome();
