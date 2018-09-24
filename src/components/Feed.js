import * as React from 'react';
import { Tab, Tabs} from 'react-bootstrap';
// import tumb from './thumbnail.png';
// import axios from 'axios';
// import { ClipLoader } from 'react-spinners';
import withAuthorization from './withAuthorization';
// import { HUMANBACKEND } from '../constants/routes';
import Provision from '../components/Provision'
import Need from '../components/Need'

// // import store from '../store/index'
// const feed = () => {

// }

class Feed extends React.Component {
  constructor(props) {
    super(props);
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
