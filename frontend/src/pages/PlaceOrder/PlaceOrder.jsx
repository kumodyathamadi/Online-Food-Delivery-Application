import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../components/Context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {

  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext)
  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })


  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }


 const placeOrder = async (event) => {
  event.preventDefault();
  console.log("FORM SUBMITTED");
  let orderItems = [];

  // food_list.map((item) => {
  //   if (cartItems[item._id] > 0) {
  //     let itemInfo = item;
  //     itemInfo["quantity"] = cartItems[item._id];
  //     orderItems.push(itemInfo);
  //   }
  // });

  food_list.forEach((item) => {
    if (cartItems[item._id] > 0) {
      orderItems.push({
        ...item,
        quantity: cartItems[item._id],
      });
    }
  });
  

  let orderData = {
    //userId: user._id, 
    address: data,
    items: orderItems,
    amount: getTotalCartAmount() + 2,
  };

  try {
    const response = await axios.post(
      url + "/api/order/place",
      orderData,
      { headers: { token } }
    );

    if (response.data.success) {
      // window.location.href = response.data.session_url; // 🔥 Stripe redirect
      const {session_url} = response.data;
      window.location.replace(session_url);


    }

  } catch (error) {
    console.log(error);
  }
};


  return (

<>


    
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input required name="firstName" type="text" onChange={onChangeHandler} value={data.firstName} placeholder="First name" />
          <input  name="lastName" type="text" onChange={onChangeHandler} value={data.lastName} placeholder="Last name" />
        </div>

        <input  name="email" type="email" onChange={onChangeHandler} value={data.email} placeholder="Email address" />
        <input  name="street" type="text" onChange={onChangeHandler} value={data.street} placeholder="Street" />

        <div className="multi-fields">
          <input  name="city" type="text" onChange={onChangeHandler} value={data.city} placeholder="City" />
          <input  name="state" type="text" onChange={onChangeHandler} value={data.state} placeholder="State" />
        </div>
 
        <div className="multi-fields">
          <input  name="zipcode" type="text" onChange={onChangeHandler} value={data.zipcode} placeholder="Zip code" />
          <input  type="text" name="country" onChange={onChangeHandler} value={data.country} placeholder="Country" />
        </div>
        <input  name="phone" type="text" onChange={onChangeHandler} value={data.phone} placeholder="Phone" />



      </div>
      <div className="place-order-right">
      <div className="cart-bottom">
        {/* LEFT: Cart Total */}
        <div className="cart-total">
          <h2>Cart Total</h2>

          <div className="cart-total-box">
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${2}</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount() + 2}</b>
            </div>

            <button className="checkout-btn" type="submit" >
              PROCEED TO PAYMENT
            </button>
          </div>
        </div>

       
      </div>
      </div>
    </form>

</>

  );
};

export default PlaceOrder;
