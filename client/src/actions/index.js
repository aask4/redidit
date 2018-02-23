export const addname = (data) => {
    return {
        type: "TEST",
        payload: data
    }
}

export const addActiveUser = (user) => {
    return {
        type: "ACTIVE_USER",
        payload: user
    }
}