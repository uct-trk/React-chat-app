import React, { useState } from 'react'
import {Popup, Menu, Icon} from 'semantic-ui-react'
import ChannelList from '../Channels/ChannelList'
import CreateChannelForm from '../Channels/CreateChannelForm'
import UserPanel from '../UserPanel/UserPanel'
import {TwitterPicker} from 'react-color';

const SidePanel = () => {
    const [open, setOpen] =useState(false)
    const [color, setColor] = useState("#22194d");

    const handleOpen = () => {setOpen(true)}
    const handleClose = () => {setOpen(false)}

    return (
        <>
       <Menu 
        vertical 
        inverted 
        secondary 
        fixed="left"
        style={{width: "350px", fontSize: "1.3rem", background: color, height:"100vh"}}>

           <Menu.Item>
               <TwitterPicker
               color={color}
               onChangeComplete={(color) => setColor(color.hex)}/>
               
           </Menu.Item>
            {/* UserPanel */}
            <UserPanel/>
           <Menu.Item>
            <Menu.Header>
                Channels
                <span style={{float: "right"}}>
                    <Popup
                        content="New Channel"
                        trigger={<Icon name="add" onClick={(event) => handleOpen()} />}>
                    </Popup>
                </span>
            </Menu.Header>

            {/* Channels */}
            <ChannelList />

           </Menu.Item>
       </Menu>
        
        {/* Create Channel */}
        <CreateChannelForm 
            open={open} 
            onOpen={handleOpen} 
            onClose={handleClose}/>
       </>
    )
}

export default SidePanel
