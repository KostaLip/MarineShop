INSERT INTO users (email, first_name, last_name, password_hash, phone, is_admin)
VALUES
    ('admin@marineshop.com', 'Marko', 'Petrović', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '021555123', true),
    ('petar.nikolic@gmail.com', 'Petar', 'Nikolić', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '021555456', false),
    ('ana.jovanovic@yahoo.com', 'Ana', 'Jovanović', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '021555789', false),
    ('milan.stojanovic@outlook.com', 'Milan', 'Stojanović', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '021555321', false),
    ('jovana.milic@gmail.com', 'Jovana', 'Milić', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '021555654', false);

-- Glavne kategorije
INSERT INTO categories (category_name, description, icon_name) VALUES
('Boats', 'Various types of boats', 'https://picsum.photos/200/300'),
('Fishing Gear', 'All fishing equipment', 'https://picsum.photos/200/300'),
('Navigation', 'Navigation tools and electronics', 'https://picsum.photos/200/300'),
('Safety Equipment', 'Safety gear for boating', 'https://picsum.photos/200/300');

INSERT INTO products (category_id, product_name, description, price, stock_quantity)
VALUES
(1, 'Samsung Galaxy S23', 'Flagship smartphone sa 256GB memorije', 899.99, 50),
(1, 'iPhone 14 Pro', 'Apple premium telefon, 128GB', 1099.00, 30),
(2, 'HP Pavilion 15', 'Laptop sa AMD Ryzen 7 procesorom i 16GB RAM-a', 749.50, 20),
(2, 'MacBook Air M2', 'Apple laptop sa M2 čipom i 8GB RAM-a', 1249.99, 15),
(3, 'Sony WH-1000XM5', 'Bežične slušalice sa aktivnim poništavanjem buke', 349.00, 40),
(3, 'Logitech MX Master 3S', 'Bežični miš za produktivnost', 129.90, 60),
(4, 'Samsung 55" QLED TV', '4K Smart TV sa Quantum Dot tehnologijom', 699.00, 25),
(4, 'Philips Blender HR2228', 'Blender sa 6 sečiva i 5 brzina', 79.99, 100);

INSERT INTO product_images (product_id, image_url) VALUES 
(1, 'https://example.com/images/iphone15_front.jpg'),
(2, 'https://example.com/images/iphone15_back.jpg'),
(3, 'https://example.com/images/iphone15_side.jpg'),
(4, 'https://example.com/images/galaxy_s24_main.jpg'),
(5, 'https://example.com/images/galaxy_s24_display.jpg'),
(6, 'https://example.com/images/macbook_pro_closed.jpg'),
(7, 'https://example.com/images/macbook_pro_open.jpg'),
(8, 'https://example.com/images/nike_airmax_side.jpg'),
(1, 'https://example.com/images/nike_airmax_top.jpg'),
(2, 'https://example.com/images/gaming_chair_front.jpg');

INSERT INTO reviews (product_id, user_id, rating, review_comment) VALUES
(1, 1, 5, 'Odličan proizvod! Preporučujem svima.'),
(1, 2, 4, 'Vrlo zadovoljan kupovinom. Brza dostava.'),
(3, 3, 3, 'Okej je, ali očekivao sam bolje za tu cenu.'),
(3, 4, 5, 'Savršeno! Tačno ono što sam tražio.'),
(3, 5, 2, 'Razočaran sam kvalitetom. Nije vrijedno novca.');

INSERT INTO orders (user_id, order_date, status, total_price, shipping_country, shipping_city, shipping_address, stripe_session_id) VALUES
(15, '2024-09-20 10:30:00', 'PENDING', 129.99, 'Serbia', 'Novi Sad', 'Bulevar oslobođenja 123', 'cs_test_session_123'),
(15, '2024-09-18 14:15:00', 'PAID', 89.50, 'Serbia', 'Belgrade', 'Knez Mihailova 45', 'cs_test_session_456'),
(15, '2024-09-25 16:45:00', 'PAID', 259.00, 'Serbia', 'Niš', 'Obrenovićeva 78', 'cs_test_session_789'),
(14, '2024-09-15 09:20:00', 'CANCELLED', 45.25, 'Serbia', 'Novi Sad', 'Zmaj Jovina 12', 'cs_test_session_abc'),
(14, '2024-09-27 11:00:00', 'PENDING', 199.99, 'Serbia', 'Kragujevac', 'Svetozara Markovića 34', 'cs_test_session_def');

INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
-- Order 1 (user_id: 1, total: 129.99)
(1, 19, 2, 25.00),  -- 2 majice
(1, 22, 1, 45.00),  -- 1 šorts  
(1, 23, 6, 9.99),   -- 6 čarapa (popust)

-- Order 2 (user_id: 1, total: 89.50) 
(2, 19, 1, 25.00),  -- 1 majica
(2, 22, 1, 64.50),  -- 1 jakna (popust)

-- Order 3 (user_id: 2, total: 259.00)
(3, 23, 2, 120.00), -- 2 jakne
(3, 19, 1, 19.00),  -- 1 majica (popust)

-- Order 4 (user_id: 1, CANCELLED)
(4, 22, 5, 9.05),   -- 5 čarapa

-- Order 5 (user_id: 3, total: 199.99)
(5, 23, 1, 120.00), -- 1 jakna
(5, 19, 3, 26.66);
select * from users
select * from reviews
select * from categories
select * from products
select * from orders
select * from order_items
select * frttttdasdasd 
delete from reviews where user_id = 1
update users
set is_admin = true
where user_id = 14

INSERT INTO reviews (product_id, user_id, rating, review_comment)
VALUES
-- Product 48
(48, 13, 5, 'Excellent quality, works perfectly on my boat!'),
(48, 14, 4, 'Good product, but delivery was a bit slow.'),
(48, 7, 2, 'Not very durable, expected better build quality.'),
(48, 6, 3, 'Average, works fine but overpriced.'),

-- Product 49
(49, 9, 5, 'Perfect for offshore trips, highly recommend.'),
(49, 16, 1, 'Terrible experience, broke after one week.'),
(49, 12, 4, 'Solid product, reliable in tough conditions.'),
(49, 15, 3, 'It is okay, but customer support was not helpful.'),

-- Product 50
(50, 18, 5, 'Love it! Makes sailing so much easier.'),
(50, 17, 4, 'Good balance between price and quality.'),
(50, 13, 2, 'Had issues with installation, instructions unclear.'),
(50, 14, 1, 'Stopped working after a month, very disappointed.'),

-- Product 51
(51, 7, 5, 'Runs smoothly and saves fuel, excellent engine.'),
(51, 6, 4, 'Great performance, but a bit noisy.'),
(51, 9, 3, 'Okay, but expected more power.'),
(51, 16, 2, 'Not worth the money, lots of vibration.'),

-- Product 52
(52, 12, 5, 'Fantastic, makes anchoring effortless.'),
(52, 15, 4, 'Strong and reliable, easy to use.'),
(52, 18, 3, 'Decent but quite heavy to handle.'),
(52, 17, 1, 'Mine rusted quickly, very poor quality.'),

-- Product 53
(53, 13, 5, 'Exactly what I needed, fits perfectly.'),
(53, 14, 4, 'Solid material, good value.'),
(53, 7, 2, 'Too small for my boat, not useful.'),
(53, 6, 3, 'Works, but not as described.'),

-- Product 54
(54, 9, 5, 'Top notch, very reliable under pressure.'),
(54, 16, 4, 'Great, but a bit expensive.'),
(54, 12, 2, 'Arrived damaged, disappointed.'),
(54, 15, 1, 'Worst product I have ever bought.'),

-- Product 55
(55, 18, 5, 'Smooth operation, love it!'),
(55, 17, 4, 'Good but heavy installation.'),
(55, 13, 3, 'Not bad, not great either.'),
(55, 14, 2, 'Battery drains too fast.'),

-- Product 56
(56, 7, 5, 'Excellent safety gear, feel secure onboard.'),
(56, 6, 4, 'Very good, comfortable to wear.'),
(56, 9, 3, 'Okay, but straps feel cheap.'),
(56, 16, 1, 'Completely failed test, unsafe!'),

-- Product 39
(39, 12, 5, 'Brilliant design, really helps navigation.'),
(39, 15, 4, 'Works well, easy setup.'),
(39, 18, 2, 'Complicated user interface.'),
(39, 17, 1, 'Crashed after first use.'),

-- Product 40
(40, 13, 5, 'Solid engine, runs like a dream.'),
(40, 14, 4, 'Very powerful, fuel efficient.'),
(40, 7, 2, 'Too loud for long trips.'),
(40, 6, 3, 'Fair, but had some leaks.'),

-- Product 41
(41, 9, 5, 'Best purchase I made this year!'),
(41, 16, 4, 'Reliable and strong build.'),
(41, 12, 2, 'Does not fit as advertised.'),
(41, 15, 3, 'Usable, but could be improved.'),

-- Product 42
(42, 18, 5, 'Perfect compass, very accurate.'),
(42, 17, 4, 'Good readability, solid build.'),
(42, 13, 2, 'Paint came off quickly.'),
(42, 14, 1, 'Stopped working after a week.'),

-- Product 43
(43, 7, 5, 'Smooth operation, very practical.'),
(43, 6, 4, 'Durable and strong rope.'),
(43, 9, 3, 'Okay quality, frays easily.'),
(43, 16, 1, 'Terrible, snapped during mooring.'),

-- Product 44
(44, 12, 5, 'Very quiet, provides stable power.'),
(44, 15, 4, 'Great for long journeys.'),
(44, 18, 2, 'Consumes too much fuel.'),
(44, 17, 3, 'Not bad, but bulky.'),

-- Product 45
(45, 13, 5, 'Amazing build quality, worth the money.'),
(45, 14, 4, 'Good product, easy installation.'),
(45, 7, 2, 'Rust appeared quickly.'),
(45, 6, 1, 'Broke after first use.'),

-- Product 46
(46, 9, 5, 'Perfect fit, feels safe.'),
(46, 16, 4, 'Comfortable and reliable.'),
(46, 12, 3, 'Okay, but straps wear out fast.'),
(46, 15, 2, 'Not comfortable for long wear.'),

-- Product 47
(47, 18, 5, 'Great durability, works perfectly.'),
(47, 17, 4, 'Nice product, well made.'),
(47, 13, 3, 'It is fine but not excellent.'),
(47, 14, 1, 'Completely useless, broke instantly.'),

-- Product 57
(57, 7, 5, 'Love this item, totally worth it.'),
(57, 6, 4, 'Strong and practical.'),
(57, 9, 3, 'Does the job, nothing special.'),
(57, 16, 2, 'Not what I expected.'),

-- Product 58
(58, 12, 5, 'Excellent quality, long-lasting.'),
(58, 15, 4, 'Very useful onboard.'),
(58, 18, 2, 'Paint scratches easily.'),
(58, 17, 1, 'Very poor performance.'),

-- Product 59
(59, 13, 5, 'Top product, works flawlessly.'),
(59, 14, 4, 'Good performance overall.'),
(59, 7, 3, 'It is okay, not the best.'),
(59, 6, 2, 'Had issues, not reliable.'),

-- Product 60
(60, 9, 5, 'My crew loves it, reliable.'),
(60, 16, 4, 'Excellent build.'),
(60, 12, 3, 'So-so, a bit pricey.'),
(60, 15, 1, 'Worst item ever, waste of money.'),

-- Product 61
(61, 18, 5, 'Fantastic, very easy to use.'),
(61, 17, 4, 'Solid performance, worth it.'),
(61, 13, 2, 'Fragile parts, disappointed.'),
(61, 14, 3, 'Okay but not great.'),

-- Product 62
(62, 7, 5, 'Exactly as described, very reliable.'),
(62, 6, 4, 'Good tool, works fine.'),
(62, 9, 2, 'Not durable, broke too soon.'),
(62, 16, 1, 'Do not buy, total failure.'),

-- Product 63
(63, 12, 5, 'Really useful and reliable.'),
(63, 15, 4, 'Does the job well.'),
(63, 18, 3, 'Average, expected more.'),
(63, 17, 2, 'Not worth the price.');
