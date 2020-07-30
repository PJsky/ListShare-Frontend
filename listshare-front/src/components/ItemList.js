import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const ItemList = (props) => {
    let doesListExist = true;
    const listAccessCode = props.match.params.listCode;
    const history = useHistory();

    axios.get(global.BACKEND+ "/api/ItemLists/", {
        headers:{},
        params:{
            "AccessCode": "#" + listAccessCode
        }
    })
    .then(({data}) => {
        console.log(data);
    }).catch( error => {
        console.log(error.response.status);
        if(error.response.status != 400) {
            alert("Trying to access not existing list")
            history.push("/");
        }
    });
    return(
        <>
            <div className="itemList-container">
                <h2>#{listAccessCode}</h2>
            </div>
        </>
    )
}

export default ItemList;
