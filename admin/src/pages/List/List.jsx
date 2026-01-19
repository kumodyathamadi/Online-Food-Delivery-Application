import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = () => {
  const url = "http://localhost:4000";
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to fetch list");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };


  const removeFood = async(foodId)=>{
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
    await fetchList();

    if (response.data.success) {
      toast.error(response.data.message); // red toast
    } else {
      toast.error("error");
    }
    
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <div className="list-table-format title">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
      </div>

      {list.map((item, index) => (
        <div key={index} className="list-table-format">
          <img
            src={`${url}/images/${item.image}`}
            
          />
          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>${item.price}</p>
          <button onClick={()=>removeFood(item._id)} className="cursor">Remove</button>
          
        </div>
      ))}




    </>
  );
};

export default List;
