import React from 'react'
import axios from 'axios'
import isEmail from 'validator/lib/isEmail'
import validator from 'validator'


class Login extends React.Component {
    constructor(){
        super()
        this.state = {
            email: '',
            errorMsg:''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value 
        })
    }

    handleBlur = () => {
      
        const { history } = this.props
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response=>{
            const users = response.data
            console.log(users)
            let myUser = users.find(user=>{
                return user.email == this.state.email
            })
           
            if(validator.isEmail(this.state.email)) {
                if (users.find(user=>{return user.email == this.state.email})) {
                    localStorage.setItem('loginStatus', true)
                    localStorage.setItem('id', myUser.id)
                    history.push(`/dashboard/${myUser.id}`)
                } else {
                    this.setState({errorMsg: 'Not Found'})
                }
            } else {
                this.setState({errorMsg: 'Invalid Email'})
            }
        })
    }

    componentDidMount = () => {
        console.log('login CDM')
        const { history } = this.props
        let loginStatus = localStorage.getItem('loginStatus')
        let id = localStorage.getItem('id')
        if(loginStatus == 'true') {
            history.push(`/dashboard/${id}`)
        }
    }
   
    render(){
        console.log('render')
        return (
            <div>
                <h1>Login</h1>
                <input  type="text"                     
                        value={this.state.email}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        name="email"
                        placeholder="enter email"
                /> <br/>
                <label>{this.state.errorMsg}</label>
            </div>
        )
    }
}
export default Login