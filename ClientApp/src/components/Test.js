import React, { Component } from 'react';


export class Test extends Component {
  static displayName = Test.name;

  constructor(props) {
    super(props);
    this.state = { user: null,
            name: null,
            password: null,
            loading: true,
            usr: {userID: null, name: null, password: null},
            login: false,
            store: null,
            badPass: false};

    this.FuncSave = this.FuncSave.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.post = this.post.bind(this);
  }

  async componentDidMount() {
    // const response = await fetch('api/user');
    // const data = await response.json();
    // this.setState({...this.state, user: data});
    this.storeCollector()
  }

  storeCollector() {
    let storeLocal=JSON.parse(localStorage.getItem('login'));
     if(storeLocal && storeLocal.login){
      this.setState({login: true, store: storeLocal, usr: storeLocal.user})
      console.warn('war', this.state.usr)
     }
  }

  render() {
    return (
    <div>
    {this.state.loading
      ? (<p><em>Loading...</em></p>
      ) : (
          <div>
              {this.state.user[3].password
                }
 
          </div>       
          )}
          {/* <h1>
              {
                this.state.login?
                <p><em>ZALOGOWANY</em></p>
                :
                <p><em>NIEZALOGOWANY</em></p>
              }
          </h1> */}
          <h2> 
          {this.state.badPass && this.state.usr.name == null?
          <div>ZLE HASLO LUB LOGIN KURO</div>
          :
          <div></div>
  }
            {
              

              this.state.usr.name == null?
              <div> LOGIN <br></br>
                <input type="text" onChange={(event)=> {this.setState({name:event.target.value})}}/><br></br>
                <input type="password" onChange={(event)=> {this.setState({password:event.target.value})}}/><br></br>
                <p><button onClick={this.login}>Login</button></p>
              </div>
              
              :    
              <div>ZALOGOWANO <br></br>
              {this.state.usr.name}
                <p><button onClick={this.logout}>Logout</button></p>
              </div>          
            }         
          </h2>
          
          <p><button onClick={this.post}>Pobierz</button></p>
      </div>
    );
  }

  logout() {
    localStorage.clear()
    this.setState({user: null, loading: true, usr: {userID: null, name: null, password: null}, login: false, state: null, name: null, password: null, badPass: false})

  }
 post() {

let token = "Bearer "+ this.state.store.store

  fetch('api/auth',{
    method: 'GET',
    headers: {'Authorization':token },
  }).then((response) => {
    response.json().then(result => {
      console.log(result)
    })
    })
  }
 


  login() {

    let usa = {name: this.state.name, password: this.state.password}
    fetch('api/auth/authenticate',{
      method: 'POST',
      headers: {'Content-Type': 'application/json',
                'Accept': 'application/json' },
      body: JSON.stringify(usa)
    }).then((response) => {
      response.json().then(result => {
        localStorage.setItem('login', JSON.stringify({
          login:true,
          store:result,
          user:result.user       
        }))
          this.storeCollector()
      })
      if(response.status == 500) {
        this.setState({badPass:true})
      }
    })
  }
FuncSave() {

    let user = {
      name: "dddddddddd",
      password: "uuupaaa"
    }

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
                'Accept': 'application/json' },
      body: JSON.stringify(user)
  };
    fetch('api/user', requestOptions)
      .then(response => response.json()).then((responseJson) => {
        console.log('response object:',responseJson)
      });
    }
}

