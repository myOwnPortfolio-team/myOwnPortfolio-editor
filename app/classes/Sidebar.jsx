import React from 'react';
import { Sidebar, Segment, Menu, Icon } from 'semantic-ui-react';
import axios from 'axios';

import Editor from './Editor.jsx';

function createModule(name) {
  console.log(name);
}

const generateModules = modules => modules.map(module => (
  <Menu.Item
    key={module.name}
    name="address book outline"
    onClick={() => createModule(module)}
    link
  >
    <Icon name="address book outline" />
    {module.name}
  </Menu.Item>
));


class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      modules: [],
    };
  }

  componentDidMount() {
    axios.get('https://api.github.com/repos/myOwnPortfolio-team/myOwnPortfolio-core/contents/app/modules')
      .then((res) => {
        this.setState({ modules: res.data });
      });
  }

  render() {
    return (
      <div className="app">
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation="push"
            width="thin"
            visible={this.state.visible}
            icon="labeled"
            vertical
            inverted
          >
            {generateModules(this.state.modules)}
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <Editor />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

module.exports = SideBar;
