var educationList = [];
var workExperienceList = [];
var skillsList = [];
document.addEventListener('DOMContentLoaded', function () {
    var addEducationButton = document.getElementById('add-education');
    var addWorkExperienceButton = document.getElementById('add-work-experience');
    var addSkillButton = document.getElementById('add-skill');
    var submitButton = document.getElementById('submit');
    addEducationButton.addEventListener('click', function () { return addFormSection('education-list', 'education-item'); });
    addWorkExperienceButton.addEventListener('click', function () { return addFormSection('work-experience-list', 'work-experience-item'); });
    addSkillButton.addEventListener('click', function () { return addFormSection('skills-list', 'skill-item'); });
    submitButton.addEventListener('click', function () { return generateResume(); });
});
function addFormSection(containerId, itemClass) {
    var container = document.getElementById(containerId);
    var item = document.createElement('div');
    item.className = itemClass;
    switch (itemClass) {
        case 'education-item':
            item.innerHTML = "\n                <input type=\"text\" placeholder=\"Institution\" class=\"education-institution\">\n                <input type=\"text\" placeholder=\"Degree\" class=\"education-degree\">\n                <input type=\"text\" placeholder=\"Start Date\" class=\"education-start-date\">\n                <input type=\"text\" placeholder=\"End Date\" class=\"education-end-date\">\n            ";
            break;
        case 'work-experience-item':
            item.innerHTML = "\n                <input type=\"text\" placeholder=\"Company\" class=\"work-company\">\n                <input type=\"text\" placeholder=\"Position\" class=\"work-position\">\n                <input type=\"text\" placeholder=\"Start Date\" class=\"work-start-date\">\n                <input type=\"text\" placeholder=\"End Date\" class=\"work-end-date\">\n                <textarea placeholder=\"Description\" class=\"work-description\"></textarea>\n            ";
            break;
        case 'skill-item':
            item.innerHTML = "\n                <input type=\"text\" placeholder=\"Skill Name\" class=\"skill-name\">\n                <input type=\"text\" placeholder=\"Skill Level\" class=\"skill-level\">\n            ";
            break;
    }
    container.appendChild(item);
}
function generateResume() {
    var contactInfo = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
    };
    educationList.length = 0;
    document.querySelectorAll('.education-item').forEach(function (item) {
        var edu = {
            institution: item.querySelector('.education-institution').value,
            degree: item.querySelector('.education-degree').value,
            startDate: item.querySelector('.education-start-date').value,
            endDate: item.querySelector('.education-end-date').value,
        };
        educationList.push(edu);
    });
    workExperienceList.length = 0;
    document.querySelectorAll('.work-experience-item').forEach(function (item) {
        var exp = {
            company: item.querySelector('.work-company').value,
            position: item.querySelector('.work-position').value,
            startDate: item.querySelector('.work-start-date').value,
            endDate: item.querySelector('.work-end-date').value,
            description: item.querySelector('.work-description').value,
        };
        workExperienceList.push(exp);
    });
    skillsList.length = 0;
    document.querySelectorAll('.skill-item').forEach(function (item) {
        var skill = {
            name: item.querySelector('.skill-name').value,
            level: item.querySelector('.skill-level').value,
        };
        skillsList.push(skill);
    });
    var resumeOutput = document.getElementById('resume-output');
    resumeOutput.innerHTML = "\n        <h2>Resume</h2>\n        <h3>Contact Information</h3>\n        <p>Name: ".concat(contactInfo.name, "</p>\n        <p>Email: ").concat(contactInfo.email, "</p>\n        <p>Phone: ").concat(contactInfo.phone, "</p>\n        <p>Address: ").concat(contactInfo.address, "</p>\n\n        <h3>Education</h3>\n        ").concat(educationList.map(function (edu) { return "\n            <p>".concat(edu.institution, " - ").concat(edu.degree, " (").concat(edu.startDate, " to ").concat(edu.endDate, ")</p>\n        "); }).join(''), "\n\n        <h3>Work Experience</h3>\n        ").concat(workExperienceList.map(function (exp) { return "\n            <p>".concat(exp.company, " - ").concat(exp.position, " (").concat(exp.startDate, " to ").concat(exp.endDate, ")</p>\n            <p>").concat(exp.description, "</p>\n        "); }).join(''), "\n\n        <h3>Skills</h3>\n        ").concat(skillsList.map(function (skill) { return "\n            <p>".concat(skill.name, ": ").concat(skill.level, "</p>\n        "); }).join(''), "\n    ");
}
