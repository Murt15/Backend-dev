const getDb=require('../util/database').getDb;
const mongoDb =require('mongodb');
class Product {
  constructor(title ,price,description,imageUrl,_id){
    this.title=title;
    this.price=price;
    this.description=description;
    this.imageUrl=imageUrl;
    
    this._id=new mongoDb.ObjectId(this._id)
  }
  save(){
    const db=getDb();
    let dbOp;
    if(this._id){
      dbOp=db.collection('products')
      .updateOne({_id:this._id},{$set:this});
    }else{
      dbOp=db.collection('products').insertOne(this);   
    }
     return dbOp
    // .then((result) => {
    //   //console.log(result)
    //   return result;
    // }).catch((err) => {
    //   console.log(err);
    // });
    
    
  }
  static findAll() {
    const db = getDb();
    return db
      .collection('products') //Access Collecttion
      .find() // Find All products from collection
      .toArray() // Instead of MongoDB object we choose to convert it into an array
      .then(products => {
        return products
      })
      .catch(err => console.log(err));
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection('products')
      .find({ _id: new mongoDb.ObjectId(prodId) })
      .next()
      .then(product => {
        return product;
      })
      .catch(err => console.log(err))
  }

  static deleteById(prodId) {
    const db = getDb();
    return db
      .collection('products')
      .deleteOne({ _id: new mongoDb.ObjectId(prodId) })
      .then(result => console.log('Deleted'))
      .catch(err => console.log(err));
  }
}

module.exports = Product;
