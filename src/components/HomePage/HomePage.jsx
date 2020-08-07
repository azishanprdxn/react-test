import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import './HomePage.scss';
import Loader from './../Loader/Loader';
import { userActions } from '../../actions';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    document.title = "React Test | Home";

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
      return <h3 className="error">Error: {error.message}</h3>;
    } else if (!isLoaded) {
      return <Loader />;
    } else {
      return (
        <div className="wrapper">
          <div className="main">
            <Router>
              <div>
                <p>Images</p>
                <ul>
                  {data.slice(0, showData).map(item => (
                    <li key={item.id}>
                      <div className="content">
                        <span className="list-id">{item.id}</span>
                        <Link to={`/image/${item.id}`}>
                          <img src={item.thumbnailUrl} />
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
                <Switch>
                  <Route path="/image/:id" children={
                    <SelectedImage data={this.state.data} />
                  } />
                </Switch>
              </div>
            </Router>
            <div className="logout">
              <h3>{user.firstName} {user.lastName}</h3>
              <Link to="/login" title="Logout">Logout</Link>
            </div>
          </div>
        </div>
      );
    }
  }
}

const SelectedImage = (props) => {
  let { id } = useParams();
  let { data } = props;
  const showData = 20;
  let imageUrl;

  data.slice(0, showData).map(item => (
    Number(id) === item.id ? imageUrl = item.url : null
  ));

  return (
    <div className="selected">
      <div className="selected-image">
        <h3>Selected Image</h3>
        <img src={imageUrl} />
        <Link to="/" title="Remove">Remove</Link>
      </div>
    </div>
  );
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