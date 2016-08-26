module.exports = (app) => {
  const handyUtils = require('handyutils');

  app.get('/story', (req, res) => {
    const dataForView = { layout: 'main', title:'Our Story', message: req.flash() };
    res.render('story', dataForView);
  });
};
