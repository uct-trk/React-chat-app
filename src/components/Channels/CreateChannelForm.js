import React from 'react'
import {useSelector} from 'react-redux'
import { useForm } from 'react-hook-form'
import { Modal, Form, Button } from 'semantic-ui-react'
import { useFirebase } from 'react-redux-firebase'

const CreateChannelForm = ({ open, onOpen, onClose }) => {

    const firebase = useFirebase();
    const profile = useSelector(state => state.firebase.profile) // firebase içerisinde profile bilgisi var oradan bu bilgileri alıyoruz
    const { register, handleSubmit, setValue } = useForm()

    const onSubmit = ({name, description}) => {
        firebase.push("channels", {
            name,
            description,
            createdBy: {
                name: profile.name,
                avatar: profile.avatar
            }
        })
        onClose()
    }
    
    return (
        <Modal open={open} onOpen={onOpen} onClose={onClose}>
            <Modal.Header>Create New Channel</Modal.Header>
            <Modal.Content>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Input
                        fluid
                        icon="hashtag"
                        iconPosition="left"
                        name="name"
                        placeholder="General"
                        {...register("name", { required: true })}
                        onChange={(e, {name, value}) => {
                            setValue(name, value)
                        }} />

                    <Form.Input
                        fluid
                        icon="hashtag"
                        iconPosition="left"
                        name="description"
                        placeholder="Description"
                        {...register("description", { required: true, minLength: "10" })}
                        onChange={(e, {name, value}) => {
                            setValue(name, value)
                        }} />
                </Form>

                <Modal.Actions>
                    <Button color="red" onClick={() => onClose()}>Cancel</Button>
                    <Button icon="checkmark" content="Create" positive color="green" onClick={() => handleSubmit(onSubmit) ()}></Button>
                </Modal.Actions>
            </Modal.Content>
        </Modal>
    )
}
export default CreateChannelForm