import React, {Component} from 'react';
import {signUp} from "../api/index";
import {RegistrationException} from "../exception/index";
import Link from "react-router-dom/es/Link";

class Register extends Component {
    constructor(props){
        super(props);

        this.state={
            username:'',
            password:''
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
        let data={
            username: this.state.username,
            password: this.state.password
        };

        signUp(data)
            .then((response)=>{
                console.log("response",response);
                if(response.status !== 200){
                    throw new RegistrationException();
                }
            })
            .catch((error)=>{
                if(error instanceof RegistrationException){
                    console.log("Error while registering user");
                }
            });
    }

    render() {
        return (
            <div className="container" style={{marginTop:'80px'}}>
                <center><h2>Registration Form</h2></center>
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
                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
                <br/>
                <div>
                    Already have account. Then
                    <a><Link to="/"> Login</Link></a>!!
                </div>
            </div>
        );
    }
}

export default Register;
