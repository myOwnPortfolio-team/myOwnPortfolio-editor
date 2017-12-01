import React from 'react';
import { Grid, Button } from 'semantic-ui-react';

import Header from '../components/Header.jsx';
import Navbar from '../components/Navbar.jsx';
import Editor from '../components/Editor.jsx';

const headerItems = props => [(<Button primary name="compile" onClick={() => props.switchPage('render')}>Compile</Button>)];

class EditionPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSideBar: 'myOwnPortfolio',
    };
  }

  switchModules(order) {
    const currentIndex = this.props.myOwnPortfolio.indexOf(this.props.activeModule);
    if (order === 'up' && (currentIndex > 0)) {
      this.props.myOwnPortfolio.splice(currentIndex - 1, 2, this.props.myOwnPortfolio[currentIndex], this.props.myOwnPortfolio[currentIndex - 1]);
    } else if (order === 'down' && (currentIndex < this.props.myOwnPortfolio.length - 1)) {
      this.props.myOwnPortfolio.splice(currentIndex, 2, this.props.myOwnPortfolio[currentIndex + 1], this.props.myOwnPortfolio[currentIndex]);
    }
    this.setState({myOwnPortfolio: this.props.myOwnPortfolio});
  }

  deleteModule() {
    const currentIndex = this.props.myOwnPortfolio.indexOf(this.props.activeModule);
    if (currentIndex !== -1) {
      this.props.myOwnPortfolio.splice(currentIndex, 1);
    }
    this.setState({myOwnPortfolio: this.props.myOwnPortfolio});
  }

  switchSideBar(sideBar) {
    this.setState({ activeSideBar: sideBar });
  }

  render() {
    const sideBar = (activeSideBar) => {
      switch (activeSideBar) {
        case 'toolsBar':
          return (
            <div className="side-bar">
              <div className="side-bar-group-button">
                <Button circular icon="arrow left" onClick={() => this.switchSideBar('myOwnPortfolio')} />
              </div>
              <div className="side-bar-content">
                <Navbar
                  modules={this.props.modules}
                  handleClick={(module) => {
                    this.props.addModule(module);
                    this.switchSideBar('myOwnPortfolio');
                  }}
                />
              </div>
            </div>
          );
        case 'myOwnPortfolio':
          return (
            <div className="side-bar">
              <div className="side-bar-group-button">
                <Button circular icon="plus" onClick={() => this.switchSideBar('toolsBar')} />
              </div>
              <div className="side-bar-group-button">
                <Button circular icon="chevron down" onClick={() => this.switchModules('down')} />
                <Button circular icon="chevron up" onClick={() => this.switchModules('up')} />
                <Button circular icon="trash outline" onClick={() => this.deleteModule('up')} />
              </div>
              <div className="side-bar-content">
                <Navbar
                  modules={this.props.myOwnPortfolio}
                  activeItem={this.props.activeModule.name}
                  handleClick={module => this.props.switchActiveModule(module)}
                />
              </div>
            </div>
          );
        default:
          return (
            <div>bla</div>
          );
      }
    };

    return (
      <div className="container edition-page">
        <Header switchPage={page => this.props.switchPage(page)} items={headerItems(this.props)} />
        <Grid>
          <Grid.Column width={3}>
            {sideBar(this.state.activeSideBar)}
          </Grid.Column>
          <Grid.Column stretched width={13}>
            <Editor module={this.props.activeModule} />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

module.exports = EditionPage;
