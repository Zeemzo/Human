import * as React from 'react';

import axios from 'axios';
// import * as ReactDOM from '../../../node_modules/@types/react-dom';
export class Request extends React.Component <any,any>{
  constructor(props) {
    super(props);

    this.state ={
      }

  }

  public componentDidMount() {
    axios
      .get("http://localhost:7000/api/request/get/5b9040638106130459")
      .then(({ data }) => {
        // const lol=JSON.parse(data);
        // console.log(lol.email);
        // console.log(data);
        this.setState(data);
      })
      .catch((err) => { })
  }

  public render() {
    return (
      <div className="App">
        
          <h1 className="App-title">{this.state.email}</h1>
          <h1 className="App-title">{this.state.latitude}</h1>
          <h1 className="App-title">{this.state.longitude}</h1>
          <h1 className="App-title">{this.state.description}</h1>
          <h1 className="App-title">{this.props.type}</h1>
          {/* <h1 className="App-title">{()=>{return (this.state.status)?true:false}}</h1> */}



       
      </div>
    );
  }
}

// ReactDOM.render(
//   <TableUser />,
//   document.getElementById('container')
// );