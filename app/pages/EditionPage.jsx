import React from 'react';
import { Button, Divider, Grid } from 'semantic-ui-react';

import Module from '../data/objects/module.js';
import Header from '../components/Header.jsx';
import Navbar from '../components/Navbar.jsx';
import Editor from '../components/Editor.jsx';

const headerItems = props => [(<Button primary name="compile" onClick={() => props.switchPage('render')}>Generate</Button>)];

class EditionPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSideBar: 'myOwnModules',
    };
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
                <Button circular icon="arrow left" onClick={() => this.switchSideBar('myOwnModules')} />
              </div>
              <div className="side-bar-content modules-navbar">
                <Navbar
                  modules={this.props.modules}
                  handleClick={(index, module) => {
                    this.props.addModule(module);
                    this.switchSideBar('myOwnModules');
                  }}
                />
              </div>
            </div>
          );
        case 'myOwnModules':
          return (
            <div className="side-bar">
              <div className="side-bar-group-button">
                <Button
                  onClick={() => {
                    this.props.switchActiveModule(-1, new Module('default'));
                  }}
                  primary
                  fluid
                >
                  Edit my app properties
                </Button>
                <Divider horizontal>Or</Divider>
                <Button
                  onClick={() => this.switchSideBar('toolsBar')}
                  secondary
                  fluid
                >
                  Add a module
                </Button>
              </div>
              <Divider />
              <div className="side-bar-title">My own modules</div>
              <div className="side-bar-group-button">
                <Button
                  circular
                  icon="chevron down"
                  onClick={() => this.props.switchModules('down')}
                  disabled={this.props.activeModuleIndex === -1
                    || this.props.activeModuleIndex >= this.props.myOwnModules.length - 1}
                />
                <Button
                  circular
                  icon="chevron up"
                  onClick={() => this.props.switchModules('up')}
                  disabled={this.props.activeModuleIndex === -1
                    || this.props.activeModuleIndex <= 0}
                />
                <Button
                  circular
                  icon="trash outline"
                  onClick={() => this.props.deleteModule()}
                  disabled={this.props.activeModuleIndex === -1}
                />
              </div>
              <div className="side-bar-content">
                <Navbar
                  modules={this.props.myOwnModules}
                  activeItem={this.props.activeModuleIndex}
                  handleClick={(index, module) => this.props.switchActiveModule(index, module)}
                />
              </div>
            </div>
          );
        default:
          return (
            <div>Error</div>
          );
      }
    };

    return (
      <div className="container edition-page">
        <Header switchPage={page => this.props.switchPage(page)} items={headerItems(this.props)} />
        <Grid>
          <Grid.Column className="side-bar" width={3}>
            {sideBar(this.state.activeSideBar)}
          </Grid.Column>
          <Grid.Column stretched width={13}>
            <Editor
              activeModuleIndex={this.props.activeModuleIndex}
              module={this.props.activeModule}
              myOwnContent={this.props.myOwnContent}
              appPropertiesSchema={this.props.appPropertiesSchema}
              moduleSettingSchema={this.props.moduleSettingSchema}
            />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

module.exports = EditionPage;
