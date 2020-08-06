import React from 'react';
import { Route, Link, Switch, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import './HomePage.scss';
import Loader from './../Loader/Loader';
import { userActions } from '../../actions';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      data: [],
      showData: 20
    }
  }

  componentDidMount() {
    this.props.getUsers();

    // Axios
    axios.get('https://jsonplaceholder.typicode.com/photos')
      .then(
        (res) => {
          this.setState({
            isLoaded: true,
            data: res.data
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { user } = this.props;
    const { error, isLoaded, data, showData } = this.state;

    if (error) {
      return <h2>Error: {error.message}</h2>;
    } else if (!isLoaded) {
      return <Loader />;
    } else {
      return (
        <div>
          {console.log(data)}
          <h1>Hi {user.firstName}!</h1>
          <ul>
            {data.slice(0, showData).map(item => (
              <li key={item.id}>
                <span className="list-id">{item.id}</span>
                <Link to={`/image/${item.id}`}>
                  <img src={item.thumbnailUrl} />
                </Link>
              </li>
            ))}
          </ul>
          <p className="logout">
            <Link to="/login">Logout</Link>
          </p>

          <Switch>
            <Route path="image/:id" children={<SelectedImage />} />
          </Switch>
        </div>
      );
    }
  }
}

const SelectedImage = () => {
  let { imageId } = useParams();

  return <div>{console.log(imageId)}</div>
}

function mapState(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return { user, users };
}

const actionCreators = {
  getUsers: userActions.getAll,
  deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };