// db.js - Motor de Datos con Supabase & Cloudinary

// Sistema de Configuración Seguro (Cargado desde config.js)
const CONFIG = window.CONFIG || {
    SUPABASE_URL: '',
    SUPABASE_KEY: '',
    CLOUDINARY_NAME: '',
    CLOUDINARY_KEY: '',
    CLOUDINARY_SECRET: ''
};

const SUPABASE_URL = CONFIG.SUPABASE_URL;
const SUPABASE_KEY = CONFIG.SUPABASE_KEY;

// Configuración de Cloudinary (Para subida)
const CLOUDINARY_NAME = CONFIG.CLOUDINARY_NAME;
const CLOUDINARY_KEY = CONFIG.CLOUDINARY_KEY;
const CLOUDINARY_SECRET = CONFIG.CLOUDINARY_SECRET; 

const supabaseClient = (window.supabase && SUPABASE_URL && SUPABASE_KEY) 
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) 
    : null;

// Initial Fallbacks (Solo para referencia o si algo falla)
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

window.dbActions = {
    // PRODUCTOS
    getProducts: async (category = null) => {
        if (!supabaseClient) return [];
        let query = supabaseClient.from('products').select('*');
        if (category) {
            query = query.ilike('category', category);
        }
        const { data, error } = await query;
        if (error) {
            console.error("Error cargando productos:", error);
            return [];
        }
        return data;
    },

    getProductsByCategoryId: async (categoryId) => {
        if (!supabaseClient) return [];
        const { data, error } = await supabaseClient.from('products')
            .select('*')
            .eq('category_id', categoryId);
        
        if (error) {
            console.error("Error cargando productos por ID:", error);
            return [];
        }
        return data;
    },
    
    saveProduct: async (p) => {
        if (!supabaseClient) return;
        const { error } = await supabaseClient.from('products').upsert(p);
        if (error) console.error("Error al guardar producto:", error);
    },
    
    deleteProduct: async (id) => {
        if (!supabaseClient) return;
        const { error } = await supabaseClient.from('products').delete().eq('id', id);
        if (error) console.error("Error al eliminar producto:", error);
    },

    // CONFIGURACIÓN
    getConfig: async (key) => {
        if (!supabaseClient) return initialConfig[key] || null;
        const { data, error } = await supabaseClient.from('config').select('value').eq('key', key).single();
        if (error) {
            return initialConfig[key] || null;
        }
        return data.value;
    },
    
    updateConfig: async (key, value) => {
        if (!supabaseClient) return;
        const { error } = await supabaseClient.from('config').upsert({ key, value });
        if (error) console.error("Error al actualizar configuración:", error);
    },

    // CATEGORÍAS
    getCategories: async () => {
        if (!supabaseClient) return [];
        const { data, error } = await supabaseClient.from('categories').select('*').order('name');
        if (error) {
            console.error("Error cargando categorías:", error);
            return [];
        }
        return data;
    },
    
    saveCategory: async (cat) => {
        if (!supabaseClient) return;
        const { error } = await supabaseClient.from('categories').upsert(cat);
        if (error) console.error("Error al guardar categoría:", error);
    },
    
    deleteCategory: async (id) => {
        if (!supabaseClient) return;
        const { error } = await supabaseClient.from('categories').delete().eq('id', id);
        if (error) console.error("Error al eliminar categoría:", error);
    },

    // SUB-CATEGORÍAS
    getSubCategories: async (categoryId = null) => {
        if (!supabaseClient) return [];
        let query = supabaseClient.from('sub_categories').select('*').order('name');
        if (categoryId) {
            query = query.eq('category_id', categoryId);
        }
        const { data, error } = await query;
        if (error) {
            console.error("Error cargando sub-categorías:", error);
            return [];
        }
        return data;
    },

    saveSubCategory: async (sub) => {
        if (!supabaseClient) return;
        const { error } = await supabaseClient.from('sub_categories').upsert(sub);
        if (error) console.error("Error al guardar sub-categoría:", error);
    },

    deleteSubCategory: async (id) => {
        if (!supabaseClient) return;
        const { error } = await supabaseClient.from('sub_categories').delete().eq('id', id);
        if (error) console.error("Error al eliminar sub-categoría:", error);
    }
};

window.dbDefaults = {
    config: initialConfig
};

// Función de inicialización dummy para mantener compatibilidad
window.initDB = async () => {
    return Promise.resolve();
};
