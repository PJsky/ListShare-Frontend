import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik'; 
import axios from "axios";

const PasswordpasswordModal = ({ handleClose, show, children, accessCode, setIsModalActive, setListPassword }) => {
    const showHideClassName = show ? "passwordModal display-block" : "passwordModal display-none";
  
    return (
      <div className={showHideClassName} onClick={(e)=>{
        //if(e.target.classList[0] == "passwordModal")handleClose();
      }}>
        <section className="passwordModal-main">
          <h2>{accessCode || "Hello"}</h2>
          <p className="passwordModal-paragraph">Please enter password:</p>
          <Formik
                initialValues={{ listPassword:'' }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
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
                          if(error.response.status != 400) {
                              alert("Trying to access not existing list")
                          }
                      });
                    }, 400);
                }}
                >
                {({ isSubmitting }) => (
                    <Form>
                    <Field type="password" name="listPassword" className="passwordModal-input"/>
                    <ErrorMessage name="listPassword" component="div" />
                    <button type="submit" disabled={isSubmitting} className="passwordModal-submit-button">
                        Submit
                    </button>
                    </Form>
                )}
                </Formik>

          {children}
          {/* <button onClick={handleClose}>close</button> */}
        </section>
      </div>
    );
  };

  export default PasswordpasswordModal;