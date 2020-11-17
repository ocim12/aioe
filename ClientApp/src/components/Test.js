import React, { Component } from 'react';

export class Test extends Component {
  static displayName = Test.name;

  constructor(props) {
    super(props);
    this.state = { user: null, loading: true };

    this.FuncSave = this.FuncSave.bind(this);
  }

  async componentDidMount() {
    const response = await fetch('/aa');
    const data = await response.json();
    this.setState({ users: data, loading: false, postId: null});
  }


  render() {
    return (
    <div>
    {this.state.loading
      ? (<p><em>Loading...</em></p>
      ) : (
          <div>
              {this.state.users[3].password
                }
          </div>
          
          )}
          <button onClick={this.FuncSave}>Click</button>
              <div>{this.state.postId}</div>
      </div>
    );
  }


FuncSave() {
    
    let user = {
      name: "assss",
      password: "kromaska"
    }

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
                'Accept': 'application/json' },
      body: JSON.stringify(user)
  };
    fetch('/aa', requestOptions)
      .then(response => response.json()).then((responseJson) => {
        console.log('response object:',responseJson)
      });
    }
}

