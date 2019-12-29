import React from 'react';
import './Gauge.css';


class Gauge extends React.Component{
  constructor(props) {
  super(props);
    this.state={
      data:[]
    }
    this.fillBar = this.fillBar.bind(this);
  }

  fillBar(value,max,min) {
    let color='';
    let percentage = (value/(max-min))*100;
    if(percentage<=30){
      color='#00FA9A';
    }
    else if(percentage>=31 && percentage<=70){
        color='#ffbf00';
    }
    else if(percentage>70){
        color='#ff0000';
    }

    return{
      'borderColor':`#d3d3d3 #d3d3d3 ${color} ${color}`,
      'transform': `rotate( calc( 1deg * ( -45 + ${percentage} * 1.8 ) ) )`
    }
   }

   componentDidMount(){
     fetch("/test/indicators")
     .then(res=>res.json())
     .then(data=>{
       this.setState({
         data:data
       })
     });
   }

  render(){
    return (
      <div className="gauge">
      {
        this.state.data.map(indicator=>{
          return(
            <div className="gaugeContainer" key={indicator.type}>
            <div className="gaugeMin">{indicator.min}</div>
              <div className="gaugeHeader">{indicator.type}</div>
              <div className="gaugeMax">{indicator.max}</div>
              <div className="gaugeStyle" >
              <span className="gaugeValue"> {indicator.value} </span>
                <span className="gaugeAfter" style={this.fillBar(indicator.value,indicator.max,indicator.min)}></span>
              </div>
            </div>
          )
        })
      }
      </div>
    );
  }
}

export default Gauge;
