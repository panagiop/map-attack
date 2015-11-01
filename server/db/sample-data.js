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
    isPublished: true,
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
    isPublished: true,
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
    isPublished: true,
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
    isPublished: true,
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
    isPublished: false,
    __user: admin._id
  });

  post1.save(function (err) {
    if (err) throw err;
  });
}); 