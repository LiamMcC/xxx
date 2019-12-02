var express = require('express');
var router = express.Router();

var fs = require('fs');

var Cart = require('../models/cart');
var products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));

var contact = require("../data/products.json");


router.get('/', function (req, res, next) {
  var productId = products && products[0].id;

  res.render('index', 
  { 
    title: 'NodeJS Shopping Cart',
    products: products
  }
  );
});

router.get('/add/:id', function(req, res, next) {

  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  var product = products.filter(function(item) {
    return item.id == productId;
  });
  cart.add(product[0], productId);
  req.session.cart = cart;
  res.redirect('/');
  inline();
});

router.get('/cart', function(req, res, next) {
  if (!req.session.cart) {
    return res.render('cart', {
      products: null
    });
  }
  var cart = new Cart(req.session.cart);
  res.render('cart', {
    title: 'NodeJS Shopping Cart',
    products: cart.getItems(),
    totalPrice: cart.totalPrice
  });
});

router.get('/remove/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.remove(productId);
  req.session.cart = cart;
  res.redirect('/cart');
});




router.get('/add', function(req,res){
    res.render("addProduct"); // Get the contacts page when somebody visits the /contacts url
    console.log("I found the contact us page");
    
});



router.post("/add", function(req,res){

    // Stp 1 is to find the largest id in the JSON file
    
            function getMax(contacts, id){ // function is called getMax
            var max // the max variable is declared here but still unknown
    
                for(var i=0; i<contacts.length; i++){ // loop through the contacts in the json fil as long as there are contcats to read
                    if(!max || parseInt(contact[i][id])> parseInt(max[id]))
                    max = contacts[i];
                        }
    
            return max;
             }

             
             // make a new ID for the next item in the JSON file
             
              maxCid = getMax(contact, "id") // calls the gstMax function from above and passes in parameters 
             
             var newId = maxCid.id + 1; // add 1 to old largest to make ne largest
             
             // show the result in the console
             console.log("new Id is " + newId)
             
             
             // we need to get access to what the user types in the form
             // and pass it to our JSON file as the new data
             
             var contactsx = {
                 
                 
                 id: newId,
                 title: req.body.title,
                description: req.body.description,
                 price: req.body.price
                 
                 
             }
             
             
    fs.readFile('./data/products.json', 'utf8',  function readfileCallback(err){
        
        if(err) {
            throw(err)
            
        } else {
            
            contact.push(contactsx); // add the new data to the JSON file
            json = JSON.stringify(contact, null, 4); // this line structures the JSON so it is easy on the eye
            fs.writeFile('./data/products.json',json, 'utf8', function(){})
            
        }
        
    })         
             
     res.redirect('/') ;
    
});



module.exports = router;
