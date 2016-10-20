const mongodb = require('mongodb');
// Connection URL
const mongoUrl = process.env.MONGODB_URI;
const MongoClient = mongodb.MongoClient;

/**
 * Create an article
 * @function
 * @param {object}
 * The user article
 * @param {function}
 * Callback function with err, result
*/
exports.create = (article, callback) => {
  // Use connect method to connect to the DB Server
  MongoClient.connect(mongoUrl, (err, db) => {
    // Get the documents collection
    const collection = db.collection('menu');
    // Find some documents
    collection.insertOne(article, (createErr, createResult) => {
      // Parsing mongoDoc
      callback(createErr, createResult);
      // Close connection
      db.close();
    });
  });
};

/**
 * @function find
 * @param query
 * An
 * @param callback
 * Callback function
 * @example
 * .find({
 *   userName: 'Will Smith',
 * }, (err, docs);
 */
 exports.find = (query, callback) => {
   // Use connect method to connect to the DB Server
   MongoClient.connect(process.env.MONGODB_URI, (err, db) => {
     // Get the documents collection
     const collection = db.collection('menu');
     // Find some documents
     collection.find(query).toArray((findErr, accountInfo) => {
       // Parsing mongoDoc
       callback(findErr, accountInfo);
       // Close connection
       db.close();
     });
   });
 };

/**
 * update an item
 * @function
 * @param {object}
 * The user object
 * @param {function}
 * Callback function with err, result
*/
exports.update = (query, updateInfo, callback) => {
  // Use connect method to connect to the DB Server
  MongoClient.connect(mongoUrl, (err, db) => {
    // Get the documents collection
    const collection = db.collection('menu');
    collection.update(query, {
      $set: updateInfo,
      $currentDate: { lastModified: true },
    }, (updateErr, updateResult) => {
      callback(updateErr, updateResult);
      // Close connection
      db.close();
    });
  });
};

/**
 * destroy a menu
 * @function
 * @param {object}
 * The menu object
 * @param {function}
 * Callback function with err, result
*/
exports.destroy = (item, callback) => {
  // Use connect method to connect to the DB Server
  MongoClient.connect(mongoUrl, (err, db) => {
    // Get the documents collection
    const collection = db.collection('menu');
    // Find some documents
    collection.remove(item, (removeErr, removeResult) => {
      // Parsing mongoDoc
      callback(removeErr, removeResult);
      // Close connection
      db.close();
    });
  });
};
