import { IonButton, IonContent, IonInput, IonItem, IonLabel } from '@ionic/react';
import React, { useState } from 'react'
import { Redirect } from 'react-router';

export default function Login() {

    let [isAuth, setAuth] = useState(false);

    const Login = (e: any) => {
        e.preventDefault()
        let data = getFormData(e.target)
        console.log("data", data);
        if (data.pwd === "ioupi") {
            setAuth(true);
        }
    }

    return (
        <>
            {!isAuth && <IonContent>
                <form onSubmit={Login}>
                    <IonItem>
                        <IonLabel >Email:</IonLabel>
                        <IonInput name='email' />
                    </IonItem>
                    <IonItem>
                        <IonLabel >Password:</IonLabel>
                        <IonInput name='pwd' />
                    </IonItem>
                    <IonButton type='submit'>Login</IonButton>
                </form>
            </IonContent>
            }
            {isAuth && <Redirect to={"/tab1"} />}
        </>
    )
}
function getFormData(form: any) {
    let data = form.querySelectorAll("[name]")
    data = [...data]
    data = data.map((d: any) => {
        const res: any = {}
        res[d.name] = d.value
        return res
    })
    data = Object.assign({}, ...data)
    return data
}
