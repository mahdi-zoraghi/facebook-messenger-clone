import { useState, useEffect } from "react"
import { FormControl, Input, IconButton } from "@material-ui/core"
import { Send as SendIcon } from "@material-ui/icons"
import FlipMove from "react-flip-move"
import firebase from "firebase/app"

import Message from "./Message"

import { db } from "./firebase"

import "./App.css"

function App() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([])
  const [username, setUsername] = useState("")

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot => {
        setMessages(
          snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }))
        )
      })
  }, [])

  useEffect(() => {
    setUsername(prompt("Please enter your name"))
  }, [])

  const sendMessage = e => {
    e.preventDefault()
    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setInput("")
  }

  return (
    <div className="App">
      <img
        src="https://en.facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100"
        alt="facebook messanger icon"
      />
      <h1>Facebook Messenger Clone</h1>
      <h2>Welcome {username}</h2>
      <form className="app__form">
        <FormControl className="app__formControl">
          <Input
            className="app__input"
            placeholder="Enter a message..."
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <IconButton
            className="app_iconButton"
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {messages.map(({ data, id }) => (
          <Message key={id} username={username} message={data} />
        ))}
      </FlipMove>
    </div>
  )
}

export default App