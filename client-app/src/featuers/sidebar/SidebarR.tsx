import React from "react";
import { Sidebar, Segment, Menu, Grid, Header, Image, Icon } from "semantic-ui-react";

function SidebarR() {
  return (
    <Sidebar.Pusher>
      <Sidebar
        as={Menu}
        animation="push"
        direction="right"
        icon="labeled"
        inverted
        visible={true}
        vertical
        width="thin"
      >
        <Menu.Item as="a">
          <Icon name="home" />
          Lexis
        </Menu.Item>
        <Menu.Item as="a">Page 1</Menu.Item>
        <Menu.Item as="a">Page 2</Menu.Item>
      </Sidebar>

      <Sidebar.Pusher>Stuff</Sidebar.Pusher>
    </Sidebar.Pusher>
  );
}

export default SidebarR;
