import React, { useState, useRef, useEffect } from 'react'
import { Segment, Header, Icon, Comment, Form, Input, Button } from 'semantic-ui-react'
import { useFirebase } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import Message from './Message'

const { uuid } = require("uuidv4")

const ChatPanel = ({ currentChannel }) => {

    useFirebaseConnect([
        {
            path: `/messages/${currentChannel.key}`,
            storeAs: "channelMessages",
        }
    ])
    const firebase = useFirebase()
    const profile = useSelector(state => state.firebase.profile);
    const currentUserId = useSelector(state => state.firebase.auth.uid)
    const channelMessages = useSelector(state => state.firebase.ordered.channelMessages)


    const [searchTerm, setSearchTerm] = useState("")
    const [content, setContent] = useState("")

    // resim yükleme yapmak için butona ref verdik
    const fileInputRef = useRef(null)
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current.scrollIntoView({
          behaviour: "smooth",
          block: "end",
        });
      });


    const handleSubmit = (event) => {
        event.preventDefault();

        if (content !== "") {
            const message = {
              content,
              timestamp: firebase.database.ServerValue.TIMESTAMP,
              user: {
                id: currentUserId,
                name: profile.name,
                avatar: profile.avatar,
              },
            };
      
            // Send a message
            firebase.push(`messages/${currentChannel.key}`, message).then(() => {
              setContent("");
            });
          }
        };
      

    const sendMediaMessage = (url) => {
        const message = {
            image: url,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: currentUserId,
                name: profile.name,
                avatar: profile.avatar,
            },
        };
        // Send a message
        firebase.push(`messages/${currentChannel.key}`, message).then(() => {
            console.log("finish");
        });
    };

    // resim yukleme fonksiyonu
    const uploadMedia = (event) => {

        const file = event.target.files[0]

        if (file) {
            const storageRef = firebase.storage().ref();
            const fileRef = storageRef.child(`chat/public/${uuid()}.jpg`);
            return fileRef
                .put(file)
                .then((snap) => {
                    fileRef.getDownloadURL().then((downloadURL) => {
                        sendMediaMessage(downloadURL);
                    });
                })
                .catch((err) => console.error("error uploading file", err));
        }
    }

    // mesaj filtreleme RegExp yapısı oluşturuldu searchterme göre oluşturulacak ve kucuk harf buyuk harf yapısına dikkat etmeden yapılacak 
    // kullanıcı alanına göre filtre
    const filterMessages = () => {
        const regex = new RegExp(searchTerm, "gi");

        const searchResults = [...channelMessages].reduce((acc, message) => {
            if (
                (message.value.content && message.value.content.match(regex)) ||
                message.value.user.name.match(regex)
            ) {
                acc.push(message);
            }

            return acc;
        }, []);

        return searchResults;
    };

    // kullanıcı filtreleme yaparsa filtermessage fonksiyonu çalışacak aksi halde mesajlar gözükecek
    const renderedMessages =
        searchTerm !== "" ? filterMessages() : channelMessages;
        

    return (
        <>
            {/* Mesages Header */}
            <Segment clearing>
                <Header as="h3" floated="right">
                    <span>
                        <Icon name="hashtag" />
                        {currentChannel.name}
                    </span>
                </Header>
                <Header as="h3" floated="right">
                    <Input size="mini"
                        icon="search"
                        name="searchTerm"
                        placeholder="Search"
                        disabled={channelMessages === null}
                        onChange={event => setSearchTerm(event.target.value)} />
                </Header>
            </Segment>

            {/*  Messages */}
            <Segment style={{ position: "fixed", top: 55, bottom: 70, width: "100%", marginLeft:"185px" }}>
                <Comment.Group style={{ height: "100%", overflowY: "auto", maxWidth: "100%" }}>

                    {renderedMessages && renderedMessages.map(({ key, value }) => (
                        <Message key={key} message={value} />
                    ))}

                    <div ref={messagesEndRef}></div>
                </Comment.Group>
            </Segment>


            {/* Send New Message */}
            <Segment style={{ position: "fixed", bottom: 0, width: "75%", display: "flex", marginLeft: "170px" }}>

                <Button icon onClick={() => fileInputRef.current.click()}>
                    <Icon name="add" />
                    <input
                        type="file"
                        name="file"
                        ref={fileInputRef}
                        onChange={uploadMedia} />
                </Button>

                <Form onSubmit={handleSubmit} style={{ flex: "1" }}>
                    <Input 
                        fluid name="message" 
                        value={content} labelPosition="left" placeholder={`Send message this channel : ${currentChannel.name}`}
                        onChange={event => setContent(event.target.value)} />
                </Form>
            </Segment>

        </>
    )
}

export default ChatPanel
