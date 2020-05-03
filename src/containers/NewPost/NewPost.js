import React, { Component } from 'react';

import './NewPost.css';
import axios from '../../axios';
import  {Redirect} from 'react-router-dom'; 

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        submitted: false
    }

    componentDidMount() {
        // add code here to prevent mount if auth.
        // It is a guard
    }

    postDateHandler = () => {
        const post = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        };
        axios.post('/posts', post)
            .then(response => {
                console.log(response);
                this.setState({submitted: true});
                //Another to redirect, more elegant. If you use push it is add to the history contrary to replace
                //this.props.history.push('/posts')
            });
    }

    render () {
        let redirect = null;

        //conditionally redirect
        if(this.state.submitted) {
            redirect = <Redirect to="/posts"/>;
        }
        return (
            <div className="NewPost">
                {redirect}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.postDateHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;