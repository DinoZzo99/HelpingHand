const loginStatusReducer=(state='admin', action)=>{
    switch(action.type){
        case 'GUEST':
            return 'guest'
        case 'USER':
            return 'user'
        case 'ADMIN':
            return 'admin'
        default:
            return state
    }
}

export default loginStatusReducer;