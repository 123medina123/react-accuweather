import React, { Component } from 'react';

import fetchWeather, { getAutoCompleteFunc , getMyLocation } from '../api/Api';
import Content from './Content';
import { connect } from 'react-redux';

export const PUSH_CITY = 'PUSH_CITY';

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      errMsg: '',
      select:[],
      cursor:0
    };
  }

  async componentDidMount(){
    const position = await this.getPosition();
    const myLocation = await getMyLocation(position.coords.latitude + ',' + position.coords.longitude);
    const cityWeather = await fetchWeather(myLocation.data[0].ParentCity.Key);
    this.props.pushCity({
      ...cityWeather.data,
      LocalizedName: myLocation.data[0].ParentCity.LocalizedName
    });

  }

  getPosition =  (options) => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

onInputChange = async(term) => {
  if(term === ''){
    this.setState({
      term: '',
      select: []
    })
  }
  else{
    this.setState({term: term});
    const results = await getAutoCompleteFunc(term);
    this.setState({
      select: results.data
    })
  }
}

handleKeyDown =(e) => {
  const { cursor, select } = this.state
  // arrow up/down button should select next/previous list element
  if (e.keyCode === 38 && cursor > 0) {
    this.setState( prevState => ({
      cursor: prevState.cursor - 1
    }))
  }
  if (e.keyCode === 40 && cursor < select.length - 1) {
    this.setState( prevState => ({
      cursor: prevState.cursor + 1
    }))
  }
  //users press enter
  if(e.keyCode === 13){
    e.preventDefault;
    this.handleClick(select[cursor]);
  }

}

handleClick = async(city) => {
    const weatherResponse = await fetchWeather(city.Key);
    this.props.pushCity({
      ...weatherResponse.data,
      LocalizedName: city.LocalizedName
    });
    this.setState({
      term:'',
      select:[],
      cursos:0
    });
}

autoCompleteItemRender = (data,i) =>{
  const {term,cursor} = this.state;
  return(
    <div  onClick={() => this.handleClick(data)} className={cursor === i ? 'autocomplete-item active' : 'autocomplete-item'} key={data.Key} >
      <strong>{term.charAt(0).toUpperCase()}</strong>
      {data.LocalizedName.toString().replace(term.charAt(0).toUpperCase(),'')}
    </div>
  )
}

  render() {
    const {term,select} =this.state;
    return (
      <div>
        <div className="header">
          <div className="CountrySelector">
            <div className="form-group">
              <input
                  value={term}
                  onKeyDown={ this.handleKeyDown }
                  onChange={event => this.onInputChange(event.target.value)}
                  className="form-control input-search" />
                  <div className="error">{this.state.errMsg}</div>
                  <div className="autocomplete-items">
                   {select.map((data,i) => this.autoCompleteItemRender(data,i))}
                   </div>
              </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(Weather);
