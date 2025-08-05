const main = document.querySelector(".resume-builder");
const outputContainer = document.querySelector(".output_container");
let isHidden = true;

function hide() {
    if ( isHidden) {

        main.style.display = "none";
        isHidden = false;

        const inputFields = {
            name: document.querySelector('input[name="name"]'),
            title: document.querySelector('input[name="title"]'),
            objective: document.querySelector('textarea[name="objective"]'),
            skills: document.querySelector('textarea[name="skills"]'),
            academic_details: document.querySelector('textarea[name="academic_details"]'),
            contact: document.querySelector('textarea[name="contact"]'),
            work_experience: document.querySelector('textarea[name="work_experience"]'),
            projects: document.querySelector('textarea[name="projects"]'),
            achievements: document.querySelector('textarea[name="achievements"]')
        };

        outputContainer.style.display = "block";
        outputContainer.innerHTML = `
        <div class="output">
            <div class="heading">
                <h1>${inputFields.name ? inputFields.name.value : 'Name not provided'}</h1>
                <h4>${inputFields.title ? inputFields.title.value : 'Title not provided'}</h4>
            </div>
            <div class="info">
                <div class="left">
                    <div class="box">
                    <h2>Objective</h2>
                    <p>${inputFields.objective ? inputFields.objective.value : 'Objective not provided'}</p>
                </div>
                <div class="box">
                    <h2>Skills</h2>
                    <p>${inputFields.skills ? inputFields.skills.value : 'Skills not provided'}</p>
                </div>
                <div class="box">
                    <h2>Academic Details</h2>
                    <p>${inputFields.academic_details ? inputFields.academic_details.value : 'Academic Details not provided'}</p>
                </div>
                <div class="box">
                    <h2>Contact</h2>
                    <p>${inputFields.contact ? inputFields.contact.value : 'Contact not provided'}</p>
                </div>
            </div>
            <div class="right">
                <div class="box">
                    <h2>Work Experience</h2>
                    <p>${inputFields.work_experience ? inputFields.work_experience.value : 'Work Experience not provided'}</p>
                </div>
                <div class="box">
                    <h2>Projects</h2>
                    <p>${inputFields.projects ? inputFields.projects.value : 'Projects not provided'}</p>
                </div>
                <div class="box">
                    <h2>Achievements</h2>
                    <p>${inputFields.achievements ? inputFields.achievements.value : 'Achievements not provided'}</p>
                </div>
            </div>
        </div>
    </div>
    <button onClick="print()">Print Resume</button>`;
    }else {
        main.style.display = "block";
        isHidden = true;

        outputContainer.style.display = "none";
        outputContainer.innerHTML = "";
    }
}