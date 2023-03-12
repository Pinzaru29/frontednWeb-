import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import {createStore} from 'redux';
import {Provider} from 'react-redux';


const defaultState  = {
    isLogged: (localStorage.getItem("token") !== null || sessionStorage.getItem("token") !== null),
    Role: 'a',
}

const reducer = (state = defaultState, action: { type: string, payload: boolean | string  }) => {
    switch (action.type) {
        case "AuthState":
            if (typeof action.payload === "boolean") {
                return {...state, isLogged: action.payload}
            }
            return state


        case "RoleState":
            if (typeof action.payload === "string") {
                return {...state, Role: action.payload}
            }
            return state
        default:
            return state;
    }
}

const store = createStore(reducer);

export type RootState = ReturnType<typeof store.getState>


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
