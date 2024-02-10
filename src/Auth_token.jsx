import { useEffect } from 'react';
import apiUrl from './apiUrl';

const Auth_token = () => {

    useEffect(() => {
      const token = sessionStorage.getItem('token');
  
      if (!token) {
          console.error("Token not available");
          window.location.href="/page/login"
          return;
      }
  
      fetch(`${apiUrl}/api/proprietaires/auth`, {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`,
              "Content-type": "application/json; charset=UTF-8"
          },
      })
      .then(response => {
          if (!response.ok) {
              console.error("Error in API call:", response.status, response.statusText);
              return Promise.reject("Authentication failed");
          }
          return response.json();
      })
      .then(data => {
          console.log("Response data:", data.data);
          parseInt(data.data)
      })
      .catch(error => {
          console.error("Error:", error);
          window.location.href="/page/login"
  
      });
  }, []);
};
export default Auth_token;