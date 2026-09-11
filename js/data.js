// ===== MOCK DATA =====

const RESTAURANTS = [
  {
    id: 1,
    name: "Mario's Pizza Palace",
    cuisine: "Pizza",
    emoji: "🍕",
    rating: 4.7,
    reviews: 238,
    deliveryTime: "25-35 min",
    deliveryFee: 2.99,
    minOrder: 12,
    location: "Downtown",
    address: "42 Elm Street, Downtown",
    description: "Authentic Italian-style pizzas made with imported ingredients and baked in a wood-fired oven.",
    status: "open",
    priceRange: "$$",
    featured: true,
    menu: [
      {
        category: "Starters",
        items: [
          { id: 101, name: "Garlic Bread", price: 4.99, desc: "Toasted bread with garlic butter and herbs", emoji: "🥖", tags: ["veg"], popular: false },
          { id: 102, name: "Bruschetta", price: 6.99, desc: "Tomato, basil and olive oil on crispy toast", emoji: "🍞", tags: ["veg", "popular"], popular: true },
          { id: 103, name: "Mozzarella Sticks", price: 7.99, desc: "Golden fried mozzarella with marinara dip", emoji: "🧀", tags: [], popular: false }
        ]
      },
      {
        category: "Pizza",
        items: [
          { id: 104, name: "Margherita", price: 12.99, desc: "Classic tomato sauce, mozzarella, fresh basil", emoji: "🍕", tags: ["veg", "popular"], popular: true },
          { id: 105, name: "Pepperoni", price: 14.99, desc: "Loaded with spicy pepperoni and mozzarella", emoji: "🍕", tags: ["popular"], popular: true },
          { id: 106, name: "BBQ Chicken", price: 15.99, desc: "Smoky BBQ sauce, chicken, red onion, cheddar", emoji: "🍕", tags: [], popular: false },
          { id: 107, name: "Veggie Supreme", price: 13.99, desc: "Bell peppers, olives, mushrooms, onions", emoji: "🍕", tags: ["veg"], popular: false },
          { id: 108, name: "Four Cheese", price: 16.99, desc: "Mozzarella, cheddar, parmesan, gorgonzola", emoji: "🍕", tags: ["veg"], popular: true }
        ]
      },
      {
        category: "Pasta",
        items: [
          { id: 109, name: "Spaghetti Bolognese", price: 13.99, desc: "Rich beef ragu with fresh pasta", emoji: "🍝", tags: [], popular: false },
          { id: 110, name: "Penne Arrabbiata", price: 11.99, desc: "Spicy tomato sauce with penne", emoji: "🍝", tags: ["veg", "spicy"], popular: false }
        ]
      },
      {
        category: "Desserts",
        items: [
          { id: 111, name: "Tiramisu", price: 6.99, desc: "Classic Italian coffee dessert", emoji: "🍰", tags: ["veg"], popular: true },
          { id: 112, name: "Panna Cotta", price: 5.99, desc: "Creamy Italian dessert with berry coulis", emoji: "🍮", tags: ["veg"], popular: false }
        ]
      }
    ],
    reviews: [
      { id: 1, user: "Sarah M.", rating: 5, text: "Best pizza in town! The margherita is heavenly.", date: "2026-09-01" },
      { id: 2, user: "James K.", rating: 4, text: "Really good food, delivery was slightly delayed.", date: "2026-08-28" },
      { id: 3, user: "Priya S.", rating: 5, text: "Wood-fired crust is amazing. Will order again!", date: "2026-08-20" }
    ]
  },
  {
    id: 2,
    name: "Burger Barn",
    cuisine: "Burger",
    emoji: "🍔",
    rating: 4.5,
    reviews: 312,
    deliveryTime: "20-30 min",
    deliveryFee: 1.99,
    minOrder: 8,
    location: "Midtown",
    address: "88 Oak Avenue, Midtown",
    description: "Gourmet burgers made with 100% Angus beef, fresh toppings and homemade sauces.",
    status: "open",
    priceRange: "$$",
    featured: true,
    menu: [
      {
        category: "Burgers",
        items: [
          { id: 201, name: "Classic Smash Burger", price: 11.99, desc: "Double smash patty, American cheese, pickles", emoji: "🍔", tags: ["popular"], popular: true },
          { id: 202, name: "BBQ Bacon Burger", price: 13.99, desc: "Crispy bacon, BBQ sauce, onion rings", emoji: "🍔", tags: ["popular"], popular: true },
          { id: 203, name: "Mushroom Swiss Burger", price: 12.99, desc: "Sautéed mushrooms, Swiss cheese, aioli", emoji: "🍔", tags: [], popular: false },
          { id: 204, name: "Veggie Burger", price: 10.99, desc: "House-made black bean patty, avocado", emoji: "🍔", tags: ["veg"], popular: false }
        ]
      },
      {
        category: "Sides",
        items: [
          { id: 205, name: "Loaded Fries", price: 6.99, desc: "Fries with cheese sauce, bacon bits, jalapeños", emoji: "🍟", tags: ["popular"], popular: true },
          { id: 206, name: "Onion Rings", price: 5.99, desc: "Beer-battered crispy onion rings", emoji: "🧅", tags: ["veg"], popular: false },
          { id: 207, name: "Coleslaw", price: 3.49, desc: "Creamy homemade coleslaw", emoji: "🥗", tags: ["veg"], popular: false }
        ]
      },
      {
        category: "Shakes",
        items: [
          { id: 208, name: "Chocolate Shake", price: 5.99, desc: "Thick creamy chocolate milkshake", emoji: "🥤", tags: ["veg"], popular: true },
          { id: 209, name: "Strawberry Shake", price: 5.99, desc: "Fresh strawberry blended milkshake", emoji: "🥤", tags: ["veg"], popular: false }
        ]
      }
    ],
    reviews: [
      { id: 1, user: "Tom B.", rating: 5, text: "Incredible smash burgers, best in the city!", date: "2026-09-05" },
      { id: 2, user: "Anna C.", rating: 4, text: "Tasty food, good portions. Fries were excellent.", date: "2026-08-30" }
    ]
  },
  {
    id: 3,
    name: "Tokyo Sushi House",
    cuisine: "Sushi",
    emoji: "🍣",
    rating: 4.8,
    reviews: 189,
    deliveryTime: "35-45 min",
    deliveryFee: 3.99,
    minOrder: 20,
    location: "West Side",
    address: "15 Sakura Lane, West Side",
    description: "Premium fresh sushi, sashimi and Japanese specialties prepared by master chefs.",
    status: "open",
    priceRange: "$$$",
    featured: true,
    menu: [
      {
        category: "Rolls",
        items: [
          { id: 301, name: "California Roll", price: 9.99, desc: "Crab, avocado, cucumber with sesame", emoji: "🍣", tags: ["popular"], popular: true },
          { id: 302, name: "Spicy Tuna Roll", price: 12.99, desc: "Fresh tuna with spicy sriracha mayo", emoji: "🍣", tags: ["spicy", "popular"], popular: true },
          { id: 303, name: "Dragon Roll", price: 15.99, desc: "Shrimp tempura topped with avocado", emoji: "🍣", tags: [], popular: false },
          { id: 304, name: "Rainbow Roll", price: 16.99, desc: "California roll topped with assorted sashimi", emoji: "🌈", tags: ["popular"], popular: true }
        ]
      },
      {
        category: "Sashimi",
        items: [
          { id: 305, name: "Salmon Sashimi (5pc)", price: 14.99, desc: "Premium fresh Atlantic salmon", emoji: "🐟", tags: [], popular: false },
          { id: 306, name: "Tuna Sashimi (5pc)", price: 16.99, desc: "Premium bluefin tuna slices", emoji: "🐟", tags: [], popular: false }
        ]
      },
      {
        category: "Starters",
        items: [
          { id: 307, name: "Miso Soup", price: 3.49, desc: "Traditional Japanese miso with tofu", emoji: "🍜", tags: ["veg"], popular: false },
          { id: 308, name: "Edamame", price: 4.99, desc: "Steamed salted soybeans", emoji: "🫛", tags: ["veg"], popular: false },
          { id: 309, name: "Gyoza (6pc)", price: 7.99, desc: "Pan-fried pork and cabbage dumplings", emoji: "🥟", tags: ["popular"], popular: true }
        ]
      }
    ],
    reviews: [
      { id: 1, user: "Yuki T.", rating: 5, text: "Freshest sushi I've had outside Japan!", date: "2026-09-03" },
      { id: 2, user: "Mike R.", rating: 5, text: "Dragon roll is unbelievable. Fast delivery too.", date: "2026-08-25" }
    ]
  },
  {
    id: 4,
    name: "Spice Route Indian Kitchen",
    cuisine: "Indian",
    emoji: "🍛",
    rating: 4.6,
    reviews: 267,
    deliveryTime: "30-40 min",
    deliveryFee: 2.49,
    minOrder: 15,
    location: "East End",
    address: "7 Curry Lane, East End",
    description: "Authentic North and South Indian cuisine with rich curries, tandoori dishes and freshly baked bread.",
    status: "open",
    priceRange: "$$",
    featured: false,
    menu: [
      {
        category: "Starters",
        items: [
          { id: 401, name: "Samosa (2pc)", price: 4.99, desc: "Crispy pastry filled with spiced potatoes", emoji: "🥟", tags: ["veg", "popular"], popular: true },
          { id: 402, name: "Chicken Tikka", price: 9.99, desc: "Marinated chicken grilled in tandoor", emoji: "🍗", tags: ["popular"], popular: true },
          { id: 403, name: "Onion Bhaji", price: 5.99, desc: "Crispy fried onion fritters with chutney", emoji: "🧅", tags: ["veg"], popular: false }
        ]
      },
      {
        category: "Curries",
        items: [
          { id: 404, name: "Butter Chicken", price: 14.99, desc: "Tender chicken in creamy tomato sauce", emoji: "🍛", tags: ["popular"], popular: true },
          { id: 405, name: "Palak Paneer", price: 13.99, desc: "Fresh spinach with cottage cheese", emoji: "🍛", tags: ["veg"], popular: false },
          { id: 406, name: "Lamb Rogan Josh", price: 16.99, desc: "Slow-cooked lamb in aromatic spices", emoji: "🍛", tags: ["spicy"], popular: false },
          { id: 407, name: "Dal Makhani", price: 11.99, desc: "Creamy black lentils slow-cooked overnight", emoji: "🍲", tags: ["veg", "popular"], popular: true }
        ]
      },
      {
        category: "Bread & Rice",
        items: [
          { id: 408, name: "Garlic Naan", price: 3.49, desc: "Soft leavened bread with garlic and butter", emoji: "🫓", tags: ["veg"], popular: true },
          { id: 409, name: "Basmati Rice", price: 3.99, desc: "Fragrant long-grain basmati rice", emoji: "🍚", tags: ["veg"], popular: false },
          { id: 410, name: "Vegetable Biryani", price: 14.99, desc: "Aromatic basmati with mixed vegetables", emoji: "🍚", tags: ["veg"], popular: false }
        ]
      }
    ],
    reviews: [
      { id: 1, user: "Raj P.", rating: 5, text: "Best butter chicken I've ever had. Incredible!", date: "2026-09-06" },
      { id: 2, user: "Lisa F.", rating: 4, text: "Generous portions and great flavours.", date: "2026-08-22" }
    ]
  },
  {
    id: 5,
    name: "Dragon Palace Chinese",
    cuisine: "Chinese",
    emoji: "🥡",
    rating: 4.3,
    reviews: 145,
    deliveryTime: "25-35 min",
    deliveryFee: 1.99,
    minOrder: 10,
    location: "Chinatown",
    address: "22 Dragon Street, Chinatown",
    description: "Traditional Chinese dishes including dim sum, stir-fries and Cantonese classics.",
    status: "open",
    priceRange: "$$",
    featured: false,
    menu: [
      {
        category: "Dim Sum",
        items: [
          { id: 501, name: "Har Gow (4pc)", price: 7.99, desc: "Steamed shrimp dumplings", emoji: "🥟", tags: [], popular: false },
          { id: 502, name: "Siu Mai (4pc)", price: 7.99, desc: "Pork and shrimp open dumplings", emoji: "🥟", tags: ["popular"], popular: true },
          { id: 503, name: "Spring Rolls (3pc)", price: 6.99, desc: "Crispy fried vegetable spring rolls", emoji: "🥟", tags: ["veg"], popular: false }
        ]
      },
      {
        category: "Mains",
        items: [
          { id: 504, name: "Kung Pao Chicken", price: 13.99, desc: "Spicy stir-fry with peanuts and chilis", emoji: "🍗", tags: ["spicy", "popular"], popular: true },
          { id: 505, name: "Sweet & Sour Pork", price: 13.99, desc: "Crispy pork with tangy sauce and peppers", emoji: "🍖", tags: [], popular: false },
          { id: 506, name: "Mapo Tofu", price: 11.99, desc: "Silken tofu in spicy bean paste sauce", emoji: "🍲", tags: ["veg", "spicy"], popular: false }
        ]
      },
      {
        category: "Noodles & Rice",
        items: [
          { id: 507, name: "Beef Chow Mein", price: 12.99, desc: "Stir-fried noodles with beef and vegetables", emoji: "🍜", tags: ["popular"], popular: true },
          { id: 508, name: "Fried Rice", price: 10.99, desc: "Wok-fried rice with egg and vegetables", emoji: "🍚", tags: ["veg"], popular: false }
        ]
      }
    ],
    reviews: [
      { id: 1, user: "Chen W.", rating: 4, text: "Great dim sum! Closest to Hong Kong style.", date: "2026-08-18" }
    ]
  },
  {
    id: 6,
    name: "Taco Fiesta",
    cuisine: "Mexican",
    emoji: "🌮",
    rating: 4.4,
    reviews: 201,
    deliveryTime: "20-30 min",
    deliveryFee: 2.49,
    minOrder: 10,
    location: "South Quarter",
    address: "55 Aztec Road, South Quarter",
    description: "Vibrant Mexican street food — tacos, burritos, nachos and freshly made margaritas.",
    status: "open",
    priceRange: "$",
    featured: true,
    menu: [
      {
        category: "Tacos",
        items: [
          { id: 601, name: "Carne Asada Taco", price: 4.99, desc: "Grilled beef, salsa, cilantro, lime", emoji: "🌮", tags: ["popular"], popular: true },
          { id: 602, name: "Al Pastor Taco", price: 4.99, desc: "Marinated pork with pineapple", emoji: "🌮", tags: ["popular"], popular: true },
          { id: 603, name: "Veggie Taco", price: 3.99, desc: "Black beans, corn, avocado, cheese", emoji: "🌮", tags: ["veg"], popular: false }
        ]
      },
      {
        category: "Burritos",
        items: [
          { id: 604, name: "Chicken Burrito", price: 10.99, desc: "Grilled chicken, rice, beans, guac", emoji: "🌯", tags: ["popular"], popular: true },
          { id: 605, name: "Steak Burrito", price: 12.99, desc: "Carne asada with all the fixings", emoji: "🌯", tags: [], popular: false },
          { id: 606, name: "Bean & Cheese Burrito", price: 8.99, desc: "Refried beans, cheddar, salsa", emoji: "🌯", tags: ["veg"], popular: false }
        ]
      },
      {
        category: "Sides",
        items: [
          { id: 607, name: "Loaded Nachos", price: 9.99, desc: "Tortilla chips with cheese, jalapeños, guac", emoji: "🧀", tags: ["veg", "popular"], popular: true },
          { id: 608, name: "Guacamole & Chips", price: 5.99, desc: "Fresh hand-mashed guacamole", emoji: "🥑", tags: ["veg"], popular: false }
        ]
      }
    ],
    reviews: [
      { id: 1, user: "Carlos R.", rating: 5, text: "Most authentic tacos outside Mexico!", date: "2026-09-04" },
      { id: 2, user: "Dana M.", rating: 4, text: "Great burritos! The loaded nachos are incredible.", date: "2026-08-29" }
    ]
  },
  {
    id: 7,
    name: "Sweet Tooth Bakery",
    cuisine: "Dessert",
    emoji: "🍰",
    rating: 4.9,
    reviews: 175,
    deliveryTime: "30-40 min",
    deliveryFee: 2.99,
    minOrder: 12,
    location: "Old Town",
    address: "3 Pastry Place, Old Town",
    description: "Artisan cakes, pastries and desserts baked fresh daily using premium ingredients.",
    status: "open",
    priceRange: "$$",
    featured: false,
    menu: [
      {
        category: "Cakes",
        items: [
          { id: 701, name: "Chocolate Lava Cake", price: 7.99, desc: "Warm cake with gooey chocolate centre", emoji: "🍫", tags: ["veg", "popular"], popular: true },
          { id: 702, name: "New York Cheesecake", price: 6.99, desc: "Classic creamy cheesecake with berry coulis", emoji: "🍰", tags: ["veg", "popular"], popular: true },
          { id: 703, name: "Carrot Cake", price: 5.99, desc: "Spiced carrot cake with cream cheese frosting", emoji: "🥕", tags: ["veg"], popular: false }
        ]
      },
      {
        category: "Pastries",
        items: [
          { id: 704, name: "Croissant", price: 3.49, desc: "Buttery flaky all-butter croissant", emoji: "🥐", tags: ["veg"], popular: false },
          { id: 705, name: "Cinnamon Roll", price: 4.49, desc: "Soft roll with cinnamon and cream glaze", emoji: "🌀", tags: ["veg", "popular"], popular: true },
          { id: 706, name: "Macaron Box (6pc)", price: 12.99, desc: "Assorted French macarons", emoji: "🍬", tags: ["veg"], popular: false }
        ]
      }
    ],
    reviews: [
      { id: 1, user: "Sophie L.", rating: 5, text: "The chocolate lava cake is life-changing!", date: "2026-09-07" }
    ]
  },
  {
    id: 8,
    name: "Green Bowl Healthy Kitchen",
    cuisine: "Healthy",
    emoji: "🥗",
    rating: 4.5,
    reviews: 132,
    deliveryTime: "20-30 min",
    deliveryFee: 2.99,
    minOrder: 10,
    location: "Uptown",
    address: "19 Wellness Way, Uptown",
    description: "Clean, nutritious meals using organic produce, whole grains and superfoods.",
    status: "open",
    priceRange: "$$",
    featured: false,
    menu: [
      {
        category: "Bowls",
        items: [
          { id: 801, name: "Acai Bowl", price: 11.99, desc: "Acai blend topped with granola and fresh fruit", emoji: "🫐", tags: ["veg", "popular"], popular: true },
          { id: 802, name: "Grain Bowl", price: 12.99, desc: "Quinoa, roasted veggies, tahini dressing", emoji: "🥗", tags: ["veg"], popular: false },
          { id: 803, name: "Chicken Protein Bowl", price: 14.99, desc: "Grilled chicken, brown rice, greens, eggs", emoji: "🍗", tags: ["popular"], popular: true }
        ]
      },
      {
        category: "Salads",
        items: [
          { id: 804, name: "Caesar Salad", price: 10.99, desc: "Romaine, parmesan, croutons, Caesar dressing", emoji: "🥗", tags: [], popular: false },
          { id: 805, name: "Greek Salad", price: 10.99, desc: "Tomato, cucumber, feta, olives, oregano", emoji: "🥗", tags: ["veg"], popular: false }
        ]
      },
      {
        category: "Smoothies",
        items: [
          { id: 806, name: "Green Detox", price: 7.99, desc: "Spinach, cucumber, apple, ginger, lemon", emoji: "🥤", tags: ["veg"], popular: false },
          { id: 807, name: "Berry Blast", price: 7.99, desc: "Mixed berries, banana, oat milk, chia seeds", emoji: "🥤", tags: ["veg", "popular"], popular: true }
        ]
      }
    ],
    reviews: [
      { id: 1, user: "Emma W.", rating: 5, text: "Love the grain bowl — so fresh and filling!", date: "2026-09-02" }
    ]
  }
];

const PROMO_CODES = {
  "FIRST10": { discount: 10, type: "percent", desc: "10% off your first order" },
  "SAVE5":   { discount: 5,  type: "fixed",   desc: "$5 off orders above $25" },
  "RUSH20":  { discount: 20, type: "percent", desc: "20% off — welcome back!" }
};

const MOCK_USERS = [
  { id: 1, name: "John Doe",    email: "john@example.com",    password: "password123", role: "customer", joined: "2026-01-15", orders: 12 },
  { id: 2, name: "Jane Smith",  email: "jane@example.com",    password: "password123", role: "customer", joined: "2026-02-20", orders: 7  },
  { id: 3, name: "Owner Mike",  email: "owner@example.com",   password: "owner123",    role: "owner",    joined: "2025-11-10", orders: 0, restaurantId: 1 },
  { id: 4, name: "Admin User",  email: "admin@foodrush.com",  password: "admin123",    role: "admin",    joined: "2025-06-01", orders: 0 }
];

const MOCK_ORDERS = [
  { id: "FR-00123", customer: "John Doe",   restaurantId: 1, restaurantName: "Mario's Pizza Palace",      items: [{name:"Margherita",qty:1,price:12.99},{name:"Garlic Bread",qty:2,price:4.99}], total: 27.96, status: "delivered",  date: "2026-09-09", time: "18:32" },
  { id: "FR-00124", customer: "Jane Smith", restaurantId: 2, restaurantName: "Burger Barn",               items: [{name:"Classic Smash Burger",qty:2,price:11.99},{name:"Loaded Fries",qty:1,price:6.99}], total: 34.96, status: "preparing",  date: "2026-09-11", time: "19:05" },
  { id: "FR-00125", customer: "John Doe",   restaurantId: 3, restaurantName: "Tokyo Sushi House",         items: [{name:"California Roll",qty:2,price:9.99},{name:"Miso Soup",qty:1,price:3.49}], total: 26.46, status: "pending",    date: "2026-09-11", time: "19:45" },
  { id: "FR-00126", customer: "Sarah Lee",  restaurantId: 4, restaurantName: "Spice Route Indian Kitchen",items: [{name:"Butter Chicken",qty:1,price:14.99},{name:"Garlic Naan",qty:2,price:3.49}], total: 24.96, status: "out_for_delivery", date: "2026-09-10", time: "20:10" },
  { id: "FR-00127", customer: "Tom Chen",   restaurantId: 6, restaurantName: "Taco Fiesta",               items: [{name:"Carne Asada Taco",qty:3,price:4.99},{name:"Loaded Nachos",qty:1,price:9.99}], total: 24.96, status: "cancelled", date: "2026-09-08", time: "13:20" }
];

// Utility: Get restaurant by ID
function getRestaurantById(id) {
  return RESTAURANTS.find(r => r.id === parseInt(id));
}

// Utility: Generate order ID
function generateOrderId() {
  return "FR-" + String(Math.floor(10000 + Math.random() * 90000));
}
