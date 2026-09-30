document.getElementById("complaintForm").addEventListener("submit", (event) => {


const value = (id) => document.getElementById(id).value.trim();


document.querySelectorAll(".error").forEach(error => {
error.textContent = "";
});

let hasError = false;


if (!value("fullName")) {
document.getElementById("fullNameError").textContent =
"Full name is required.";
hasError = true;
}
if (!value("email")) {
document.getElementById("emailError").textContent =
"Email is required.";
hasError = true;
}



if (!value("phone")) {
    document.getElementById("phoneError").textContent =
        "Phone number is required.";
    hasError = true;
} else if (!/^\d{1,10}$/.test(value("phone"))) {
    document.getElementById("phoneError").textContent =
        "Phone number must contain only digits and cannot be more than 10 digits.";
    hasError = true;
}

if (!value("vehicleMake")) {
document.getElementById("vehicleMakeError").textContent =
"Vehicle make is required.";
hasError = true;
}

if (!value("vehicleModel")) {
document.getElementById("vehicleModelError").textContent =
"Vehicle model is required.";
hasError = true;
}
if (!value("vin")) {
document.getElementById("vinError").textContent =
"VIN is required.";
hasError = true;
} else if (!/^[A-Za-z0-9]{17}$/.test(value("vin"))) {
document.getElementById("vinError").textContent =
"VIN must be exactly 17 letters and numbers.";
hasError = true;
}

if (!value("subject")) {
document.getElementById("subjectError").textContent =
"Subject is required.";
hasError = true;
}
if (!value("description").trim()) {

    document.getElementById("descriptionError").textContent =
        "Description is required.";

    hasError = true;

} else if (value("description").trim().length < 20) {

    document.getElementById("descriptionError").textContent =
        "Description must be at least 20 characters.";

    hasError = true;

}

if (!value("image")) {

    document.getElementById("imageError").textContent =
        "Image is required.";

    hasError = true;

}

if (hasError) {
event.preventDefault();
}
});