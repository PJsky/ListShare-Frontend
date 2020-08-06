import * as Yup from "yup";

const registerSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid Email')
        .min(6, 'Too Short ')
        .max(50, 'Too Long ')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Too Short'),
    passwordConfirmation: Yup.string()
        .min(6, 'Too Short')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

export default registerSchema;