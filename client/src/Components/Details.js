import React, {useState,useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import{BsDash,BsPlus} from "react-icons/bs"
import { Link } from 'react-router-dom';
import { showDetails } from '../store/actions/ProductAction';
import Message from './LoadingError/error';
import Loading from './LoadingError/Loading';
 const Details =({history,match})=>{
  const [qty,setQty]=useState(1)
  const productId=match.params.id;
  const dispatch=useDispatch()
  const productDetails=useSelector((state)=>state.productDetails); 
  const{loading,error,product}=productDetails;
  useEffect(()=>{
    dispatch(showDetails(productId));
  },[dispatch,productId]);

  const HandleCart=(e)=>{
    e.preventDefault()
    history.push(`/cart/${productId}?qty=${qty}`)
  }
  const decQuantity=()=>{
    if(qty>1){
        setQty(qty-1)
    }
  }
// const [product,setProduct]=useState({})
// useEffect(()=>{
//   const fetchproduct=async()=>{
//     const {data}=await axios.get(`api/products/${match.params.id}`);
//     setProduct(data);
//   }
//   fetchproduct();
// },[match])


// const dispatch=useDispatch()
// useEffect(()=>{
// dispatch({
//     type:'jewellery',id})
// },[id])

// const decQuantity=()=>{
//   if(quantity>1){
//       setQuantity(quantity-1)
//   }
// }
// useEffect(()=>{
//     dispatch({
//         type:'jewellery',id})
//     },[id],)
  // const fetchproduct=async()=>{
//     const {data}=await axios.get(`/api/products/${(id)}`)
//     setProduct(data)
//   }
//   fetchproduct()
// },[id])
return(
  <>
    <div className='container mb-5'>
    <h2 className='page-title'>Cart Details Page</h2>
    {
      loading ?
      (<Loading/>) : error ? (
        <Message variant="alert-danger">{error}</Message>
      )
       :
(
  <>
 <div className='row'> 
    <div className='col-md-8'>
        <div className='details-image'>
        <img src={product.image} alt="product.name"></img>
        </div>
        </div>
        <div className='col-md-4'>
        <div className='product-details'>
        <h4 className='product-name'>{product.name}</h4>
        <div className='price text-center'>
      {product.price}.00
        </div>
        </div> 
<div className="descr"><p>{product.desc}</p>
    </div>
    <div className='pr-quantity'>
      <span className='dec' onClick={decQuantity}><BsDash/></span>
      <span className='quantity'>{qty}</span>
      <span className='inc' onClick={()=>setQty(qty+1)}><BsPlus/></span>
      </div>  
    <div className='add mt-2'>
<button className='btn' onClick={HandleCart}>Add to Card</button>
</div>
    </div>
    </div>
  </>
)    
}
    </div>
    <div className='new text-center'><h3 className='arrivals'>New Arrivals</h3></div>
    <div className='container arrival'>
      <div className='row'>
        <div className='col-md-3 text-center'>
      <img src="https://cdn.shopify.com/s/files/1/0627/7388/7215/products/L101061-2_823x.jpg?v=1650308606"></img>
      <div className='product-title'>Terrace Drop Earnings</div>
      <div className='product-prize text-center'>$40.00 </div>
        </div>
        <div className='col-md-3 text-center'>
          <img src="https://cdn.shopify.com/s/files/1/0627/7388/7215/products/L101028-1_823x.jpg?v=1647540053"></img>
          <div className='product-title'>Terrace Drop Earnings</div>
          <div className='product-prize text-center'>$30.00
          </div>
          </div>
          <div className='col-md-3 text-center'>
          <img src="https://cdn.shopify.com/s/files/1/0627/7388/7215/products/L201009-2__61837_823x.jpg?v=1645115940"></img>
          <div className='product-title'>Terrace Drop Earnings</div>
          <div className='product-prize text-center'>$50.00
          </div>
          </div>
          <div className='col-md-3 text-center'>
          <img src="https://cdn.shopify.com/s/files/1/0627/7388/7215/products/L101015-2_823x.jpg?v=1646760639"></img>
          <div className='product-title'>Daisy Post Earnings</div>
          <div className='product-prize text-center'>$60.00
          </div>
      </div>
      </div>
    </div>
    </>
)
}


export default Details;