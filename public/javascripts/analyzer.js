const form = {};
form.validatationForm = document.querySelector("#validatationForm");
form.standard = document.querySelector("#standard")
form.type = document.querySelector("#type");
form.version = document.querySelector("#version");
form.autoDetectBtn = document.querySelector("#autoDetect");
form.message = document.querySelector("#message");
form.clearBtn = document.querySelector("#clearMessage");
form.submit = document.querySelector("#submit");

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

const getDbData = async function(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    try {
         const dbData = await axios.post('/analyze-message', data);
         return dbData.data;
    } catch (err) {
        console.error("Error getting database data: ", err);
    }

}

const checkMessageHeader = function(standard, type, version, message) {
    regex = {};
    standard.regex = new RegExp(standard.identifier);
    type.regex = new RegExp(type.identifier);
    version.regex = new RegExp(version.identifier);
    return standard.regex.test(message) && type.regex.test(message) && version.regex.test(message);
}

form.standard.addEventListener("change", async function() {
    const dbEdiStandard = await axios.get(`/api/edi-standards?name=${this.value}`);
    const dbMessageTypes = await axios.get(`/api/message-types?edi_standard_id=${dbEdiStandard.data[0].id}`);
    updateOptions(form.type, dbMessageTypes.data);
    updateOptions(form.version, []);
    checkFormRequirements();
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

form.validatationForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    const dbData = await getDbData(event.target);
    if (!checkMessageHeader(dbData.standard, dbData.type, dbData.version, form.message.value)) {
        
    }
});