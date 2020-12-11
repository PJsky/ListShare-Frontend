import React, { useEffect } from 'react';
import axios from 'axios';
import { isDOMComponent } from 'react-dom/test-utils';


const Item = ({name, deletePayload, setListItems, listItems, isDone}) => {
    
    const deleteItem = () =>{
        axios.delete(global.BACKEND + "/api/items", {
            data:deletePayload
        })
        setListItems(listItems.filter(i=>i.id != deletePayload.ItemId))
    }

    const checkBox = (done) =>{
        axios.put(global.BACKEND + "/api/items", {
            ...deletePayload,
            IsDone: done
        },{
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("AccessToken")
            }
        })
    }

    return(
        <>
        <div className="item-container">
            <label class="container">{name || "no name"}
                <input type="checkbox" defaultChecked={isDone} 
                onChange={(e)=>{checkBox(e.currentTarget.checked)}}/>
                <span class="checkmark"></span>
            </label>
            <div className="delete-item"
            onClick={()=>{
                deleteItem();
            }}>X</div>
        </div>
        </>
    )
}

export default Item;
