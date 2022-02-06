const userIdReducer=(state="", action)=>{
    switch(action.type){
        case 'USER_LOGGED_IN':
            return action.userId
        default:
            return state
    }
}

export default userIdReducer;