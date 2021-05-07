import React from 'react'
import { useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react'
import ChatPanel from './components/ChatPanel/ChatPanel'
import SidePanel from './components/SidePanel/SidePanel'


const App = () => {
  const currentChannel = useSelector((state) => state.channels.currentChannel);

  return (
    <Grid columns="2" style={{ background: "#eee", height: "100vh" }}>
      <Grid.Row>
        <Grid.Column width={2}>
          <SidePanel />
        </Grid.Column>

        <Grid.Column style={{ background: "#fff" }} width={14}>
          {currentChannel && <ChatPanel currentChannel={currentChannel} />}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default App;
