const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectId

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'blog';

function Article(username, title, content) {
    this.username = username
    this.title = title;
    this.content = content;
}

function createTime() {
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
    return time
}

module.exports = Article;

Article.getById = function (id) {
    return new Promise((resolve, reject) => {
        // 在数据库中查找
        MongoClient.connect(url, function (err, client) {
            assert.strictEqual(null, err);
            console.log("Connected correctly to server");

            const db = client.db(dbName);

            const collection = db.collection('posts');
            console.log(id, 'id')
            // Find some documents
            if (!id) {
                collection.find().toArray(function (err, docs) {
                    assert.strictEqual(err, null);
                    if (err) {
                        reject(err)
                    } else {
                        resolve(docs)
                    }
                });
            } else {
                collection.findOne({ '_id': ObjectId(id) }, function (err, docs) {
                    assert.strictEqual(err, null);
                    if (err) {
                        reject(err)
                    } else {
                        resolve(docs)
                    }
                });
            }
        });
    })
}

Article.getByName = function (username) {
    return new Promise((resolve, reject) => {
        // 在数据库中查找
        MongoClient.connect(url, function (err, client) {
            assert.strictEqual(null, err);
            console.log("Connected correctly to server");

            const db = client.db(dbName);

            const collection = db.collection('posts');
            // Find some documents
            if (!username) {
                collection.find().toArray(function (err, docs) {
                    assert.strictEqual(err, null);
                    if (err) {
                        reject(err)
                    } else {
                        resolve(docs)
                    }
                });
            } else {
                collection.find({ 'username': username }).toArray(function (err, docs) {
                    assert.strictEqual(err, null);
                    if (err) {
                        reject(err)
                    } else {
                        resolve(docs)
                    }
                });
            }
        });
    })
}

Article.modify = function (id, temp) {
    return new Promise((resolve, reject) => {
        // 在数据库中查找
        MongoClient.connect(url, function (err, client) {
            assert.strictEqual(null, err);
            console.log("Connected correctly to server");

            const db = client.db(dbName);

            const collection = db.collection('posts');
            let time = createTime()
            collection.updateOne({ '_id': ObjectId(id) }, {
                $set: { title: temp.title, content: temp.content, time: time }
            }, function (err, result) {
                assert.strictEqual(err, null);
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            });
        });
    })
}

Article.prototype.save = function () {
    let time = createTime();
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