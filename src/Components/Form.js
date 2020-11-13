import React, { useState, useEffect } from 'react'
import { Link, Route} from 'react-router-dom'
import image from './Assets/Pizza.jpg'
import axios from 'axios'
import * as yup from 'yup'
import Schema from '../Validation/form_schema'



const Form = () => {
    const price1 = '$14.99'
    const price2 = '$19.99'
    const price3 = '$24.99'

const [formState, setFormState] = useState({
    name:'',
    address:'',
    size:'',
    pepperoni:false,
    mushroom:false,
    onion:false,
    olive:false,
    extraCheese:false,
    special: ''
})

const [errorState, setErrorState] = useState ({
    name:'',
    address:'',
    size:'',
    pepperoni:'',
    mushroom:'',
    onion:'',
    olive:'',
    extraCheese:'',
    special: ''
})

const validate = (e) => {
    let value = 
    e.target.type === 'checkbox' ? e.target.checked : e.target.value
    
    yup
        .reach(Schema, e.target.name)
        .validate(value)
        .then((valid) => {
            setErrorState({...errorState, [e.target.name] : ''})
        })
        .catch((err) => {
            setErrorState({...errorState, [e.target.name] : RegExp.errors[0]})
        })
}

const [buttonDisabled, setButtonDisabled] = useState(true);
    useEffect(() => {
        Schema.isValid(formState).then((valid) => {
          setButtonDisabled(!valid);
        });
      }, [formState]);

const inputChange = (e) => {
    e.persist();
    validate(e);
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormState({...formState, [e.target.name]: value})
}

const [postedData, setPostedData] = useState([]); //place to hold the data coming back from the server
const submitForm = (e) => {
    e.preventDefault();
    console.log("Form submited!!");
    setFormState({
        name:'',
        address:'',
        size:'',
        pepperoni:'',
        mushroom:'',
        onion:'',
        olive:'',
        extraCheese:'',
        special: ''
    });

axios
    .post("https://reqres.in/api/users", formState)
    .then((res) => {
        console.log(res);
        setPostedData(res.data);
    })
    .catch((err) => console.log(err))
};

return (
    <>
    <div>
        <h2>Create Your Own Pizza</h2>
        <image alt='pizza-image'src={image} />
    </div>

    <form onSubmit={submitForm}>
        <h3>Forge Your Own</h3>

        
    </form>
    
    
    
    
    
    </>
)





}