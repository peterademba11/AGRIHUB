// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Load market prices
    loadMarketPrices();
    
    // Initialize testimonial slider
    initTestimonialSlider();
});

// Market Prices Data
function loadMarketPrices() {
    const pricesData = [
        { commodity: "Maize", unit: "100kg", price: 25000, change: 2.5 },
        { commodity: "Rice", unit: "50kg", price: 32000, change: -1.2 },
        { commodity: "Cassava", unit: "Tonne", price: 18000, change: 3.8 },
        { commodity: "Yam", unit: "100 Tubers", price: 45000, change: 0.5 },
        { commodity: "Tomatoes", unit: "Basket", price: 15000, change: -2.1 },
        { commodity: "Beans", unit: "100kg", price: 42000, change: 1.7 }
    ];
    
    const tableBody = document.getElementById('prices-data');
    if (tableBody) {
        tableBody.innerHTML = pricesData.map(item => `
            <tr>
                <td>${item.commodity}</td>
                <td>${item.unit}</td>
                <td>${item.price.toLocaleString()}</td>
                <td class="${item.change >= 0 ? 'price-up' : 'price-down'}">
                    ${item.change >= 0 ? '+' : ''}${item.change}%
                </td>
            </tr>
        `).join('');
    }
}

// Testimonial Slider
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    let currentIndex = 0;
    
    if (testimonials.length > 0) {
        // Show first testimonial
        testimonials[currentIndex].classList.add('active');
        
        // Rotate testimonials every 5 seconds
        setInterval(() => {
            testimonials[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % testimonials.length;
            testimonials[currentIndex].classList.add('active');
        }, 5000);
    }
}

// Check if user is logged in
function checkAuth() {
    const token = localStorage.getItem('agrihub_token');
    if (token) {
        const authButtons = document.querySelector('.auth-buttons');
        if (authButtons) {
            authButtons.innerHTML = `
                <a href="dashboard.html" class="btn btn-primary">Dashboard</a>
                <a href="#" id="logout-btn" class="btn btn-outline">Logout</a>
            `;
            
            document.getElementById('logout-btn').addEventListener('click', logout);
        }
    }
}

// Logout function
function logout() {
    localStorage.removeItem('agrihub_token');
    window.location.href = 'index.html';
}

// Initialize auth check
checkAuth();