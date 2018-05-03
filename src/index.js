import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import {Provider} from "react-redux";
import Root from './containers/Root'
import store from "./store";

const render = Component => {
    ReactDOM.render(
        <Provider store={store}>
            <AppContainer>
                <Component/>
            </AppContainer>
        </Provider>
        ,
        document.getElementById('root')
    )
}

render(Root)

if (module.hot) {
    module.hot.accept('./containers/Root', () => {
        render(Root)
    })
}
