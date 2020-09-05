const multipleMongooseToObj = (arrayOfMongooseDocuments) => {
    const tempArray = [];
    if (arrayOfMongooseDocuments.length !== 0) {
        arrayOfMongooseDocuments.forEach(doc => tempArray.push(doc.toObject()));
    }
    return tempArray;
};

const mongooseToObj = (doc) => { if (doc == null) { return null; } return doc.toObject(); };

module.exports = {
    mongooseToObj,
    multipleMongooseToObj,
};