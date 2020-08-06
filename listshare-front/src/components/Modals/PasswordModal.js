import React, { Component, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik'; 
import axios from "axios";
import listPasswordSchema from "../../validation/listPasswordSchema";

const PasswordpasswordModal = ({ handleClose, show, children, accessCode, setIsModalActive, setListPassword }) => {
    
    const showHideClassName = show ? "passwordModal display-block" : "passwordModal display-none";
    
    const [isDataInvalid,setIsDataInvalid] = useState(false);

    return (
      <div className={showHideClassName} onClick={(e)=>{
        //if(e.target.classList[0] == "passwordModal")handleClose();
      }}>
        <section className="passwordModal-main">
          <h2>{accessCode || "Hello"}</h2>
          <p className="passwordModal-paragraph">Please enter password:</p>
          <Formik
                initialValues={{ listPassword:'' }}
                validationSchema={listPasswordSchema}
                onSubmit={(values, { setSubmitting }) => {
                    axios.get(global.BACKEND+ "/api/ItemLists/", {
                      headers:{},
                      params:{
                          "AccessCode": accessCode,
                          "ListPassword" : values["listPassword"]
                      }
                    })
                    .then(({data}) => {
                        setSubmitting(false);
                        setListPassword(values["listPassword"])
                        setIsModalActive(false);
                    }).catch( error => {
                        setSubmitting(false);
                        setIsDataInvalid(true);
                        if(error.response.status != 400) {
                            alert("Trying to access not existing list")
                        }
                    });
                }}
                >
                {({ isSubmitting }) => (
                  <>
                    <Form onChange={()=>{setIsDataInvalid(false)}}>
                    <Field type="password" name="listPassword" className="passwordModal-input"/>
                    <button type="submit" disabled={isSubmitting} className="passwordModal-submit-button">
                        Submit
                    </button>
                    </Form>
                    <ErrorMessage name="listPassword" component="div"/>
                    <div className={isDataInvalid?"form-error":"hidden-class"}>Wrong Password</div>
                  </>
                )}
                </Formik>

          {children}
          {/* <button onClick={handleClose}>close</button> */}
        </section>
      </div>
    );
  };

  export default PasswordpasswordModal;