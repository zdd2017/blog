var mongodb = require('./db');
var db = require('./db');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'blog';

function User(user) {
    this.name = user.name;
    this.pass = user.pass;
    // this.email = user.email;
};

module.exports = User;

//存储用户信息
User.prototype.save = function (callback) {
    //要存入数据库的用户文档
    let user = {
        name: this.name,
        pass: this.pass,
        // email: this.email
    };
    const insertDocuments = function (db, callback) {
        // Get the documents collection
        const collection = db.collection('documents');
        // Insert some documents
        collection.insertMany([
            user
        ], function (err, result) {
            assert.strictEqual(err, null);
            assert.strictEqual(1, result.result.n);
            assert.strictEqual(1, result.ops.length);
            console.log("Inserted 1 documents into the collection");
            console.log(result, 'result1')
            callback(err, result);
        });
    }

    // Use connect method to connect to the server
    MongoClient.connect(url, function (err, client) {
        assert.strictEqual(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        insertDocuments(db, function () {
            client.close();
        });
    });
};

//读取用户信息
// 将回调函数改成promise形式
User.get = function (name) {
    return new Promise((resolve, reject) => {
        // Use connect method to connect to the server
        MongoClient.connect(url, function (err, client) {
            assert.strictEqual(null, err);
            console.log("Connected correctly to server");

            const db = client.db(dbName);

            const collection = db.collection('documents');
            // Find some documents
            collection.find({ 'name': name }).toArray(function (err, docs) {
                assert.strictEqual(err, null);
                if (err) {
                    reject(err)
                } else {
                    resolve(docs)
                    // callback(err, docs);
                }
            });
        });
    })

};