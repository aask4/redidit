export default (state=null, action) => {
    switch(state.type){
        case "TEST":
        return action.payload
        break
    }
    return state
}