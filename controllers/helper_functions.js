const compareTwoArrays = function(first, second) {
    if (!first || !second) {
        return false;
    }
    if(first === second) {
        return true;
    }
    if (first.length != second.length) {
        return false;
    }
    for (let i = 0; i < first.length; i++) {
        if (first[i] instanceof Array && second[i] instanceof Array) {
            if (!compareTwoArrays(first[i], second[i])) {
                return false;
            }
        }           
        else if (first[i] != second[i]) { 
            return false;   
        }           
    }       
    return true;
}

const validateRequestAttributes = function(requestData, model) {
    let errorString = "";
    const newData = {};
    const attributesObject = model.getAttributes();
    for (let attribute of Object.keys(attributesObject)) {
        if(attribute !== "id") {
            if (!requestData[attribute] && !attributesObject[attribute].allowNull) {
                errorString += `${attribute}; `;
            } else {
                newData[attribute] = requestData[attribute];
            }
        }
    }
    if (errorString) throw new Error("Missing required attributes: " + errorString);
    return newData;
}

const createWhereClause = function(requestData, model) {
    const whereClause = {};
    for (let attribute of Object.keys(model.getAttributes())) {
        if (attribute !== "id") {
            const requestFieldValue = requestData[attribute];
            if (requestFieldValue) { 
                whereClause[attribute] = requestFieldValue;
            }
        }
    }
    return whereClause;
}

module.exports = { compareTwoArrays, validateRequestAttributes, createWhereClause };