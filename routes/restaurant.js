module.exports = (app) => {
  const handyUtils = require('handyutils');

  app.get('/restaurant', (req, res) => {
    const dataForView = { layout: 'main', title:'Restaurant', message: req.flash() };
    res.render('restaurant', dataForView);
  });
};
