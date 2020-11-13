import * as yup from 'yup'

const Schema = yup.object().shape({
    name: yup
        .string()
        .required('Name is required')
        .min(2, 'Name must be more than one character'),

    address: yup
        .string()
        .required('Must provide an address'),

    size: yup
        .string()
        .required('Must choose a size'),

    pepperoni: yup
        .boolean(),
    
    mushroom: yup
        .boolean(),
    
    onion: yup
        .boolean(),

    olive: yup
        .boolean(),
 
    extraCheese: yup
        .boolean(),
    
    special: yup
        .string()
})

export default Schema