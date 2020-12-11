import * as SignalR from '@aspnet/signalr';
import { useDispatch } from 'react-redux';

export const websocketMiddleware = (store) =>{
        let socket = new SignalR.HubConnectionBuilder()
        .withUrl(global.BACKEND + "/ItemListHub")
        .build();
        let WebsocketChange = 0;
        socket.on("ReceiveMessage", function(message){
            store.dispatch({
                type: "HUB_CONNECT",
                payload: WebsocketChange
            });
            WebsocketChange++;
        });
        socket.start().catch(function(err){
            return console.error(err.toString());
        });

        console.log("websocketMiddleware");

        return function(next) {
            console.log(next);
            
            return function(action){
                //Can switch it to switch later
                if(action.type == "HUB_SEND_MESSAGE"){
                    socket.invoke("SendMessageToAll", action.payload).catch((e) =>{
                        return console.log(e);
                    });
                }
                if(action.type == "HUB_JOIN_GROUP"){
                    socket.invoke("JoinGroup", action.payload).catch(e => {
                        console.error(e.toString());
                        let retryConnection = setTimeout(() => {
                            let connectionSuccess = false;
                            console.log("trying again to connect to signalR");
                            socket.invoke("JoinGroup", action.payload).then(()=>{
                                connectionSuccess = true;
                            });
                            if(connectionSuccess)
                                clearTimeout(retryConnection);
                        },1000)
                    });
                }
                if(action.type == "HUB_QUIT_GROUP"){
                    socket.invoke("QuitGroup", action.payload).catch(e => {
                        return console.error(e.toString());
                    });
                }
                if(action.type == "HUB_SEND_GROUP_MESSAGE"){
                    //socket.invoke("SendMessageToGroup",action.group, action.payload)
                }
                next(action);
            }
        }
    
}