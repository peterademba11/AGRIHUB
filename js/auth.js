// Registration Form
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(registerForm);
        const user = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            password: formData.get('password'),
            role: formData.get('role') || 'farmer',
            location: formData.get('location')
        };
        
        // In a real app, you would send this to your backend
        console.log('Registering user:', user);
        
        // Simulate successful registration
        localStorage.setItem('agrihub_token', 'simulated_token');
        alert('Registration successful!');
        window.location.href = 'dashboard.html';
    });
}

// Login Form
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(loginForm);
        const credentials = {
            email: formData.get('email'),
            password: formData.get('password')
        };
        
        // In a real app, you would verify these credentials with your backend
        console.log('Login attempt with:', credentials);
        
        // Simulate successful login
        localStorage.setItem('agrihub_token', 'simulated_token');
        alert('Login successful!');
        window.location.href = 'dashboard.html';
    });
}