import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {isEmpty, isLoaded, useFirebaseConnect} from 'react-redux-firebase'
import {Menu} from 'semantic-ui-react'
import {setCurrentChannel} from '../../redux/actions/channel'


const ChannelList = () => {
    useFirebaseConnect([{path: "channels"}])

    const dispatch = useDispatch()
    const channels = useSelector((state) => state.firebase.ordered.channels)
    const currentChannel = useSelector((state) => state.channels.currentChannel)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        if(!mounted && !isEmpty(channels)){
            const { key, value} =channels[0];
            setActiveChannel({ key, ...value})
            setMounted(true)
        }
    }, [isLoaded(channels)])

    const setActiveChannel = (channel) => {
        dispatch(setCurrentChannel(channel))
    }

    if(!isLoaded(channels)){
        return "Loading channels..."
    }
    if (isEmpty(channels)){
        return "No channel..."
    }

    return (
        <Menu.Menu>
            {
                channels.map(({key, value}) => (
                    <Menu.Item 
                        key={key}
                        name={value?.name}
                        icon="hashtag"
                        active={currentChannel?.key === key} // 2  key de aynıyasa yani kanal ve secili olaa
                        onClick={() => setActiveChannel({key, ...value})}
                        />
                ))
            }
        </Menu.Menu>
    )
}

export default ChannelList
