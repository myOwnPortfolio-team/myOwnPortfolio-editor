import React from 'react';
import { Sidebar, Segment, Menu, Icon } from 'semantic-ui-react';

function Editor() {
  return (
    <div>
      Editor
    </div>
  );
}

function createModule(name) {
  console.log(name);
}

function generateModules(modules) {
  return modules.map((module, key) => (
    <Menu.Item
      key={module.concat(key)}
      name="address book outline"
      onClick={() => createModule(module)}
      link
    >
      <Icon name="address book outline" />
      {module}
    </Menu.Item>
  ));
}

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  render() {
    return (
      <div className="editor">
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
            {generateModules(this.props.modules)}
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
