const form = {};
form.validatationForm = document.querySelector("#validatationForm");
form.standard = document.querySelector("#standard")
form.type = document.querySelector("#type");
form.version = document.querySelector("#version");
form.autoDetect = document.querySelector("#autoDetect");
form.message = document.querySelector("#message");


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

form.standard.addEventListener("change", async function() {
    const dbEdiStandard = await axios.get(`/api/edi-standards?name=${this.value}`);
    const dbMessageTypes = await axios.get(`/api/message-types?edi_standard_id=${dbEdiStandard.data[0].id}`);
    updateOptions(form.type, dbMessageTypes.data);
});

form.type.addEventListener("change", async function() {
    const dbMessageType = await axios.get(`/api/message-types?name=${this.value}`);
    const dbMessageVersions = await axios.get(`/api/message-versions?message_type_id=${dbMessageType.data[0].id}`);
    updateOptions(form.version, dbMessageVersions.data);
});

form.validatationForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    try {
        const dbData = await axios.post('/analyze-message', data);
        console.log(dbData);
    } catch (err) {
        console.error("Error: ", err);
    }
});