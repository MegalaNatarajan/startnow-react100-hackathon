import TopSpot from './topspot';
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        topspots: []
    }
}

componentWillMount() {
  axios
  .get('https://origin-top-spots-api.herokuapp.com/api/topspots')
  .then(response => response.data)
  .then(topspots => this.setState({ topspots }));

}

  render() {
    const styObj = {width:'70%',
    margin:'0 auto'}
    return (
      <div className='App' style={styObj}>
       <div className="well" style={{background: "hsla(0, 100%, 90%, 0.3)"}}>
          <h1>San Diego Top Spots</h1>
          <p>A list of the top 30 places to see in San Diego, California.</p>
        </div>
       
        <div>  
        {this.state.topspots.map(topspot => (
         <TopSpot
          key={topspot.id}
          name={topspot.name}
          description={topspot.description}
          location={topspot.location} />
        ))}
        </div>
       </div>
       
      
    );
  }
}

export default App;
