const form= document.getElementById("myForm");
form.addEventListener("submit", function(e){
    e.preventDefault();
    const fname = document.getElementById("firstname").value;
    const lname = document.getElementById("lastname").value;
    const user = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    const phone = document.getElementById("phone").value;
    const dob = document.getElementById("dob").value;

    let isValid = true;
    document.getElementById("firstName-error").textContent = "";
    document.getElementById("lastName-error").textContent = "";
    document.getElementById("username-error").textContent = "";
    document.getElementById("email-error").textContent = "";
    document.getElementById("password-error").textContent = "";
    document.getElementById("phone-error").textContent = "";
    document.getElementById("dob-error").textContent = "";

    const nameRegex = /^[a-zA-Z]{1,30}$/;
    if(!nameRegex.test(fname)){
        document.getElementById("firstName-error").textContent = 
        "First name must be 1-30 letters.";
        isValid = false;
    }

    if(!nameRegex.test(lname)){
        document.getElementById("lastName-error").textContent = 
        "Last name must be 1-30 letters.";
        isValid = false;
    }

    const userRegex = /^[a-zA-Z0-9_]{3,15}$/;
    if(!userRegex.test(user)){
        document.getElementById("username-error").textContent = 
        "Username must be 3-15 chars (letters, numbers, underscores).";
        isValid = false;
    }

    const emailRegex = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})$/;
    if(!emailRegex.test(email)){
        document.getElementById("email-error").textContent = 
        "Invalid email address.";
        isValid = false;
    }

    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
    if(!passRegex.test(pass)){
        document.getElementById("password-error").textContent = 
        "Password must have 8+ chars, 1 uppercase, 1number, 1 special char.";
        isValid = false;
    }

    const phoneRegex = /^[7-9][0-9]{9}$/;
    if(!phoneRegex.test(phone)){
        document.getElementById("phone-error").textContent = 
        "Phone must be 10 digits, starting with 7-9.";
        isValid = false;
    }

    const today = new Date();
    const bDate = new Date(dob);
    const age = today.getFullYear() - bDate.getFullYear();
    const month = today.getMonth() - bDate.getMonth();
    if(age < 18 || (age === 18 && month < 0)){
        document.getElementById("dob-error").textContent = 
        "You must be at least 18 years old.";
        isValid = false;
    }

    if(isValid){
        alert("Form submitted successfully.");
    }
});