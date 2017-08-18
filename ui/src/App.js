import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './bootstrap.min.css';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse fixed-top">
      <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon">
        </span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">Add url</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">List urls</a>
          </li>

        </ul>
      </div>
    </nav>
    );
  }
}

class AddUrl extends Component {
  render() {
    return (
	<div className="main-body">
	<form onSubmit={(e) => this.props.onSubmit(e)}>
	  <div className="form-group row">
	  <label for="url-input" className="col-2 col-form-label">URL</label>
	    <div className="col-10">
	        <input className="form-control" name="url" type="url" id="url"/>
	    </div>
	  </div>
	<button type="submit" className="btn btn-primary">Add Url</button>
	</form>
	</div>
      );
  }
}

class Urls extends Component {
  render() {
    let rows = this.props.data.map(url => {
      return <UrlRow key = {
        url.id
      }
      data = {
        url
      }
      />
    })
    return (
	<table>
	  <thead>
	    <th>Full url</th>
	    <th>Minified url</th>
	  </thead>
	  <tbody>

	  </tbody>
	</table>
      );
  }
}
const UrlRow = (props) => {
  return (
    <tr>
      <td>
        { props.data.full_url }
      </td>
      <td>
        { props.data.short_url }
      </td>
    </tr>
  );
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      urls: []
    }
  }
  addUrl(e) {
      e.preventDefault();
      fetch('http://localhost:5000/convert_url', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: JSON.stringify({'url': e.target.url.value}),
    }).then(response => response.json())
    .then(json => {
          this.setState({
            data: json.items,
         });
    });
  }
  render() {
    return (
	<div>
	  <Header />
	  <AddUrl onSubmit={(e) => this.addUrl(e)}/>
	  <Urls data={this.state.urls}/>    
	</div>
      );
  }
}


export default App;
