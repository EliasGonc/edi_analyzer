const errorMessages = [
    {
        type: "format",
        title: "Invalid format",
        message: "The message does not follow the [?1] [?2] [?3] format. Please select the EDI standard, message type and message version that matches the layout of your message."
    },
    {
        type: "format",
        title: "Unknown segment",
        message: "The message has an unknown segment ([?1])."
    }
]

module.exports = errorMessages;