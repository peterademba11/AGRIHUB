document.addEventListener('DOMContentLoaded', function() {
    // Sample expert data
    const experts = [
        {
            id: 1,
            name: "Prof. Peter Ademba",
            specialty: "Crop Production",
            expertise: "Maize, Rice, and Cassava cultivation",
            experience: "15 years",
            rating: 4.8,
            consultations: 245,
            image: "images/peter.png",
            bio: "Agricultural scientist specializing in cereal crops. PhD in Agronomy from University of Ibadan. Provides practical solutions for small and large-scale farmers.",
            languages: "English, Twi",
            availability: "Mon-Fri, 9am-5pm"
        },
        {
            id: 2,
            name: "Dr. Enerst Nartey",
            specialty: "Soil Science",
            expertise: "Soil fertility management, Fertilizer application",
            experience: "20 years",
            rating: 4.9,
            consultations: 320,
            image: "images/aziz.jpg",
            bio: "Professor of Soil Science with extensive research in tropical soil management. Helps farmers optimize soil health for better yields.",
            languages: "English, Twi",
            availability: "Tue-Thu, 10am-3pm"
        },
        {
            id: 3,
            name: "Engr. Sammy",
            specialty: "Irrigation",
            expertise: "Drip irrigation, Water management",
            experience: "12 years",
            rating: 4.7,
            consultations: 180,
            image: "images/david.jpg",
            bio: "Agricultural engineer specializing in irrigation systems. Helps farmers design efficient water delivery systems for various crops.",
            languages: "English, Twi",
            availability: "Mon-Wed, 8am-4pm"
        },
        {
            id: 4,
            name: "Dr. Lydia",
            specialty: "Livestock",
            expertise: "Poultry, Goat and Sheep rearing",
            experience: "10 years",
            rating: 4.6,
            consultations: 195,
            image: "images/hawa.jpg",
            bio: "Veterinary doctor with focus on small-scale livestock farming. Provides advice on animal health, feeding, and housing.",
            languages: "English, Frafra",
            availability: "Mon-Fri, 9am-2pm"
        },
        {
            id: 5,
            name: "Mr. Daniela",
            specialty: "Pest Control",
            expertise: "Integrated Pest Management",
            experience: "8 years",
            rating: 4.5,
            consultations: 150,
            image: "images/linda.jpg",
            bio: "Pest management specialist helping farmers reduce crop losses while minimizing chemical use. Focus on organic solutions.",
            languages: "English, Dagomba",
            availability: "Mon-Sat, 8am-6pm"
        },
        {
            id: 6,
            name: "Dr. Nyani-laar",
            specialty: "Agribusiness",
            expertise: "Farm management, Marketing",
            experience: "14 years",
            rating: 4.7,
            consultations: 210,
            image: "images/mubarak.jpg",
            bio: "Agricultural economist helping farmers improve profitability through better business practices and market access.",
            languages: "English, Bimoba",
            availability: "Mon-Thu, 10am-4pm"
        }
    ];

    // DOM elements
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const expertsContainer = document.getElementById('experts-container');
    const expertModal = document.getElementById('expert-modal');
    const expertModalBody = document.getElementById('expert-modal-body');
    const closeModal = document.querySelector('.close-modal');
    const questionForm = document.getElementById('question-form');

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

    // Display experts
    function displayExperts() {
        expertsContainer.innerHTML = experts.map(expert => `
            <div class="expert-card" data-id="${expert.id}">
                <div class="expert-image">
                    <img src="${expert.image}" alt="${expert.name}">
                </div>
                <div class="expert-info">
                    <h3>${expert.name}</h3>
                    <div class="specialty">${expert.specialty}</div>
                    <div class="expertise">${expert.expertise}</div>
                    <div class="expert-meta">
                        <span class="experience"><i class="fas fa-briefcase"></i> ${expert.experience}</span>
                        <span class="rating">
                            <i class="fas fa-star"></i> ${expert.rating}
                            <span class="count">(${expert.consultations})</span>
                        </span>
                    </div>
                    <button class="btn btn-primary view-expert">View Profile</button>
                </div>
            </div>
        `).join('');

        // Add event listeners to view buttons
        document.querySelectorAll('.view-expert').forEach(button => {
            button.addEventListener('click', function() {
                const expertId = parseInt(this.closest('.expert-card').getAttribute('data-id'));
                const expert = experts.find(e => e.id === expertId);
                showExpertModal(expert);
            });
        });
    }

    // Show expert modal
    function showExpertModal(expert) {
        expertModalBody.innerHTML = `
            <div class="expert-modal">
                <div class="modal-left">
                    <div class="expert-image">
                        <img src="${expert.image}" alt="${expert.name}">
                    </div>
                    <div class="expert-stats">
                        <div class="stat">
                            <div class="value">${expert.rating}</div>
                            <div class="label">Rating</div>
                        </div>
                        <div class="stat">
                            <div class="value">${expert.consultations}</div>
                            <div class="label">Consultations</div>
                        </div>
                        <div class="stat">
                            <div class="value">${expert.experience}</div>
                            <div class="label">Experience</div>
                        </div>
                    </div>
                </div>
                <div class="modal-right">
                    <h2>${expert.name}</h2>
                    <div class="specialty">${expert.specialty}</div>
                    <div class="expertise">${expert.expertise}</div>
                    
                    <div class="section">
                        <h3>About</h3>
                        <p>${expert.bio}</p>
                    </div>
                    
                    <div class="section">
                        <h3>Details</h3>
                        <div class="details-grid">
                            <div class="detail">
                                <i class="fas fa-language"></i>
                                <span>Languages: ${expert.languages}</span>
                            </div>
                            <div class="detail">
                                <i class="fas fa-clock"></i>
                                <span>Availability: ${expert.availability}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="modal-actions">
                        <button class="btn btn-primary" id="book-consultation">
                            <i class="fas fa-calendar-check"></i> Book Consultation
                        </button>
                        <button class="btn btn-outline" id="ask-question">
                            <i class="fas fa-question-circle"></i> Ask a Question
                        </button>
                    </div>
                </div>
            </div>
        `;

        expertModal.style.display = "block";

        // Add event listeners to modal buttons
        document.getElementById('book-consultation').addEventListener('click', function() {
            alert(`Booking consultation with ${expert.name}...`);
            // In a real app, this would open a booking interface
        });

        document.getElementById('ask-question').addEventListener('click', function() {
            // Switch to ask question tab
            tabBtns.forEach(btn => btn.classList.remove('active'));
            document.querySelector('[data-tab="ask-question"]').classList.add('active');
            
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById('ask-question').classList.add('active');
            
            // Close modal
            expertModal.style.display = "none";
        });
    }

    // Handle question form submission
    if (questionForm) {
        questionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const category = document.getElementById('question-category').value;
            const title = document.getElementById('question-title').value;
            const details = document.getElementById('question-details').value;
            
            // In a real app, you would send this data to your backend
            console.log('Question submitted:', { category, title, details });
            
            alert('Your question has been submitted! An expert will respond soon.');
            questionForm.reset();
            
            // Switch to consultations tab
            tabBtns.forEach(btn => btn.classList.remove('active'));
            document.querySelector('[data-tab="my-consultations"]').classList.add('active');
            
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById('my-consultations').classList.add('active');
        });
    }

    // Modal close handlers
    closeModal.addEventListener('click', function() {
        expertModal.style.display = "none";
    });

    window.addEventListener('click', function(event) {
        if (event.target === expertModal) {
            expertModal.style.display = "none";
        }
    });

    // Initialize
    displayExperts();
});