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
	isCustom: false,
      });

      return
    }
    else {
      this.setState({
	invalidUrl: false,
      });

    }

  }

  handleCheckboxChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      isCustom: value
    });
  }

  render() {
    return (
	<div className="main-body" id="add-urls">
	{this.props.showNoty && <div className="alert alert-success fade show" role="alert">
	  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
	    <span aria-hidden="true">&times;</span>
	  </button>
	  <strong>Added succesfuly</strong>
	</div>}
	<form onSubmit={(e) => this.props.onSubmit(e)}>
	  <div className="form-group row">
	  <label className="col-2 col-form-label">URL</label>
	    <div className={this.state.invalidUrl ? "col-10 has-danger": "col-10"}>
	        <input className={this.state.invalidUrl ? "form-control form-control-danger": "form-control"} type="text" id="url" onChange={this.validateUri.bind(this)}/>
		{this.state.invalidUrl && <div className="form-control-feedback">Please enter a valid Uri</div>}
	    </div>
	  </div>
	  <div className="form-group row">
	   <label className="col-2 col-form-label">
          Custom:
          <input
            name="isCustom"
            type="checkbox"
	    id="isCustom"
            checked={this.state.isCustom}
            onChange={this.handleCheckboxChange.bind(this)}
            />
        </label>
	  </div>
	{this.state.isCustom &&
	<div className="form-group row">
	  <label className="col-2 col-form-label">Custom URI</label>
	    <div className={this.state.invalidUrl ? "col-10 has-danger": "col-10"}>
	        <input className="form-control" type="text" id="customurl"/>
	    </div>
	</div>
	}

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
	      <th>Go to</th>
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
    <tr><td>{props.data.full_url}</td><td>{props.data.short_url}</td><td><a className="btn btn-primary" href={props.data.full_url} role="button">Link</a></td></tr>
  );
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      urls: [],
      noty: false,
    }
  }
  componentDidMount() {
      fetch('api/list_urls', {
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
      var customurl = '';
      if (typeof e.target.customurl !== "undefined") {
	customurl = e.target.customurl.value
      }
      fetch('api/convert_url', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
	body: JSON.stringify({'url': e.target.url.value, 'customurl': customurl}),
      }).then(response => response.json())
      .then(json => {
	if (typeof json.error !== "undefined") {
	  alert(json.error)
	}
	else {

	  this.setState({showNoty: true, urls: [{'id': json.id, 'full_url': json.full_url, 'short_url': json.short_url}].concat(this.state.urls)})
	}
    });
  }
  render() {
    return (
	<div>
	  <AddUrl showNoty={this.state.showNoty} urls={this.state.urls} onSubmit={(e) => this.addUrl(e)} />
	  <Urls data={this.state.urls}/>
	</div>
      );
  }
}


export default App;
