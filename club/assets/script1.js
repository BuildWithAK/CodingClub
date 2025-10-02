// Handle normal form login
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = this.username.value.trim();
    const password = this.password.value.trim();

    // Simple client-side validation
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if(!username || !password) {
        showError("All fields are required!");
        return;
    }

    if(!passwordPattern.test(password)) {
        showError("Password must contain at least one capital letter, one number, and one special character");
        return;
    }

    // Dummy check for demonstration (replace with real backend API)
    if(username === "admin" && password === "Admin@123") {
        showSuccess();
    } else {
        showError("Invalid username or password.");
    }
});

// Google Sign-In callback
function handleGoogleResponse(response) {
    // Decode JWT credential token
    const jwt = response.credential;
    console.log("Google JWT Token:", jwt);

    // You can send JWT to your backend for verification and login
    showSuccess("Google login successful!");
}

// Utility functions
function showError(message) {
    const errorDiv = document.getElementById('login-error');
    errorDiv.style.display = 'block';
    errorDiv.textContent = message;

    const successDiv = document.getElementById('login-success');
    successDiv.style.display = 'none';
}

function showSuccess(message = "Login successful! Redirecting...") {
    const successDiv = document.getElementById('login-success');
    successDiv.style.display = 'block';
    successDiv.textContent = message;

    const errorDiv = document.getElementById('login-error');
    errorDiv.style.display = 'none';

    // Redirect after 2 seconds (example)
    setTimeout(() => {
        window.location.href = "dashboard.html";
    }, 2000);
}
