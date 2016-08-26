const mongodb = require('mongodb');
// Connection URL
const MongoClient = mongodb.MongoClient;

/**
 * Create a user
 * @function
 * @param {object}
 * The user object
 * @param {function}
 * Callback function with err, result
*/
exports.create = (user, callback) => {
  // Use connect method to connect to the DB Server
  MongoClient.connect(process.env.MONGODB_URI, (err, db) => {
    // Get the documents collection
    const collection = db.collection('users');
    // Find some documents
    collection.insertOne(user, (createErr, createResult) => {
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
 * An object that contains all props to find a user
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
    const collection = db.collection('users');
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
 * update a user
 * @function
 * @param {object}
 * The user object
 * @param {function}
 * Callback function with err, result
*/
exports.update = (query, updateInfo, callback) => {
  // Use connect method to connect to the DB Server
  MongoClient.connect(process.env.MONGODB_URI, (err, db) => {
    // Get the documents collection
    const collection = db.collection('users');
    // update user
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
 * destroy a user
 * @function
 * @param {object}
 * The user object
 * @param {function}
 * Callback function with err, result
*/
exports.destroy = (user, callback) => {
  // Use connect method to connect to the DB Server
  MongoClient.connect(process.env.MONGODB_URI, (err, db) => {
    // Get the documents collection
    const collection = db.collection('users');
    // Find some documents
    collection.remove(user, (removeErr, removeResult) => {
      // Parsing mongoDoc
      callback(removeErr, removeResult);
      // Close connection
      db.close();
    });
  });
};
