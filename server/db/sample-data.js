'use strict';

var Posts = require('../api/posts/posts.model');
var User = require('../api/users/users.model');

var user1 = new User({
  username: 'testuser',
  email: 'test@test.com',
  created: new Date
});

user1.setPassword('test');

user1.save(function(err){
  if (err) throw err;

  var post1 = new Posts({
    title: 'test 1 attack',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada iaculis enim id varius. Quisque eget magna sit amet mauris blandit egestas vitae eu dui.',
    type_of_attack: 'Physical attack',
    loc: [38.25, 21.73],
    date: new Date('2015-10-08T00:04:26.782Z'),
    __user: user1._id
  });

  post1.save(function (err) {
    if (err) throw err;
  });

  var post2 = new Posts({
    title: 'test 2 attack',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada iaculis enim id varius. Quisque eget magna sit amet mauris blandit egestas vitae eu dui.',
    type_of_attack: 'Verbal attack',
    loc: [37.96, 23.71],
    date: new Date('2015-10-07T19:04:26.782Z'),
    __user: user1._id
  });

  post2.save(function (err) {
    if (err) throw err;
  });
});

var user2 = new User({
  username: 'testuser2',
  email: 'test2@test.com',
  created: new Date
});

user2.password = user2.setPassword('test2');

user2.save(function(err){
  if (err) throw err;

  var post1 = new Posts({
    title: 'test 3 attack',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada iaculis enim id varius. Quisque eget magna sit amet mauris blandit egestas vitae eu dui.',
    type_of_attack: 'Verbal attack',
    loc: [40.65, 22.9],
    date: new Date('2015-10-06T19:04:26.782Z'),
    __user: user2._id
  });

  post1.save(function (err) {
    if (err) throw err;
  });

  var post2 = new Posts({
    title: 'test 4 attack',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada iaculis enim id varius. Quisque eget magna sit amet mauris blandit egestas vitae eu dui.',
    type_of_attack: 'Police attack',
    loc: [39.5500, 21.7667],
    date: new Date('2015-10-04T19:04:26.782Z'),
    __user: user2._id
  });

  post2.save(function (err) {
    if (err) throw err;
  });
});

var admin = new User({
  username: 'admin',
  email: 'admin@admin.com',
  created: new Date
});

admin.setPassword('admin');

admin.save(function(err){
  if (err) throw err;

  var post1 = new Posts({
    title: 'admin test attack',
    text: 'Admin test text attack Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    type_of_attack: 'Theft',
    loc: [38.0333, 22.1167],
    date: new Date('2015-10-03T19:04:26.782Z'),
    __user: admin._id
  });

  post1.save(function (err) {
    if (err) throw err;
  });
});

// var user1 = Users.find({}).remove(function() {
//     User.create({
//         title: 'Test User',
//         email: 'test@test.com',
//         password: 'test'
//     });

// var user2 = Users.find({}).remove(function() {
//     User.create({
//         role: 'admin',
//         title: 'Admin',
//         email: 'admin@admin.com',
//         password: 'admin'
//     });
// });



/*var user1 = Users.find({}).remove(function() {
    User.create({
        title: 'Test User',
        email: 'test@test.com',
        password: 'test'
    });

var user2 = Users.find({}).remove(function() {
    User.create({
        role: 'admin',
        title: 'Admin',
        email: 'admin@admin.com',
        password: 'admin'
    });
});


Posts.find({}).remove(function() {
    Posts.create({
        title: 'Development Tools',
        text: 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
        user: user1._id
    }, {
        title: 'Server and Client integration',
        text: 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
        user: user1._id
    }, {
        title: 'Smart Build System',
        text: 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
        user: user1._id
    }, {
        title: 'Modular Structure',
        text: 'Best practice client and server structures allow for more code reusability and maximum scalability'
        user: user2._id
    }, {
        title: 'Optimized Build',
        text: 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset titles for caching.'
        user: user2._id
    }, {
        title: 'Deployment Ready',
        text: 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators',
        user: user2._id
        user:
    });
});
*/
