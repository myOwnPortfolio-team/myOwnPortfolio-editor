import React from 'react';
import { Header } from 'semantic-ui-react';
import axios from 'axios';
import SideBar from './Sidebar.jsx';

class App extends React.Component {
  componentDidMount() {
    axios.get('https://api.github.com/repos/myOwnPortfolio-team/myOwnPortfolio-core/contents/app/modules/about/json_schema/content.json', {
      headers: { Accept: 'application/vnd.github.VERSION.raw' },
    }).then((res) => {
      console.log(res.data);
    });
  }

  render() {
    return (
      <div className="app">
        <Header as="h1" className="navbar">{this.props.data.title}</Header>
        <SideBar />
      </div>
    );
  }
}

module.exports = App;
