
// // 'use strict';

// var express = require('express');
// // var passport = require('passport');
// var router = express.Router();


// // /* GET API documentation */
// // //router.get('/', passport.authenticate('accessToken', { session: false }), function (req, res) {
// // //   res.render('index');
// // //});

// router.get('/', function (req, res) {
//     res.render('index');
// });

// // module.exports = router;


// //const express = require('express');
// //const router = express.Router();
// const MongoClient = require('mongodb').MongoClient;
// const ObjectID = require('mongodb').ObjectID;

// // Connect
// const connection = (closure) => {
//     return MongoClient.connect('mongodb://admin:medecare@ds135624.mlab.com:35624/medecare', (err, db) => {
//         if (err) return console.log(err);

//         closure(db);
//     });
// };

// // Error handling
// const sendError = (err, res) => {
//     response.status = 501;
//     response.message = typeof err == 'object' ? err.message : err;
//     res.status(501).json(response);
// };

// // Response handling
// let response = {
//     status: 200,
//     data: [],
//     message: null
// };

// // Get users
// router.get('/getUser', (req, res) => {
//     connection((db) => {
//         db.collection('users')
//             .find()
//             .toArray()
//             .then((users) => {
//                 response.data = users;
//                 res.json(response);
//             })
//             .catch((err) => {
//                 sendError(err, res);
//             });
//     });
//     console.log(response);
// });

// router.delete('/deleteUser/:id', (req, res, next) => {
//     console.log("DELETE an API");
//     console.log(req.params.id);
//     var objectId = new ObjectID(req.params.id);
//     connection((db) => {
//         db.collection('users').remove({_id:objectId})})});


// // Post users
// router.post('/addUser', function(req,res,next) {
//     // console.log(req.body);
//     connection((db) => {
//     db.collection("users").insert(req.body, function(err, res) {
//         //res.send("Insert complete");
//       })
// });
// });

// module.exports = router;



/////////// her version///


'use strict';

var express = require('express');
var passport = require('passport');
var router = express.Router();


/* GET API documentation */
//router.get('/', passport.authenticate('accessToken', { session: false }), function (req, res) {
//   res.render('index');
//});

router.get('/', function (req, res) {
    res.render('index');
});

module.exports = router;