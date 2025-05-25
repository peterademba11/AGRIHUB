document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const upgradeBtns = document.querySelectorAll('.upgrade-btn');
    const paymentModal = document.getElementById('payment-modal');
    const closeModal = document.querySelector('.close-modal');
    const paymentOptions = document.querySelectorAll('input[name="payment-option"]');
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    const confirmPaymentBtn = document.getElementById('confirm-payment');
    const planNameEl = document.getElementById('plan-name');
    const planPriceEl = document.getElementById('plan-price');
    const monthlyPriceEl = document.getElementById('monthly-price');
    const annualPriceEl = document.getElementById('annual-price');

    // Plan data
    const plans = {
        premium: {
            name: "Premium",
            monthlyPrice: 5000,
            annualPrice: 48000,
            annualSavings: 20
        },
        enterprise: {
            name: "Enterprise",
            monthlyPrice: 15000,
            annualPrice: 144000,
            annualSavings: 20
        }
    };

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

    // Upgrade button click handlers
    upgradeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const plan = this.closest('.plan-card').classList.contains('premium') ? 'premium' : 'enterprise';
            openPaymentModal(plan);
        });
    });

    // Open payment modal with selected plan
    function openPaymentModal(plan) {
        const planData = plans[plan];
        
        // Update modal content
        planNameEl.textContent = planData.name;
        planPriceEl.textContent = `₵${planData.monthlyPrice.toLocaleString()}/month`;
        monthlyPriceEl.textContent = `₵${planData.monthlyPrice.toLocaleString()}/month`;
        annualPriceEl.textContent = `₵${planData.annualPrice.toLocaleString()}/year (Save ${planData.annualSavings}%)`;
        
        // Show modal
        paymentModal.style.display = "block";
    }

    // Payment option change handler
    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            const plan = planNameEl.textContent.toLowerCase();
            const planData = plans[plan];
            
            if (this.id === 'annual') {
                planPriceEl.textContent = `₵${planData.annualPrice.toLocaleString()}/year`;
            } else {
                planPriceEl.textContent = `₵${planData.monthlyPrice.toLocaleString()}/month`;
            }
        });
    });

    // Payment method change handler
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            // Hide all payment details
            document.querySelectorAll('.payment-details').forEach(el => {
                el.style.display = 'none';
            });
            
            // Show selected payment details
            if (this.id === 'card') {
                document.getElementById('card-details').style.display = 'block';
            }
            // In a real app, you would show other payment method details here
        });
    });

    // Confirm payment handler
    confirmPaymentBtn.addEventListener('click', function() {
        const plan = planNameEl.textContent.toLowerCase();
        const isAnnual = document.getElementById('annual').checked;
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked').id;
        
        // Validate card details if card payment
        if (paymentMethod === 'card') {
            const cardNumber = document.getElementById('card-number').value;
            const cardExpiry = document.getElementById('card-expiry').value;
            const cardCvv = document.getElementById('card-cvv').value;
            const cardName = document.getElementById('card-name').value;
            
            if (!cardNumber || !cardExpiry || !cardCvv || !cardName) {
                alert('Please fill in all card details');
                return;
            }
        }
        
        // Simulate payment processing
        this.disabled = true;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        
        setTimeout(() => {
            // In a real app, you would process the payment with a payment gateway
            console.log('Subscription payment processed:', { 
                plan, 
                period: isAnnual ? 'annual' : 'monthly',
                paymentMethod 
            });
            
            alert('Payment successful! Your subscription has been upgraded.');
            paymentModal.style.display = "none";
            this.disabled = false;
            this.innerHTML = '<i class="fas fa-lock"></i> Confirm Payment';
            
            // Update UI to show new subscription
            updateSubscriptionStatus(plan);
        }, 2000);
    });

    // Update subscription status (simulated)
    function updateSubscriptionStatus(plan) {
        const currentPlanCard = document.querySelector('.current-plan-card');
        const planName = plan.charAt(0).toUpperCase() + plan.slice(1);
        
        currentPlanCard.querySelector('.plan-name').textContent = `${planName} Plan`;
        currentPlanCard.querySelector('.plan-expiry').innerHTML = 
            `<i class="fas fa-calendar-alt"></i> Renews on ${getFutureDate(1)}`;
        
        // Update plan cards to show current plan
        document.querySelectorAll('.current-plan').forEach(el => {
            el.textContent = 'Select Plan';
            el.classList.remove('current-plan');
            el.classList.add('btn-primary');
            el.classList.remove('btn-outline');
        });
        
        document.querySelector(`.${plan}-plan .btn-primary`).textContent = 'Current Plan';
        document.querySelector(`.${plan}-plan .btn-primary`).classList.add('current-plan');
        document.querySelector(`.${plan}-plan .btn-primary`).classList.add('btn-outline');
        document.querySelector(`.${plan}-plan .btn-primary`).classList.remove('btn-primary');
        
        // Switch to my subscription tab
        tabBtns.forEach(btn => btn.classList.remove('active'));
        document.querySelector('[data-tab="my-subscription"]').classList.add('active');
        
        tabContents.forEach(content => content.classList.remove('active'));
        document.getElementById('my-subscription').classList.add('active');
    }

    // Helper function to get future date
    function getFutureDate(years) {
        const date = new Date();
        date.setFullYear(date.getFullYear() + years);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    // Modal close handlers
    closeModal.addEventListener('click', function() {
        paymentModal.style.display = "none";
    });

    window.addEventListener('click', function(event) {
        if (event.target === paymentModal) {
            paymentModal.style.display = "none";
        }
    });
});