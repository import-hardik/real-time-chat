import { useEffect, useRef, useState } from 'react'
import { FaRegComment } from "react-icons/fa";
import './App.css'


function App() {
  const chatBoxRef = useRef(null);
  const [messages, setMessages] = useState([["Credit @import-hardik","86:56 am","editor"]]);
  const wsRef = useRef();
  const inputRef = useRef<HTMLInputElement | null>(null);
  // @ts-ignore// @ts-ignore
  let activeMembers=0;

  useEffect(() => {
    const ws = new WebSocket("https://451413f5-3145-42e0-8877-1c9d627d9481-00-3jdquaqssmz2y.pike.replit.dev:8080/");
    ws.onmessage = (event) => {
      if(JSON.parse(event.data).type=="chat"){
        setMessages(m => [...m, [JSON.parse(event.data).payload.message,JSON.parse(event.data).payload.time,JSON.parse(event.data).payload.browserID,"chat"]])
      }
      else if(JSON.parse(event.data).type=="connected"){
        sessionStorage.setItem('active',JSON.parse(event.data).payload.active);
      }
      else if(JSON.parse(event.data).type=="left"){
        sessionStorage.setItem('active',JSON.parse(event.data).payload.active);
      }
      console.log(JSON.parse(event.data)) 
    }
    // @ts-ignore
    wsRef.current = ws;
    // name gernate auto login
    // const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    // let name = '';
    // for (let i = 0; i < 5; i++) {
    //   const randomIndex = Math.floor(Math.random() * chars.length);
    //   name += chars[randomIndex];
    // }
    // // name gernate
    ws.onopen = () => {
      let name= prompt("Please enter your name:");
      const room= prompt("Please enter your Room:");
      // @ts-ignore
      sessionStorage.setItem('name', name);
      // @ts-ignore
      sessionStorage.setItem('room', room);
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: room,
          userName:sessionStorage.getItem('name'),
        }
      }))
    }
    //2 bar message
    return () => {
      ws.close()
    }
  }, []);


  useEffect(() => {
    const chatBox = chatBoxRef.current;
    if (chatBox) {
      //@ts-ignore
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [messages]);

  return (
<div className="bg-black text-white flex items-center justify-center min-h-screen">
      <div className="bg-black p-4 rounded-lg shadow-lg w-full max-w-md border border-[#262626] ">
        {/* Header Section */}
        <div className="mb-2 p-2 rounded bg-black space-x-4">
          <h1 className="text-xl font-bold flex items-center text-xs-66">
          <FaRegComment />&ensp;Real Time Chat
          </h1>
        </div>
          <p className="text-gray-500 text-[13px] text-left">
            temporary room that expires after both users exit
          </p>
          <br />

        {/* Room Info */}
        <div className="bg-[#262626] text-white p-2 rounded mb-2 flex justify-between items-center border border-[#262626] text-xs-66">
          <span>
            Room Code: <span className="font-mono">{sessionStorage.getItem('room')}</span>
          </span>
          <span>Active Users:{sessionStorage.getItem('active')}</span>
        </div>

        {/* Chat Area */}
        <div className="bg-black p-4 rounded mb-4 relative h-80 overflow-y-auto no-scrollbar border border-[#262626] text-lg-66 column-flex" ref={chatBoxRef}>
        {messages.map(message => 
          <div className={(message[2])==sessionStorage.getItem('name')?"flex w-full mt-2 space-x-3 max-w-xs":"flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end"}>
          <div>
            <div className="bg-white p-3 rounded-r-lg rounded-bl-lg">
              <p className="text-sm text-black text-[7px]">{(message[0])} </p>
            </div>
            <span className="text-xs text-white leading-none font-bold ">{(message[2])}</span>
            <span className="text-xs text-gray-500 leading-none">{("  "+message[1])}</span>
          </div>
        </div>
      )}
        </div>

        {/* Input Area */}
        <div className="flex items-center space-x-2 text-lg-66">
          <input
            ref={inputRef} id="message" 
            type="text"
            placeholder="Type a message..."
            className="bg-black text-white p-2 rounded w-full focus:outline-none mr-2 border border-[#262626]"
          />
          <button className="bg-white text-black p-2 rounded px-4 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50" onClick={() => {
          const message = inputRef.current?.value;
          // @ts-ignore
          document.getElementById("message").value="";
          // time const start
          const now = new Date();
          let hours = now.getHours();
          const minutes = now.getMinutes();
          const ampm = hours >= 12 ? 'PM' : 'AM';
          hours = hours % 12 || 12;
          // time const end
          // @ts-ignore
          wsRef.current.send(JSON.stringify({
            type: "chat",
            payload: {
              message: message,
              time:`${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`,
              browserID:sessionStorage.getItem('name'),
              roomcode:sessionStorage.getItem('room'),
            }
          }))
          
        }}>
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
