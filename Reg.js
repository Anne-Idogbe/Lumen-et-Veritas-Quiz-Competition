document.addEventListener('DOMContentLoaded', function () {
    // Set the registration deadline
    const deadlineDate = new Date('October 1, 2024 00:00:00').getTime();

    // Get elements for countdown
    const countdownEl = document.getElementById('countdown');
    const fineMessage = document.getElementById('fine-message');

    // Registration form and login form
    const registrationForm = document.getElementById('register-school');
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

    // Handle registration form submission
    registrationForm.addEventListener('submit', function (e) {
        e.preventDefault();
        



        let formData = {
            schoolName: document.getElementById('school-name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        }


        let valid = true;

        // Validate fields
        if (formData.schoolName === "") {
            showError('school-name', 'school-name-error', 'School Name cannot be empty.');
            valid = false;
        } else {
            hideError('school-name-error');
        }

        if (formData.email === "") {
            showError('email', 'email-error', 'Email cannot be empty.');
            valid = false;
        } else {
            hideError('email-error');
        }

        if (formData.password === "") {
            showError('password', 'password-error', 'Password cannot be empty.');
            valid = false;
        } else {
            hideError('password-error');
        }

        if (valid) {
            const now = new Date().getTime();

            // Check if the registration is past the deadline
            if (now > deadlineDate) {
                alert(`Registration deadline has passed! Your school will need to pay a $5000 fine.`);
            } else {
                valid = true
                let formDataJson = JSON.stringify(formData)
                localStorage.setItem("userDetails", formDataJson)
                alert(`Registration successful! Welcome ${formData.schoolName}`)

                // alert("Registered successfully")
                // // Save school details in localStorage
                // localStorage.setItem('schoolName', schoolName);
                // localStorage.setItem('email', email);
                // localStorage.setItem('password', password);
                
            }

            // Clear form
            registrationForm.reset();
        }
    });

    
})
