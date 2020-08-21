import React,{Fragment,useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import {Avatar} from "@material-ui/core";
import "./SidebarChat.css"
import {useStateValue} from "./StateProvider";
import db from "./firebase";
function SidebarChat({addNewChat,roomName,id,url}) {

    const [{user},dispatch] = useStateValue();
    const [messages,setMessages] = useState([]);

    useEffect(() => {
        if(id){
            db.collection("rooms").doc(id).collection("messages").orderBy("timestamp","desc").onSnapshot(snapshot => 
                setMessages(snapshot.docs.map(doc => doc.data()))
                )
        }

    },[id])


    const createChat =() => {
        const to=prompt("Enter email of your friend");
        const roomName=prompt("Enter the name of your friend");
        if(roomName && to){
            db.collection("users").where("email","==",to).get().then(snap => {
                var count=0;
                snap.forEach(doc => {
                    // console.log(doc.data().url);
                    if(count < 1){
                        db.collection("rooms").add({
                            by:user.email,
                            to:to,
                            urlTo:doc.data().url,
                            urlBy:user.photoURL,
                            roomNameBy:roomName,
                            roomNameTo:user.displayName,
                            members:[user.email,to]
                        })
                    }
                    count=count+1;
                })
            })

        }
    }
    return !addNewChat ? (
            <Fragment>
            <Link style={{ textDecoration: 'none' }} to={`/room/${id}`} ><div className="sidebarChat">
                <Avatar src={url} />
            <div className="sidebarChat__info">
                <h2>{roomName}</h2>
                <p>{messages[0] && messages[0].message}</p>
            </div>
        </div>
        </Link>
        </Fragment>
    ) : (
        <div onClick={createChat} className="sidebarChat">
            Add new chat
        </div>

    )
}

export default SidebarChat
