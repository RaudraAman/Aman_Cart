import React from "react";
import Cart from "./Cart";
import Navbar from "./Navbar";
import firebase from "./index";
class App extends React.Component {
  constructor(){  
    super();
    this.state = {
        products :  [],
        loading: true
    }
   
}
componentDidMount () {
  //  const ref = firebase.firestore().collection('prosucts').get().then((snapshot)=>{
  //      snapshot.docs.map((doc)=>{
  //       console.log(doc.data());
  //      });
  //      const products = snapshot.docs.map((doc)=>{
  //        const result = doc.data();
  //        result['id'] =doc.id; 
  //        return result;
  //      })
  //      this.setState({
  //        products:products,
  //        loading:false
  //      })
  //  })
  const ref = firebase.firestore().collection('prosucts').onSnapshot((snapshot)=>{
    snapshot.docs.map((doc)=>{
     console.log(doc.data());
    });
    const products = snapshot.docs.map((doc)=>{
      const result = doc.data();
      result['id'] =doc.id; 
      return result;
    })
    this.setState({
      products:products,
      loading:false
    })
})

   
}
handleIncreaseQuantity = (product)=>{
     console.log('hey please increase the quantity', product);
     const {products} = this.state;
    const index = products.indexOf(product);
    // products[index].qty+=1;
    // this.setState({
    //     products:products
    // });
    const docRef = firebase.firestore().collection('prosucts').doc(products[index].id);
     console.log('refrence is ',docRef);
    docRef.update({
      qty:products[index].qty + 1
    }).then(()=>{
      console.log('document updated');
    }).catch((error)=>{
      console.log('error', error);
    })
}
handleDecreaseQuantity = (product)=>{
    console.log('hey please decrease the quantity', product);
    const {products} = this.state;
    const index = products.indexOf(product);
    if(products[index].qty === 0){
        return;
    }
    const docRef = firebase.firestore().collection('prosucts').doc(products[index].id);
     console.log('refrence is ',docRef);
    docRef.update({
      qty:products[index].qty - 1
    }).then(()=>{
      console.log('document updated');
    }).catch((error)=>{
      console.log('error', error);
    })
}
handleDeleteProduct = (id)=>{
    const {products} = this.state;
    // const items = products.filter((item)=>
    // item.id !== id);
    // this.setState({
    //     products:items
    // })
    const docRef = firebase.firestore().collection('prosucts').doc(id);
    docRef.delete().then(()=>{
      console.log('document deleted');
    }).catch((error)=>{
      console.log('error', error);
    })
}
getCartCount = ()=>{
  let count=0;
  const {products} = this.state;
    products.forEach((product)=>{
      count+=product.qty;
    })
    return count;
}
getTotal = ()=>{
  const {products}=this.state;
  let total=0;
  products.forEach((product)=>{
         total+=product.qty*product.price;
  });
  return total;

}
addProduct = ()=>{
  firebase.firestore().collection('prosucts').add({
    img:' ',
    price:100,
    qty:3,
    title:'washing machine'
  }).then((docRef)=>{
      console.log('product get added',docRef);
  }).catch((error)=>{
    console.log(error);
  })
}
  render(){
    const {products, loading} = this.state;
  return (
    <div className="App">
      <Navbar 
      count = {this.getCartCount()}
      />
      {/* <button onClick={this.addProduct} style={{padding:20,  fontSize:12}}>Add a Product</button> */}
      <Cart 
       products = {products}
      onIncreaseQuantity = {this.handleIncreaseQuantity}
      onDecreaseQuantity = {this.handleDecreaseQuantity}
      onDeleteProduct = {this.handleDeleteProduct}
      />
      {loading && <h1>Loading Products...</h1>}
      <div style={{fontSize:20,padding:10}}>Total Price {this.getTotal()} RS</div>
    </div>
  );
}
}

export default App;
