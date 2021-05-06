import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Form , Segment, Button, Grid, Message } from 'semantic-ui-react'
import styles from './signup.module.css'

const SignUp = () => {
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
                            fluid icon="user" 
                            iconPosition="left" 
                            name="username" 
                            placeholder="USERNAME" 
                            type="text"
                            required
                            {...register("user", { required: true})}
                            onChange={(event, {name, value}) => {
                                setValue(name, value)}}/>
                        <Form.Input 
                            fluid icon="mail" 
                            iconPosition="left" 
                            name="email" 
                            placeholder="EMAIL ADDRESS" 
                            type="email"
                            required
                            {...register("email", { required: true})}
                            onChange={(event, {name, value}) => {
                                setValue(name, value)}}/>
                        <Form.Input 
                            fluid icon="lock" 
                            iconPosition="left" 
                            name="password" 
                            placeholder="PASSWORD" 
                            type="password"
                            {...register("password", { required: true, minLength:6})}
                            onChange={(event, {name, value}) => {
                                setValue(name, value)}}/>
                        <Button color="instagram" fluid size="large">Sign Up</Button>
                    </Segment>
                </Form>

                <Message>Do you already have a account? <Link to="/login"><Button>Click and Login Here!</Button></Link></Message>
            </Grid.Column>
        </Grid>
    )
}

export default SignUp
