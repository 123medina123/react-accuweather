import React, { Component } from 'react';
import { getWeather } from '../api/Api';
import getIcon from '../actions/getIcon.js';

class Content extends Component {
  constructor(props) {
    super(props);
  }

  celciusConverter(degre) {
    const c = (parseInt(degre) - 32) * 5 / 9;
    return c.toFixed();
  }

  renderWeather(data,index) {
    const date = new Date(data.Date);
    const {Temperature,Day,Night} = data;
          return (
            <div key={'forecast-' + index}>
            <div className="date">{this.dayOfWeekAsString(date.getDay())}</div>
            <div className='day'>
              <img src={getIcon(Day.Icon).toString()}/>
            </div>
            <div className={'night ' + Day.IconPhrase }>
              <img src={getIcon(Night.Icon).toString()}/></div>
            <div className="minmax">
              <span className="max">
                {this.celciusConverter(Temperature.Maximum.Value.toString())}
              </span>
              <span className="min">
                {Temperature.Minimum.Value.toString()}
              </span>
              <span className="celzius">°C</span>
            </div>
            </div>
          );
  	}

   dayOfWeekAsString(dayIndex) {
      return ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][dayIndex];
    }

    getIconUri(index){
      if(index < 10){
        return `../images/0${index}-s.png`;
      }
      return `../images/${index}-s.png`;
    }

  render() {
    const {city} = this.props;
    console.log(city);
      return (
        <div className="Content">
        <div className="name">{city.LocalizedName.toString()}<div className="text">{city.Headline.Text}</div></div>

          <div className="weather">
            {city.DailyForecasts.map((data,index) => this.renderWeather(data,index))}

          </div>
        </div>
      );
  }
}

export default Content;
