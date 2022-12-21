const getDb = require('../util/database').getDb;
const mongoDb = require('mongodb');

const ObjectId=mongoDb.ObjectId;
class User{
  constructor(name, email,cart,id) {
    this.name = name;
    this.email = email;
    this.cart=cart;
    this._id=id;
  }

  save() {
    const db = getDb();

    return db
      .collection('users')
      .insertOne(this);
  }
  addToCart(product) {
    console.log(this);
    const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productId.toString() === product._id.toString();
    });

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if(cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({ productId: new mongoDb.ObjectId(product._id), quantity: 1 });
    }

    const updatedCart = { items: updatedCartItems };

    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        { _id: new mongoDb.ObjectId(this._id) },
        {$set: { cart: updatedCart } }
      );
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection('users')
      .findOne({ _id: new ObjectId(userId) })
      .then(user =>  user)
      .catch(err => console.log(err));
  } 
}

module.exports = User;