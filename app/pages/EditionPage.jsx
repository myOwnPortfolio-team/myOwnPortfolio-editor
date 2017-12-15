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
              <div className="side-bar-content">
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
                <Button circular icon="plus" onClick={() => this.switchSideBar('toolsBar')} />
              </div>
              <div className="side-bar-group-button">
                <Button circular icon="chevron down" onClick={() => this.props.switchModules('down')} />
                <Button circular icon="chevron up" onClick={() => this.props.switchModules('up')} />
                <Button circular icon="trash outline" onClick={() => this.props.deleteModule('up')} />
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
            <Editor
              activeModuleIndex={this.props.activeModuleIndex}
              module={this.props.activeModule}
              myOwnContent={this.props.myOwnContent}
              moduleListSchema={this.props.moduleListSchema}
            />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

module.exports = EditionPage;
