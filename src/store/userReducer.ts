const initialState = {
    userName: 'Cyan'
}

export default (state = initialState, { type, payload }: any) => {
    switch (type) {
        case "CHANGE_NAME":
            return {...state, userName: payload}
    }

    return state
}