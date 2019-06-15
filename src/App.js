import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Provider, { MyContext } from './Provider/';
import './App.css';
import Login from './pages/Login';

class BooksApp extends React.Component {
    render() {
        return (
            <div className="app">
                <Provider>
                    <Switch>
                        <Route exact path={'/login'}
                               render={() =>
                                   <MyContext.Consumer>
                                       {context => context.user ? <Redirect to='/' /> : <Login {...context} />}
                                   </MyContext.Consumer>}
                        />
                        <Route exact path={'/'}
                               render={() =>
                                   <MyContext.Consumer>
                                       {context => context.user ? <Home {...context} /> : <Redirect to='/login' />}
                                   </MyContext.Consumer>}
                        />
                        <Route exact path={'/search'}
                               render={() =>
                                   <MyContext.Consumer>
                                       {context => context.user ? <Search {...context} /> : <Redirect to='/login' />}
                                   </MyContext.Consumer>}
                        />
                    </Switch>
                </Provider>
            </div>
        );
    }
}

export default BooksApp;
