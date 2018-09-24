import * as React from 'react';
import { Tab, Tabs} from 'react-bootstrap';
// import tumb from './thumbnail.png';
import axios from 'axios';
// import { ClipLoader } from 'react-spinners';
import withAuthorization from './withAuthorization';
import { HUMANBACKEND } from '../constants/routes';
import Provision from '../components/Provision'
import Need from '../components/Need'

// // import store from '../store/index'
// const feed = () => {

// }

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      needs: [],
      loading: true
    }

    console.log(localStorage.getItem('token'));
    const token = localStorage.getItem('token')
    axios
      .get(HUMANBACKEND + "/api/request/getall/" + new Date().getUTCDate+new Date().getUTCMonth+new Date().getUTCFullYear+ "/need/", {
        headers: { 'Authorization': "bearer " + token }
      })
      .then(data => {
        this.setState({ loading: false });
        var obj = data.data;
        console.log(obj);
        var arr = [];
        for (var key in obj) {
          arr.push(obj[key]);
        }
        console.log(arr);
        this.setState({ needs: arr });


      })
      .catch((err) => { })



  }



  render() {
    return (
      <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
        <Tab eventKey={1} title="Provision">
          <Provision type={'provision'}/>
        </Tab>
        <Tab eventKey={2} title="Need">
          <Need type={'need'} />
        </Tab>
        <Tab eventKey={3} title="Matched Request" disabled>

        </Tab>
      </Tabs>

    );
  }
}


const authCondition = (authUser) => !!authUser;
export default withAuthorization(authCondition)(Feed);
    // export default Feed;
