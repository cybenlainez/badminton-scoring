export const changeNameAction = (userName: string) => {
    return {
        type: 'CHANGE_NAME',
        payload: userName
    }
}
