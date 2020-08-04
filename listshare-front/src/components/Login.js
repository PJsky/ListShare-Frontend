import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { user_log_in, user_log_out } from '../actions/userActions';
import { useHistory } from 'react-router-dom';


const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    return(
        <>
            <div className="login-container">
                <h2>Login</h2>
                <Formik
                initialValues={{ email:'abc@example.com', password:'123123321' }}
                onSubmit={(values, { setSubmitting }) => {
                    axios.post(global.BACKEND + "/api/users/login", {
                        "email": values['email'],
                        "password": values['password']
                    }).then((response)=>{
                        console.log(response.data);
                        setSubmitting(false);
                        let token;
                        try{
                            token = response.data.token;
                            console.log(token);
                        }catch{
                            token = "";
                        }
                        window.localStorage.setItem("AccessToken", token);
                        dispatch(user_log_in());
                        history.push('/');
                    }).catch((error)=>{
                        console.log(error.response);
                        try{
                            window.localStorage.removeItem("AccessToken");
                            dispatch(user_log_out());
                        }catch{}
                        setSubmitting(false);
                    })
                }}
                >
                {({ isSubmitting, errors }) => (
                    <Form>
                        <label for="email" className="login-email-label">Email:</label>
                        <Field type="text" name="email" className="login-email-input" id="email"/>
                    <ErrorMessage name="email" component="div" />
                        <label for="password" className="login-password-label">Password:</label>
                        <Field type="password" name="password" className="login-password-input" id="password"/>
                    <ErrorMessage name="password" component="div" />
                    {/* <Link to="/content"> */}
                        <button type="submit" disabled={isSubmitting} className="login-button">
                            Submit
                        </button>
                    {/* </Link> */}
                    </Form>
                )}
                </Formik>
            </div>
        </>
    )
}

export default Login;
