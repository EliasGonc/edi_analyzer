const sequelize = require("../db/connect");
const {
    EdiStandard, MessageType, MessageVersion, EdiMessage, Segment, DataElement,
    EdiMessageContent, SegmentContent
} = require("../models/associations.js");
const { dropTable, seedTable } = require("../db/utils.js");
const ediStandardSeeds = require("./edi_standard_seeds");
const messageTypeSeeds = require("./message_type_seeds");
const messageVersionSeeds = require("./message_version_seeds");
const ediMessageSeeds = require("./edi_message_seeds");
const segmentSeeds = require("./segment_seeds");
const dataElementSeeds = require("./data_elements_seeds");
const ediMessageContentSeeds = require("./edi_message_content_seeds.js");
const segmentContentSeeds = require("./segment_content_seeds.js");

async function dropAllTables() {
    try {
        await dropTable(SegmentContent);
        await dropTable(EdiMessageContent);
        await dropTable(EdiMessage);
        await dropTable(MessageVersion);
        await dropTable(MessageType);
        await dropTable(EdiStandard);
        await dropTable(Segment);
        await dropTable(DataElement);
    } catch (err) {
        console.error("Error when dropping the app tables: ", err);
    }
}

async function pushDataElements(data, segment, segmentContentSeed) {
    let remainingCharacters = segment.segment_length - segment.code.length;
    let i;
    for (i = 0; i < segmentContentSeed.data_elements.length; i++) {
        const dataElementSeed = segmentContentSeed.data_elements[i];
        const dataElement = await DataElement.findOne({ where: { code: dataElementSeed }});
        // console.log(`${segment.code} segment: ${remainingCharacters} characteres remaining. Pushing data element "${dataElement.name}" (${dataElement.fixed_length} characters)`);
        data.push({
            segment_id: segment.id,
            data_element_id: dataElement.id,
            position: i + 1
        });
        remainingCharacters -= dataElement.fixed_length;
    }
    // console.log(`${segment.code} segment: ${remainingCharacters} characteres remaining.`);
    return { remainingCharacters, position: i };
}

async function pushBlankElement(data, remainingCharacters, position, segmentId) {
    if (remainingCharacters > 0) {
        const blankDataElement = await DataElement.findOne({ where: { code: "9999" }});
        data.push({
            segment_id: segmentId,
            data_element_id: blankDataElement.id,
            position: position + 1,
            fixed_length: remainingCharacters,
            possible_values: blankDataElement.possible_values
                .replace("REMAINDER", remainingCharacters)
        });
    }
}

async function seedSegmentContent() {
    const data = [];
    for (let segmentContentSeed of segmentContentSeeds) {
        const segment = await Segment.findOne({
            include: {
                model: MessageVersion,
                where: { name: segmentContentSeed.version }
            },
            where: { code: segmentContentSeed.segment }   
        });
        const { remainingCharacters, position } = await pushDataElements(data, segment, segmentContentSeed);
        await pushBlankElement(data, remainingCharacters, position, segment.id);
    }
    await seedTable(SegmentContent, data);
}

async function seedAllAppTables() {
    try {
        await seedTable(EdiStandard, ediStandardSeeds);
        await seedTable(MessageType, messageTypeSeeds);
        await seedTable(MessageVersion, messageVersionSeeds);
        await seedTable(EdiMessage, ediMessageSeeds);
        await seedTable(Segment, segmentSeeds);
        await seedTable(DataElement, dataElementSeeds);
        await seedTable(EdiMessageContent, ediMessageContentSeeds);
        await seedSegmentContent();
    } catch (err) {
        console.error("Error seeding one of the app tables: ", err);
    }
}

sequelize.sync()
    .then(async () => {
        await dropAllTables();
        console.log("All tables have been dropped.");
        await seedAllAppTables();
        console.log("All tables have been created and seeded.");
    })
    .catch(err => {
        console.error("Error syncing database", err);
    });
