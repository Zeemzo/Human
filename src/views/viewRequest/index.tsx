import * as React from 'react';

import axios from 'axios';
// import * as ReactDOM from '../../../node_modules/@types/react-dom';
export class Request extends React.Component<any, any>{
  constructor(props) {
    super(props);

    this.state = {
      needs: []
    }

  }

  public componentDidMount() {
    axios
      .get("http://localhost:7000/api/request/getall")
      .then(data => {

        // const lol=JSON.parse(data.data);
        // console.log(data.data.needs);

        this.setState(data.data);
        // console.log(this.state.needs);
      })
      .catch((err) => { })
  }

  public render() {
    return (
      <div className="App">
        {/* {this.state.needs[10].description} */}
        {this.state.needs.map((item, i) => (
          <li className="travelcompany-input" key={i}>
            <span className="input-label">
               email: {item.email} | Type: {item.type}

            </span>
          </li>
        ))}
      </div>
    );
  }
}

// ReactDOM.render(
//   <TableUser />,
//   document.getElementById('container')
// );