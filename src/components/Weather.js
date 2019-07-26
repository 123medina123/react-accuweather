import React, { Component } from 'react';

import fetchWeather from '../api/Api';
import Content from './Content';
import { connect } from 'react-redux';  
import { bindActionCreators } from 'redux';
import FontAwesome from 'react-fontawesome';

export const PUSH_CITY = 'PUSH_CITY';

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: 'Paris',
      errMsg: ''
    };
  }

  async componentDidMount(){
    const position = await this.getPosition();
    const myLocation = await fetchWeather(position.coords.latitude + ',' + position.coords.longitude);
    this.props.pushCity(myLocation);

  }

  getPosition =  (options) => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  addCity = async(e) => {
    e.preventDefault();
    const {term,favorites} = this.state;
    try{
      const response = await fetchWeather(term);
      return this.props.pushCity(response);
    }
    catch(err){
      this.setState({
        errMsg : err.toString()
      })
    }
  }

  render() {
    const {term} =this.state;
    return (
      <div>
        <div className="header">
          <div className="CountrySelector">
            <form onSubmit={this.addCity} className="navbar-form">
              <div className="form-group">
                <input
                    value={term}
                   onChange={event => this.setState({term: event.target.value})}
                    className="form-control input-search" />
                    <div className="error">{this.state.errMsg}</div>
                </div>
                  <button type="submit" className="btn btn-default">
                  Add City
                  </button>
              </form>
          </div>
        </div>
        <div className="contents">
          {
            this.props.cities.map((city,index) => {
              return <Content key={index.toString()} city ={city} />;
            })
          }
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return({
      pushCity: cityInfo => dispatch({ type: PUSH_CITY, payload: cityInfo }),
  })
}

function mapStateToProps({ cities }){
	return { cities };
}

export default connect(mapStateToProps,mapDispatchToProps) (Weather);
