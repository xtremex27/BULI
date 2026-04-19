const initialProducts = [
    // ROPA
    { id: 101, name: "Polo Essentials Fear Of God - Abbey Stone", category: "ropa", sub: "polos", price: 89, prevPrice: 120, discount: "-25%", sizes: "S,M,L,XL", colors: "Abbey Stone", desc: "Polo Essentials de alta calidad, corte oversize y tela premium.", image: "./img/125SP254190F_CLASSIC_FIT_T-SHIRT-ABBEY_STONE_2_1920x_88e71190-8ba2-45b3-a0c2-1fd29cb7ba6c.webp" },
    { id: 102, name: "Polo Premium Streetwear - Black", category: "ropa", sub: "polos", price: 110, prevPrice: 0, discount: null, sizes: "M,L,XL", colors: "Black", desc: "Polo negro premium, estilo urbano minimalista.", image: "./img/polo-negro.png" },
    { id: 103, name: "Polo Essentials Oversize - White", category: "ropa", sub: "polos", price: 95, prevPrice: 130, discount: "-27%", sizes: "S,M,L", colors: "White", desc: "El clásico blanco essentials que combina con todo.", image: "./img/polo-blanco.png" },
    { id: 104, name: "Polo Boxy Fit - Cement", category: "ropa", sub: "polos", price: 89, prevPrice: 0, discount: null, sizes: "S,M,L", colors: "Cement", desc: "Corte boxy fit para un look moderno y relajado.", image: "./img/polo-gris.png" },
    { id: 105, name: "Hoodie Luxe Oversize - Beige", category: "ropa", sub: "poleras", price: 159, prevPrice: 190, discount: "-16%", sizes: "M,L,XL", colors: "Beige", desc: "Polera con capucha ultra suave, ideal para climas fríos.", image: "./img/hoodie-beige.png" },
    { id: 106, name: "Polera Oversize Custom - Noir", category: "ropa", sub: "poleras", price: 140, prevPrice: 200, discount: "-30%", sizes: "M,L", colors: "Black", desc: "Polera negra sin capucha con bordado personalizado.", image: "./img/polera-negra.png" },
    { id: 107, name: "Polera Heavyweight - Grey", category: "ropa", sub: "poleras", price: 169, prevPrice: 0, discount: null, sizes: "L,XL", colors: "Grey", desc: "Tela de alto gramaje para mayor durabilidad y confort.", image: "./img/polera-gris.png" },
    { id: 108, name: "Short Sweat Essential - Black", category: "ropa", sub: "shorts", price: 79, prevPrice: 100, discount: "-21%", sizes: "S,M,L", colors: "Black", desc: "Shorts de algodón premium para mayor comodidad.", image: "./img/short-negro.png" },
    { id: 109, name: "Short Cargo Premium - Beige", category: "ropa", sub: "shorts", price: 89, prevPrice: 0, discount: null, sizes: "M,L", colors: "Beige", desc: "Shorts cargo con múltiples bolsillos y ajuste perfecto.", image: "./img/short-beige.png" },

    // PERFUMES
    { id: 201, name: "Lattafa Asad 100ml", category: "perfumes", sub: "hombre", price: 120, prevPrice: 150, discount: "-20%", sizes: "100ml", colors: "Original", desc: "Fragancia especiada y elegante, notas de tabaco y pimienta.", image: "./img/perfume-1.png" },
    { id: 202, name: "Club De Nuit Intense Man 105ml", category: "perfumes", sub: "hombre", price: 210, prevPrice: 0, discount: null, sizes: "105ml", colors: "Original", desc: "Excelente proyección y duración. Inspiración de lujo.", image: "./img/perfume-2.png" },
    { id: 203, name: "Bharara King 100ml", category: "perfumes", sub: "hombre", price: 185, prevPrice: 0, discount: null, sizes: "100ml", colors: "Original", desc: "Aroma cítrico y dulce de larga duración.", image: "./img/perfume-3.png" },
    { id: 204, name: "Afnan 9 PM 100ml", category: "perfumes", sub: "hombre", price: 160, prevPrice: 200, discount: "-20%", sizes: "100ml", colors: "Original", desc: "Ideal para salidas nocturnas, dulce y seductor.", image: "./img/perfume-4.png" },
    { id: 205, name: "Lattafa Yara 100ml", category: "perfumes", sub: "mujer", price: 99, prevPrice: 130, discount: "-24%", sizes: "100ml", colors: "Pink", desc: "Perfume femenino dulce, cremoso y viral.", image: "./img/perfume-1.png" },
    { id: 206, name: "Lattafa Raghba 100ml", category: "perfumes", sub: "unisex", price: 85, prevPrice: 0, discount: null, sizes: "100ml", colors: "Amber", desc: "Aroma ambarado y avainillado exquisito.", image: "./img/perfume-3.png" },
    { id: 207, name: "Jean Lowe Immortal 100ml", category: "perfumes", sub: "hombre", price: 140, prevPrice: 180, discount: "-22%", sizes: "100ml", colors: "Original", desc: "Elegancia embotellada, notas cítricas y amaderadas.", image: "./img/perfume-2.png" },
    { id: 208, name: "Bade'e Al Oud Amethyst 100ml", category: "perfumes", sub: "unisex", price: 115, prevPrice: 0, discount: null, sizes: "100ml", colors: "Purple", desc: "Una joya de la perfumería árabe con notas de rosa y oud.", image: "./img/perfume-4.png" }
];

const initialCategories = [
    { id: 1, name: 'ROPA URBAN', link: 'ropa.html', image: 'img/hoodie-beige.png' },
    { id: 2, name: 'PERFUMES', link: 'perfumes.html', image: 'img/perfume-1.png' },
    { id: 3, name: 'ACCESORIOS', link: 'ropa.html', image: 'img/short-negro.png' },
    { id: 4, name: 'OFERTAS', link: '#ropa', image: '' }
];

const initialConfig = {
    whatsapp: '51933489344',
    store_name: 'BULIS',
    store_logo: 'img/logobuli.png',
    primary_color: '#000000',
    banner_title: 'CADA DISEÑO CUENTA CON UN MENSAJE',
    banner_subtitle: 'RECIÉN LLEGADO',
    marquee_items: 'BULIS | TIENDA OFICIAL;ENVÍOS A TODO EL PERÚ;COMPRA 100% SEGURA;📍 JR. AGUSTÍN GAMARRA 1095, LA VICTORIA;ENVÍO GRATIS DESDE S/ 300',
    store_address: 'Jr. Agustín Gamarra 1095, La Victoria 15018, Perú',
    store_maps_link: 'https://www.google.com/maps/search/Jr%2C+Agust%C3%ADn+Gamarra+1095%2C+La+Victoria+15018%2C+Per%C3%BA/@-12.0668,-77.0136,17z?hl=es'
};

async function initDB() {
    try {
        const SQL = await initSqlJs({
            locateFile: file => `./${file}`
        });

        const savedDB = localStorage.getItem('bulis_db');
        if (savedDB) {
            const u8 = new Uint8Array(atob(savedDB).split("").map(c => c.charCodeAt(0)));
            db = new SQL.Database(u8);
            
            try {
                // Verificar tablas y contenido
                const pTable = db.exec("SELECT count(*) FROM products");
                let cTable;
                try {
                    cTable = db.exec("SELECT count(*) FROM categories");
                } catch(e) {
                    createTables();
                    seedData();
                    cTable = db.exec("SELECT count(*) FROM categories");
                }

                // Si alguna tabla principal está vacía, resembrar
                if (pTable[0].values[0][0] === 0 || cTable[0].values[0][0] === 0) {
                    seedData();
                }
            } catch(e) {
                console.warn("DB corrupta o antigua, recreando...");
                createTables();
                seedData();
            }
        } else {
            db = new SQL.Database();
            createTables();
            seedData();
        }
        isReady = true;
    } catch (e) {
        console.error("Modo SQL fallido, activando modo JSON:", e);
        useSQL = false;
        isReady = true;
    }
}

function createTables() {
    db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT, category TEXT, sub TEXT, price REAL, prevPrice REAL, 
        discount TEXT, sizes TEXT, colors TEXT, desc TEXT, image TEXT
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS config (key TEXT PRIMARY KEY, value TEXT)`);
    db.run(`CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT, link TEXT, image TEXT
    )`);
}

function seedData() {
    // Evitar duplicados si seedData se llama varias veces por error
    db.run("DELETE FROM products");
    db.run("DELETE FROM categories");

    initialProducts.forEach(p => {
        db.run(`INSERT INTO products (name, category, sub, price, prevPrice, discount, sizes, colors, desc, image) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [p.name, p.category, p.sub, p.price, p.prevPrice, p.discount, p.sizes, p.colors, p.desc, p.image]);
    });

    initialCategories.forEach(c => {
        db.run(`INSERT INTO categories (name, link, image) VALUES (?, ?, ?)`, [c.name, c.link, c.image]);
    });
    
    Object.entries(initialConfig).forEach(([key, val]) => {
        db.run(`INSERT OR REPLACE INTO config (key, value) VALUES (?, ?)`, [key, val]);
    });

    saveDB();
}



function saveDB() {
    if (!useSQL || !db) return;
    const data = db.export();
    const base64 = btoa(String.fromCharCode.apply(null, data));
    localStorage.setItem('bulis_db', base64);
}

window.dbActions = {
    getProducts: (category = null) => {
        if (!db) return initialProducts.filter(p => !category || p.category === category);
        try {
            let sql = "SELECT * FROM products";
            const params = [];
            if (category) {
                sql += " WHERE category = ?";
                params.push(category);
            }
            const res = db.exec(sql, params);
            if (res.length === 0) return [];
            return res[0].values.map(row => {
                const obj = {};
                res[0].columns.forEach((col, i) => obj[col] = row[i]);
                return obj;
            });
        } catch(e) { return []; }
    },
    addProduct: (p) => {
        if (!db) return;
        db.run(`INSERT INTO products (name, category, sub, price, prevPrice, discount, sizes, colors, desc, image) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
                [p.name, p.category, p.sub, p.price, p.prevPrice, p.discount, p.sizes, p.colors, p.desc, p.image]);
        saveDB();
    },
    deleteProduct: (id) => {
        if (!db) return;
        db.run("DELETE FROM products WHERE id = ?", [id]);
        saveDB();
    },
    getConfig: (key) => {
        if (!db) return null;
        try {
            const res = db.exec("SELECT value FROM config WHERE key = ?", [key]);
            return (res.length > 0 && res[0].values.length > 0) ? res[0].values[0][0] : null;
        } catch(e) { return null; }
    },
    updateConfig: (key, value) => {
        if (!db) return;
        db.run("INSERT OR REPLACE INTO config (key, value) VALUES (?, ?)", [key, value]);
        saveDB();
    },
    getCategories: () => {
        if (!db) return [];
        try {
            const res = db.exec("SELECT * FROM categories");
            if (res.length === 0) return [];
            return res[0].values.map(row => {
                const obj = {};
                res[0].columns.forEach((col, i) => obj[col] = row[i]);
                return obj;
            });
        } catch(e) { return []; }
    },
    addCategory: (name, link, image) => {
        if (!db) return;
        db.run("INSERT INTO categories (name, link, image) VALUES (?, ?, ?)", [name, link, image]);
        saveDB();
    },
    deleteCategory: (id) => {
        if (!db) return;
        db.run("DELETE FROM categories WHERE id = ?", [id]);
        saveDB();
    }
};

window.dbDefaults = {
    products: initialProducts,
    categories: initialCategories,
    config: initialConfig
};

window.initDB = initDB;
