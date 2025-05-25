document.addEventListener('DOMContentLoaded', function() {
    // Sample machinery data
    const machinery = [
        {
            id: 1,
            name: "John Deere 5050D Tractor",
            category: "tractor",
            description: "45HP tractor with front loader. Excellent condition, well maintained. Comes with operator if needed.",
            price: 25000,
            period: "day",
            location: "north",
            owner: "Ibrahim Farms",
            rating: 4.7,
            rentals: 18,
            images: [
                "images/tractor.jpg",
                "assets/machinery/tractor2.jpg"
            ],
            specifications: {
                make: "John Deere",
                model: "5050D",
                year: "2018",
                power: "45 HP",
                fuel: "Diesel"
            },
            availability: "Available from next week"
        },
        {
            id: 2,
            name: "Rice Harvester",
            category: "harvester",
            description: "Self-propelled rice harvester with 4-row header. Perfect for large rice farms.",
            price: 80000,
            period: "day",
            location: "south",
            owner: "Olu Farms",
            rating: 4.5,
            rentals: 12,
            images: [
                "images/harvester.jpg",
            ],
            specifications: {
                make: "Kubota",
                model: "DC-60",
                year: "2017",
                capacity: "4 acres/day",
                fuel: "Diesel"
            },
            availability: "Available immediately"
        },
        {
            id: 3,
            name: "Maize Planter",
            category: "planter",
            description: "4-row maize planter with fertilizer attachment. Well maintained and ready for use.",
            price: 15000,
            period: "day",
            location: "north",
            owner: "Amina Farms",
            rating: 4.3,
            rentals: 9,
            images: [
                "images/planter.jpg",
            ],
            specifications: {
                make: "AGCO",
                model: "AP-4",
                year: "2019",
                rows: "4",
                coverage: "3 acres/day"
            },
            availability: "Available next month"
        },
        {
            id: 4,
            name: "Drip Irrigation System",
            category: "irrigation",
            description: "Complete drip irrigation system for 1 acre. Includes pump, filters, and piping.",
            price: 12000,
            period: "week",
            location: "west",
            owner: "Bello Irrigation",
            rating: 4.6,
            rentals: 15,
            images: [
                "images/irrigation.jpg",
                "assets/machinery/irrigation2.jpg"
            ],
            specifications: {
                make: "Netafim",
                coverage: "1 acre",
                components: "Pump, filters, mainline, driplines"
            },
            availability: "Available immediately"
        },
        {
            id: 5,
            name: "Mahindra 575 DI Tractor",
            category: "tractor",
            description: "35HP tractor with 5-ton trailer. Perfect for transportation of farm produce.",
            price: 30000,
            period: "day",
            location: "east",
            owner: "Peter Transport",
            rating: 4.4,
            rentals: 11,
            images: [
                "images/tractor1.jpg",
                "assets/machinery/trailer1.jpg"
            ],
            specifications: {
                make: "Mahindra",
                model: "575 DI",
                year: "2016",
                power: "35 HP",
                trailer: "5-ton capacity"
            },
            availability: "Available next week"
        },
        {
            id: 6,
            name: "Power Tiller",
            category: "other",
            description: "Heavy duty power tiller for small farms. Easy to operate and maintain.",
            price: 10000,
            period: "day",
            location: "south",
            owner: "Kemi Equipment",
            rating: 4.2,
            rentals: 7,
            images: [
                "images/tiller.jpg",
            ],
            specifications: {
                make: "Honda",
                model: "FX550",
                year: "2020",
                power: "5.5 HP",
                fuel: "Petrol"
            },
            availability: "Available immediately"
        }
    ];

    // DOM elements
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const machineryContainer = document.getElementById('machinery-container');
    const machineryModal = document.getElementById('machinery-modal');
    const machineryModalBody = document.getElementById('machinery-modal-body');
    const closeModal = document.querySelector('.close-modal');
    const machineryForm = document.getElementById('machinery-form');
    const searchInput = document.getElementById('machinery-search');
    const categoryFilter = document.getElementById('category-filter');
    const locationFilter = document.getElementById('location-filter');
    const resetBtn = document.getElementById('reset-filters');
    const imagePreview = document.getElementById('image-preview');

    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab button
            tabBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update active tab content
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Display machinery
    function displayMachinery(machineryToDisplay) {
        machineryContainer.innerHTML = machineryToDisplay.map(item => `
            <div class="machinery-card" data-id="${item.id}">
                <div class="machinery-image">
                    <img src="${item.images[0]}" alt="${item.name}">
                </div>
                <div class="machinery-info">
                    <h3>${item.name}</h3>
                    <div class="category">${getCategoryName(item.category)}</div>
                    <div class="price">₵${item.price.toLocaleString()} / ${item.period}</div>
                    <div class="machinery-meta">
                        <span class="location"><i class="fas fa-map-marker-alt"></i> ${getLocationName(item.location)}</span>
                        <span class="rating">
                            <i class="fas fa-star"></i> ${item.rating}
                            <span class="count">(${item.rentals})</span>
                        </span>
                    </div>
                    <div class="availability">${item.availability}</div>
                    <button class="btn btn-primary view-details">View Details</button>
                </div>
            </div>
        `).join('');

        // Add event listeners to view buttons
        document.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', function() {
                const machineryId = parseInt(this.closest('.machinery-card').getAttribute('data-id'));
                const item = machinery.find(m => m.id === machineryId);
                showMachineryModal(item);
            });
        });
    }

    // Filter machinery
    function filterMachinery() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const location = locationFilter.value;

        const filtered = machinery.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm) || 
                                 item.description.toLowerCase().includes(searchTerm);
            const matchesCategory = !category || item.category === category;
            const matchesLocation = !location || item.location === location;
            
            return matchesSearch && matchesCategory && matchesLocation;
        });

        displayMachinery(filtered);
    }

    // Show machinery modal
    function showMachineryModal(item) {
        machineryModalBody.innerHTML = `
            <div class="machinery-modal">
                <div class="modal-left">
                    <div class="main-image">
                        <img src="${item.images[0]}" alt="${item.name}" id="main-image">
                    </div>
                    <div class="thumbnail-container">
                        ${item.images.map((img, index) => `
                            <div class="thumbnail ${index === 0 ? 'active' : ''}" data-image="${img}">
                                <img src="${img}" alt="Thumbnail ${index + 1}">
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="modal-right">
                    <h2>${item.name}</h2>
                    <div class="owner">Listed by: ${item.owner}</div>
                    <div class="price">₦${item.price.toLocaleString()} / ${item.period}</div>
                    <div class="location"><i class="fas fa-map-marker-alt"></i> ${getLocationName(item.location)}</div>
                    <div class="rating">
                        <i class="fas fa-star"></i> ${item.rating} (${item.rentals} rentals)
                    </div>
                    
                    <div class="section">
                        <h3>Description</h3>
                        <p>${item.description}</p>
                    </div>
                    
                    <div class="section">
                        <h3>Specifications</h3>
                        <div class="specs-grid">
                            ${Object.entries(item.specifications).map(([key, value]) => `
                                <div class="spec">
                                    <div class="spec-key">${key}:</div>
                                    <div class="spec-value">${value}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="section">
                        <h3>Availability</h3>
                        <p>${item.availability}</p>
                    </div>
                    
                    <div class="modal-actions">
                        <button class="btn btn-primary" id="rent-now">
                            <i class="fas fa-calendar-check"></i> Rent Now
                        </button>
                        <button class="btn btn-outline" id="contact-owner">
                            <i class="fas fa-envelope"></i> Contact Owner
                        </button>
                    </div>
                </div>
            </div>
        `;

        machineryModal.style.display = "block";

        // Add event listeners to thumbnails
        document.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.addEventListener('click', function() {
                const imgSrc = this.getAttribute('data-image');
                document.getElementById('main-image').src = imgSrc;
                document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Add event listeners to modal buttons
        document.getElementById('rent-now').addEventListener('click', function() {
            alert(`Renting ${item.name}...`);
            // In a real app, this would open a rental booking interface
        });

        document.getElementById('contact-owner').addEventListener('click', function() {
            alert(`Contacting ${item.owner}...`);
            // In a real app, this would open a chat interface
        });
    }

    // Handle machinery form submission
    if (machineryForm) {
        machineryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('machine-name').value;
            const category = document.getElementById('machine-category').value;
            const price = document.getElementById('machine-price').value;
            const location = document.getElementById('machine-location').value;
            const description = document.getElementById('machine-description').value;
            
            // In a real app, you would send this data to your backend
            console.log('Machinery listed:', { name, category, price, location, description });
            
            alert('Your machinery has been listed successfully!');
            machineryForm.reset();
            imagePreview.innerHTML = '';
            
            // Switch to browse tab
            tabBtns.forEach(btn => btn.classList.remove('active'));
            document.querySelector('[data-tab="browse-machinery"]').classList.add('active');
            
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById('browse-machinery').classList.add('active');
        });

        // Handle image preview
        document.getElementById('machine-images').addEventListener('change', function() {
            imagePreview.innerHTML = '';
            const files = this.files;
            
            if (files.length > 5) {
                alert('Maximum 5 images allowed');
                this.value = '';
                return;
            }
            
            for (let i = 0; i < Math.min(files.length, 5); i++) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.classList.add('preview-image');
                    imagePreview.appendChild(img);
                }
                reader.readAsDataURL(files[i]);
            }
        });
    }

    // Helper functions
    function getCategoryName(categoryCode) {
        const categories = {
            'tractor': 'Tractor',
            'harvester': 'Harvester',
            'planter': 'Planter',
            'irrigation': 'Irrigation',
            'other': 'Other Equipment'
        };
        return categories[categoryCode] || categoryCode;
    }

    function getLocationName(locationCode) {
        const locations = {
            'north': 'Northern Region',
            'south': 'Greater Accra Region',
            'east': 'Eastern Region',
            'west': 'Western Region'
        };
        return locations[locationCode] || locationCode;
    }

    // Modal close handlers
    closeModal.addEventListener('click', function() {
        machineryModal.style.display = "none";
    });

    window.addEventListener('click', function(event) {
        if (event.target === machineryModal) {
            machineryModal.style.display = "none";
        }
    });

    // Event listeners
    searchInput.addEventListener('input', filterMachinery);
    categoryFilter.addEventListener('change', filterMachinery);
    locationFilter.addEventListener('change', filterMachinery);
    resetBtn.addEventListener('click', function() {
        searchInput.value = '';
        categoryFilter.value = '';
        locationFilter.value = '';
        filterMachinery();
    });

    // Initial display
    displayMachinery(machinery);
});