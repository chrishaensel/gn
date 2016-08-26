const expect = require('chai').expect;
const userAccount = require('../models/account');
// Dot Env File Loader
if (!process.env.PORT) {
  require('dotenv').load();
}

describe('Account Tests', () => {
  it('Create a new user', (done) => {
    userAccount.create({
      email: 'tester@testsuit.test',
      password: 'testing101',
      name: 'Tester Quiz',
      phone: 6060606060,
    }, (createErr, doc) => {
      expect(doc).not.to.be.null;
      userAccount.find({ email: 'tester@testsuit.test' }, (err, targetDoc) => {
        expect(targetDoc).not.to.be.null;
        done();
      });
    });
  });

  it('FIND ALL users', (done) => {
    userAccount.find({}, (err, targetDoc) => {
      expect(targetDoc.length).not.to.be.empty;
      done();
    });
  });

  it('REMOVE an existing user', (done) => {
    userAccount.create({
      email: 'bbergh@fullsail.edu',
      password: 'bb',
      name: 'Brandy Bergh',
      phone: 8918223211,
    }, (createErr, doc) => {
      expect(doc).not.to.be.null;
      userAccount.destroy({ email: 'bbergh@fullsail.edu' }, () => {
        userAccount.find({ email: 'bbergh@fullsail.edu' }, (err, targetDoc) => {
          expect(targetDoc).to.be.empty;
          done();
        });
      });
    });
  });
  // remove all test from db
  it('REMOVE all test users', (done) => {
    userAccount.destroy({ email: 'tester@testsuit.test' }, () => {
      userAccount.find({ email: 'tester@testsuit.test' }, (err, targetTest) => {
        expect(targetTest).to.be.empty;
        done();
      });
    });
  });
});
