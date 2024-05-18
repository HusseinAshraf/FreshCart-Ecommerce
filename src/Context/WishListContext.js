import axios from "axios";
import {  createContext, useEffect, useState } from "react";


export let WishlistContext = createContext();


export default function WishlistContextProvider(props){

    let [wishListCount , setWishListCount] = useState(0);
    const [likedProducts, setLikedProducts] = useState([]);

    let headers ={
        token : localStorage.getItem('userToken')
    } ;

    function getWishListItems(){
         return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
            {
                headers
            })
            .then((response)=> response)
            .catch((err)=>err)
    }
    function deleteWishListItems(productId){
         return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
            {
                headers
            })
            .then((response)=> response)
            .catch((err)=>err)
    }
    function addToWishlist(productId){
         return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            productId
         }
           , {
                headers
            })
            .then((response)=> response)
            .catch((err)=>err)
    }

    useEffect(() => {
        getWishListItems();
    }, []);

   


    return<>
       <WishlistContext.Provider value={{getWishListItems , deleteWishListItems , addToWishlist , wishListCount ,setWishListCount , likedProducts , setLikedProducts}}>
          
          {props.children}

       </WishlistContext.Provider>
    
    </>

}
