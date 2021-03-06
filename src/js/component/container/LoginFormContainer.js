import React, {Component} from 'react';
import ReactDOM from "react-dom";
import SignUpContainer from "./SignUpFormContainer";
import {getUser} from "../../ajax/getUser";

class LoginFormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        }
    }


    handleEmailChange(event) {
        this.setState({
            email: event.target.value,
        });
    }

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value,
        });
    }

    handleSubmit() {
        fetch(`http://localhost:3000/api/users/${this.state.email}/${this.state.password}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
            .then(
                (result) => {
                    alert(result);
                },
                (error) => {
                    alert("Something went wrong")
                }
            );
    }

    handleRegistrationClick() {
        const wrapper = document.getElementById("create_login_form");
        ReactDOM.render(<SignUpContainer/>, wrapper);
        return false;
    }

    render() {
        return <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <form className="px-4 py-3">
                        <div className="form-group">
                            <label htmlFor="exampleDropdownFormEmail1">Email address</label>
                            <input onChange={event => this.handleEmailChange(event)} type="email"
                                   className="form-control" id="exampleDropdownFormEmail1"
                                   placeholder="email@example.com"
                                   value={this.state.email}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleDropdownFormPassword1">Password</label>
                            <input onChange={event => this.handlePasswordChange(event)} type="password"
                                   className="form-control"
                                   id="exampleDropdownFormPassword1"
                                   placeholder="Password"
                                   value={this.state.password}/>
                        </div>
                        <button onClick={() => this.handleSubmit()} className="btn btn-primary" data-toggle="modal"
                                data-target="#registration">Sign in
                        </button>
                        <p><span>Not registered yet? </span>
                        </p>
                        <button type="button" onClick={() => this.handleRegistrationClick()}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    };
}

export default LoginFormContainer;