// diagnostic.js - Diagnóstico de categorías y productos
async function diagnostic() {
    console.log("--- INICIANDO DIAGNÓSTICO ---");
    
    // 1. Ver todas las categorías
    const categories = await window.dbActions.getCategories();
    console.log("Categorías en DB:", categories);

    // 2. Ver todos los productos (primeros 50)
    const products = await window.dbActions.getProducts();
    console.log("Muestra de Productos (primeros 50):", products.slice(0, 50));

    // 3. Analizar discrepancias de nombres
    const catRopaUrban = categories.find(c => c.name.toLowerCase().includes('urban'));
    if (catRopaUrban) {
        console.log("Categoría ROPA URBAN encontrada:", catRopaUrban);
        const productsForUrban = products.filter(p => 
            p.category_id == catRopaUrban.id || 
            p.category.toLowerCase() == catRopaUrban.name.toLowerCase() ||
            p.category.toLowerCase() == 'ropa' // El nombre antiguo
        );
        console.log("Productos que DEBERÍAN coincidir con ROPA URBAN:", productsForUrban);
    } else {
        console.log("No se encontró ninguna categoría con 'urban' en el nombre.");
    }
}

// Ejecutar si estamos en un entorno con dbActions
if (window.dbActions) diagnostic();
