import React from "react";



class CartItem extends  React.Component{
    constructor(){
        super();
        this.state = {
            price: 999,
            title: 'Phone',
            qty:1,
            img:''
        }
       
    }
    increaseQuantity = ()=>{
     alert('hii');
     console.log('state',this.state);

    }
       render(){
           const {price,title,qty} = this.state;
           return (
               <div className="cart-item">
                   <div className="left-block">
                       <img style={styles.image}/>
                   </div>
                   <div className="right-block">
                       <div style={{fontSize:25}}>{title}</div>
                       <div style={{color:'grey'}}>Rs: {price}</div>
                       <div style={{color:'#777'}}>Qty {qty}</div>
                       <div className="cart-item-actions">
                           {/* {buttons} */}
                       <img alt="increase" onClick={this.increaseQuantity} 
                       className="action-icons" 
                       src="https://cdn-icons.flaticon.com/png/512/3303/premium/3303893.png?token=exp=1643782902~hmac=3c415bf6f6f62869dcdf2f040198fd40" />
                       <img alt="decrease" 
                       className="action-icons" 
                       src="https://www.pngall.com/wp-content/uploads/5/Minus-PNG-File.png" />   
                       <img alt="delete" 
                       className="action-icons" 
                       src="https://as2.ftcdn.net/v2/jpg/01/90/89/15/1000_F_190891550_N7uKp2aHE3mOc20dmtDytj7atgvbhdOu.jpg" />     
                       </div>
                   </div>
               </div>
           )
       }
}
const styles = {
    image:{
      height: 110,
      width:110,
      borderRadius:4,
      background:'#ccc'
    }
}
export default CartItem;