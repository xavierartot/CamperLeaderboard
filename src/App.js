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
  eventHover = (event) => {
    console.log(event);
    this.setState({
      isHover: !this.state.isHover
    });
    return this.state.isHover ? 'border-info!important': ''     
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
              isHoverProp      = {this.eventHover}
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
  handle30, handleReqAlluser,isHoverProp, reqAlluser,req30Days
}) => {
  console.log(isHoverProp );
  const isReqAll = req30Days   ? 'border p-2 border-info'    : ''
  const isReq30  = reqAlluser  ? 'border p-2 border-warning' : ''
  const isThBtn  = isHoverProp ? 'border-danger'             : ''
  //let xav = () => {
  //}
  return <tr>
    <th className='text-center'>Rank</th>
    <th className='text-left pl-9'>
      Camper Name 
      <span role='img' aria-label='classment'>🎖</span>
    </th>
    <th 
      className='text-center' >
      <a 
        onClick      = {  handle30   }
        onMouseEnter    = {   isHoverProp }
        className    = {  `${isReq30 } th-30 ${isThBtn } ` } >
				30 best
      </a>
    </th>
    <th className='text-center'>
      <a 
        onClick         = {handleReqAlluser}
        className       = { `${isReqAll} th-all-time` }>
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
