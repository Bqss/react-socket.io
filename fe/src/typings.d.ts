interface user {
  username: string,
  room: string,
  id: string
}

interface chat {
  sender: user ,
  message : string
}