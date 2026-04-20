# Script de Inicialización Supabase - BULIS CMS

Copia y pega este código en el **SQL Editor** de tu panel de Supabase y presiona **RUN**.

```sql
-- 1. Limpiar tablas si existen
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS config;

-- 2. Crear tabla de PRODUCTOS
CREATE TABLE products (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  sub TEXT,
  price DOUBLE PRECISION NOT NULL,
  prevPrice DOUBLE PRECISION DEFAULT 0,
  discount TEXT,
  sizes TEXT,
  colors TEXT,
  "desc" TEXT,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Crear tabla de CATEGORÍAS
CREATE TABLE categories (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  link TEXT NOT NULL,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Crear tabla de CONFIGURACIÓN
CREATE TABLE config (
  key TEXT PRIMARY KEY,
  value TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Insertar Datos de Prueba (Categorías)
INSERT INTO categories (name, link, image) VALUES
('ROPA URBAN', 'ropa.html', 'img/hoodie-beige.png'),
('PERFUMES', 'perfumes.html', 'img/perfume-1.png'),
('ACCESORIOS', 'ropa.html', 'img/short-negro.png'),
('OFERTAS', '#ropa', '');

-- 6. Insertar Datos de Prueba (Configuración)
INSERT INTO config (key, value) VALUES
('whatsapp', '51933489344'),
('store_name', 'BULIS'),
('store_logo', 'img/logobuli.png'),
('primary_color', '#000000'),
('banner_title', 'CADA DISEÑO CUENTA CON UN MENSAJE'),
('banner_subtitle', 'RECIÉN LLEGADO'),
('marquee_items', 'BULIS | TIENDA OFICIAL;ENVÍOS A TODO EL PERÚ;COMPRA 100% SEGURA;📍 JR. AGUSTÍN GAMARRA 1095, LA VICTORIA;ENVÍO GRATIS DESDE S/ 300'),
('store_address', 'Jr. Agustín Gamarra 1095, La Victoria 15018, Perú'),
('store_maps_link', 'https://www.google.com/maps/search/Jr%2C+Agust%C3%ADn+Gamarra+1095%2C+La+Victoria+15018%2C+Per%C3%BA/@-12.0668,-77.0136,17z?hl=es');

-- 7. Insertar Datos de Prueba (Productos)
INSERT INTO products (name, category, sub, price, prevPrice, discount, sizes, colors, "desc", image) VALUES
('Polo Essentials Fear Of God - Abbey Stone', 'ropa', 'polos', 89, 120, '-25%', 'S,M,L,XL', 'Abbey Stone', 'Polo Essentials de alta calidad, corte oversize y tela premium.', './img/125SP254190F_CLASSIC_FIT_T-SHIRT-ABBEY_STONE_2_1920x_88e71190-8ba2-45b3-a0c2-1fd29cb7ba6c.webp'),
('Polo Premium Streetwear - Black', 'ropa', 'polos', 110, 0, null, 'M,L,XL', 'Black', 'Polo negro premium, estilo urbano minimalista.', './img/polo-negro.png'),
('Polo Essentials Oversize - White', 'ropa', 'polos', 95, 130, '-27%', 'S,M,L', 'White', 'El clásico blanco essentials que combina con todo.', './img/polo-blanco.png'),
('Hoodie Luxe Oversize - Beige', 'ropa', 'poleras', 159, 190, '-16%', 'M,L,XL', 'Beige', 'Polera con capucha ultra suave, ideal para climas fríos.', './img/hoodie-beige.png'),
('Short Sweat Essential - Black', 'ropa', 'shorts', 79, 100, '-21%', 'S,M,L', 'Black', 'Shorts de algodón premium para mayor comodidad.', './img/short-negro.png'),
('Lattafa Asad 100ml', 'perfumes', 'hombre', 120, 150, '-20%', '100ml', 'Original', 'Fragancia especiada y elegante, notas de tabaco y pimienta.', './img/perfume-1.png'),
('Club De Nuit Intense Man 105ml', 'perfumes', 'hombre', 210, 0, null, '105ml', 'Original', 'Excelente proyección y duración. Inspiración de lujo.', './img/perfume-2.png'),
('Lattafa Yara 100ml', 'perfumes', 'mujer', 99, 130, '-24%', '100ml', 'Pink', 'Perfume femenino dulce, cremoso y viral.', './img/perfume-1.png');

-- 8. POLÍTICAS DE ACCESO (OPCIONAL: Solo si quieres habilitar lectura/escritura pública para simplificar)
-- Esto permite que cualquier persona lea y escriba sin autenticación. 
-- ÚsalO SOLO para este desarrollo inicial. Luego habilita RLS.
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE config DISABLE ROW LEVEL SECURITY;
```
