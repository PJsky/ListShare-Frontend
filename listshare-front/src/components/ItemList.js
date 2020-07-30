import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import PasswordModal from './Modals/PasswordModal';


const ItemList = (props) => {
    let doesListExist = true;
    const listAccessCode = props.match.params.listCode;
    const history = useHistory();
    const [isModalActive, setIsModalActive] = useState(false);
    const [listPassword, setListPassword] = useState("");

    useEffect(()=>{
        axios.get(global.BACKEND+ "/api/ItemLists/", {
            headers:{},
            params:{
                "AccessCode": "#" + listAccessCode,
                "ListPassword": listPassword
            }
        })
        .then(({data}) => {
        }).catch( error => {
            setIsModalActive(true);
            if(error.response.status != 400) {
                alert("Trying to access not existing list")
                history.push("/");
            }
        });
    },[isModalActive])

    const getItemList = () =>{
        if(isModalActive) return (
            <PasswordModal show={isModalActive} 
            handleClose={()=>setIsModalActive(false)}
            accessCode={"#"+listAccessCode}
            setIsModalActive={setIsModalActive}
            setListPassword={setListPassword}
            >
            </PasswordModal>
        )
        return (
            <div className="itemList-container">
                <h2>#{listAccessCode}</h2>
            </div>
        )
    }

    return(
        <>
            {getItemList()}
        </>
    )

    
}

export default ItemList;
