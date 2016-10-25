module.exports = (app) => {
  const handyUtils = require('handyutils');
  const menus = require('../models/menu');

  /* Menus */
  app.get('/menus/:menuCategory', (req, res) => {
    console.log(req.params.menuCategory);
      const dataForView = { layout:'main', title: 'Menus',  message: req.flash() };
      const categoryList = ['Appetizer', 'Teepanyaki', 'HalalTeppanyaki', 'Sushi', 'BarDrink', 'HappyHour', 'EarlyBird'];
      if (!categoryList.indexOf(req.params.menuCategory)) {
        // Get the menu category from database
        menus.find({ categoryName: req.params.menuCategory }, (findErr,findRes)=> {
          handyUtils.debug('findErr menuCategory at /menus/:menuCategory', findErr);
          handyUtils.debug('findRes menuCategory at /menus/:menuCategory', findRes);
          dataForView.menuCategory = findRes[0];
          handyUtils.debug('dataForView at /menus/:menuCategory', dataForView);
          res.render('menus', dataForView);
        });

      } else {
        //send to 404 page
        res.status(400);
        res.render('404', {title: '404: File Not Found', error:'this is not the page you are looking for'});
      }
  });

};
