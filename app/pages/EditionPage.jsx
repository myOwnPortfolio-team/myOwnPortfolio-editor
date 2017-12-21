import React from 'react';
import { Button, Divider, Grid } from 'semantic-ui-react';

import axios from 'axios';

import Module from '../data/objects/module.js';
import Header from '../components/Header.jsx';
import Navbar from '../components/Navbar.jsx';
import Editor from '../components/Editor.jsx';

const userDoesNotExists = () => 'No user authenticated';
const undefinedAccessToken = () => 'No access token found';
const serverError = () => 'An error occured with the server';
const invalidToken = () => 'Invalid access token';

const compilePortfolio = (props, component) => {
  component.setLoadingState(true);

  const infos = props.database.table('userInfos');
  infos
    .userExists()
    .then((exists) => {
      if (exists === true) {
        return infos.getUserInfos();
      }
      throw userDoesNotExists();
    })
    .then((user) => {
      if (user.accessToken !== undefined) {
        return axios.post(
          `http://${props.serverHost}:${props.serverPort}${props.serverPostURL}?token=${user.accessToken}`,
          props.myOwnContent,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        );
      }
      throw undefinedAccessToken();
    })
    .then((res) => {
      component.setLoadingState(false);
      const { data } = res;
      if (data.status === 200) {
        props.setRenderedURL(data.message);
        props.switchPage('render');
      } else if (data.status === 400) {
        throw invalidToken();
      } else {
        throw serverError();
      }
    })
    .catch((error) => {
      component.setLoadingState(false);
      component.setError(error);
    });
};

class EditionPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSideBar: 'myOwnModules',
      compileLoading: false,
      compileError: undefined,
    };
  }

  setError(error) {
    this.setState({ compileError: error });
  }

  setLoadingState(isLoading) {
    this.setState({ compileLoading: isLoading });
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

    let compile;
    if (this.state.compileError !== undefined) {
      compile = <Button disabled color="red" primary name="compile">Generate</Button>;
    } else if (this.state.compileLoading === true) {
      compile = <Button loading primary name="compile">Generate</Button>;
    } else {
      compile = (
        <Button
          primary
          name="compile"
          onClick={() => compilePortfolio(this.props, this)}
        >
          Generate
        </Button>);
    }

    return (
      <div className="container edition-page">
        <Header switchPage={page => this.props.switchPage(page)} items={[compile]} />
        <Grid>
          <Grid.Column className="side-bar" width={3}>
            {sideBar(this.state.activeSideBar)}
          </Grid.Column>
          <Grid.Column className="editor" stretched width={13}>
            <Editor
              switchActiveModule={this.props.switchActiveModule}
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
