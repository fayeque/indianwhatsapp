import React from 'react'
import "./Login.css";
import {Button} from "@material-ui/core";
import {auth,provider} from "./firebase";
import {useStateValue} from "./StateProvider";
import {actionTypes} from "./reducer";
import db from "./firebase";
function Login() {
    const [{},dispatch] = useStateValue()
    const signIn = () => {
        auth.signInWithPopup(provider)
        .then(result => {
            console.log(result);
            db.collection("users").where("email","==",result.user.email).get().then(snap => {
            var isExists=false;
            snap.forEach(doc => {
                isExists=true;
            })
            if(!isExists){
                db.collection("users").add({
                    name:result.user.displayName,
                    url:result.user.photoURL,
                    email:result.user.email
                });
            }
            });
            dispatch({
                type:actionTypes.SET_USER,
                user:result.user
            })

        }).catch((error) => {
            alert(error.message);
        })

    }

    return (
        <div className="login">
            <div className="login__container">
            <img src="data:image/jpeg;base64,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"></img>
            <h1>Sign in to community</h1>
            <Button onClick={signIn}>Sign in with google</Button>
            </div>
            
        </div>
    )
}

export default Login
