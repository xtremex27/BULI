// script.js - Home Page Logic: Autocurativo
async function startHome() {
    try {
        await initDB();
        if (window.ui && window.ui.applyGlobalConfig) {
            await window.ui.applyGlobalConfig();
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
    const ropaTrack = document.getElementById('ropa-track-1');
    const perfTrack = document.getElementById('perf-track-1');
    
    if (!ropaTrack || !perfTrack) {
        if (attempts < 10) setTimeout(() => renderWithRetry(attempts + 1), 200);
        return;
    }

    const allProducts = await window.dbActions.getProducts();
    
    if (allProducts && allProducts.length > 0) {
        ui.updateProducts(allProducts);
        renderHomeSections(allProducts);
    } else if (attempts < 20) {
        setTimeout(() => renderWithRetry(attempts + 1), 500);
    }
    
    // Ocultar loader al terminar
    if (window.ui && window.ui.hideLoader) window.ui.hideLoader();
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

function renderHomeSections(allProducts) {
    const r1 = document.getElementById('ropa-track-1');
    const r2 = document.getElementById('ropa-track-2');
    const p1 = document.getElementById('perf-track-1');
    const p2 = document.getElementById('perf-track-2');

    if (!r1 || !r2 || !p1 || !p2) return;

    r1.innerHTML = ''; r2.innerHTML = '';
    p1.innerHTML = ''; p2.innerHTML = '';

    // Filtrar y tomar suficientes productos para el carrusel (mínimo 12 para que se vea lleno)
    const ropa = allProducts.filter(p => {
        const cat = (p.category || '').toLowerCase();
        return cat === 'ropa' || cat === 'ropa urban' || cat.startsWith('ropa') || cat.includes('urban');
    }).slice(0, 12);

    const perfumes = allProducts.filter(p => {
        const cat = (p.category || '').toLowerCase();
        return cat === 'perfumes' || cat === 'perfumería' || cat.startsWith('perfume');
    }).slice(0, 12);

    // Función auxiliar para llenar tracks con duplicación para efecto infinito
    const fillTrack = (products, track1, track2) => {
        if (products.length === 0) return;
        
        // Dividir en dos filas
        const mid = Math.ceil(products.length / 2);
        const row1 = products.slice(0, mid);
        const row2 = products.slice(mid);

        // Llenar Fila 1 y clonar
        row1.forEach(p => track1.innerHTML += generateProductHtml(p));
        track1.innerHTML += track1.innerHTML; // Clon para loop

        // Llenar Fila 2 y clonar
        row2.forEach(p => track2.innerHTML += generateProductHtml(p));
        track2.innerHTML += track2.innerHTML; // Clon para loop
    };

    fillTrack(ropa, r1, r2);
    fillTrack(perfumes, p1, p2);

    if (ropa.length === 0) {
        document.querySelector('#ropa .product-marquee-container').innerHTML = '<p style="text-align:center; padding: 40px; color: #888; width: 100%;">Estamos preparando las mejores prendas para ti. ¡Vuelve pronto!</p>';
    }
    if (perfumes.length === 0) {
        document.querySelector('#perfumes .product-marquee-container').innerHTML = '<p style="text-align:center; padding: 40px; color: #888; width: 100%;">Nuestras fragancias árabes exclusivas están en camino.</p>';
    }

    if (window.ui && window.ui.initAnimations) window.ui.initAnimations();
}

startHome();
