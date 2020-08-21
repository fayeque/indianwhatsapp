import React,{useState,useEffect} from 'react'
import "./Chat.css"
import {useParams} from "react-router-dom";
import {Avatar} from "@material-ui/core";
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import ScrollableFeed from "react-scrollable-feed";
import db from "./firebase";
import firebase from "firebase";
import {useStateValue} from "./StateProvider"
function Chat() {
    const [{user},dispatch] = useStateValue();
    const {roomId} = useParams();
    const [roomMessages,setRoomMessages] = useState([]);
    const [roomDetail,setRoomDetail] = useState(null);
    const [input,setInput] = useState("");

    useEffect(() => {
        if(roomId){
        db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomDetail(snapshot.data()))

        db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp",'asc')
        .onSnapshot(snapshot => {
            setRoomMessages(snapshot.docs.map(doc => {
                return doc.data();
            }));
        })
       
    }
    },[roomId])

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection("rooms").doc(roomId).collection("messages").add({
            message:input,
            sender:user.email,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput("");
    }

    const logic = () => {
        var lastSeen;
        for(let i=roomMessages.length;i>=0;i--){
            if(roomMessages[i] && roomMessages[i].sender != user.email){
                lastSeen=new Date(roomMessages[i].timestamp && roomMessages[i].timestamp.toDate()).toUTCString();
                break;
            }
        }
        console.log(lastSeen);
        return lastSeen;
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={roomDetail && (roomDetail.urlTo==user.photoURL ? roomDetail.urlBy : roomDetail.urlTo ) } />
            <div className="chat__headerInfo">
                <h2>{roomDetail && (roomDetail.by == user.email ? roomDetail.roomNameBy : roomDetail.roomNameTo)}</h2>
                <p>{logic()}</p>
            </div>
            </div>
            <div className="chat__body">
            <ScrollableFeed>
                {roomMessages.map((message,index) => (
                <div key={index} className={`chat__bodyChat ${message.sender==user.email && 'chat__receiver'}`}>
                    <h3>{message.message}</h3>
                    <p>{new Date(message.timestamp && message.timestamp.toDate()).toUTCString().split(" ").slice(0,3).join(" ")}</p>
                </div>
                ))}

                </ScrollableFeed>
            </div>
            <div className="chat__bottom">
                <EmojiEmotionsIcon />
                <form onSubmit={sendMessage}>
                    <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type message..." />
                    <button type="submit">Send</button>
                    
                </form>
            </div>
        </div>
    )
}

export default Chat
