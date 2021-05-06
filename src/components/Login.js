import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form , Segment, Button, Grid, Message } from 'semantic-ui-react'
import styles from './login.module.css'
import { ErrorMessage } from '@hookform/error-message'

import { useForm } from "react-hook-form";

const Login = () => {
    const {register, errors, handleSubmit, setValue} = useForm()

    const onSubmit = (data, e) => {
       console.log(data)
    }


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
                        <Button color="instagram" fluid size="large">Login</Button>
                    </Segment>
                </Form>

                <Message>Don't you have any account? <Link to="/signup"><Button>Click and Sign Up Now!</Button></Link></Message>
            </Grid.Column>
        </Grid>
    )
}

export default Login
