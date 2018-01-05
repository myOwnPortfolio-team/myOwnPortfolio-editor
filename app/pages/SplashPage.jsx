import React from 'react';

import Authenticate from '../components/Authenticate.jsx';
import SplashScreen from '../components/SplashScreen.jsx';

class SplashPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activePage: 'authenticate',
    };
  }

  switchPage(page) {
    this.setState({ activePage: page });
  }

  render() {
    const authenticationPage = (
      <Authenticate
        database={this.props.database}
        switchPage={page => this.switchPage(page)}
        serverHost={this.props.serverHost}
        serverPort={this.props.serverPort}
      />
    );

    const splashPage = (
      <SplashScreen
        database={this.props.database}
        version={this.props.version}
        switchPage={this.props.switchPage}
        setModuleList={this.props.setModuleList}
        setAppPropertiesSchema={this.props.setAppPropertiesSchema}
      />
    );

    let page;
    switch (this.state.activePage) {
      case 'authenticate':
        page = authenticationPage;
        break;
      case 'splash':
      default:
        page = splashPage;
        break;
    }

    return (
      <div className="splash-page">
        { page }
      </div>
    );
  }
}

module.exports = SplashPage;
