import React, { useState, useEffect } from 'react'
//import { Link, Route} from 'react-router-dom'
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

        <label htmlFor="name"><h4>Your Name</h4>
                {errorState.name.length > 0 ? <p>{errorState.name}</p> : null}
                </label>
                <input placeholder="Full Name" type="text" name="name" value={formState.name} onChange={inputChange} />

                <label htmlFor="address"><h4>Where do we deliver?</h4>
                {errorState.address.length > 0 ? <p>{errorState.address}</p> : null}</label>
                <textarea name="address" placeholder="Your Address Here" value={formState.address} onChange={inputChange} />

                <label htmlFor="size"><h4>Choose a size</h4>
                </label>
                <select id="select-tag" name="size" value={formState.size} onChange={inputChange}>
                    <option value={null}>*choose a size*</option>
                    <option value="small">10 inch:  {price1}</option>
                    <option value="medium">14 inch:  {price2}</option>
                    <option value="large">16 inch:  {price3}</option>
                </select>

                
                <div className="toppings">
                    <h4 id="toppings">Choose your toppings</h4>

                    <label htmlFor="pepperoni">Pepperoni</label>
                    <input className="checkbox" type="checkbox" name="pepperoni" value={formState.pepperoni} onChange={inputChange} />
                   
                   <label htmlFor="mushroom">Mushroom</label>
                    <input className="checkbox" type="checkbox" name="mushroom" value={formState.mushroom} onChange={inputChange} />
                   
                   <label htmlFor="onion">Onion</label>
                    <input className="checkbox" type="checkbox" name="onion" value={formState.onion} onChange={inputChange} />
                   
                    <label htmlFor="onion">Olive</label>
                    <input className="checkbox" type="checkbox" name="olive" value={formState.olive} onChange={inputChange} />
                   
                   <label htmlFor="cheese">Extra Cheese</label>
                    <input className="checkbox" type="checkbox" name="extraCheese" value={formState.extraCheese} onChange={inputChange} />    

                    
                </div>    

                    <label htmlFor="special"><h4>Any Special Requests?</h4></label>
                <textarea name="special" value={formState.special} onChange={inputChange} />

                <h4>All Done?</h4>
                <button disabled={buttonDisabled} type="submit">Place Your Order</button>
            </form>
            <pre>{JSON.stringify(postedData, null, 2)}</pre>
        </>
    )
}

export default Form;
    
    
    
    
    
    
    

