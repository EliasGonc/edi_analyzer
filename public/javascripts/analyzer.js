const formEdiStandard = document.querySelector("#standard");
const formMessageType = document.querySelector("#type");
const formMessageVersion = document.querySelector("#version");

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

formEdiStandard.addEventListener("change", async function() {
    const dbEdiStandard = await axios.get(`/api/edi-standards?name=${this.value}`);
    const dbMessageTypes = await axios.get(`/api/message-types?edi_standard_id=${dbEdiStandard.data[0].id}`);
    updateOptions(formMessageType, dbMessageTypes.data);
});

formMessageType.addEventListener("change", async function() {
    const dbMessageType = await axios.get(`/api/message-types?name=${this.value}`);
    console.log(dbMessageType.data);
    const dbMessageVersions = await axios.get(`/api/message-versions?message_type_id=${dbMessageType.data[0].id}`);
    updateOptions(formMessageVersion, dbMessageVersions.data);
});