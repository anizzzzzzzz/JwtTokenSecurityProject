import React, {Component} from 'react';
import {login} from "../api/index";
import {LoginException} from "../exception/index";
import {bindActionCreators} from "redux";
import {token} from "../action/index";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class Login extends Component {
    constructor(props){
        super(props);

        this.state={
            username:'',
            password:'',
            jwttoken:''
        };

        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    handleSubmit(event){
        event.preventDefault();

        let data = {
            username:this.state.username,
            password:this.state.password
        };

        login(data)
            .then((response)=>{
                if(response.status !== 200){
                    throw new LoginException();
                }
                else{
                    return response.json();
                }
            })
            .then((result)=>{
                console.log("Token",result);
                this.props.token(result.token);
                this.props.history.push({
                        pathname: "/home"
                    });
            })
            .catch((e)=>{
                if(e instanceof LoginException){
                    console.log("Error while logging you in");
                }
            });
    }

    render() {
        return (
            <div className="container" style={{marginTop:'80px'}}>
               <center><h2>Login Form</h2></center>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label >Email : </label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={this.handleChange}
                            id="username"
                            placeholder="Enter username"
                            name="username"/>
                    </div>
                    <div className="form-group">
                        <label>Password : </label>
                        <input
                            type="password"
                            className="form-control"
                            onChange={this.handleChange}
                            id="password"
                            placeholder="Enter password"
                            name="password"/>
                    </div>
                    <div className="checkbox">
                        <label><input type="checkbox" name="remember"/> Remember me</label>
                    </div>
                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
                <br/>
                <div>
                    Don't have account. Then
                    <a><Link to="/sign-up"> Sign Up</Link></a>!!
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        token: token
    },dispatch);
}

export default connect(null, mapDispatchToProps)(Login);
