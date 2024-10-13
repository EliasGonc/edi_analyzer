exports.createWhereClause = function(requestData, fields) {

    const whereClause = {};
    for (let field of fields) {
        const requestFieldValue = requestData[field];
        if (requestFieldValue) { 
            whereClause[field] = requestFieldValue;
        }
    }
    return whereClause;
}
