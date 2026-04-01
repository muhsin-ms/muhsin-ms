/**
 * FuelSense AI - Vehicle Database (100+ Indian Models)
 * Structure: { brand, model, mileage_city, mileage_highway, fuel_type }
 */
window.indianVehicles = [
    // --- MARUTI SUZUKI ---
    { brand: "Maruti Suzuki", model: "Alto 800", mileage_city: 20, mileage_highway: 24, fuel_type: "petrol" },
    { brand: "Maruti Suzuki", model: "Alto K10", mileage_city: 22, mileage_highway: 26, fuel_type: "petrol" },
    { brand: "Maruti Suzuki", model: "S-Presso", mileage_city: 21, mileage_highway: 25, fuel_type: "petrol" },
    { brand: "Maruti Suzuki", model: "WagonR 1.0", mileage_city: 21, mileage_highway: 25, fuel_type: "petrol" },
    { brand: "Maruti Suzuki", model: "WagonR 1.2", mileage_city: 20, mileage_highway: 24, fuel_type: "petrol" },
    { brand: "Maruti Suzuki", model: "WagonR CNG", mileage_city: 30, mileage_highway: 34, fuel_type: "cng" },
    { brand: "Maruti Suzuki", model: "Swift", mileage_city: 19, mileage_highway: 23, fuel_type: "petrol" },
    { brand: "Maruti Suzuki", model: "Baleno", mileage_city: 19, mileage_highway: 23, fuel_type: "petrol" },
    { brand: "Maruti Suzuki", model: "Dzire", mileage_city: 20, mileage_highway: 24, fuel_type: "petrol" },
    { brand: "Maruti Suzuki", model: "Brezza", mileage_city: 16, mileage_highway: 20, fuel_type: "petrol" },
    { brand: "Maruti Suzuki", model: "Ertiga", mileage_city: 15, mileage_highway: 19, fuel_type: "petrol" },
    { brand: "Maruti Suzuki", model: "Ertiga CNG", mileage_city: 23, mileage_highway: 26, fuel_type: "cng" },
    { brand: "Maruti Suzuki", model: "Grand Vitara Hybrid", mileage_city: 24, mileage_highway: 28, fuel_type: "petrol" },
    { brand: "Maruti Suzuki", model: "Jimny", mileage_city: 14, mileage_highway: 16, fuel_type: "petrol" },
    { brand: "Maruti Suzuki", model: "Fronx", mileage_city: 19, mileage_highway: 22, fuel_type: "petrol" },

    // --- HYUNDAI ---
    { brand: "Hyundai", model: "Santro", mileage_city: 17, mileage_highway: 20, fuel_type: "petrol" },
    { brand: "Hyundai", model: "Grand i10 Nios", mileage_city: 16, mileage_highway: 20, fuel_type: "petrol" },
    { brand: "Hyundai", model: "i20", mileage_city: 16, mileage_highway: 20, fuel_type: "petrol" },
    { brand: "Hyundai", model: "Aura", mileage_city: 17, mileage_highway: 21, fuel_type: "petrol" },
    { brand: "Hyundai", model: "Venue (Petrol)", mileage_city: 14, mileage_highway: 18, fuel_type: "petrol" },
    { brand: "Hyundai", model: "Venue (Diesel)", mileage_city: 18, mileage_highway: 22, fuel_type: "diesel" },
    { brand: "Hyundai", model: "Creta (Petrol)", mileage_city: 13, mileage_highway: 17, fuel_type: "petrol" },
    { brand: "Hyundai", model: "Creta (Diesel)", mileage_city: 16, mileage_highway: 20, fuel_type: "diesel" },
    { brand: "Hyundai", model: "Verna (Petrol)", mileage_city: 14, mileage_highway: 18, fuel_type: "petrol" },
    { brand: "Hyundai", model: "Tucson", mileage_city: 12, mileage_highway: 16, fuel_type: "diesel" },
    { brand: "Hyundai", model: "Exter", mileage_city: 16, mileage_highway: 19, fuel_type: "petrol" },

    // --- TATA MOTORS ---
    { brand: "Tata", model: "Tiago", mileage_city: 16, mileage_highway: 20, fuel_type: "petrol" },
    { brand: "Tata", model: "Tigor", mileage_city: 16, mileage_highway: 19, fuel_type: "petrol" },
    { brand: "Tata", model: "Altroz (Petrol)", mileage_city: 15, mileage_highway: 19, fuel_type: "petrol" },
    { brand: "Tata", model: "Altroz (Diesel)", mileage_city: 18, mileage_highway: 23, fuel_type: "diesel" },
    { brand: "Tata", model: "Punch", mileage_city: 15, mileage_highway: 19, fuel_type: "petrol" },
    { brand: "Tata", model: "Nexon (Petrol)", mileage_city: 13, mileage_highway: 17, fuel_type: "petrol" },
    { brand: "Tata", model: "Nexon (Diesel)", mileage_city: 17, mileage_highway: 21, fuel_type: "diesel" },
    { brand: "Tata", model: "Harrier", mileage_city: 11, mileage_highway: 15, fuel_type: "diesel" },
    { brand: "Tata", model: "Safari", mileage_city: 11, mileage_highway: 14, fuel_type: "diesel" },
    { brand: "Tata", model: "Nexon EV", mileage_city: 7, mileage_highway: 8, fuel_type: "ev" }, // Efficiency (km/unit)
    { brand: "Tata", model: "Tiago EV", mileage_city: 8, mileage_highway: 9, fuel_type: "ev" },

    // --- MAHINDRA ---
    { brand: "Mahindra", model: "KUV100", mileage_city: 14, mileage_highway: 18, fuel_type: "petrol" },
    { brand: "Mahindra", model: "XUV300 (Petrol)", mileage_city: 13, mileage_highway: 16, fuel_type: "petrol" },
    { brand: "Mahindra", model: "XUV300 (Diesel)", mileage_city: 16, mileage_highway: 20, fuel_type: "diesel" },
    { brand: "Mahindra", model: "Thar (Petrol)", mileage_city: 8, mileage_highway: 11, fuel_type: "petrol" },
    { brand: "Mahindra", model: "Thar (Diesel)", mileage_city: 10, mileage_highway: 13, fuel_type: "diesel" },
    { brand: "Mahindra", model: "Scorpio Classic", mileage_city: 11, mileage_highway: 14, fuel_type: "diesel" },
    { brand: "Mahindra", model: "Scorpio-N (Diesel)", mileage_city: 12, mileage_highway: 15, fuel_type: "diesel" },
    { brand: "Mahindra", model: "XUV700 (Petrol)", mileage_city: 10, mileage_highway: 13, fuel_type: "petrol" },
    { brand: "Mahindra", model: "XUV700 (Diesel)", mileage_city: 12, mileage_highway: 15, fuel_type: "diesel" },
    { brand: "Mahindra", model: "Bolero", mileage_city: 13, mileage_highway: 16, fuel_type: "diesel" },

    // --- KIA & TOYOTA & HONDA (CARS) ---
    { brand: "Kia", model: "Sonet (Petrol)", mileage_city: 14, mileage_highway: 18, fuel_type: "petrol" },
    { brand: "Kia", model: "Sonet (Diesel)", mileage_city: 17, mileage_highway: 21, fuel_type: "diesel" },
    { brand: "Kia", model: "Seltos (Petrol)", mileage_city: 13, mileage_highway: 16, fuel_type: "petrol" },
    { brand: "Kia", model: "Seltos (Diesel)", mileage_city: 16, mileage_highway: 19, fuel_type: "diesel" },
    { brand: "Toyota", model: "Glanza", mileage_city: 19, mileage_highway: 22, fuel_type: "petrol" },
    { brand: "Toyota", model: "Urban Cruiser Hyryder", mileage_city: 23, mileage_highway: 27, fuel_type: "petrol" },
    { brand: "Toyota", model: "Innova Crysta", mileage_city: 10, mileage_highway: 14, fuel_type: "diesel" },
    { brand: "Toyota", model: "Fortuner (Diesel)", mileage_city: 9, mileage_highway: 12, fuel_type: "diesel" },
    { brand: "Honda", model: "Amaze", mileage_city: 15, mileage_highway: 18, fuel_type: "petrol" },
    { brand: "Honda", model: "City (Petrol)", mileage_city: 14, mileage_highway: 18, fuel_type: "petrol" },
    { brand: "Honda", model: "Elevate", mileage_city: 13, mileage_highway: 16, fuel_type: "petrol" },

    // --- HERO MOTOCORP (BIKES/SCOOTERS) ---
    { brand: "Hero", model: "Splendor Plus", mileage_city: 60, mileage_highway: 70, fuel_type: "petrol" },
    { brand: "Hero", model: "HF Deluxe", mileage_city: 60, mileage_highway: 68, fuel_type: "petrol" },
    { brand: "Hero", model: "Passion Pro", mileage_city: 55, mileage_highway: 60, fuel_type: "petrol" },
    { brand: "Hero", model: "Glamour", mileage_city: 50, mileage_highway: 55, fuel_type: "petrol" },
    { brand: "Hero", model: "Super Splendor", mileage_city: 50, mileage_highway: 58, fuel_type: "petrol" },
    { brand: "Hero", model: "Xtreme 160R", mileage_city: 40, mileage_highway: 45, fuel_type: "petrol" },
    { brand: "Hero", model: "Xpulse 200 4V", mileage_city: 35, mileage_highway: 40, fuel_type: "petrol" },
    { brand: "Hero", model: "Destini 125", mileage_city: 45, mileage_highway: 50, fuel_type: "petrol" },

    // --- HONDA TWO WHEELERS ---
    { brand: "Honda 2W", model: "Activa 6G", mileage_city: 45, mileage_highway: 50, fuel_type: "petrol" },
    { brand: "Honda 2W", model: "Activa 125", mileage_city: 42, mileage_highway: 48, fuel_type: "petrol" },
    { brand: "Honda 2W", model: "Dio", mileage_city: 44, mileage_highway: 49, fuel_type: "petrol" },
    { brand: "Honda 2W", model: "Shine 125", mileage_city: 55, mileage_highway: 62, fuel_type: "petrol" },
    { brand: "Honda 2W", model: "SP 125", mileage_city: 58, mileage_highway: 65, fuel_type: "petrol" },
    { brand: "Honda 2W", model: "Unicorn", mileage_city: 50, mileage_highway: 55, fuel_type: "petrol" },
    { brand: "Honda 2W", model: "Hornet 2.0", mileage_city: 40, mileage_highway: 45, fuel_type: "petrol" },
    { brand: "Honda 2W", model: "H'ness CB350", mileage_city: 32, mileage_highway: 38, fuel_type: "petrol" },

    // --- TVS MOTOR ---
    { brand: "TVS", model: "Jupiter 110", mileage_city: 45, mileage_highway: 52, fuel_type: "petrol" },
    { brand: "TVS", model: "Ntorq 125", mileage_city: 38, mileage_highway: 44, fuel_type: "petrol" },
    { brand: "TVS", model: "Scooty Pep+", mileage_city: 50, mileage_highway: 55, fuel_type: "petrol" },
    { brand: "TVS", model: "Radeon", mileage_city: 60, mileage_highway: 68, fuel_type: "petrol" },
    { brand: "TVS", model: "Sport", mileage_city: 65, mileage_highway: 72, fuel_type: "petrol" },
    { brand: "TVS", model: "Apache RTR 160", mileage_city: 40, mileage_highway: 46, fuel_type: "petrol" },
    { brand: "TVS", model: "Apache RTR 200 4V", mileage_city: 35, mileage_highway: 40, fuel_type: "petrol" },
    { brand: "TVS", model: "Ronin", mileage_city: 35, mileage_highway: 42, fuel_type: "petrol" },

    // --- BAJAJ AUTO ---
    { brand: "Bajaj", model: "Platina 100", mileage_city: 65, mileage_highway: 75, fuel_type: "petrol" },
    { brand: "Bajaj", model: "CT 110", mileage_city: 65, mileage_highway: 72, fuel_type: "petrol" },
    { brand: "Bajaj", model: "Pulsar 125", mileage_city: 50, mileage_highway: 55, fuel_type: "petrol" },
    { brand: "Bajaj", model: "Pulsar 150", mileage_city: 45, mileage_highway: 50, fuel_type: "petrol" },
    { brand: "Bajaj", model: "Pulsar NS200", mileage_city: 35, mileage_highway: 40, fuel_type: "petrol" },
    { brand: "Bajaj", model: "Dominar 400", mileage_city: 25, mileage_highway: 30, fuel_type: "petrol" },
    { brand: "Bajaj", model: "Avenger Cruise 220", mileage_city: 35, mileage_highway: 40, fuel_type: "petrol" },

    // --- ROYAL ENFIELD & YAMAHA ---
    { brand: "Royal Enfield", model: "Classic 350", mileage_city: 30, mileage_highway: 36, fuel_type: "petrol" },
    { brand: "Royal Enfield", model: "Bullet 350", mileage_city: 30, mileage_highway: 35, fuel_type: "petrol" },
    { brand: "Royal Enfield", model: "Meteor 350", mileage_city: 32, mileage_highway: 38, fuel_type: "petrol" },
    { brand: "Royal Enfield", model: "Himalayan 450", mileage_city: 25, mileage_highway: 30, fuel_type: "petrol" },
    { brand: "Royal Enfield", model: "Interceptor 650", mileage_city: 22, mileage_highway: 26, fuel_type: "petrol" },
    { brand: "Yamaha", model: "FZ-S FI", mileage_city: 42, mileage_highway: 48, fuel_type: "petrol" },
    { brand: "Yamaha", model: "MT-15", mileage_city: 40, mileage_highway: 45, fuel_type: "petrol" },
    { brand: "Yamaha", model: "YZF R15 V4", mileage_city: 38, mileage_highway: 44, fuel_type: "petrol" },
    { brand: "Yamaha", model: "Fascino 125", mileage_city: 50, mileage_highway: 55, fuel_type: "petrol" },
    { brand: "Yamaha", model: "RayZR 125", mileage_city: 48, mileage_highway: 53, fuel_type: "petrol" },

    // --- EV SCOOTERS ---
    { brand: "Ola Electric", model: "S1 Pro", mileage_city: 30, mileage_highway: 40, fuel_type: "ev" },
    { brand: "Ather", model: "450X", mileage_city: 30, mileage_highway: 38, fuel_type: "ev" },
    { brand: "TVS", model: "iQube", mileage_city: 30, mileage_highway: 35, fuel_type: "ev" },
    { brand: "Bajaj", model: "Chetak EV", mileage_city: 25, mileage_highway: 30, fuel_type: "ev" },

    // --- KTM ---
    { brand: "KTM", model: "Duke 200", mileage_city: 30, mileage_highway: 35, fuel_type: "petrol" },
    { brand: "KTM", model: "Duke 390", mileage_city: 24, mileage_highway: 28, fuel_type: "petrol" },
    { brand: "KTM", model: "RC 390", mileage_city: 23, mileage_highway: 27, fuel_type: "petrol" }
];
