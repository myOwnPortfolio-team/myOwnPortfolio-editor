import React from 'react';
import { Sidebar, Segment, Button, Menu, Icon } from 'semantic-ui-react';

function generateModules(modules) {
  return modules.map((module, key) =>
    (
      <Menu.Item key={module.concat(key)} name="address book outline">
        <Icon name="address book outline" />
        {module}
      </Menu.Item>
    ));
}

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  toggleVisibility() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    return (
      <div className="editor">
        <Button onClick={() => { this.toggleVisibility(); }}>Toggle Visibility</Button>
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
              <div >editor
              </div>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

module.exports = SideBar;
