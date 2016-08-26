module.exports = (app) => {
  const handyUtils = require('handyutils');

  app.get('/contact', (req, res) => {
    const dataForView = { layout: 'main', title:'Contact Us', message: req.flash() };
    res.render('contact', dataForView);
  });
};
