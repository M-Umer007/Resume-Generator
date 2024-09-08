// Arrays to store the user's education, work experience, and skills entries.
var educationList = [];
var workExperienceList = [];
var skillsList = [];
// Wait for the DOM to load before running any script so all elements are available.
document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevents the form from submitting in the traditional way
    });
    // Getting references to buttons and adding event listeners to each
    var addEducationButton = document.getElementById('add-education');
    var addWorkExperienceButton = document.getElementById('add-work-experience');
    var addSkillButton = document.getElementById('add-skill');
    var submitButton = document.getElementById('submit');
    // When these buttons are clicked, they call the function to add a form section.
    addEducationButton.addEventListener('click', function () { return addFormSection('education-list', 'education-item'); });
    addWorkExperienceButton.addEventListener('click', function () { return addFormSection('work-experience-list', 'work-experience-item'); });
    addSkillButton.addEventListener('click', function () { return addFormSection('skills-list', 'skill-item'); });
    // Generate the resume when the submit button is clicked.
    submitButton.addEventListener('click', function () { return generateResume(); });
});
// Adds a new form section (either for education, work experience, or skill) based on the clicked button.
function addFormSection(containerId, itemClass) {
    var container = document.getElementById(containerId); // Locate the container element where new items are added
    var item = document.createElement('div'); // Create a new div to hold the input fields
    item.className = itemClass; // Assign the appropriate class to the div (education-item, work-experience-item, or skill-item)
    // Depending on the type of form being added, the content inside the div will change.
    switch (itemClass) {
        case 'education-item':
            // HTML structure for adding new education input fields
            item.innerHTML = "\n                \n\n                <input type=\"text\" placeholder=\"Institution\" class=\"education-institution\">\n                <input type=\"text\" placeholder=\"Degree\" class=\"education-degree\">\n                <input type=\"text\" placeholder=\"Start Date\" class=\"education-start-date\">\n                <input type=\"text\" placeholder=\"End Date\" class=\"education-end-date\">\n            ";
            break;
        case 'work-experience-item':
            // HTML structure for adding work experience input fields
            item.innerHTML = "\n                <input type=\"text\" placeholder=\"Company\" class=\"work-company\">\n                <input type=\"text\" placeholder=\"Position\" class=\"work-position\">\n                <input type=\"text\" placeholder=\"Start Date\" class=\"work-start-date\">\n                <input type=\"text\" placeholder=\"End Date\" class=\"work-end-date\">\n                <textarea placeholder=\"Description\" class=\"work-description\" wrap=\"soft\" ></textarea>\n            ";
            break;
        case 'skill-item':
            // HTML structure for adding new skill input fields
            item.innerHTML = "\n                <input type=\"text\" placeholder=\"Skill Name\" class=\"skill-name\">\n                <input type=\"text\" placeholder=\"Skill Level\" class=\"skill-level\">\n            ";
            break;
    }
    // Add the newly created form section to the container (education-list, work-experience-list, or skills-list)
    container.appendChild(item);
}
// function to check the contact info filling validation
function checkValidation() {
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var phone = document.getElementById('phone').value.trim();
    var address = document.getElementById('address').value.trim();
    var combine = [name, email, phone, address];
    var result = combine.filter(function (combine) { return combine.length > 0; }).length;
    return result == 4;
}
// checks if the email ends with @gmail.com
function emailvalidation() {
    var email = document.getElementById('email').value.trim();
    if (email.slice(-10) !== '@gmail.com') {
        alert("please write correct email");
        return false;
    }
    return true;
}
// Generates the resume from the inputted data and updates the UI accordingly.
function generateResume() {
    //checks if user has filled the contact info
    if (!checkValidation()) {
        alert("please fill the contact information first");
        return;
    }
    if (!emailvalidation()) {
        return; // Stops the function if email is not valid
    }
    // Grabs the contact info from the input fields.
    var contactInfo = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
    };
    // Clears the education list array before adding new data to avoid duplicates.
    educationList.length = 0;
    // Loops through all added education items and collects the values from input fields.
    document.querySelectorAll('.education-item').forEach(function (item) {
        var edu = {
            institution: item.querySelector('.education-institution').value,
            degree: item.querySelector('.education-degree').value,
            startDate: item.querySelector('.education-start-date').value,
            endDate: item.querySelector('.education-end-date').value,
        };
        // Pushes each education entry into the educationList array.
        educationList.push(edu);
    });
    // Same process as above but for work experience data.
    workExperienceList.length = 0;
    document.querySelectorAll('.work-experience-item').forEach(function (item) {
        var exp = {
            company: item.querySelector('.work-company').value,
            position: item.querySelector('.work-position').value,
            startDate: item.querySelector('.work-start-date').value,
            endDate: item.querySelector('.work-end-date').value,
            description: item.querySelector('.work-description').value,
        };
        // Pushes each work experience entry into the workExperienceList array.
        workExperienceList.push(exp);
    });
    // Same process for skills data.
    skillsList.length = 0;
    document.querySelectorAll('.skill-item').forEach(function (item) {
        var skill = {
            name: item.querySelector('.skill-name').value,
            level: item.querySelector('.skill-level').value,
        };
        // Pushes each skill entry into the skillsList array.
        skillsList.push(skill);
    });
    // Select the resume output container in the DOM where the resume will be displayed.
    var resumeOutput = document.getElementById('resume-output');
    // Generate the HTML structure for the resume and inject it into the container.
    resumeOutput.innerHTML = "\n        <h2>Resume</h2>\n        <h3>Contact Information</h3>\n        <p>Name: ".concat(contactInfo.name, "</p>\n        <p>Email: ").concat(contactInfo.email, "</p>\n        <p>Phone: ").concat(contactInfo.phone, "</p>\n        <p>Address: ").concat(contactInfo.address, "</p>\n\n      <h3>Education</h3>\n        ").concat(educationList.map(function (edu) { return "\n    <p>".concat(edu.institution).concat(edu.degree ? " - ".concat(edu.degree) : '', " (").concat(edu.startDate).concat(edu.endDate ? " to ".concat(edu.endDate) : '', ")</p>\n        "); }).join(''), "<!-- Loops through the educationList and displays each entry -->\n\n        <h3>Work Experience</h3>\n        ").concat(workExperienceList.map(function (exp) { return "\n        <p>".concat(exp.company).concat(exp.position ? " - ".concat(exp.position) : '', " (").concat(exp.startDate).concat(exp.endDate ? " to ".concat(exp.endDate) : '', ")</p>\n        <p>").concat(exp.description, "</p>\n        "); }).join(''), "<!-- Loops through the Work Experience and displays each entry -->\n\n        <h3>Skills</h3>\n        ").concat(skillsList.map(function (skill) { return "\n        <p>".concat(skill.name, ": ").concat(skill.level, "</p>\n        "); }).join(''), "<!-- Loops through the Skills and displays each entry -->\n\n    ");
}
