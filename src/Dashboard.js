import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Dashboard extends React.Component {
    constructor(){
        super()
        this.state = {
            user: {},
            posts: []
        }
    }

    componentDidMount() {
        let id = this.props.match.params.id
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response=>{
            this.setState({user: response.data})
            axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
            .then(response=>{
                this.setState({posts: response.data})
            })
        })
    }
    changeLoginStatus = () => {
        localStorage.clear()
        
    }

    render() {
        return (
            <div>
            <Link to='/' onClick={this.changeLoginStatus}>Logout</Link>
                <h1>My Dashboard</h1>
                 <h2>{this.state.user.name}</h2>
                 <h2>{this.state.user.email}</h2>
                 <h2>{this.state.user.phone}</h2>
                {
                    this.state.posts.map(post=>{
                        return (
                            <div key={post.id}>
                                <h2>{post.title}</h2>
                                <h4>{post.body}</h4>
                            </div>
                        )
                    })
                }
               
            </div>
        )
    }
    
}
export default Dashboard