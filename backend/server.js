import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
var jwt = require('jsonwebtoken');
var ObjectId = require('mongoose').Types.ObjectId; 


//import Issue from './models/Issue';
const Schema = mongoose.Schema;
//import { runInNewContext } from 'vm';


const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.set('secret', "Austin03"); // secret variable

mongoose.connect('mongodb://localhost:27017/indices', function(err) {
//mongoose.connect('mongodb+srv://admin:admin@cluster0-mseur.mongodb.net/indices?retryWrites=true', function(err) {
	if (err) 
		console.log("error connecting to DB: " + err)
}
);

const connection = mongoose.connection;

var IndexSchema = new Schema({
    date: Date, 
    index_type_id: Schema.Types.ObjectId,
    last_update: Date,
    day_parts: []
}, { strict: false }); 
var IndexValue = mongoose.model('indices.values', IndexSchema);

var UserSchema = new Schema({
    username: String, 
    password: String
}, { strict: false }); 
var User = mongoose.model('indices.users', UserSchema);

var indicesTypesScheme = new Schema({any: {}} , { strict: false });
var IndexType = mongoose.model('indices.types', indicesTypesScheme);

 
connection.once('open',  () => {
    console.log('MongoDB database connection established successfully!');
});



router.route('/indices/users/auth').post((req, res) => {
    let str = req.body.username + "/" + req.body.password;
    console.log("Auth: " + str);

    ///// Change to findOne

    User.find({ username:req.body.username, password: req.body.password }, (err, ret) => {
        if (err) {
            console.log('Error looking for user: ' + str); 
            res.status(400).send('Error looking for user: ' + str); 
        } else {
            console.log("ret is: "+ret);
            if (ret.length) {
                console.log('Success login for: ' + str); 
                const payload = {
                    username: req.body.username
                }; 
                var token = jwt.sign(payload, app.get('secret'), {
                    expiresIn: 3600 // expires in 24 hours
                    
                });
		console.log("Auth OK for: " + str);
                // return the information including token as JSON
                res.status(200).json({ 
                    username: req.body.username,
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
                
                
                //res.status(200).json({ token: 'fake-jwt-token' } );
            } else {
                console.log('Username or password is incorrect: ' + str); 
                res.status(400).send('Username or password is incorrect for: ' + req.body.username); 
            }
        }
    });
});
    /*if (req.body.username === 'test' && req.body.password === 'test') {
        // if login details are valid return 200 OK with a fake jwt token
        res.status(200).json({ token: 'fake-jwt-token' } );
    } else {
        // else return 400 bad request
        res.status(400).send('Username or password is incorrect');  
    }
 */


router.route('/indices/users/reg').post((req, res) => {
    console.log("Register: " + req.body.username + "/" + req.body.password);
    User.find({ username:req.body.username }, (err, ret) => {
        if (err) {
            res.status(400).send('Username already exist'); 
        } else {
            let x = new User(req.body);
            x.save()
                .then(ret => {
                    console.log("Posting .... success");
                    res.status(200).json({'issue': 'Added successfully'});
                })
                .catch(err => {
                    console.log("Posting .... failed"+err);
                    res.status(400).send('Failed to create new user');
                });
        }
    });

});
// route middleware to verify a token
router.use(function(req, res, next) {
    console.log("Request to authenticate: " + req);
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    console.log("Request to authenticate: token found" + token);
    // decode token
    if (token) {
  
      // verifies secret and checks exp
      jwt.verify(token, app.get('secret'), function(err, decoded) {      
        if (err) {
            console.log("Request to authenticate: token verification failed - " + token);
            return res.status(401).send({ success: false, message: 'Failed to authenticate token.' });    
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded; 
          req.username = decoded.username;
          
          next();
        }
      });
  
    } else {
  
      // if there is no token
      // return an error
      return res.status(403).send({ 
          success: false, 
          message: 'No token provided.' 
      });
  
    }
  });
  
router.route('/indices/indices.types/indices/:category/:sub_category').get((req, res) => {
    let query = {}; 
    if (req.params.category != 'All') query['category'] = req.params.category;
    if (req.params.sub_category != 'All') query['sub-category'] = req.params.sub_category;
    query.user = req.username;

    //var tmp = mongoose.model('indices.types', indicesTypesScheme);
    IndexType.find(query, (err, ret) => {
        if (err) {
            console.log(err);
        } else {
            res.json(ret); 
        }
    });
});

router.route('/indices/indices.types/categories').get((req, res) => { 
    let query = {}; 
    query.user = req.username;
    console.log("req.username: "+req.username);
    IndexType.find(query).distinct('category',(err, ret) => {
        if (err) {
            console.log(err);
        } else {
            res.json(ret);
        }
    });
});

router.route('/indices/indices.types/sub-categories/:category').get((req, res) => {
    let query = {}; 
    query.user = req.username;
    if (req.params.category != "All") {
        query.category = req.params.category
    }
    IndexType.find(query).distinct('sub-category', query, (err, ret) => {
        if (err) {
            console.log(err);
        } else {
            res.json(ret);
        }
    });
});

router.route('/indices/indices.types/clone').post((req, res) => {    
    let x = new IndexType(req.body);
    x.save()
        .then(issue => {
            console.log("Posting .... success");
            res.status(200).json({'issue': 'Added successfully'});
        })
        .catch(err => {
            console.log("Posting .... failed"+err);
            res.status(400).send('Failed to create new record');
        });

});

router.route('/indices/indices.types/delete/:id').post((req, res) => {
    let query = {};
    query._id =  req.params.id;
    query.user = req.username;
    IndexType.findByIdAndRemove( query, (err, issue) => {
        if (err) {
            res.json(err);
        } else {
            res.json('remove successfully');
        }
    });

});

router.route('/indices/indices.types/update/:id').post((req, res) => {
    let query = {};
    console.log("req.params._id: " + req.body._id);
    if (req.body._id) {
        console.log("Edit type");
        req.body.last_update = new Date();
        query._id =  req.params.id;
        query.user = req.username;
        IndexType.update(query, {
            emoji: req.body.emoji,
            hidden: req.body.hidden,
            caption: req.body.caption,
            category: req.body.category,
            'sub-category': req.body['sub-category'],
            name: req.body.name,
            type: req.body.type,
            from: req.body.from,
            to: req.body.to,
            step: req.body.step,
            day_parts: req.body.day_parts,
            last_update: req.body.last_update
        }).then(index_type => {
            console.log(req.body);
            res.status(200).json(req.body);
        }).catch(err => {
            res.status(400).send('Failed to update new record'+err);
        });
    } else {
        console.log("New type: " + req.body.caption);
        req.body.last_update = new Date();
        req.body.user = req.username;
        var x = new IndexType(req.body);

        x.save()
            .then(index_type => {
                console.log(index_type);
                res.status(200).json(index_type);
            })
            .catch(err => {
                res.status(400).send('Failed to create new record'+err);
            });
    }
}); 

router.route('/indices/indices.values/:type_id/:date').get((req, res) => {
    
    if (!req.params.type_id || !req.params.date) {
        res.json('error - name and date are required');
    } else {
        
        
        //var d = new Date(req.params.date+" UTC");
        
        let d = new Date(new Date(req.params.date).setHours(0,0,0,0)).toISOString();
        console.log("Get: "+d);
        let query = { index_type_id: new ObjectId(req.params.type_id) , date: d}; 
        query.user = req.username;
        IndexValue.find(query, (err, ret) => {
            if (err) {
                console.log(err);
            } else {
                console.log("ret=",ret);
                res.json(ret);
            }
        });
    }
});

router.route('/indices/indices.values/:type_id').get((req, res) => {
    
    if (!req.params.type_id) {
        res.json('error - type is required');
    } else {

        let query = { user : req.username };
        if (req.params.type_id != "all") {
            query._id = new ObjectId(req.params.type_id); 

        } else {
            query.hidden = false;
        }
        
        IndexType.aggregate([
            { "$match": query},
            //{ "$match": {_id: new ObjectId(req.params.type_id)}},
            { "$lookup": { from: 'indices.values', localField: '_id', foreignField: 'index_type_id', as: 'index_values' } },
            { "$sort" : {"index_values.date": -1}},
        ]).exec((err, ret) => {

//        IndexValue.aggregate([{ "$match": query }, { $lookup: { from: 'indices.types', localField: 'index_type_id', foreignField: '_id', as: 'index_type' } }]).sort('-date').exec((err, ret) => {
            if (err) {
                console.log(err);
            } else {
                console.log("ret=",ret);
                res.json(ret);
            }
        });
    }
});

router.route('/indices/indices.values/save').post((req, res) => {
    
    if (req.body._id) {
        //update Index
        console.log("Saving Update: "+req.body._id);
        
        
        IndexValue.findById(new ObjectId(req.body._id), (err, index) => {
            if (!index) {
                console.log(index+ " "+req.body._id);
                // index.test = new Date();
                // index.save()
                //     .then(issue => {
                //         res.status(200).json({'index': 'Added successfully'});
                //     })
                //     .catch(err => {
                //         res.status(400).send('Failed to create new record'+err);
                //     });
            } else {
                
                index.last_update = new Date();
                index.day_parts = req.body.day_parts;
                

                index.save().then(index => {
                    res.status(200).json({'index': 'Updated successfully'});
                    //res.json('Update done');
                    //console.log("OK=====>"+index.day_parts[3].value);
                }).catch(err => {
                    res.status(400).send('Update failed');
                });
            } 
        }); 

    } else {
        //new Index
        
        let d = new Date(new Date(req.body.date).setHours(0,0,0,0)).toISOString();
        console.log("Save: " + d);
        req.body.date = d;
        req.body.last_update = new Date();
        req.body.user = req.username;
        var x = new IndexValue(req.body);

        x.save()
            .then(issue => {
                res.status(200).json({'index': 'Added successfully'});
            })
            .catch(err => {
                res.status(400).send('Failed to create new record'+err);
            });
    }


});
app.use('/', router);

app.listen(4000, () => console.log("Express server is running on port 4000"));
