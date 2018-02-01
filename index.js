const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');
const url = 'mongodb://localhost:27017/confusion';

MongoClient.connect(url, (err, db) => {

    assert.equal(err,null);

    console.log('Connected correctly to server');

    dboper.insertDocument(db, { name: "Vadonut", description: "Test"},
        "dishes")
        .then ((result) => { 
            console.log("Insert Document:\n", result.ops);

            return dboper.findDocuments(db, "dishes");
        })    
        .then((docs) => {
            console.log("Found documents:\n", docs);

            return dboper.updateDocument(db, { name: "Vadonut" }, 
                    { description: "Updated test" }, "dishes");
        })
        .then((result) => {                               
            console.log("Updated document: \n", result.result);

            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Updated documents:\n", docs);

            return db.dropCollection("dishes");
        })
        .then((result) => {    
            console.log("Dropped collection: ", result);

            return db.close();
        })
        .catch((err)=> console.log(err));                    
    });