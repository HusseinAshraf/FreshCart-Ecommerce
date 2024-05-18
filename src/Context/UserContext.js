import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props) {
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null)

  let headers = {
    token: localStorage.getItem("userToken"),
  };



  async function UpdatePassword(values) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword `,
         values ,
        {
          headers
        }
      )
      .then((response) => response)
      .catch((err) => err);
  }

  return (
    <UserContext.Provider value={{ userToken, setUserToken  , UpdatePassword ,userData , setUserData}}>
      {props.children}
    </UserContext.Provider>
  );
}
