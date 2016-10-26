module.exports = (app) => {
  const handyUtils = require('handyutils');
  const menus = require('../models/menu');

  /* Menus */
  app.get('/menus', (req, res) => {
    const dataForView = { layout:'main', title: 'Menus',  message: req.flash() };
    res.render('menus', dataForView);
  });
  /* Menus > menuCategory */
  app.get('/menus/:menuCategory', (req, res) => {
    handyUtils.debug('req.params.menuCategory ', req.params.menuCategory);
      const dataForView = { layout:'main', title: 'Menus',  message: req.flash() };
      if (req.params.menuCategory === 'Appetizer' ||
       req.params.menuCategory === 'Teppanyaki' ||
       req.params.menuCategory === 'HalalTeppanyaki' ||
       req.params.menuCategory === 'Sushi' ||
       req.params.menuCategory === 'Bar' ||
       req.params.menuCategory === 'HappyHour' ||
       req.params.menuCategory === 'EarlyBird') {
        // Get the menu category from database
        menus.find({ categoryName: req.params.menuCategory }, (findErr,findRes)=> {
          handyUtils.debug('findErr menuCategory at /menus/:menuCategory', findErr);
          handyUtils.debug('findRes menuCategory at /menus/:menuCategory', findRes);
          dataForView.menuCategory = findRes[0];
          handyUtils.debug('dataForView at /menus/:menuCategory', dataForView);
          res.render('menusCategory', dataForView);
        });

      } else {
        //send to 404 page
        res.status(400);
        res.render('404', {title: '404: File Not Found', error:'this is not the page you are looking for'});
      }
  });

};
