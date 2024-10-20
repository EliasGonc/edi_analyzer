const segmentSeeds = [
    {
        code: "ITP",
        message_version_id: 1,
        name: "Start of transmission process",
        usage: "mandatory",
        min_repetitions: 1,
        max_repetitions: 1,
        segment_length: 128,
        parent_segment_id: null
    },
    {
        code: "PE1",
        message_version_id: 1,
        name: "Item data",
        usage: "mandatory",
        min_repetitions: 1,
        max_repetitions: null,
        segment_length: 128,
        parent_segment_id: 1
    },
    {
        code: "PE2",
        message_version_id: 1,
        name: "Delivery/shipment information",
        usage: "mandatory",
        min_repetitions: 1,
        max_repetitions: 1,
        segment_length: 128,
        parent_segment_id: 2
    },
    {
        code: "PE9",
        message_version_id: 1,
        name: "",
        usage: "optional",
        min_repetitions: 1,
        max_repetitions: null,
        segment_length: 128,
        parent_segment_id: 2
    },
    {
        code: "PE3",
        message_version_id: 1,
        name: "Delivery/shipment schedule",
        usage: "optional",
        min_repetitions: 1,
        max_repetitions: null,
        segment_length: 128,
        parent_segment_id: 2
    },
    {
        code: "PE5",
        message_version_id: 1,
        name: "Delivery/shipment schedule additional info",
        usage: "optional",
        min_repetitions: 1,
        max_repetitions: null,
        segment_length: 128,
        parent_segment_id: 5
    },
    {
        code: "PE6",
        message_version_id: 1,
        name: "Item additional info",
        usage: "optional",
        min_repetitions: 1,
        max_repetitions: null,
        segment_length: 128,
        parent_segment_id: 2
    },
    {
        code: "PE7",
        message_version_id: 1,
        name: "Customer primary package data",
        usage: "optional",
        min_repetitions: 1,
        max_repetitions: 1,
        segment_length: 128,
        parent_segment_id: 2
    },
    {
        code: "PE8",
        message_version_id: 1,
        name: "Customer secondary package data",
        usage: "optional",
        min_repetitions: 1,
        max_repetitions: 1,
        segment_length: 128,
        parent_segment_id: 2
    },
    {
        code: "PE4",
        message_version_id: 1,
        name: "Package data",
        usage: "optional",
        min_repetitions: 1,
        max_repetitions: 1,
        segment_length: 128,
        parent_segment_id: 2
    },
    {
        code: "TE1",
        message_version_id: 1,
        name: "Free text",
        usage: "optional",
        min_repetitions: 1,
        max_repetitions: 1,
        segment_length: 128,
        parent_segment_id: 2
    },
    {
        code: "FTP",
        message_version_id: 1,
        name: "End of transmission process",
        usage: "mandatory",
        min_repetitions: 1,
        max_repetitions: 1,
        segment_length: 128,
        parent_segment_id: 1
    }
];
module.exports = segmentSeeds;
