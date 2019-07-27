import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {DragDropContext} from 'react-dnd/lib';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';

import fetchWeather, { getAutoCompleteFunc , getMyLocation,getPosition } from '../api/Api';
import Content from './Content';


export const PUSH_CITY = 'PUSH_CITY';
export const DELETE_CITY = 'DELETE_CITY';
export const REORDER_LIST = 'REORDER_LIST';

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
    const position = await getPosition();
    const myLocation = await getMyLocation(position.coords.latitude + ',' + position.coords.longitude);
    const cityWeather = await fetchWeather(myLocation.data[0].ParentCity.Key);
    this.props.pushCity({
      ...cityWeather.data,
      LocalizedName: myLocation.data[0].ParentCity.LocalizedName
    });
  }

onInputChange = async(term) => {
  if(term === ''){
    this.setState({
      term: '',
      select: [],
      cursor: 0
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
  if (e.keyCode === 38) {
    if(cursor === 0){
      this.setState( prevState => ({
        cursor: select.length - 1
      }))
    }
    else{
      this.setState( prevState => ({
        cursor: prevState.cursor - 1
      }))
    }
  }

  if (e.keyCode === 40) {
    if(cursor === select.length - 1){
      this.setState( prevState => ({
        cursor: 0
      }))
    }
    else{
      this.setState( prevState => ({
        cursor: prevState.cursor + 1
      }))
    }
  }
  if(e.keyCode === 13 && select.length !== 0){
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
      cursor:0
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

cityContentRender = (city,index) => {
  return(
     <Content
     key={index.toString()}
     city ={city}
     index={index}
     onDelete={() => this.props.deleteCity(index)}
     onReorder={this.props.reorderCity}/>
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
                  placeholder="Search city..."
                  value={term}
                  onKeyDown={ this.handleKeyDown }
                  onChange={event => this.onInputChange(event.target.value)}
                  className="form-control input-search" />
                  <div className="error">{this.state.errMsg}</div>
                  <div className="autocomplete-items">
                   {
                    (select.length === 0 && term !== '') ?   <div> No match</div> : select.map((data,i) => this.autoCompleteItemRender(data,i))
                    }
                   </div>
              </div>
          </div>
        </div>
        <div className="contents">
        <div className="text-reorder">Drag to reorder :</div>
          {this.props.cities.map((city,index) =>this.cityContentRender(city,index))}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return({
      pushCity: cityInfo => dispatch({ type: PUSH_CITY, payload: cityInfo }),
      deleteCity: index =>  dispatch({ type: DELETE_CITY, index: index }),
      reorderCity: (from,to) => dispatch({ type: REORDER_LIST, from: from , to: to })
  })
}

function mapStateToProps({ cities }){
	return { cities };
}

Weather.propTypes = {
  term: PropTypes.string,
  errMsg: PropTypes.string,
  select:PropTypes.array,
  cursor:PropTypes.number
};

Weather = DragDropContext(HTML5Backend)(Weather)
Weather = connect(mapStateToProps,mapDispatchToProps)(Weather)

export default Weather;
