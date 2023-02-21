import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffectOnce } from "react-use-effect-once";
import Chat from "../components/Chat";
import {io, Socket} from "socket.io-client";


let socket: Socket ;

const ChatPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const { username, room } = useLocation().state;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  useEffectOnce("init",() => {
    socket = io("localhost:5000")
    socket.emit("join", {username, room },(user:any)=>{
      const {data, error} = user;

      if(error){
        alert(error);
        navigate("/",{replace: true});
        socket.close();
        return ;
      }
      setUser({...data});
    });

    

  }, [username, room])

  useEffectOnce("init2",() => {
    socket.on("message",(msg) => {
      console.log("new msg")
      setMessages(old => [...old, msg]);
    });
  },[])


  const sendMsg = (ev: React.FormEvent) => {
    ev.preventDefault();
    socket?.emit("message:send", { user, message }, () => {
      setMessage("");
    });
  };

  const out = (ev: React.MouseEvent) => {
    ev.preventDefault();
    navigate("/",{
      state:{}
    });
    socket.disconnect()
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="flex py-4 px-6 justify-between bg-indigo-500 rounded-t-md">
        <span className="text-lg text-white font-medium capitalize">
          {room}
        </span>
        <button
          title="exit"
          className="text-white font-medium text-lg "
          onClick={out}
        >
          x
        </button>
      </div>
      <div className="bg-white p-8 h-[50vh] overflow-y-auto">
        <div className="flex flex-col gap-3">
          {messages.map((msg, i) => (
            <Chat msg={msg} user={user} key={i} />
          ))}
        </div>
      </div>
      <form
        className="border-t border-gray-300 flex rounded-b-md overflow-hidden"
        onSubmit={sendMsg}
      >
        <input
          type="text"
          name=""
          id=""
          className="py-4 px-6 flex-1 outline-none"
          placeholder="Type a message ..."
          value={message}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
            setMessage(ev.target.value)
          }
        />
        <button
          className="bg-indigo-500 hover:bg-indigo-400 py-4 px-8 font-medium text-white"
          title="send message"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
