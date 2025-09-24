-- Seed data for ProRaahi tourism platform

-- Insert sample guides
INSERT INTO guides (name, location, specialties, languages, experience_years, price_per_day, rating, total_reviews, description) VALUES
('Rajesh Kumar', 'Ranchi', 'Cultural Heritage,Tribal History,Local Festivals', 'Hindi,English,Santhali', 8, 2500, 4.9, 127, 'Expert in Jharkhand tribal culture and traditional festivals. Certified guide with deep knowledge of Sohrai art and local customs.'),
('Priya Devi', 'Jamshedpur', 'Art & Crafts,Dokra Workshops,Women Cooperatives', 'Hindi,English,Bengali', 6, 2200, 4.8, 89, 'Specializes in traditional crafts and women empowerment programs. Connects visitors with local artisan communities.'),
('Amit Singh', 'Hazaribagh', 'Adventure Tourism,Trekking,Wildlife', 'Hindi,English', 10, 3000, 4.7, 156, 'Adventure specialist with extensive knowledge of Jharkhand national parks and trekking routes. Safety certified.'),
('Sunita Kumari', 'Deoghar', 'Spiritual Sites,Temple History,Meditation', 'Hindi,English,Sanskrit', 12, 2800, 4.9, 203, 'Spiritual guide with deep knowledge of Jharkhand sacred sites and religious traditions. Meditation instructor.');

-- Insert sample activities
INSERT INTO activities (title, category, location, duration, group_size, price, rating, total_reviews, description, highlights) VALUES
('Sohrai Art Workshop', 'Art & Culture', 'Hazaribagh', '4 hours', '6-12 people', 1500, 4.8, 45, 'Learn the traditional Sohrai wall painting technique from local artists. Includes materials and lunch.', 'UNESCO recognized art form,Local artist instruction,Take home your artwork,Traditional lunch'),
('Dokra Metal Craft Experience', 'Art & Culture', 'Ranchi', '6 hours', '4-8 people', 2200, 4.9, 32, 'Hands-on experience creating traditional Dokra metal artifacts using ancient lost-wax casting technique.', 'Ancient casting technique,Create your own piece,Master craftsman guidance,Cultural storytelling'),
('Netarhat Sunrise Trek', 'Adventure', 'Netarhat', '8 hours', '8-15 people', 1800, 4.7, 89, 'Early morning trek to witness spectacular sunrise from Queen of Chotanagpur plateau.', 'Spectacular sunrise views,Professional guide,Breakfast included,Photography spots'),
('Betla National Park Safari', 'Wildlife', 'Betla', '5 hours', '6-10 people', 2500, 4.6, 67, 'Wildlife safari in Betla National Park with chances to spot elephants, tigers, and various bird species.', 'Wildlife photography,Expert naturalist,Jeep safari,Bird watching'),
('Deoghar Temple Circuit', 'Spiritual', 'Deoghar', '6 hours', '10-20 people', 1200, 4.8, 156, 'Spiritual journey covering major temples including Baidyanath Jyotirlinga with cultural insights.', 'Sacred Jyotirlinga,Cultural significance,Local guide,Prasad included'),
('Karma Festival Celebration', 'Festival', 'Various Villages', 'Full Day', '15-25 people', 3000, 4.9, 78, 'Participate in authentic Karma festival celebrations with tribal communities.', 'Traditional dance,Community feast,Cultural immersion,Festival participation');

-- Insert sample transportation options
INSERT INTO transportation (transport_type, name, from_location, to_location, departure_time, arrival_time, duration, price, class_type) VALUES
('train', 'Rajdhani Express', 'Delhi', 'Ranchi', '06:00', '18:30', '12h 30m', 2450, '3AC'),
('train', 'Hatia Express', 'Delhi', 'Ranchi', '14:20', '08:45', '18h 25m', 1850, 'SL'),
('flight', 'IndiGo 6E-123', 'Delhi', 'Ranchi', '09:15', '11:30', '2h 15m', 8500, 'Economy'),
('train', 'Steel Express', 'Kolkata', 'Jamshedpur', '22:15', '06:30', '8h 15m', 1200, 'SL'),
('flight', 'SpiceJet SG-456', 'Mumbai', 'Ranchi', '14:45', '17:20', '2h 35m', 9200, 'Economy'),
('bus', 'Jharkhand Roadways', 'Patna', 'Ranchi', '08:00', '14:00', '6h 00m', 450, 'AC Sleeper');

-- Insert sample hotels
INSERT INTO hotels (name, category, location, rating, total_reviews, price_per_night, amenities, description, image_url) VALUES
('Ranchi Heritage Hotel', 'Heritage', 'Ranchi', 4.5, 234, 4500, 'Free WiFi,Restaurant,Parking,Room Service', 'Beautifully restored heritage property in the heart of Ranchi with traditional architecture.', '/heritage-hotel-ranchi.jpg'),
('Eco Lodge Netarhat', 'Eco-Lodge', 'Netarhat', 4.7, 89, 3200, 'Nature Views,Organic Food,Trekking,Bonfire', 'Sustainable eco-lodge surrounded by pristine forests with panoramic hill views.', '/eco-lodge-netarhat.jpg'),
('Jamshedpur Business Hotel', 'Business', 'Jamshedpur', 4.3, 456, 3800, 'Business Center,Gym,Conference Hall,Airport Shuttle', 'Modern business hotel with excellent connectivity and professional amenities.', '/business-hotel-jamshedpur.jpg'),
('Deoghar Spiritual Retreat', 'Spiritual', 'Deoghar', 4.6, 167, 2800, 'Meditation Hall,Vegetarian Food,Temple Proximity,Yoga Classes', 'Peaceful retreat near sacred temples, perfect for spiritual seekers and pilgrims.', '/spiritual-retreat-deoghar.jpg'),
('Hazaribagh Wildlife Resort', 'Resort', 'Hazaribagh', 4.4, 123, 5200, 'Wildlife Tours,Swimming Pool,Spa,Multi-cuisine Restaurant', 'Luxury resort near national park offering wildlife experiences and modern amenities.', '/wildlife-resort-hazaribagh.jpg');
