import React, { Component } from 'react';

import Report from 'bv-react-data-report';
import example from './example.json';

import './App.css';

const data=require('./ReportData.json');
class Reports extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){

  }
  render() {
    return (
      <div className="App">
        <Report data={data.data} />
      </div>
    );
  }
}

export default Reports;
