const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'blog';

function Article(username, title, content) {
    this.username = username
    this.title = title;
    this.content = content;
}

module.exports = Article;

Article.get = function () {
    return new Promise((resolve, reject) => {
        // 在数据库中查找
        MongoClient.connect(url, function (err, client) {
            assert.strictEqual(null, err);
            console.log("Connected correctly to server");

            const db = client.db(dbName);

            const collection = db.collection('posts');
            // Find some documents
            collection.find().toArray(function (err, docs) {
                assert.strictEqual(err, null);
                if (err) {
                    reject(err)
                } else {
                    resolve(docs)
                }
            });
        });
    })
}

Article.prototype.save = function (username) {
    let date = new Date();
    //存储各种时间格式，方便以后扩展
    let time = {
        date: date,
        year: date.getFullYear(),
        month: date.getFullYear() + "-" + (date.getMonth() + 1),
        day: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
            date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()),
        second: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
            date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ":" +
            (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
    }
    //要存入数据库的用户文档
    let article = {
        username: this.username,
        time: time,
        title: this.title,
        content: this.content
    };
    return new Promise((resolve, reject) => {
        const insertDocuments = function (db) {
            // Get the documents collection
            const collection = db.collection('posts');
            // Insert some documents
            collection.insertMany([
                article
            ], function (err, result) {
                assert.strictEqual(1, result.result.n);
                assert.strictEqual(1, result.ops.length);
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
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
    })
}