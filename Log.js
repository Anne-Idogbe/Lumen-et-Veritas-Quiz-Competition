document.addEventListener('DOMContentLoaded', function () {
    // Set the registration deadline
    const deadlineDate = new Date('October 1, 2024 00:00:00').getTime();

    // Get elements for countdown
    const countdownEl = document.getElementById('countdown');
    const fineMessage = document.getElementById('fine-message');

    // Login form
    const loginForm = document.getElementById('login-school');

    // Check the countdown every second
    const countdownInterval = setInterval(function () {
        const now = new Date().getTime();
        const timeRemaining = deadlineDate - now;

        // Calculate the days, hours, minutes, and seconds remaining
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        // Display countdown
        countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        // If the countdown is over, show the fine message
        if (timeRemaining < 0) {
            clearInterval(countdownInterval);
            document.getElementById('registration-status').textContent = "Registration has closed!";
            countdownEl.textContent = "";
            fineMessage.classList.remove('hidden');
        }
    }, 1000);

    // Form validation error handling
    function showError(inputId, errorId, message) {
        document.getElementById(inputId).classList.add('border-red-500');
        const errorMessage = document.getElementById(errorId);
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    }

    function hideError(errorId) {
        const errorMessage = document.getElementById(errorId);
        errorMessage.classList.add('hidden');
    }

    // Handle login form submission
    loginForm.addEventListener  ('submit', function (e) {
        e.preventDefault();

        // Retrieve the user data from local storage
        const user = JSON.parse(localStorage.getItem("userDetails"));

        // Get the values of the input fields
        const loginEmail = document.getElementById('login-email').value.trim();
        const loginPassword = document.getElementById('login-password').value.trim();

        let valid = true;

        // Validate email field
        if (loginEmail === "") {
            showError('login-email', 'login-email-error', 'Email cannot be empty.');
            valid = false;
        } else {
            hideError('login-email-error');
        }

        // Check if login email matches stored email
        if (user && loginEmail !== user.email) {
            showError('login-email', 'login-email-error', 'Username or Password is incorrect.');
            valid = false;
        } else {
            hideError('login-email-error');
        }

        // Validate the password field
        if (loginPassword === "") {
            showError('login-password', 'login-password-error', 'Password cannot be empty.');
            valid = false;
        } else {
            hideError('login-password-error');
        }

        // Check if login password matches stored password
        if (user && loginPassword !== user.password) {
            showError('login-password', 'login-password-error', 'Username or Password is incorrect.');
            valid = false;
        } else {
            hideError('login-password-error');
        }

        // If everything is valid, redirect to quiz page
        if (valid) {
            window.location.href = "quiz.html";
        }

        // Clear form fields after submission
        loginForm.reset();
    });

});
