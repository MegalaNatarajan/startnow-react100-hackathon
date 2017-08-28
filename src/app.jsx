import DogList from './doglist';
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
       
       dogImage:[],
       dogs:[],
        list:'',
        isModalOpen: false,
        breedImage:[],
        curIndex:0
    }
}

componentWillMount() {
 
   axios.get('https://dog.ceo/api/breeds/list')
    .then(response =>{
      this.setState({dogs:response.data.message});
  })
  
 
  .catch(error => {
    console.log('Error fetching and parsing data',error);

  });
}
search(){
  var text=this._inputText.value;
  $('.div_option').show();
  for(var i = 0; i < this.state.dogs.length; i++) {
    if(text == this.state.dogs[i]) {
      var url = 'https://dog.ceo/api/breed/' + text + '/images/random'
      var dogname_list=text;
      dogname_list=dogname_list.charAt(0).toUpperCase()+dogname_list.slice(1);
      this.setState({list:dogname_list});
      axios.get(url)
      .then(response => {
        
        this.setState({dogImage:response.data.message});
      });
      
      break;
    }
    else{
      $('.div_option').hide();
      alert('Type a valid dog breed name');
      this._inputText.value = "";
      break;
    }
  }
  
}

loadBreed(dogname){
  $('.div_option').show();
  var dogname_list=dogname.value;
  dogname_list=dogname_list.charAt(0).toUpperCase()+dogname_list.slice(1);
  this.setState({list:dogname_list});
  
  var url = 'https://dog.ceo/api/breed/' + dogname.value + '/images/random'
  
  axios.get(url)
  .then(response => {
    
    this.setState({dogImage:response.data.message});
  })
  this._inputText.value = "";
  
}


  render() {
    const styObj = {width:'70%',
    margin:'0 auto'}
   
    return (
      <div className='App' style={styObj}>
       <div style={{background: "hsla(0, 100%, 90%, 0.3)"}}>
       <h1>Dog Breeds </h1>
         
        </div>
      
        <div className="pannel pannel-heading">  
           <label style={{color:"white",marginRight:"10px"}}>Search your favorite dog:</label>
           <input type="text" placeholder="search..." ref={(b) => this._inputText = b}/>
           <button className="btn btn-primary" onClick={this.search.bind(this)}>Search</button>
           
       </div>
       <div style={{marginTop:"10px"}}>
         <figure className="figure_style">
         <h3>Choose your favorite dog!</h3>
         <DogList items={this.state.dogs} loadBreed={this.loadBreed.bind(this)}></DogList>
         </figure>
          <div className="div_option" style={{marginTop:'40px'}} hidden>
            <figure className="dog_figure" style={{width:"445px",height:"300px"}}> 
            <img className="img-shadow" src={this.state.dogImage} style={{width:"445px",height:"300px"}}/>
            <figcaption id="caption" style={{background:"white",height:"50px"}}>
            <div style={{width:"100%"}}>
              <div style={{width:"70%",float:'left'}}>
                 <font style={{fonrWeight:"bold",fontSize:"1.5em",fontFamily:"ariel"}}>
                   {this.state.list}</font>
              </div><div style={{width:'20%',float:'left',marginTop:'7px'}}>
              <a className="more_photos" href="#" onClick={() => this.openModal()}>More Photos</a>
              </div>
            </div>  
            </figcaption>
            </figure>
          </div>
          <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
           <div>
            <p>
                <a href="#" className="more_photos" style={{fontSize:'1.5em',marginLeft:'420px'}} onClick={() => this.closeModal()}>X</a></p>
          
          
           {this.state.breedImage.map((item,i) =>{
            if(i==0){
              return  <div>
                      <div id="change_image"> 
                        <img id="Img" key={0} src={item} style={{width:'450px',height:'450px'}}/></div>
                        <div style={{width:'100%'}}>
                          <div style={{width:'80%',float:'left'}}>
                            <a  className="more_photos" href='#' onClick={this.prev.bind(this)}>Prev</a>
                          </div>  
                          <div style={{width:'20%',float:'left'}}>
                            <a href='#' className="more_photos" onClick={this.next.bind(this)}>Next</a>
                          </div>
                        </div>
                      </div>
                    
            }  
           })}
           </div>
          </Modal>
          </div>
          
      </div>
       
       
      
    );
  }
  openModal() {
    this.setState({ isModalOpen: true })
    var caption=$('#caption').find('font').html();
    caption=caption.toLowerCase();
    var newItems = this.state.dogs.filter((_item)=>{
      _item =caption;
      
   });
  var url= 'https://dog.ceo/api/breed/'+caption+'/images';
  axios.get(url)
  .then(response => {
    
    this.setState({breedImage:response.data.message,caption:caption});
  })
  }
  prev(){   
         
    if (this.state.curIndex > 0) {
     
        var item = this.state.breedImage[this.state.curIndex--];
        var i = this.state.curIndex;
     $('#change_image').html('<img class="Img" key='+i+' src='+item+' />');
      
    }
  
  }
  next(){
    
       if (this.state.curIndex < (this.state.breedImage.length -1)) {
        
           var item = this.state.breedImage[this.state.curIndex++];
           var i = this.state.curIndex;
        $('#change_image').html('<img class="Img" key='+i+' src='+item+' />');
         
       }
   
  }

  closeModal() {
    this.setState({ isModalOpen: false })
  }
}

class Modal extends React.Component {
  
  
  render() {
    if (this.props.isOpen === false)
      return null

    let modalStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '9999',
      background: '#fff'
    }

    if (this.props.width && this.props.height) {
      modalStyle.width = this.props.width + 'px'
      modalStyle.height = this.props.height + 'px'
      modalStyle.marginLeft = '-' + (this.props.width/2) + 'px',
      modalStyle.marginTop = '-' + (this.props.height/2) + 'px',
      modalStyle.transform = null
    }

    if (this.props.style) {
      for (let key in this.props.style) {
        modalStyle[key] = this.props.style[key]
      }
    }

    let backdropStyle = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: '0px',
      left: '0px',
      zIndex: '9998',
      background: 'rgba(0, 0, 0, 0.3)'
    }

    if (this.props.backdropStyle) {
      for (let key in this.props.backdropStyle) {
        backdropStyle[key] = this.props.backdropStyle[key]
      }
    }

    return (
      <div className={this.props.containerClassName}>
        <div className={this.props.className} style={modalStyle}>
        {this.props.children}
        
        </div>
        {!this.props.noBackdrop &&
            <div className={this.props.backdropClassName} style={backdropStyle}
                 onClick={e => this.close(e)}/>}
      </div>
    )
  }

  close(e) {
    e.preventDefault()

    if (this.props.onClose) {
      this.props.onClose()
    }
  }
}

export default App;
