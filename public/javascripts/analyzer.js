const form = {};
form.validatationForm = document.querySelector("#validatationForm");
form.standard = document.querySelector("#standard")
form.type = document.querySelector("#type");
form.version = document.querySelector("#version");
form.autoDetectBtn = document.querySelector("#autoDetect");
form.message = document.querySelector("#message");
form.clearBtn = document.querySelector("#clearMessage");
form.submit = document.querySelector("#submit");

const modal = {}
modal.itself = document.querySelector("#analyzerModal");
modal.title = document.querySelector("#analyzerModal .modal-title");
modal.body = document.querySelector("#analyzerModal .modal-body>p");

const resultsSection = document.querySelector("#results");

let analyzerOptions;

window.addEventListener("load", async event => {
    const axiosResponse = await axios.get("/analyzer-options");
    analyzerOptions = axiosResponse.data;
}) 

const createNewOption = function(text, value, hidden = false) {
    const newOption = document.createElement("option");
    newOption.innerText = text;
    newOption.setAttribute("value", value);
    if (hidden) {
        newOption.setAttribute("disabled", true);
        newOption.setAttribute("selected", true);
        newOption.classList.add("option-hidden");
    }
    return newOption;
}

const updateOptions = function(selectElement, newOptions) {
    selectElement.replaceChildren();
    selectElement.appendChild(createNewOption("", "", true));
    for (let newOption of newOptions) {
        selectElement.appendChild(createNewOption(
            newOption.name,
            newOption.name
        ));
    }
}

const checkFormRequirements = function() {
    if (!form.standard.value || !form.type.value || !form.version.value || !form.message.value){
        form.submit.setAttribute("disabled", true);
    } else {
        form.submit.removeAttribute("disabled");
    }
}

const updateAndShowModal = function(results) {
    modal.itself.innerHTML = results;
    const bsModal = new bootstrap.Modal(modal.itself);
    bsModal.show();
}

const updateResults = async function(results) {
    let paragraph = resultsSection.lastElementChild;
    while (paragraph) {
        resultsSection.removeChild(paragraph);
        paragraph = resultsSection.lastElementChild;
    }
    resultsSection.innerHTML = results;
    resultsSection.classList.remove("d-none");
    resultsSection.classList.add("d-block");
    await enablePopovers();
}

const enablePopovers = async function() {
    const popoverTriggerList = document.querySelectorAll("[data-bs-toggle='popover']");
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl, { html: true }));
    const popover = new bootstrap.Popover(".popover-dismiss", { trigger: "focus" });
}

form.standard.addEventListener("change", async function() {
    const standard = analyzerOptions.standards.find(standard => standard.name === this.value);
    const types = analyzerOptions.types.filter(type => type.edi_standard_id === standard.id);
    updateOptions(form.type, types);
    updateOptions(form.version, []);
    checkFormRequirements();
});

form.type.addEventListener("change", async function() {
    const type = analyzerOptions.types.find(type => type.name === this.value);
    const versions = analyzerOptions.versions.filter(version => version.message_type_id === type.id);
    updateOptions(form.version, versions);
    checkFormRequirements();
});

form.version.addEventListener("change", function() {
    checkFormRequirements();
});

form.message.addEventListener("input", function() {
    checkFormRequirements();
    if (!form.message.value) {
        form.clearBtn.setAttribute("disabled", true);
    } else {
        form.clearBtn.removeAttribute("disabled");
    }
});

form.clearBtn.addEventListener("click", function() {
    form.message.value = "";
    form.clearBtn.setAttribute("disabled", true);    
});

let results;
form.validatationForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    const formData = new FormData(form.validatationForm);
    const requestData = Object.fromEntries(formData.entries());
    try {
        await axios.post('/analyze-message', requestData)
            .then(async function(response) {
                await updateResults(response.data);
            })
            .catch(err => {
                if (err.response && err.response.status === 400) {
                    updateAndShowModal(err.response.data);
                }
            });
    } catch (err) {
        console.error("Error getting server data: ", err);
    }
});

