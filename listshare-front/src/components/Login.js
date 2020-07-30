import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';


const Login = () => {
    
    return(
        <>
            <div className="login-container">
                <h2>Login</h2>
                <Formik
                initialValues={{ email:'abcd@example.com', password:'123123321' }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                    console.log("Logging");
                    }, 400);
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
