import React, { Component } from 'react';
import './App.css';
import Axios from 'axios';
import 'react-fontawesome';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading  : false,
      reqAlluser : true,
      req30Days  : false,
      isHover    : false,
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
  setHover = () => {
    this.setState({
      isHover: true
    });
  }
  removeHover = () => {
   this.setState({
     isHover : false
   });
  }
  render() {
    const { prom, reqAlluser, req30Days, isLoading } = this.state;
    if (isLoading) {
      return <p>Loading ...</p>;
    }
    return (
      <div className="container">
        <div className="row">
          <h3> the cream of the cream <span role='img' aria-label='loop'>🔍</span></h3>
        </div>
        <table className="table table-responsive">
          <thead>
            <InitHeaderTable 
              handle30         = {this.handlePast30Days}
              handleReqAlluser = {this.handleAllTime }
              on      = {this.setHover }
              off      = {this.removeHover }
              isOn = { this.state.isHover}
              reqAlluser       = {reqAlluser}
              req30Days        = {req30Days}
            />
          </thead>
          <tbody>
            <InitLoopAllData initData={prom}/>
          </tbody>
        </table>
      </div>
    );
  }
}
const InitHeaderTable = ({
  handle30, handleReqAlluser,on, off, isOn, reqAlluser,req30Days
}) => {
  const isReqAll = req30Days   ? 'border p-2 border-info'    : ''
  const isReq30  = reqAlluser  ? 'border p-2 border-warning' : ''
  const isOnCss = isOn ? 'border p-2 border-danger' : '';
  return <tr>
    <th className='text-center'>Rank</th>
    <th className='text-left pl-9'>
      Camper Name 
      <span role='img' aria-label='classment'>🎖</span>
    </th>
    <th 
      className='text-center' >
      <a 
        onClick      = {handle30}
        onMouseEnter = {on }
        onMouseLeave = {off}
        className    = {`${isReq30} th-30 ${isOnCss}`} >
				30 best
      </a>
    </th>
    <th className='text-center'>
      <a 
        onClick    = {handleReqAlluser}
        onMouseEnter = {on }
        onMouseLeave = {off}
        className  = {`${isReqAll} th-all-time ${isOnCss}` }>
        All time points
      </a>
    </th>
  </tr>

}
const InitLoopAllData = ({initData}) =>  {
  return ( 
    initData.map( (element, index) => {
      return <tr className="text-center" key={index}>
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
    })
  )
}
