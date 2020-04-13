const MongoClient = require('mongodb').MongoClient
const dbname = "myappdb";
const defaultMongoUrl = `mongodb://mongo:mongo@mongodb:27017/?authSource=${dbname}`;
const MONGO_URL = process.env.MONGO_URL || defaultMongoUrl;
console.log(`connecting to mongo with MONGO_URL ${MONGO_URL}`);
const url = MONGO_URL;
const getDb = async () => {
    const client = await MongoClient.connect(
        url,
        {  poolSize: 20, useNewUrlParser: true }
    );

    console.log('Connected to mongo');

    // return handle to database
    let result = client.db(dbname);
    //result.listCollections((c)=>true).then((it)=>{})
    return result;
};

const dbFind = async (collname, query) => {
    let db, client;
    try {
        client = await MongoClient.connect(url, { useNewUrlParser: true  });
        db = client.db(dbname);
        return await db.collection(collname).find(query).toArray();
    } finally {
        client && client.close();
    }
};

const dbStore = async (collname, items) => {
    let db, client;
    try {
        client = await MongoClient.connect(url, { useNewUrlParser: true });
        db = client.db(dbname);
        return await db.collection(collname).insertMany(items);
    } finally {
        client && client.close();
    }
};

const dbRemove = async (collname, items) => {
    let db, client;
    try {
        client = await MongoClient.connect(url, { useNewUrlParser: true });
        db = client.db(dbname);
        return await db.collection(collname).removeMany(collname, items);
    } finally {
        client && client.close();
    }
};


//
// MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
//
//     if (err) throw err;
//
//     const db = client.db(dbname);
//
//     db.listCollections().toArray().then((docs) => {
//
//         console.log('Available collections:');
//         docs.forEach((doc, idx, array) => { console.log(doc.name) });
//
//     }).catch((err) => {
//
//         console.log(err);
//     }).finally(() => {
//
//         client.close();
//     });
// });
//
//
// (async () => {
//     let client = await MongoClient.connect(url,
//         { useNewUrlParser: true });
//
//     let db = client.db(dbname);
//     try {
//         const res = await db.collection("coll1").updateOne({
//             "someKey": someValue
//         }, { $set: someObj }, { upsert: true });
//
//         console.log(`res => ${JSON.stringify(res)}`);
//     }
//     finally {
//         client.close();
//     }
// })()
//     .catch(err => console.error(err));
//
//
// const openDb = () =>
//     MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
//
//         if (err) throw err;
//
//         db = client.db(dbname);
//     });

module.exports = {getDb:getDb, dbFind:dbFind, dbStore: dbStore, dbRemove:dbRemove}
