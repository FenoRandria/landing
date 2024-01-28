import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
const Auth_token = () => {
  const history = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token || token==null) {
        history('/page/login');
    }else {
      var lists = token.split("*,y+*");
      if(lists.length === 2 && lists[0].toString() !== CryptoJS.SHA256(parseInt(lists[1])).toString()){
        history('/page/login');
      }
    }
  }, [history]);
  return null;
};
export default Auth_token;