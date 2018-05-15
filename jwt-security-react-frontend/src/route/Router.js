import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "../component/Login";
import Register from "../component/Register";
import ShowTasks from "../component/article/ShowArticles";
import AddArticle from "../component/article/AddArticle";
import EditArticle from "../component/article/EditArticle";

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route path="/sign-up" component={Register}/>
                    <Route path="/home" component={ShowTasks}/>
                    <Route path="/add-article" component={AddArticle}/>
                    <Route path="/edit-article" component={EditArticle}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;
