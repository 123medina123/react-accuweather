import React, { Component } from 'react';
import getIcon from '../actions/getIcon.js';
import {DragSource, DropTarget} from 'react-dnd/lib';

class Content extends Component {
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
                <img src={getIcon(Day.Icon).toString()} alt="weather-icon"/>
              </div>
              <div className={'night ' + Day.IconPhrase }>
                <img src={getIcon(Night.Icon).toString()} alt="weather-icon"/>
              </div>
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
      return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dayIndex];
    }

    getIconUri(index){
      if(index < 10){
        return `../images/0${index}-s.png`;
      }
      return `../images/${index}-s.png`;
    }

  render() {
    const {city,onDelete,connectDragSource,connectDropTarget} = this.props;
      return connectDropTarget(connectDragSource((
        <div className="Content">
        <div className="close"  onClick={onDelete}></div>
        <div className="name">{city.LocalizedName.toString()}<div className="text">{city.Headline.Text}</div></div>
          <div className="weather">
            {city.DailyForecasts.map((data,index) => this.renderWeather(data,index))}
          </div>
        </div>
      )));
  }
}

export default DragSource(
  'Content',
  {
    beginDrag: props => ({
      index: props.index
    }),
    endDrag: (props, monitor) => {
      props.onReorder(props.index, monitor.getDropResult().index);
    }
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)(
  DropTarget(
    'Content',
    {
        drop: props => ({
        index: props.index
      })
    },
    (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      isHovered: monitor.isOver()
    })
  )(Content)
);
