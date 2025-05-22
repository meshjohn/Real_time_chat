import { createContext, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [message, setMessage] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [unseenMessages, setUnseenMessages] = useState({});

    const {socket, axios} = useContext(AuthContext);
    
    // function to get all users for sidebar

    const getUsers = async () => {
        try {
            const { data } = await axios.get("/api/messages/users");
            if(data.success){
                setUsers(data.users);
                setUnseenMessages(data.unseenMessages)
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // function to get messages for selected user

    const getMessages = async (userId) => {
        try {
            const { data } =  await axios.get(`/api/messages/${userId}`);
            if(data.success) {
                setMessage(data.message);
            } else {
                
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // function to send message to selected user

    const sendMessage = async (messageData) => {
        try {
            const { data } = await axios.post(`/api/messages/send/${selectedUser._id}`, messageData);
            if(data.success) {
                setMessage((prevMessages) => [...prevMessages, data.newMessage] );
            }
        } catch (error) {
            
        }
    }

    const value = {

    }

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}