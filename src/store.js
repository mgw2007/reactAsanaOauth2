import {createStore, combineReducers, applyMiddleware} from 'redux';
import {authMiddleware, authReducer as auth} from 'redux-implicit-oauth2';
import {reducer as formReducer} from 'redux-form'
import appReducers from "./reducers";
console.log('__DEV__',process.env.NODE_ENV)

const store = createStore(
    combineReducers({
        // other reducers
        app:appReducers ,
        form: formReducer,
        auth
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
        // other middleware
        authMiddleware
    )
)

export default store;