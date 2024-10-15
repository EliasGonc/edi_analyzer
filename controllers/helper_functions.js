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

const validateRequestAttribute = function(requestData, fields) {
    let errorString = "";
    for (let field of fields) {
        if (!requestData[field]) {
            errorString += `${field}; `;
        }
    }
    if (errorString) {
        throw new Error("Missing IDs: " + errorString);
    }
}

const createWhereClause = function(requestData, fields) {
    const whereClause = {};
    for (let field of fields) {
        const requestFieldValue = requestData[field];
        if (requestFieldValue) { 
            whereClause[field] = requestFieldValue;
        }
    }
    return whereClause;
}

module.exports = { compareTwoArrays, validateRequestAttribute, createWhereClause };