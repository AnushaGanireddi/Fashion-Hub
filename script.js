/* =====================================================
   FASHION HUB - SHOPPING WEBSITE JAVASCRIPT
   ===================================================== */

let allProducts = [];
let cart = JSON.parse(localStorage.getItem("fashionHubCart")) || [];
let wishlist = JSON.parse(localStorage.getItem("fashionHubWishlist")) || [];


/* =====================================================
   LOAD PRODUCTS FROM EXPRESS SERVER
   ===================================================== */

async function loadProducts() {

    const container = document.getElementById("productContainer");

    try {

        const response = await fetch("/api/products");

        if (!response.ok) {
            throw new Error("Unable to load products");
        }

        allProducts = await response.json();

        displayProducts(allProducts);
        updateCart();

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="loading">
                <h3>Unable to load products</h3>
                <p>Please make sure your Node.js server is running.</p>
            </div>
        `;
    }
}


/* =====================================================
   DISPLAY PRODUCTS
   ===================================================== */

function displayProducts(products) {

    const container = document.getElementById("productContainer");

    container.innerHTML = "";

    if (!products || products.length === 0) {

        container.innerHTML = `
            <div class="loading">
                <h3>No products found</h3>
                <p>Try another search or category.</p>
            </div>
        `;

        return;
    }


    products.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        const isWishlisted = wishlist.includes(product.id);

        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

                <span class="discount-badge">
                    -${product.discount}%
                </span>

                <button
                    class="wishlist ${isWishlisted ? "active" : ""}"
                    onclick="toggleWishlist(${product.id})"
                    title="Add to wishlist"
                >
                    ${isWishlisted ? "♥" : "♡"}
                </button>

            </div>


            <div class="product-info">

                <h3>${product.name}</h3>

                <p class="category-name">
                    ${product.category}
                </p>

                <div class="rating">
                    ⭐ ${product.rating}
                    <span>(${product.reviews})</span>
                </div>

                <div class="price-area">

                    <span class="price">
                        ₹${product.price}
                    </span>

                    <span class="old-price">
                        ₹${product.oldPrice}
                    </span>

                </div>

                <button
                    class="add-cart"
                    onclick="addToCart(${product.id})"
                >
                    Add to Cart
                </button>

            </div>
        `;

        container.appendChild(card);

    });
}


/* =====================================================
   FILTER PRODUCTS
   ===================================================== */

function filterProducts(category) {

    const filteredProducts = allProducts.filter(
        product => product.category === category
    );

    displayProducts(filteredProducts);

    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });
}


function showAllProducts() {

    displayProducts(allProducts);

    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });
}


/* =====================================================
   SEARCH
   ===================================================== */

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const searchText =
            this.value.toLowerCase().trim();

        const filteredProducts = allProducts.filter(product =>

            product.name
                .toLowerCase()
                .includes(searchText)

            ||

            product.category
                .toLowerCase()
                .includes(searchText)

        );

        displayProducts(filteredProducts);

    });
}


/* =====================================================
   ADD TO CART
   ===================================================== */

function addToCart(productId) {

    const product = allProducts.find(
        product => product.id === productId
    );

    if (!product) return;


    const existingItem = cart.find(
        item => item.id === productId
    );


    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }


    saveCart();

    updateCart();

    showNotification(
        `${product.name} added to cart 🛍️`
    );
}


/* =====================================================
   UPDATE CART
   ===================================================== */

function updateCart() {

    const cartCount =
        document.getElementById("cartCount");

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");


    if (!cartCount || !cartItems || !cartTotal) {
        return;
    }


    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );


    cartCount.textContent = totalQuantity;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        cartTotal.textContent = "₹0";

        return;
    }


    cartItems.innerHTML = "";

    let total = 0;


    cart.forEach((product, index) => {

        total += product.price * product.quantity;


        const item = document.createElement("div");

        item.className = "cart-item";


        item.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >


            <div class="cart-item-info">

                <h4>
                    ${product.name}
                </h4>

                <p>
                    ₹${product.price}
                </p>


                <div class="quantity-control">

                    <button
                        onclick="changeQuantity(${index}, -1)"
                    >
                        −
                    </button>

                    <span>
                        ${product.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${index}, 1)"
                    >
                        +
                    </button>

                </div>


                <button
                    class="remove-item"
                    onclick="removeFromCart(${index})"
                >
                    Remove
                </button>

            </div>

        `;


        cartItems.appendChild(item);

    });


    cartTotal.textContent =
        `₹${total.toLocaleString("en-IN")}`;
}


/* =====================================================
   CHANGE QUANTITY
   ===================================================== */

function changeQuantity(index, amount) {

    if (!cart[index]) return;


    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    saveCart();

    updateCart();
}


/* =====================================================
   REMOVE FROM CART
   ===================================================== */

function removeFromCart(index) {

    if (!cart[index]) return;


    const productName = cart[index].name;

    cart.splice(index, 1);

    saveCart();

    updateCart();

    showNotification(
        `${productName} removed from cart`
    );
}


/* =====================================================
   SAVE CART
   ===================================================== */

function saveCart() {

    localStorage.setItem(
        "fashionHubCart",
        JSON.stringify(cart)
    );
}


/* =====================================================
   OPEN CART
   ===================================================== */

function openCart() {

    document
        .getElementById("cartPanel")
        .classList.add("active");

    document
        .getElementById("cartOverlay")
        .classList.add("active");

    document.body.style.overflow = "hidden";
}


/* =====================================================
   CLOSE CART
   ===================================================== */

function closeCart() {

    document
        .getElementById("cartPanel")
        .classList.remove("active");

    document
        .getElementById("cartOverlay")
        .classList.remove("active");

    document.body.style.overflow = "";
}


/* =====================================================
   WISHLIST
   ===================================================== */

function toggleWishlist(productId) {

    const product = allProducts.find(
        product => product.id === productId
    );

    if (!product) return;


    const index = wishlist.indexOf(productId);


    if (index === -1) {

        wishlist.push(productId);

        showNotification(
            `${product.name} added to wishlist ♥`
        );

    } else {

        wishlist.splice(index, 1);

        showNotification(
            `${product.name} removed from wishlist`
        );

    }


    localStorage.setItem(
        "fashionHubWishlist",
        JSON.stringify(wishlist)
    );


    /*
       Refresh product cards so the heart
       changes between ♡ and ♥.
    */

    const currentSearch =
        searchInput ? searchInput.value.toLowerCase().trim() : "";


    let productsToDisplay = allProducts;


    if (currentSearch) {

        productsToDisplay = allProducts.filter(product =>

            product.name.toLowerCase().includes(currentSearch) ||

            product.category.toLowerCase().includes(currentSearch)

        );

    }


    displayProducts(productsToDisplay);
}


/* =====================================================
   NOTIFICATION
   ===================================================== */

function showNotification(message) {

    const oldNotification =
        document.querySelector(".notification");

    if (oldNotification) {
        oldNotification.remove();
    }


    const notification =
        document.createElement("div");


    notification.className = "notification";

    notification.textContent = message;


    document.body.appendChild(notification);


    setTimeout(() => {

        notification.classList.add("hide");

    }, 1700);


    setTimeout(() => {

        notification.remove();

    }, 2200);
}


/* =====================================================
   CHECKOUT
   ===================================================== */

function checkout() {

    if (cart.length === 0) {

        showNotification(
            "Your cart is empty 🛒"
        );

        return;
    }


    const total = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );


    alert(
        `Order Summary\n\n` +
        `Items: ${cart.reduce(
            (sum, item) => sum + item.quantity,
            0
        )}\n` +
        `Total: ₹${total.toLocaleString("en-IN")}\n\n` +
        `Checkout page will be added next.`
    );
}


/* =====================================================
   ESC KEY CLOSES CART
   ===================================================== */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closeCart();
    }

});


/* =====================================================
   START WEBSITE
   ===================================================== */

loadProducts();