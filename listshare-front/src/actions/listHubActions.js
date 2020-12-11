export const hub_connect = (hubName) => {
    return{
        type: 'HUB_CONNECT',
        payload: hubName
    }
}

export const hub_send_message = (message) => {
    return{
        type: "HUB_SEND_MESSAGE",
        payload: message
    }
}

export const hub_join_group = (groupName) => {
    return{
        type: "HUB_JOIN_GROUP",
        payload: groupName
    }
}
export const hub_quit_group = (groupName) => {
    return{
        type: "HUB_QUIT_GROUP",
        payload: groupName
    }
}
export const hub_send_group_message = (groupName, message) => {
    return{
        type: "HUB_SEND_GROUP_MESSAGE",
        payload: message,
        group: groupName
    }
}
