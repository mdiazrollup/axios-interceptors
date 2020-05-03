import React, { Component } from 'react';
import './Blog.css'; 
import Posts from '../../containers/Posts/Posts';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';
import asyncComponent from '../../hoc/asyncComponent';


//Lazy loading component
const AsyncNewPost = asyncComponent(() => {
    return import('../NewPost/NewPost');
})

class Blog extends Component {
    state = {
        auth: true
    }

    render () {
    
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li>
                                <NavLink 
                                to="/posts" 
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    textDecoration: 'underline'
                                }}>Posts</NavLink>
                            </li>
                            <li>
                            <NavLink to={{
                                pathname: "/new-post",
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }} exact>New Post</NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
                {/* To show only one route at the time */}
                <Switch>
                    {/* <-- with exact attribute to check the full path for the / path --> */}
                    {/* The variable auth could be use as Guard */}
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost}/> : null}
                    <Route path="/posts" component={Posts}/>
                    <Redirect from="/" to="/posts" />
                    {/* At last because the order is important to not interfere with /new-post */}
                    {/* <Route path="/:id" exact component={FullPost}/> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;