import React,{useState,useEffect} from 'react'
import {Avatar} from "@material-ui/core";
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import MessageRoundedIcon from '@material-ui/icons/MessageRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import {useStateValue} from "./StateProvider"
import SidebarChat from "./SidebarChat";
import db from "./firebase"
import "./Sidebar.css";
function Sidebar() {
    const [{user},dispatch] = useStateValue();
    const [rooms,setRooms] = useState([]);
    useEffect(() => {
        db.collection("rooms").where("members","array-contains",user.email).onSnapshot(snapshot => {
            setRooms(snapshot.docs.map(doc => {
                console.log(doc.data);
                if(doc.data().by==user.email){
                    return {
                        id:doc.id,
                        roomName:doc.data().roomNameBy,
                        to:doc.data().to,
                        url:doc.data().urlTo
                    }
                }else{
                    return {
                        id:doc.id,
                        roomName:doc.data().roomNameTo,
                        by:doc.data().by,
                        url:doc.data().urlBy
                    }
                }
            }
        ))
        })
    },[]);

    console.log(user);
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__headerLeft">
                    <Avatar src={user.photoURL} />
                    <h3>{user.displayName}</h3>
                </div>
                <div className="sidebar__headerRight">
                    <MessageRoundedIcon />
                    <MoreVertRoundedIcon />
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchRoundedIcon />
                    <input placeholder="Search or start new chat" />
                </div>
            </div>
            <div class="sidebar__chat">
                <SidebarChat addNewChat/>
                {rooms.map(room => (<SidebarChat key={room.id} roomName={room.roomName} id={room.id} url={room.url} />))}
            </div>
        </div>
    )
}

export default Sidebar
