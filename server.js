const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// =====================================================
// SERVE FRONTEND FILES
// =====================================================

app.use(express.static(__dirname));


// =====================================================
// HOME PAGE
// =====================================================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "index.html")
    );

});


// =====================================================
// PRODUCT DATA
// =====================================================

const products = [

    {
        id: 1,
        name: "Floral Summer Dress",
        category: "Women",
        price: 1299,
        oldPrice: 1899,
        discount: 32,
        rating: 4.8,
        reviews: 124,
        sizes: ["S", "M", "L", "XL"],
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 2,
        name: "Classic Cotton T-Shirt",
        category: "Men",
        price: 699,
        oldPrice: 999,
        discount: 30,
        rating: 4.6,
        reviews: 98,
        sizes: ["S", "M", "L", "XL", "XXL"],
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 3,
        name: "Premium Denim Jeans",
        category: "Men",
        price: 1499,
        oldPrice: 2199,
        discount: 32,
        rating: 4.7,
        reviews: 156,
        sizes: ["30", "32", "34", "36", "38"],
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 4,
        name: "Elegant Party Dress",
        category: "Women",
        price: 1899,
        oldPrice: 2999,
        discount: 37,
        rating: 4.9,
        reviews: 87,
        sizes: ["S", "M", "L", "XL"],
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 5,
        name: "Oversized Casual Shirt",
        category: "Men",
        price: 899,
        oldPrice: 1299,
        discount: 31,
        rating: 4.5,
        reviews: 72,
        sizes: ["M", "L", "XL", "XXL"],
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 6,
        name: "Women Casual Top",
        category: "Women",
        price: 799,
        oldPrice: 1199,
        discount: 33,
        rating: 4.6,
        reviews: 110,
        sizes: ["S", "M", "L", "XL"],
        image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 7,
        name: "Relaxed Fit Hoodie",
        category: "Men",
        price: 1199,
        oldPrice: 1799,
        discount: 33,
        rating: 4.8,
        reviews: 143,
        sizes: ["M", "L", "XL", "XXL"],
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 8,
        name: "Elegant Women Blazer",
        category: "Women",
        price: 2299,
        oldPrice: 3299,
        discount: 30,
        rating: 4.7,
        reviews: 64,
        sizes: ["S", "M", "L", "XL"],
        image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 9,
        name: "Street Style Jacket",
        category: "Men",
        price: 1999,
        oldPrice: 2899,
        discount: 31,
        rating: 4.7,
        reviews: 91,
        sizes: ["M", "L", "XL"],
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 10,
        name: "Soft Knit Sweater",
        category: "Women",
        price: 1099,
        oldPrice: 1599,
        discount: 31,
        rating: 4.8,
        reviews: 76,
        sizes: ["S", "M", "L", "XL"],
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 11,
        name: "Slim Fit Formal Shirt",
        category: "Men",
        price: 999,
        oldPrice: 1499,
        discount: 33,
        rating: 4.6,
        reviews: 83,
        sizes: ["S", "M", "L", "XL", "XXL"],
        image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=85"
    },

    {
        id: 12,
        name: "Minimal Midi Dress",
        category: "Women",
        price: 1599,
        oldPrice: 2399,
        discount: 33,
        rating: 4.9,
        reviews: 135,
        sizes: ["S", "M", "L"],
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=85"
    }

];


// =====================================================
// PRODUCTS API
// =====================================================

app.get("/api/products", (req, res) => {

    res.json(products);

});


// =====================================================
// SINGLE PRODUCT API
// =====================================================

app.get("/api/products/:id", (req, res) => {

    const id = Number(req.params.id);

    const product = products.find(
        product => product.id === id
    );


    if (!product) {

        return res.status(404).json({
            message: "Product not found"
        });

    }


    res.json(product);

});


// =====================================================
// SERVER
// =====================================================

app.listen(PORT, () => {

    console.log("");
    console.log("======================================");
    console.log("        FASHION HUB SERVER");
    console.log("======================================");
    console.log(`Website: http://localhost:${PORT}`);
    console.log("Server is running successfully!");
    console.log("======================================");
    console.log("");

});