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
   const ref = firebase.firestore().collection('prosucts').get().then((snapshot)=>{
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
    products[index].qty+=1;
    this.setState({
        products:products
    });
}
handleDecreaseQuantity = (product)=>{
    console.log('hey please decrease the quantity', product);
    const {products} = this.state;
    const index = products.indexOf(product);
    if(products[index].qty === 0){
        return;
    }
    products[index].qty-=1;
    this.setState({
        products:products
    });
}
handleDeleteProduct = (id)=>{
    const {products} = this.state;
    const items = products.filter((item)=>
    item.id !== id);
    this.setState({
        products:items
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
  render(){
    const {products, loading} = this.state;
  return (
    <div className="App">
      <Navbar 
      count = {this.getCartCount()}
      />
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
