const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB",{ useNewUrlParser: true, useUnifiedTopology: true});

const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true,"Please check your data entry, no name specified!"]
  },
  rating: {
    type: Number,
    min:1,
    max:10
  },
  review: String
});

const personSchema = new mongoose.Schema ({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const Fruit = mongoose.model("Fruit",fruitSchema);

const fruit = new Fruit ({
  rating: 10,
  review: "Peaches are so yummy."
});

// fruit.save();
// every single time you run it, it will save the same fruit into your fruits collection.所以在运行了一次后就可以comment掉。

const Person = mongoose.model("Person",personSchema);

const pineapple = new Fruit ({
  name: "Pineapple",
  score: 9,
  review: "Great fruit."
});
// pineapple.save();
const watermelon = new Fruit ({
  name: "Watermelon",
  rating: 7,
  review: "Awesome fruit!"
});
// watermelon.save();

const person = new Person ({
  name: "John",
  age: 37,
  favouriteFruit: watermelon
});

// person.save();

Fruit.find(function(err,fruits){
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.close();
    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });
  }
});

// Fruit.updateOne({_id: "60d96694dd3a4640103deb1e"},{name: "Peach"},function(err){
//   if (err) {
//   console.log(err);
// } else {
//   console.log("successfully updated the document.");
// }
// });
//
// Fruit.deleteMany({name: "pineapple"},function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("successfully deleted the document.");
//   }
// });
//
// Person.deleteOne({_id: "60d980e51260d94417390c6b"},function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("successfully deleted the document.");
//   }
// });
//
// Person.deleteOne({_id: "60d98e8088626a468061ef89"},function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("successfully deleted the document.");
//   }
// });

// Person.deleteMany({name: "Amy"},function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("successfully deleted the document.");
//   }
// });

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits);
    callback(fruits);
  });
}
