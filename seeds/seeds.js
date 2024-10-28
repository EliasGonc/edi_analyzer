const sequelize = require("../db/connect");
const {
        EdiStandard, MessageType, MessageVersion, EdiMessage, Segment, DataElement,
        MessageContent, SegmentContent
    } = require("../models/associations.js");
const { dropTable, seedTable } = require("../db/helper_functions.js");
const ediStandardSeeds = require("./edi_standard_seeds");
const messageTypeSeeds = require("./message_type_seeds");
const messageVersionSeeds = require("./message_version_seeds");
const ediMessageSeeds = require("./edi_message_seeds");
const segmentSeeds = require("./segment_seeds");
const dataElementSeeds = require("./data_elements_seeds");
const messageContentSeeds = require("./message_contents_seeds.js");
const segmentContentSeeds = require("./segment_contents.seeds.js");

async function dropAllTables() {
    try {
        await dropTable(SegmentContent);
        await dropTable(MessageContent);
        await dropTable(EdiMessage);
        await dropTable(MessageVersion);
        await dropTable(MessageType);
        await dropTable(EdiStandard);
        await dropTable(Segment);
        await dropTable(DataElement);
    } catch (err) {
        console.error("Error when dropping the app tables");
    }
}

async function seedSegmentContent() {
    const data = [];
    for (let seedSegment of segmentContentSeeds) {
        const segment = await Segment.findOne({
            include: {
                model: MessageVersion,
                where: { name: seedSegment.version }
            },
            where: { code: seedSegment.segment }   
        });
        for (let i = 0; i < seedSegment.data_elements.length; i++) {
            const seedDataElement = seedSegment.data_elements[i];
            const dataElement = await DataElement.findOne({ where: { code: seedDataElement }});
            data.push({
                segment_id: segment.id,
                data_element_id: dataElement.id,
                position: i + 1,
                usage: "mandatory"
            });
        }
    }
    seedTable(SegmentContent, data);
}

async function seedAllAppTables() {
    try {
        await seedTable(EdiStandard, ediStandardSeeds);
        await seedTable(MessageType, messageTypeSeeds);
        await seedTable(MessageVersion, messageVersionSeeds);
        await seedTable(EdiMessage, ediMessageSeeds);
        await seedTable(Segment, segmentSeeds);
        await seedTable(DataElement, dataElementSeeds);
        await seedTable(MessageContent, messageContentSeeds);
        await seedSegmentContent();
    } catch (err) {
        console.error("Error seeding one of the app tables: ", err);
    }
}

sequelize.sync()
    .then(async () => {
        await dropAllTables()
        console.log("All tables have been dropped.");
        await seedAllAppTables();
        console.log("All tables have been created and seeded.");
    })
    .catch(err => {
        console.error("Error syncing database", err);
    });
