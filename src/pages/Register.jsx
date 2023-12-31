import React, {useState,useEffect} from 'react'
import {styled} from 'styled-components';
import {Link, useNavigate} from 'react-router-dom';
import Logo from '../assets/logo.png'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';

function Register() {

  const navigate = useNavigate();


  
  useEffect(()=>{
    if(localStorage.getItem('user-chat-app')){
      navigate('/')
    }
  },[])

    const toastOptions =  {
        position : "bottom-right",
        autoClose : 8000,
        pauseOnHover : true,
        draggable : true,
        theme : "dark"
    }
    const [values,setValues] = useState({
        username : "",
        email : "",
        password : "",
        confirmpassword : ""

    })

    const handleChange = (event)=>{
        setValues({ ...values , [event.target.name] : event.target.value})
    };
    
    const handleValidation = () => {
        const { password, confirmPassword, username, email } = values;
        if (username.length < 3) {
        toast.error(
          "Username should be greater than 3 characters.",
          toastOptions
        );
        return false;
      } 
        // else if (password !== confirmPassword) {
        //   toast.error(
        //     "Password and confirm password should be same.",
        //     toastOptions
        //   );
        //   return false;
        // }
        else if (password.length < 8) {
          toast.error(
            "Password should be contain atleast 8 characters.",
            toastOptions
          );
          return false;
        }
         else if (email === "") {
          toast.error("Email is required.", toastOptions);
          return false;
        }
    
        return true;
      };
    
   

   
    const handleSubmit = async(event) =>{
        event.preventDefault();
        if(handleValidation()){
            const { password, username, email } = values;
            const {data} = await axios.post(registerRoute,{
                username,
                email,
                password
            });
            if(data.status === false){
              toast.error(data.msg, toastOptions);
            }
            if(data.status === true){
              localStorage.setItem('user-chat-app',JSON.stringify(data.user));
              navigate('/')
            }
        }
    }

  return (
    <>
    <FormContainer>
        <form onSubmit={(event)=>{handleSubmit(event)}}>

            <div className="brand">  
                <img src={Logo} alt="Logo" />
                <h1>Chat-App</h1>
            </div>
            <input type="text" name='username' placeholder='Username' onChange={(e)=>handleChange(e)} />
            <input type="email" name='email' placeholder='Email' onChange={(e)=>handleChange(e)} />
            <input type="password" name='password' placeholder='Password' onChange={(e)=>handleChange(e)} />
            <input type="password" name='confirmpassword' placeholder='Confirm Password' onChange={(e)=>handleChange(e)} />
            <button type='submit' >Create User</button>
            <span>Already have an account?<Link to='/login'>Login</Link></span>

        </form>
    </FormContainer>

    <ToastContainer/>
    
    
    </>
  )
}


const FormContainer = styled.div`
height: 100vh;
 width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color : #131324;
.brand{
    display : flex;
    align-item : center;
    gap : 1rem;
    justify-content : center;
 img{
    height : 5rem;
    width :6rem;
 }
 h1{
    color : white;
    text-transform : uppercase;
    margin-top : 1.5rem; 
}
}
form{
   display : flex;
   flex-direction : column;
   gap : 1rem;
   background-color : #00000076;
   border-radius : 2rem;
   padding : 3rem 5rem;
   input{
    background-color : transparent;
    padding : 1rem;
    border : 0.1rem solid #4e0eff;
    border-radius : 0.4rem;
    color : white;
    width  : 100%;
    font-size : 1rem;
    &:focus {
        border : 0.1 remsolid #997af0;
        outline : none;
    }
   }
   button{
    background-color : #997af0;
    color : white;
    padding : 1rem 2rem;
    border : none;
    font-weight : bold;
    cursor : pointer;
    border-radius : 0.4rem;
    font-size : 1rem;
    text-transform : uppercase;
    transition: 0.5s ease-in-out;
    &:hover{
        background-color : #4e0eff;
    }

   }
   span { 
    color : white;
    text-transform : uppercase;
    a{
        color : #4e0eff;
        text-decoration : none;
        font-weight : bold;
    }
   }
}
`;
export default Register
