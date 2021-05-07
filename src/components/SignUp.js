import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useFirebase } from 'react-redux-firebase'
import { Form, Segment, Button, Grid, Message } from 'semantic-ui-react'
import styles from './signup.module.css'

const SignUp = () => {
    // firebase reducerini import ediyoruz
    const firebase = useFirebase()

    const [fbErrors, setFbErrors] = useState([])
    const [submitting, setSubmitting] = useState(false)

    // useForm
    const { register, errors, handleSubmit, setValue } = useForm()

    useEffect(() => {

    },[])

    const onSubmit = ({ username, email, password }, e) => {
        setSubmitting(true)
        // her submit yaptıgımızda hata mesajı sıfırlanacak
        setFbErrors([])

        // avatar oluştururken isim ve soy ismin ilk harfleri alınacak
        console.log(username)
        const [first, last] = username.split(" ")

        firebase.createUser(
            { email, password },
            {
                name: username,
                avatar: `https://ui-avatars.com/api/?name=${first}+${last}&background=random&color=fff`
            }
        )

            .then(user => {
                console.log(user)
                
            })
            .catch(error => {
                setFbErrors([{ message: error.message }])
                
            })
            .finally(() => {
                setSubmitting(false)
            });
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
                            fluid icon="user"
                            iconPosition="left"
                            name="username"
                            placeholder="USERNAME"
                            type="text"
                            required
                            {...register("username", { required: true })}
                            onChange={(e, { name, value }) => {
                                setValue(name, value)
                            }} />
                        <Form.Input
                            fluid icon="mail"
                            iconPosition="left"
                            name="email"
                            placeholder="EMAIL ADDRESS"
                            type="email"
                            required
                            {...register("email", { required: true })}
                            onChange={(e, { name, value }) => {
                                setValue(name, value)
                            }} />
                        <Form.Input
                            fluid icon="lock"
                            iconPosition="left"
                            name="password"
                            placeholder="PASSWORD"
                            type="password"
                            {...register("password", { required: true, minLength: 6 })}
                            onChange={(e, { name, value }) => {
                                setValue(name, value)
                            }} />
                        <Button disabled={submitting} color="instagram" fluid size="large">Sign Up</Button>
                    </Segment>
                </Form>
                {
                    fbErrors.length > 0 && (
                        <Message error>{displayErrors()}</Message>
                    )
                }

                <Message>Do you already have a account? <Link to="/login"><Button>Click and Login Here!</Button></Link></Message>
            </Grid.Column>
        </Grid>
    )
}

export default SignUp
