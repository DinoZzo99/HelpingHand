const userIdReducer=(state=1, action)=>{
    switch(action.type){
        case 'USER_LOGGED_IN':
            return action.userId
        default:
            return state
    }
}

export default userIdReducer;