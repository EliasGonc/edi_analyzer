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

let dbData;

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

const updateOptions = function(selectElement, dbNewOptions) {
    selectElement.replaceChildren();
    selectElement.appendChild(createNewOption("", "", true));
    for (let dbNewOption of dbNewOptions) {
        selectElement.appendChild(createNewOption(
            dbNewOption.name,
            dbNewOption.name
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
    console.log(ediStandards);
    // const dbEdiStandard = await axios.get(`/api/edi-standards?name=${this.value}`);
    // const ediStandardData = ediStandards.find(standard => standard.name === this.value);
    // const dbMessageTypes = await axios.get(`/api/message-types?edi_standard_id=${dbEdiStandard.data[0].id}`);
    // updateOptions(form.type, dbMessageTypes.data);
    // updateOptions(form.version, []);
    // checkFormRequirements();
});

form.type.addEventListener("change", async function() {
    const dbMessageType = await axios.get(`/api/message-types?name=${this.value}`);
    const dbMessageVersions = await axios.get(`/api/message-versions?message_type_id=${dbMessageType.data[0].id}`);
    updateOptions(form.version, dbMessageVersions.data);
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

