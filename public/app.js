import React from 'react'
import ReactDOM from 'react-dom'
// redux
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'
// components
import Router from './components/Router'

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    I am a dummy!
                </div>
            </Router>
        )
    }
}

ReactDOM.render(
    <Provider store={createStore(reducers)}>
        <App />
    </Provider>,
    document.querySelector('#container')
)