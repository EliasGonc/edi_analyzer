const segmentSeeds = [
    {
        code: "ITP",
        name: "Start of transmission process",
        usage: "mandatory",
        min_repetitions: 1,
        max_repetitions: 1,
        segment_length: 128,
        parent_segment_id: null
    },
    {
        code: "PE1",
        name: "Item data",
        usage: "mandatory",
        min_repetitions: 1,
        max_repetitions: null,
        segment_length: 128,
        parent_segment_id: 1
    },
    {
        code: "PE2",
        name: "Delivery/shipment information",
        usage: "mandatory",
        min_repetitions: 1,
        max_repetitions: 1,
        segment_length: 128,
        parent_segment_id: 2
    },
    {
        code: "PE9",
        name: "",
        usage: "optional",
        min_repetitions: 1,
        max_repetitions: null,
        segment_length: 128,
        parent_segment_id: 2
    },
    {
        code: "PE3",
        name: "Delivery/shipment schedule",
        usage: "optional",
        min_repetitions: 1,
        max_repetitions: null,
        segment_length: 128,
        parent_segment_id: 2
    },
    {
        code: "PE5",
        name: "Delivery/shipment schedule additional info",
        usage: "optional",
        min_repetitions: 1,
        max_repetitions: null,
        segment_length: 128,
        parent_segment_id: 5
    },
    {
        code: "PE6",
        name: "Item additional info",
        usage: "optional",
        min_repetitions: 1,
        max_repetitions: null,
        segment_length: 128,
        parent_segment_id: 2
    },
    {
        code: "PE7",
        name: "Customer primary package data",
        usage: "optional",
        min_repetitions: 1,
        max_repetitions: 1,
        segment_length: 128,
        parent_segment_id: 2
    },
    {
        code: "PE8",
        name: "Customer secondary package data",
        usage: "optional",
        min_repetitions: 1,
        max_repetitions: 1,
        segment_length: 128,
        parent_segment_id: 2
    },
    {
        code: "PE4",
        name: "Package data",
        usage: "optional",
        min_repetitions: 1,
        max_repetitions: 1,
        segment_length: 128,
        parent_segment_id: 2
    },
    {
        code: "TE1",
        name: "Free text",
        usage: "optional",
        min_repetitions: 1,
        max_repetitions: 1,
        segment_length: 128,
        parent_segment_id: 2
    },
    {
        code: "FTP",
        name: "End of transmission process",
        usage: "mandatory",
        min_repetitions: 1,
        max_repetitions: 1,
        segment_length: 128,
        parent_segment_id: 1
    }
];
module.exports = { segmentSeeds };
