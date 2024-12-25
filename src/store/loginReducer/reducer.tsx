const initalState: { user: null | string } = {
    user: null,
}

type Action = {
    type: string;
    payload: string;
}

const LOGIN_SUCCESS = "LOGIN_SUCCESS";

const loginReducer = (state = initalState, action: Action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
}

export default loginReducer