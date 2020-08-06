import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import CreateListModal from './Modals/CreateListModal';


const Nav = () => {
    let history = useHistory();
    const [isCreateModalActive, setIsCreateModalActive] = useState(false);
    const [starredLists, setStarredLists] = useState([]);
    const [isDataInvalid, setIsDataInvalid] = useState(false);
    const getRecentLists = () => {
        let myStorageLists = [];
        let recentLists = [];
        try{
            myStorageLists = window.localStorage.getItem('RecentItemLists').split(',');
        }catch{}
        for(var list of myStorageLists){
        //Copy of immutable string
         const historyLink = list;
            recentLists.push(
                <div className="mainpage-recent" onClick={()=>{history.push(historyLink)}}>
                    #{list}
                </div>
            )     
        }
        return recentLists.reverse();
            
    }

    const getStarredLists = () => {
        //var starredLists = []
        var lists = [];
        for(var list of starredLists){
            const historyLink = list.accessCode;
            lists.push(
                <div className="mainpage-recent" onClick={()=>{history.push(historyLink.slice(1))}}>
                    {list.accessCode || "no name"}
                </div>
            )
        }        
        if(starredLists.length <= 0) 
        return ;
        else
        return (
            <div className="mainpage-recent-container">
                <h3>Starred Lists:</h3>
                {lists}
            </div>
        )
    }

    useEffect(()=>{
        axios.get(global.BACKEND + "/api/users/starred", {
            headers:{
                'Authorization': 'Bearer ' + localStorage.getItem('AccessToken')
            }
        })
        .then(({data}) => {
            setStarredLists(data);
        }).catch((error)=>{
        })
    }, [])

    return(
        <>
            <div className="mainpage-container">
                {/* <h1>Hello!</h1> */}
                <h2>Search for a list</h2>
                <Formik
                initialValues={{ searchList:'#0BNLIBA4' }}
                onSubmit={(values, { setSubmitting }) => {
                        var noHashSearchList = values["searchList"].split('').filter(x=>x !='#').join('')
                        axios.get(global.BACKEND+ "/api/ItemLists/"+ noHashSearchList)
                        .then(({data}) => {
                            setSubmitting(false);
                            history.push(`/${noHashSearchList}`);
                        }).catch( error => {
                            setSubmitting(false);
                            setIsDataInvalid(true);
                        });
                }}
                >
                {({ isSubmitting }) => (
                    <>
                    <Form onChange={()=>{setIsDataInvalid(false)}}>
                    <Field type="text" name="searchList" className="mainpage-search-input"/>
                    <ErrorMessage name="searchList" component="div" />
                    <button type="submit" disabled={isSubmitting} className="mainpage-search-button">
                        Search
                    </button>
                    </Form>
                    <div className={isDataInvalid?"form-error":"hidden-class"}>Invalid access code</div>
                    </>
                )}
                </Formik>
                <p>or</p>
                <button className="mainpage-create-button"
                 onClick={()=>{setIsCreateModalActive(true)}}>
                    Create List
                </button>
            </div>
            <div className="mainpage-lists">
                <div className="mainpage-recent-container">
                    <h3>Recently Visited:</h3>
                    {getRecentLists()}
                </div>
                {getStarredLists()}
            </div>
            <CreateListModal
            show={isCreateModalActive}
            setIsCreateModalActive={setIsCreateModalActive}
            />
        </>
    )
}

export default Nav;
