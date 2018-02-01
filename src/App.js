import React, { Component } from 'react';
import './App.css';
import Axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading  : false,
      reqAlluser : true,
      req30Days  : false,
      isHover    : '',
      prom       : []
    }
  }
  componentDidMount() {
    this.setState({
      isLoading: true
    });
    //To get the top 100 campers of all time: 
    Axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
      .then( res => {
        return this.setState({ 
          isLoading  : false,
          reqAlluser : true,
          req30Days  : false,
          prom       : res.data
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  handlePast30Days = (event) => {
    //https://fcctop100.herokuapp.com/api/fccusers/top/recent
    Axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
      .then( res => {
        return this.setState({ 
          isLoading  : false,
          reqAlluser : false,
          req30Days  : true,
          prom       : res.data
        })
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(event);
  }
  handleAllTime = (event) => {
    //To get the top 100 campers of all time: 
    Axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
      .then( res => {
        return this.setState({ 
          isLoading  : false,
          reqAlluser : true,
          req30Days  : false,
          prom       : res.data
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  eventHover = (e) => {
    this.setState({
      isHover: !this.state.isHover
    });
  }
  //vue
  render() {
    const { prom, reqAlluser, req30Days, isLoading } = this.state;
    let loopAllData = prom.map( (element,i) => {
      return <LoopAllData 
        key={i}
        index={i}
        element={element}
      />
    });
    
    if (isLoading) {
      return <p>Loading ...</p>;
    }
    let reqAll = req30Days ? 'border p-2 border-info': ''
    let req30  = reqAlluser ? 'border p-2 border-warning': ''
    const thBtn = this.state.isHover ? 'border-danger': ''
    return (
      <div className="container">
        <div className="row">
          <h3>the cream of the cream</h3>
        </div>
        <table className="table table-responsive">
          <thead>
            <tr>
              <th className='text-center'>Rank</th>
              <th className='text-left pl-9'>Camper Name</th>
              <th 
                className='text-center' >
                <a 
                  onClick={this.handlePast30Days} 
                  onMouseEnter={this.eventHover} 
                  onMouseLeave={this.eventHover}
                  className={ `${req30} th-30 ${thBtn}` }>
                  Points in past 30 days
                </a>
              </th>
              <th className='text-center'>
                <a 
                  onClick={this.handleAllTime} 
                  className={ `${reqAll} th-all-time` }>
                  All time points
                </a>
              </th>
            </tr>
          </thead>
          <tbody>
            {loopAllData }
          </tbody>
        </table>
      </div>
    );
  }
}
const LoopAllData = ({element, index }) =>  {
  return ( 
    <tr className="text-center">
      <td className="text-center font-weight-bold">{index+1}</td>
      <td className='text-left pl-5 no-img'>
        <span className="mr-3">
          <img src={element.img} alt={index} className='rounded-circle' />
        </span>
        {element.username}
      </td>
      <td className='text-center'>{element.recent}</td>
      <td className='text-center'>{element.alltime}</td>
    </tr>
  )
}
export default App;
