document.addEventListener('DOMContentLoaded', function() {
    // Sample product data
    const products = [
        {
            id: 1,
            name: "Fresh Tomatoes",
            category: "vegetables",
            description: "Freshly harvested tomatoes from our organic farm",
            price: 15000,
            unit: "basket",
            quantity: 20,
            location: "north",
            farmer: "Ibrahim Farms",
            image: "images/tomatoes.jpg",
            rating: 4.5
        },
        {
            id: 2,
            name: "Premium Rice",
            category: "grains",
            description: "High quality rice, well processed and packaged",
            price: 32000,
            unit: "50kg bag",
            quantity: 15,
            location: "south",
            farmer: "Olu Rice Mill",
            image: "images/rice.jpg",
            rating: 4.8
        },
        {
            id: 3,
            name: "Organic Maize",
            category: "grains",
            description: "Chemical-free maize, perfect for human and animal consumption",
            price: 25000,
            unit: "100kg bag",
            quantity: 30,
            location: "north",
            farmer: "Amina Grains",
            image: "images/maize.jpg",
            rating: 4.2
        },
        {
            id: 4,
            name: "Fresh Yam Tubers",
            category: "vegetables",
            description: "Large, healthy yam tubers ready for market",
            price: 45000,
            unit: "100 tubers",
            quantity: 10,
            location: "east",
            farmer: "Chukwu Yam Farm",
            image: "images/yam.jpg",
            rating: 4.7
        },
        {
            id: 5,
            name: "Goat Meat",
            category: "livestock",
            description: "Freshly slaughtered goat meat, hygienically processed",
            price: 2800,
            unit: "kg",
            quantity: 50,
            location: "west",
            farmer: "Bello Goat Ranch",
            image: "images/goat.jpg",
            rating: 4.9
        },
        {
            id: 6,
            name: "Fresh Pepper",
            category: "vegetables",
            description: "Hot fresh pepper, just harvested",
            price: 8000,
            unit: "bag",
            quantity: 25,
            location: "south",
            farmer: "Kemi Vegetables",
            image: "images/pepper.jpg",
            rating: 4.3
        },
        {
            id: 7,
            name: "Poultry Feed",
            category: "grains",
            description: "Chemical-free maize, perfect for human and animal consumption",
            price: 25000,
            unit: "100kg bag",
            quantity: 30,
            location: "north",
            farmer: "Amina Grains",
            image: "images/maize.jpg",
            rating: 4.2
        },
        {
            id: 8,
            name: "poultry",
            category: "vegetables",
            description: "Large, healthy yam tubers ready for market",
            price: 45000,
            unit: "100 tubers",
            quantity: 10,
            location: "east",
            farmer: "Chukwu Yam Farm",
            image: "images/yam.jpg",
            rating: 4.7
        },
        {
            id: 9,
            name: "Fertilizer",
            category: "livestock",
            description: "Freshly slaughtered goat meat, hygienically processed",
            price: 2800,
            unit: "kg",
            quantity: 50,
            location: "west",
            farmer: "Bello Goat Ranch",
            image: "images/goat.jpg",
            rating: 4.9
        },
        {
            id: 10,
            name: "Fresh Pepper",
            category: "vegetables",
            description: "Hot fresh pepper, just harvested",
            price: 8000,
            unit: "bag",
            quantity: 25,
            location: "south",
            farmer: "Kemi Vegetables",
            image: "images/pepper.jpg",
            rating: 4.3
        }
    ];

    // DOM elements
    const productsContainer = document.getElementById('products-container');
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const locationFilter = document.getElementById('location-filter');
    const resetBtn = document.getElementById('reset-filters');
    const modal = document.getElementById('product-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');

    // Display products
    function displayProducts(productsToDisplay) {
        productsContainer.innerHTML = productsToDisplay.map(product => `
            <div class="product-card" data-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-meta">
                        <span class="price">₵${product.price.toLocaleString()}/${product.unit}</span>
                        <span class="location">${getLocationName(product.location)}</span>
                    </div>
                    <div class="product-footer">
                        <span class="farmer">${product.farmer}</span>
                        <span class="rating">
                            ${generateStarRating(product.rating)}
                            ${product.rating}
                        </span>
                    </div>
                    <button class="btn btn-primary view-details">View Details</button>
                </div>
            </div>
        `).join('');

        // Add event listeners to view buttons
        document.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.closest('.product-card').getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                showProductModal(product);
            });
        });
    }

    // Filter products
    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const location = locationFilter.value;

        const filtered = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                                 product.description.toLowerCase().includes(searchTerm);
            const matchesCategory = !category || product.category === category;
            const matchesLocation = !location || product.location === location;
            
            return matchesSearch && matchesCategory && matchesLocation;
        });

        displayProducts(filtered);
    }

    // Show product modal
    function showProductModal(product) {
        modalBody.innerHTML = `
            <div class="modal-product">
                <div class="modal-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="modal-details">
                    <h2>${product.name}</h2>
                    <div class="price">₵${product.price.toLocaleString()}/${product.unit}</div>
                    <div class="meta">
                        <span><i class="fas fa-user"></i> ${product.farmer}</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${getLocationName(product.location)}</span>
                        <span><i class="fas fa-star"></i> ${product.rating} (${Math.floor(Math.random() * 50) + 10} reviews)</span>
                    </div>
                    <div class="description">
                        <h3>Description</h3>
                        <p>${product.description}</p>
                    </div>
                    <div class="quantity">
                        <h3>Available Quantity</h3>
                        <p>${product.quantity} ${product.unit}${product.quantity > 1 ? 's' : ''}</p>
                    </div>
                    <div class="actions">
                        <button class="btn btn-primary" id="buy-now">Buy Now</button>
                        <button class="btn btn-outline" id="contact-farmer">Contact Farmer</button>
                    </div>
                </div>
            </div>
        `;

        modal.style.display = "block";

        // Add event listeners to modal buttons
        document.getElementById('buy-now').addEventListener('click', function() {
            alert('Redirecting to checkout...');
            // In a real app, this would redirect to checkout page
        });

        document.getElementById('contact-farmer').addEventListener('click', function() {
            alert('Opening chat with farmer...');
            // In a real app, this would open a chat interface
        });
    }

    // Helper functions
    function getLocationName(locationCode) {
        const locations = {
            'north': 'Northern Region',
            'south': 'Greater Accra Region',
            'east': 'Eastern Region',
            'west': 'Western Region'
        };
        return locations[locationCode] || locationCode;
    }

    function generateStarRating(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        
        return stars;
    }

    // Event listeners
    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
    locationFilter.addEventListener('change', filterProducts);
    resetBtn.addEventListener('click', function() {
        searchInput.value = '';
        categoryFilter.value = '';
        locationFilter.value = '';
        filterProducts();
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = "none";
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Initial display
    displayProducts(products);
});