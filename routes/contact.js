module.exports = (app) => {
  const handyUtils = require('handyutils');

  app.get('/contact', (req, res) => {
    const dataForView = { layout: 'main', title:'Contact Us', message: req.flash() };
    res.render('contact', dataForView);
  });
  // // Handle 404
  //   app.use(function(req, res) {
  //     res.status(400);
  //     res.render('404', {title: '404: File Not Found', error:'this is not the page you are lookign for'});
  //   });

  //   // Handle 500
  //   app.use(function(error, req, res, next) {
  //       res.status(500);
  //      res.render('500', {title:'500: Internal Server Error', error: error});
  //   });
};
