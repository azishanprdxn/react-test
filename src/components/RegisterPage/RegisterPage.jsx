import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: '',
        lastName: '',
        username: '',
        password: ''
      },
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;
    if (user.firstName && user.lastName && user.username && user.password) {
      this.props.register(user);
    }
  }

  render() {
    const { registering } = this.props;
    const { user, submitted } = this.state;
    return (
      <div>
        <h2>Register</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName" value={user.firstName} onChange={this.handleChange} />
            {submitted && !user.firstName &&
              <div>First Name is required</div>
            }
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastName" value={user.lastName} onChange={this.handleChange} />
            {submitted && !user.lastName &&
              <div>Last Name is required</div>
            }
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" value={user.username} onChange={this.handleChange} />
            {submitted && !user.username &&
              <div>Username is required</div>
            }
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" value={user.password} onChange={this.handleChange} />
            {submitted && !user.password &&
              <div>Password is required</div>
            }
          </div>
          <div>
            <button>Register</button>
            {registering &&
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            }
            <Link to="/login">Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

function mapState(state) {
  const { registering } = state.registration;
  return { registering };
}

const actionCreators = {
  register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };