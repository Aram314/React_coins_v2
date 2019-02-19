import React from 'react'
import ReactDom from 'react-dom'
import Header from './components/common/header'
import './index.css'
import List from './components/list/list'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import NotFound from './components/notFound/notFound'
import Detail from './components/detail/detail'

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Header />
                <Switch>
                    <Route path='/' component={List} exact />
                    <Route path='/currency/:id' component={Detail} exact/>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        </BrowserRouter>
    )
};

ReactDom.render(<App />, document.getElementById('root'));