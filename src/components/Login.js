import React from 'react'
import { Link } from 'react-router-dom'
import { Form , Segment, Button, Grid, Message } from 'semantic-ui-react'
import styles from './login.module.css'

const Login = () => {

    const handleSubmit = (e) => {
        e.preventDefault()
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
                    onSubmit={handleSubmit}>
                    <Segment>
                        <Form.Input fluid icon="mail" iconPosition="left" name="email" placeholder="EMAIL ADDRESS" type="email"/>
                        <Form.Input fluid icon="lock" iconPosition="left" name="password" placeholder="PASSWORD" type="password"/>
                        <Button color="instagram" fluid size="large">Login</Button>
                    </Segment>
                </Form>

                <Message>Don't you have any account? <Link to="/signup"><Button>Click and Sign Up Now!</Button></Link></Message>
            </Grid.Column>
        </Grid>
    )
}

export default Login
