import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { Form , Segment, Button, Grid, Message } from 'semantic-ui-react'
import styles from './login.module.css'
import {useFirebase} from 'react-redux-firebase'

import { useForm } from "react-hook-form";

const Login = () => {
    const firebase = useFirebase()
    const {register, errors, handleSubmit, setValue} = useForm()

    const [fbErrors, setFbErrors] = useState([])
    const [submitting, setSubmitting] = useState(false)

    const onSubmit = ({email, password}, e) => {
       setSubmitting(true)
       setFbErrors([])

       firebase.login({
           email, password
       })
       .then((data) => {
           console.log(data)
       })
       .catch((error) => {
           setFbErrors([{ message: error.message}])
       })
       .finally(() => {
           setSubmitting(false)
       })
    }

    const displayErrors = () => fbErrors.map((error, index) => 
    <p key={index}>{error.message}</p>
)


    return (
        <Grid 
            textAlign="center" 
            verticalAlign="middle" 
            className={styles.container}>

            <Grid.Column style={{ maxWidth: "450px" }}>

                <h1 className={styles.formHeader}>
                    UGRCNTRK
                    <span>.io</span>
                </h1>

                <Form size="large" 
                    className={styles.form}
                    onSubmit={handleSubmit(onSubmit)}>
                    <Segment>
                        <Form.Input 
                            fluid icon="mail" 
                            iconPosition="left" 
                            name="email" 
                            placeholder="EMAIL ADDRESS" 
                            type="email"
                            required
                            {...register("email", { required: "This is required"})}
                            onChange={(event, {name, value}) => {
                                setValue(name, value)}}/>
                                
                                
        
                               
                        <Form.Input 
                            fluid icon="lock" 
                            iconPosition="left" 
                            name="password" 
                            placeholder="PASSWORD" 
                            required
                            type="password"
                            {...register("password", {minLength: 6, required: true})}
                            onChange={(event, {name, value}) => {
                                setValue(name, value)
                            }}
                            />
                        <Button disabled={submitting} color="instagram" fluid size="large">Login</Button>
                    </Segment>
                </Form>
                {
                    fbErrors.length > 0 && (
                        <Message error>{displayErrors()}</Message>
                    )
                }

                <Message>Don't you have any account? <Link to="/signup"><Button>Click and Sign Up Now!</Button></Link></Message>
            </Grid.Column>
        </Grid>
    )
}

export default Login
