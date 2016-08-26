module.exports = (app) => {
  const handyUtils = require('handyutils');
  /*
  LANDING PAGE
  */
  app.get('/', (req, res) => {
      const dataForView = { title: 'Home', message: req.flash() };
      res.render('home', dataForView);
  });
};
