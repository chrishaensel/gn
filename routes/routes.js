module.exports = (app, publicKey, privateKey) => {
  // Route nomenclature as follows page/model/verb/target
  // example dashboard/account/tutoreligibility
  /* Auth */
  require('./auth')(app, privateKey, publicKey);
  /* Home */
  require('./landing')(app);
  /* Story */
  require('./story')(app);
  /* restaurant */
  require('./restaurant')(app);
  /* Menu */
  require('./menu')(app);
  /* Contact */
  require('./contact')(app);

};
