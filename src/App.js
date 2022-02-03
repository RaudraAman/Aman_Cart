import React from "react";
import Cart from "./Cart";
import Navbar from "./Navbar";
class App extends React.Component {
  constructor(){
    super();
    this.state = {
        products :  [ {
                price: 99,
                title: 'Watch',
                qty:1,
                img:'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80',
                id:1
               },
               {
                price: 9999,
                title: 'Phone',
                qty:10,
                img:'https://images.unsplash.com/photo-1557180295-76eee20ae8aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
                id:2
               },
               {
                price: 99999,
                title: 'Laptop',
                qty:4,
                img:'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
                id:3
               }
               ]
    }
   
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
    const {products} = this.state;
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
      <div style={{fontSize:20,padding:10}}>Total Price {this.getTotal()} RS</div>
    </div>
  );
}
}

export default App;
