import React, { Component } from 'react';
import './App.css';
import './bootstrap.min.css';

var invalidUrl = require('valid-url');

// Header class, currently not being used
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

  constructor() {
    super();
    this.state = {
      uriValid: true,
    }
  }

  validateUri(e) {
    if (!invalidUrl.isUri(e.target.value) && e.target.value != '') {
      this.setState({
	invalidUrl: true,
      });

      return
    }
    else {
      this.setState({
	invalidUrl: false,
      });

    }

  }

  render() {
    return (
	<div className={this.state.invalidUrl ? "main-body has-danger": "main-body"} id="add-urls">
	<form onSubmit={(e) => this.props.onSubmit(e)}>
	  <div className="form-group row">
	  <label className="col-2 col-form-label">URL</label>
	    <div className="col-10">
	        <input className={this.state.invalidUrl ? "form-control form-control-danger": "form-control"} type="text" id="url" onChange={this.validateUri.bind(this)}/>
		{this.state.invalidUrl && <div className="form-control-feedback">Please enter a valid Uri</div>}
	    </div>
	  </div>
	<button disabled={this.state.invalidUrl} type="submit" className="btn btn-primary">Minify Url</button>
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
	<div id="table-urls" className="main-body">
	<table className="table">
	  <thead className="thead-inverse">
	    <tr>
	      <th>Full url</th>
	      <th>Minified url</th>
	    </tr>
	  </thead>
	  <tbody>{
	    rows
	  }
	  </tbody>
	</table>
	</div>
      );
  }
}
const UrlRow = (props) => {
  return (
    <tr><td>{props.data.full_url}</td><td>{props.data.short_url}</td></tr>
  );
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      urls: [],
    }
  }
  componentDidMount() {
      fetch('http://localhost:5000/list_urls', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response => response.json())
    .then(json => {
          this.setState({
            urls: json.urls,
         });
    });

  }

  addUrl(e) {
      e.preventDefault();
      fetch('http://localhost:5000/convert_url', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'url': e.target.url.value}),
      }).then(response => response.json())
      .then(json => {
	this.setState({urls: [{'id': json.id, 'full_url': json.full_url, 'short_url': json.short_url}].concat(this.state.urls)})
    });
  }
  render() {
    return (
	<div>
	  <AddUrl urls={this.state.urls} onSubmit={(e) => this.addUrl(e)} />
	  <Urls data={this.state.urls}/>
	</div>
      );
  }
}


export default App;
