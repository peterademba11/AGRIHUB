document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const paymentForm = document.getElementById('payment-form');
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    const cardDetails = document.getElementById('card-details');
    const bankDetails = document.getElementById('bank-details');
    const mobileDetails = document.getElementById('mobile-details');
    const payNowBtn = document.getElementById('pay-now');

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

    // Payment method selection
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            const methodValue = this.value;
            
            // Hide all details
            cardDetails.style.display = 'none';
            bankDetails.style.display = 'none';
            mobileDetails.style.display = 'none';
            
            // Show selected method details
            if (methodValue === 'card') {
                cardDetails.style.display = 'block';
            } else if (methodValue === 'bank') {
                bankDetails.style.display = 'block';
            } else if (methodValue === 'mobile') {
                mobileDetails.style.display = 'block';
            }
        });
    });

    // Handle payment form submission
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const amount = document.getElementById('payment-amount').value;
            const reason = document.getElementById('payment-reason').value;
            const reference = document.getElementById('payment-reference').value;
            const method = document.querySelector('input[name="payment-method"]:checked').value;
            
            // Validate amount
            if (!amount || parseFloat(amount) <= 0) {
                alert('Please enter a valid amount');
                return;
            }
            
            // Validate reason
            if (!reason) {
                alert('Please select a payment reason');
                return;
            }
            
            // Validate method-specific fields
            if (method === 'card') {
                const cardNumber = document.getElementById('card-number').value;
                const cardExpiry = document.getElementById('card-expiry').value;
                const cardCvv = document.getElementById('card-cvv').value;
                const cardName = document.getElementById('card-name').value;
                
                if (!cardNumber || !cardExpiry || !cardCvv || !cardName) {
                    alert('Please fill in all card details');
                    return;
                }
            } else if (method === 'mobile') {
                const provider = document.getElementById('mobile-provider').value;
                const number = document.getElementById('mobile-number').value;
                
                if (!provider || !number) {
                    alert('Please select a provider and enter your mobile number');
                    return;
                }
            }
            
            // Simulate payment processing
            payNowBtn.disabled = true;
            payNowBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            
            setTimeout(() => {
                // In a real app, you would process the payment with a payment gateway
                console.log('Payment processed:', { amount, reason, reference, method });
                
                alert('Payment successful! Thank you for your transaction.');
                paymentForm.reset();
                payNowBtn.disabled = false;
                payNowBtn.innerHTML = '<i class="fas fa-lock"></i> Pay Now';
                
                // Switch to payment history tab
                tabBtns.forEach(btn => btn.classList.remove('active'));
                document.querySelector('[data-tab="payment-history"]').classList.add('active');
                
                tabContents.forEach(content => content.classList.remove('active'));
                document.getElementById('payment-history').classList.add('active');
                
                // Update payment history (simulated)
                updatePaymentHistory(amount, reason, method);
            }, 2000);
        });
    }

    // Update payment history (simulated)
    function updatePaymentHistory(amount, reason, method) {
        const paymentHistory = document.querySelector('.payment-history');
        const emptyState = paymentHistory.querySelector('.empty-state');
        
        if (emptyState) {
            emptyState.remove();
            
            const historyList = document.createElement('div');
            historyList.className = 'history-list';
            historyList.innerHTML = `
                <div class="history-header">
                    <h3>Recent Payments</h3>
                </div>
                <div class="history-item">
                    <div class="payment-info">
                        <div class="payment-amount">₦${parseFloat(amount).toLocaleString()}</div>
                        <div class="payment-meta">
                            <span class="payment-reason">${getReasonName(reason)}</span>
                            <span class="payment-method">${getMethodName(method)}</span>
                        </div>
                    </div>
                    <div class="payment-date">Today</div>
                    <div class="payment-status success">Completed</div>
                </div>
                <div class="view-all">
                    <a href="#">View all payment history</a>
                </div>
            `;
            
            paymentHistory.appendChild(historyList);
        }
    }

    // Helper functions
    function getReasonName(reasonCode) {
        const reasons = {
            'marketplace': 'Marketplace Purchase',
            'machinery': 'Machinery Rental',
            'subscription': 'Subscription',
            'other': 'Other Payment'
        };
        return reasons[reasonCode] || reasonCode;
    }

    function getMethodName(methodCode) {
        const methods = {
            'card': 'Credit/Debit Card',
            'bank': 'Bank Transfer',
            'mobile': 'Mobile Money'
        };
        return methods[methodCode] || methodCode;
    }
});