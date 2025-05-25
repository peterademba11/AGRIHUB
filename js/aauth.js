document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            
            // Toggle eye icon
            this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    });

    // Password strength checker (for register page)
    const passwordInput = document.getElementById('register-password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            checkPasswordStrength(this.value);
        });
    }

    // Password match checker (for register page)
    const confirmPasswordInput = document.getElementById('register-confirm-password');
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            checkPasswordMatch();
        });
    }

    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // Basic validation
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            // In a real app, you would validate with your backend
            console.log('Login attempt with:', { email, password });
            
            // Simulate login process
            const submitButton = this.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
            
            setTimeout(() => {
                // Simulate successful login
                localStorage.setItem('agrihub_token', 'simulated_token');
                alert('Login successful! Redirecting to dashboard...');
                window.location.href = 'dashboard.html';
            }, 1500);
        });
    }

    // Register form submission
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('register-fname').value;
            const lastName = document.getElementById('register-lname').value;
            const email = document.getElementById('register-email').value;
            const phone = document.getElementById('register-phone').value;
            const role = document.getElementById('register-role').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            const terms = document.getElementById('register-terms').checked;
            
            // Basic validation
            if (!firstName || !lastName || !email || !phone || !role || !password || !confirmPassword) {
                alert('Please fill in all required fields');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            if (!terms) {
                alert('You must agree to the terms and conditions');
                return;
            }
            
            // In a real app, you would send this data to your backend
            const userData = {
                firstName,
                lastName,
                email,
                phone,
                role,
                password
            };
            
            console.log('Registration data:', userData);
            
            // Simulate registration process
            const submitButton = this.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
            
            setTimeout(() => {
                // Simulate successful registration
                localStorage.setItem('agrihub_token', 'simulated_token');
                alert('Registration successful! Welcome to Agri-Hub.');
                window.location.href = role === 'agent' ? 'agent-dashboard.html' : 'dashboard.html';
            }, 2000);
        });
    }

    // Social login buttons
    const socialButtons = document.querySelectorAll('.btn-social');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.querySelector('i').classList.contains('fa-google') ? 'Google' : 'Facebook';
            alert(`In a real app, this would authenticate with ${provider}`);
        });
    });

    // Check URL for role parameter (from homepage buttons)
    const urlParams = new URLSearchParams(window.location.search);
    const roleParam = urlParams.get('role');
    if (roleParam && document.getElementById('register-role')) {
        document.getElementById('register-role').value = roleParam;
    }
});

// Password strength checker function
function checkPasswordStrength(password) {
    const strengthBars = document.querySelectorAll('.strength-bar');
    const strengthText = document.getElementById('strength-text');
    
    // Reset all bars
    strengthBars.forEach(bar => {
        bar.style.backgroundColor = '#eee';
    });
    
    if (!password) {
        strengthText.textContent = 'Weak';
        return;
    }
    
    // Calculate strength
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^A-Za-z0-9]/)) strength++;
    
    // Update UI
    for (let i = 0; i < strength; i++) {
        if (i === 0) {
            strengthBars[i].style.backgroundColor = '#ff5252'; // Red
        } else if (i === 1) {
            strengthBars[i].style.backgroundColor = '#ffc107'; // Yellow
        } else {
            strengthBars[i].style.backgroundColor = '#4caf50'; // Green
        }
    }
    
    // Update text
    const strengthLabels = ['Weak', 'Moderate', 'Strong', 'Very Strong'];
    strengthText.textContent = strengthLabels[strength - 1] || 'Weak';
}

// Password match checker function
function checkPasswordMatch() {
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const matchMessage = document.getElementById('password-match');
    
    if (!password || !confirmPassword) {
        matchMessage.textContent = '';
        return;
    }
    
    if (password === confirmPassword) {
        matchMessage.textContent = 'Passwords match!';
        matchMessage.style.color = 'var(--primary-color)';
    } else {
        matchMessage.textContent = 'Passwords do not match';
        matchMessage.style.color = 'var(--danger-color)';
    }
}