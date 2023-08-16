let slider = document.getElementById("range");
let sliderValue = document.getElementById("length");
let strengthText = document.getElementById("strength");
let strengthBox1 = document.getElementById("sp-1");
let strengthBox2 = document.getElementById("sp-2");
let strengthBox3 = document.getElementById("sp-3");
let strengthBox4 = document.getElementById("sp-4");

let generateButton = document.getElementById("button");
let lowercaseCheckbox = document.getElementById("lowercase");
let uppercaseCheckbox = document.getElementById("uppercase");
let numbersCheckbox = document.getElementById("numbers");
let symbolsCheckbox = document.getElementById("symbols");

let generatedPassword = document.getElementById("password");
let copyImage = document.getElementById("copyBefore");
let copyText = document.getElementById("copyText");

// Show realtime slider value and password strength.
// Show realtime slider value and password strength.
slider.addEventListener("input", function () {
    sliderValue.textContent = slider.value;
    switch (true) {
        case slider.value <= 6:
            strengthText.textContent = "TOO WEAK!";
            strengthBox1.style.backgroundColor = "#F64A4A";
            strengthBox2.style.backgroundColor = "";
            strengthBox3.style.backgroundColor = "";
            strengthBox4.style.backgroundColor = "";
            break;
        case slider.value > 6 && slider.value < 10:
            strengthText.textContent = "WEAK";
            strengthBox1.style.backgroundColor = "#FB7C58";
            strengthBox2.style.backgroundColor = "#FB7C58";
            strengthBox3.style.backgroundColor = "";
            strengthBox4.style.backgroundColor = "";
            break;
        case slider.value >= 10 && slider.value < 14:
            strengthText.textContent = "MEDIUM";
            strengthBox1.style.backgroundColor = "#F8CD65";
            strengthBox2.style.backgroundColor = "#F8CD65";
            strengthBox3.style.backgroundColor = "#F8CD65";
            strengthBox4.style.backgroundColor = "";
            break;
        case slider.value >= 14:
            strengthText.textContent = "STRONG";
            strengthBox1.style.backgroundColor = "#A4FFAF";
            strengthBox2.style.backgroundColor = "#A4FFAF";
            strengthBox3.style.backgroundColor = "#A4FFAF";
            strengthBox4.style.backgroundColor = "#A4FFAF";
            break;
    }
});


// Generate password. First store the password length and selected checkboxes in constants then run generatePassword function.
generateButton.addEventListener("click", function () {
    const passwordLength = +slider.value;
    const options = {
        includeLowercase: lowercaseCheckbox.checked,
        includeUppercase: uppercaseCheckbox.checked,
        includeNumbers: numbersCheckbox.checked,
        includeSpecialChars: symbolsCheckbox.checked,
    };

    generatePassword(passwordLength, options);
});

function generatePassword(length, options) {
    let charset = "";

    if (options.includeLowercase) {
        charset += "abcdefghijklmnopqrstuvwxyz";
    }

    if (options.includeUppercase) {
        charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    if (options.includeNumbers) {
        charset += "0123456789";
    }

    if (options.includeSpecialChars) {
        charset += "!@#$%^&*()_-+=<>?";
    }
    if (
        !options.includeLowercase &&
        !options.includeUppercase &&
        !options.includeNumbers &&
        !options.includeSpecialChars
    ) {
        generatedPassword.value = "No options selected";
        generatedPassword.style.color = "#F64A4A"
    } else {
        const charsetLength = charset.length;
        let password = "";

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charsetLength);
            password += charset[randomIndex];
        }
        generatedPassword.style.color = "#E6E5EA"
        generatedPassword.value = password;
    }
}

// Copy the generated Password.
copyImage.addEventListener("click", function () {
    copyImage.style.display = "none"
    generatedPassword.select();
    generatedPassword.setSelectionRange(0, 99999);
    document.execCommand("copy");

    copyText.style.display = "block";
    setTimeout(function () {
        copyImage.style.display = "block"
        copyText.style.display = "none";
        window.getSelection().removeAllRanges();
    }, 500);
});