import React, { Component } from 'react'
import { connect } from 'react-redux';
import {login} from '../../actions/auth'
import { TextInput, Button, Row } from 'react-materialize';


class Login extends Component {
    state = {
        password: '',
        email: ''
    }

    handleChange = e => this.setState({[e.target.name]: e.target.value})

    submitCredentials = e => {
      e.preventDefault();
      const { loginDispatch } = this.props;

      loginDispatch({
        email: this.state.email,
        password: this.state.password
      });
    }

    render() {
        return (
            <div className="auth-box valign-wrapper">
              <Row className="valign">
                <h2 className="center">[Logo]</h2>
                <form onSubmit={this.submitCredentials}>
                    <TextInput
                    type="text"
                    name="email"
                    label="Email"
                    required
                    value = {this.props.email}
                    onChange = {this.handleChange}/>

                    <TextInput
                    type="password"
                    name="password"                    
                    label="Password"
                    required
                    onChange = {this.handleChange}/>

                    <Button                      
                      large
                      className="orange lighten-2"
                      node="button"
                      type="submit"
                    >
                      Login
                    </Button>
                </form>
              </Row>
            </div>
        )
    }
}

export default connect(
    state => ({
      auth: state.auth
    }),
    dispatch => ({
      loginDispatch: (user, redirect) => {
        dispatch(login(user, redirect));
      }
    })
  )(Login);