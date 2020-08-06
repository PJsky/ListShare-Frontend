import * as Yup from "yup";

const listPasswordSchema = Yup.object().shape({
    listPassword: Yup.string()
        .min(3, 'Too Short')
})

export default listPasswordSchema;