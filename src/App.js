import React, { Component } from 'react';
import './App.css';
import Axios from 'axios';


class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      prom : []
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
          isLoading: false,
          prom: res.data 
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  //vue
  render() {
    const { prom, isLoading } = this.state;
    let loopAllData = prom.map( (element,i) => {
     return  <tr className="table-info">
        <th scope="row">{i+1}</th>
        <td>
          <span className="mr-3">
            <img src={element.img} alt={i} className='rounded-circle' />
          </span>
          {element.username}
        </td>
        <td>{element.recent}</td>
        <td>{element.alltime}</td>
      </tr>
    });

    if (isLoading) {
      return <p>Loading ...</p>;
    }
    return (
      <div className="container">
        <div className="row">
          <h3>the cream of the cream</h3>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Rank</th>
              <th className='rounded-circle'>Camper Name</th>
              <th><a>Points in past 30 days</a></th>
              <th><a>All time points</a></th>
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

export default App;
