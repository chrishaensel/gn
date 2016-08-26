module.exports = (app) => {
  const handyUtils = require('handyutils');
  const menus = require('../models/menu');

  /* Menus */
  app.get('/menus', (req, res) => {
      const dataForView = { layout:'main', title: 'Menus',  message: req.flash() };
      res.render('menus', dataForView);
  });

};
