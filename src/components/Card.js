import React, { useState, useRef, useEffect } from 'react'
import { useCartDispatch, useCartState } from './ContextReducer'
function Card(props) {

  let dispatch = useCartDispatch();
  let data = useCartState();
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handelAddtocart = async () => {
    await dispatch({ type: "ADD", id: props.foodItem._id, Name: props.foodItem.Name, price: finalPrice, qty: qty, size: size })
    console.log(data)
  }

  let finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])



  return (
    <div>
      <div className=''>
        <div className="card w-[18rem] mt-[100px] ">
          <img src={props.imgsrc} className="card-img-top h-[130px] object-fill" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.Name}</h5>
            <p className="card-text">{props.desc}</p>
            <div className="container w-100">
              <select className="m-2 h-100  bg-red-300 rounded" onChange={(e) => setQty(e.target.value)}>
                {Array.from(Array(6), (e, i) => {     //to make the dropdown and display the quantities from 1 to 6 
                  return (
                    <option key={i + 1} value={i + 1} > {i + 1}</option>
                  )
                })}
              </select>
              <select className="m-2 h-100  bg-red-300 rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                {priceOptions.map((data) => {
                  return <option key={data} value={data}>{data}</option>
                })}


              </select>
              <div className="d-inline h-100 fs-5"> rs{finalPrice}/-</div>
            </div>
            <hr>
            </hr>
            <button className={`btn btn-success justify-center ms-2`} onClick={handelAddtocart}>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
