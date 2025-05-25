document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar on mobile
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.getElementById('sidebar');
    
    if (hamburger && sidebar) {
        hamburger.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }

    // Toggle user dropdown menu
    const userBtn = document.getElementById('user-btn');
    const dropdownMenu = document.getElementById('dropdown-menu');
    
    if (userBtn && dropdownMenu) {
        userBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        if (dropdownMenu) {
            dropdownMenu.style.display = 'none';
        }
    });

    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('agrihub_token');
            window.location.href = 'index.html';
        });
    }

    // Initialize charts
    initializeCharts();

    // Load user data
    loadUserData();
});

// Initialize dashboard charts
function initializeCharts() {
    // Sales Chart
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    const salesChart = new Chart(salesCtx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'Sales (₦)',
                data: [25000, 42000, 38000, 55000],
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                borderColor: 'rgba(76, 175, 80, 1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false
                    },
                    ticks: {
                        callback: function(value) {
                            return '₵' + value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Products Chart
    const productsCtx = document.getElementById('productsChart').getContext('2d');
    const productsChart = new Chart(productsCtx, {
        type: 'doughnut',
        data: {
            labels: ['Maize', 'Rice', 'Cassava', 'Yam', 'Others'],
            datasets: [{
                data: [35, 25, 20, 15, 5],
                backgroundColor: [
                    '#4CAF50',
                    '#2196F3',
                    '#FFC107',
                    '#9C27B0',
                    '#607D8B'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            cutout: '70%'
        }
    });
}

// Load user data
function loadUserData() {
    // In a real app, you would fetch this from your backend
    const userData = {
        name: "Peter Ademba+",
        role: "Farmer",
        avatar: "images/peter.png"
    };

    // Update UI with user data
    document.querySelectorAll('.user-name').forEach(el => {
        el.textContent = userData.name;
    });

    document.querySelectorAll('.user-role').forEach(el => {
        el.textContent = userData.role;
    });

    document.querySelectorAll('.user-avatar').forEach(el => {
        el.src = userData.avatar;
    });

    // Update dashboard content based on user role
    updateDashboardForRole(userData.role);
}

// Update dashboard content based on user role
function updateDashboardForRole(role) {
    const dashboardTitle = document.querySelector('.page-header h1');
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    const statsCards = document.querySelectorAll('.stat-card');

    if (role.toLowerCase() === 'farmer') {
        if (dashboardTitle) dashboardTitle.textContent = "Farmer Dashboard";
        
        // Update stats cards for farmers
        if (statsCards.length >= 4) {
            statsCards[0].querySelector('.stat-label').textContent = "Active Listings";
            statsCards[1].querySelector('.stat-label').textContent = "This Month's Sales";
            statsCards[2].querySelector('.stat-label').textContent = "Machinery Rentals";
            statsCards[3].querySelector('.stat-label').textContent = "Expert Consultations";
        }
        
        // Update sidebar links for farmers
        if (sidebarLinks.length >= 2) {
            sidebarLinks[1].querySelector('span').textContent = "My Farm";
        }
    } 
    else if (role.toLowerCase() === 'buyer') {
        if (dashboardTitle) dashboardTitle.textContent = "Buyer Dashboard";
        
        // Update stats cards for buyers
        if (statsCards.length >= 4) {
            statsCards[0].querySelector('.stat-label').textContent = "Active Orders";
            statsCards[1].querySelector('.stat-label').textContent = "This Month's Purchases";
            statsCards[2].querySelector('.stat-label').textContent = "Saved Products";
            statsCards[3].querySelector('.stat-label').textContent = "Messages";
        }
        
        // Update sidebar links for buyers
        if (sidebarLinks.length >= 2) {
            sidebarLinks[1].querySelector('span').textContent = "My Purchases";
        }
    }
    else if (role.toLowerCase() === 'agent') {
        if (dashboardTitle) dashboardTitle.textContent = "Agent Dashboard";
        
        // Update stats cards for agents
        if (statsCards.length >= 4) {
            statsCards[0].querySelector('.stat-label').textContent = "Verified Farmers";
            statsCards[1].querySelector('.stat-label').textContent = "Resolved Disputes";
            statsCards[2].querySelector('.stat-label').textContent = "Pending Requests";
            statsCards[3].querySelector('.stat-label').textContent = "Messages";
        }
        
        // Update sidebar links for agents
        if (sidebarLinks.length >= 2) {
            sidebarLinks[1].querySelector('span').textContent = "Verifications";
        }
    }
}