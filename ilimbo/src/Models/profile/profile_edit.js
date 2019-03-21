import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import HomeHeader from '../home/header'
import {
  Form, Button, FormGroup,
  FormControl
} from "react-bootstrap";
import './styles/profile_edit.css'


class ProfileEdit extends Component {
  constructor (props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      github: '',
      linkedin: '',
      twitter: '',
      id: this.props.match.params.user_id
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount () {
    let myHeaders = new Headers();
    myHeaders.append('pragma', 'no-cache');
    myHeaders.append('cache-control', 'no-cache');
    let myInit = {
      method: 'GET',
      headers: myHeaders,
    };
    fetch(process.env.REACT_APP_API+'/user/' + this.props.match.params.user_id, myInit)
      .then(response => response.json())
      .then(response => this.setState({...response.data[0]}))
  }
  handleChange (event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }
  handleSubmit () {
    fetch(process.env.REACT_APP_API + '/user/', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...this.state})
    })
      .then(response => response.json())
      .then(response => {
        if (response.status !== 'success') {
          alert('Failed to save changes. Please try again later.');
        } else {
          this.props.history.push('/profile/' + this.props.match.params.user_id)
        }
      });
  }
  render() {
    return (
      <div >
        <HomeHeader  />
        <div className='form_panel'>
          <div>
            <FormGroup controlId="first_name" bsSize="large">
              <h4>First Name:
                <FormControl
                  size="lg"
                  type="text"
                  label='asdjfl'
                  placeholder="first name"
                  value={this.state.first_name}
                  onChange={this.handleChange}
                />
              </h4>
            </FormGroup>
          </div>
          <div>
            <FormGroup controlId="last_name" bsSize="large">
              <h4>Last Name:
                <FormControl
                  type="text"
                  placeholder="last name"
                  value={this.state.last_name}
                  onChange={this.handleChange}
                />
              </h4>
            </FormGroup>
          </div>
          <div>
            <FormGroup controlId="email" bsSize="large">
              <h4>Email:
                <FormControl
                  type="text"
                  placeholder="email address"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </h4>
            </FormGroup>
          </div>
          <div>
            <FormGroup controlId="github" bsSize="large">
              <h4>Github Profile:
                <FormControl
                  type="text"
                  placeholder="Github link"
                  value={this.state.github}
                  onChange={this.handleChange}
                />
              </h4>
            </FormGroup>
          </div>
          <div>
            <FormGroup controlId="linkedin" bsSize="large">
              <h4>Linkedin Profile:
                <FormControl
                  type="text"
                  placeholder="Linkedin link"
                  value={this.state.linkedin}
                  onChange={this.handleChange}
                />
              </h4>
            </FormGroup>
          </div>
          <div>
            <FormGroup controlId="twitter" bsSize="large">
              <h4>Twitter Profile:
                <FormControl
                  type="text"
                  placeholder="Twitter link"
                  value={this.state.twitter}
                  onChange={this.handleChange}
                />
              </h4>
            </FormGroup>
          </div>
          <div className='save_profile'>
            <button className='btn_cancel' onClick={() => this.props.history.push('/profile/' + this.props.match.params.user_id)}><b>Cancel</b></button>
            <button className='btn_save' onClick={this.handleSubmit}><b>save</b></button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(ProfileEdit);
