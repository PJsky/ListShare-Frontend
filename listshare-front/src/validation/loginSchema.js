import * as Yup from "yup";

const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid Email')
        .min(6, 'Too Short ')
        .max(50, 'Too Long ')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Too Short')
})

export default loginSchema;