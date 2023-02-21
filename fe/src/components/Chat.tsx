

interface ChatProps {
  msg: {
    sender: string,
    message: string
  },
  user : user|undefined
}

const Chat = ({ msg, user}:ChatProps) => {

  const {sender, message} = msg;
  const isSelf = (sender: string , user: string|undefined) => {
    return sender=== user;
}
 

  return (
    <div className='flex'>

      {isSelf(sender, user?.username) ? (
        <div className={"flex gap-2 items-center font-medium ml-auto"}>
          <span className='text-gray-600 capitalize text-xs '>{sender}</span> 
          <p className={'py-3 px-5 rounded-lg  text-sm bg-indigo-500 text-white'}>
            {message}
          </p>
        </div>
      ) : sender ==="admin"? (
        <div className={"flex gap-2 items-center font-medium flex-row-reverse" }>
          <span className='text-gray-600 capitalize text-xs '>{sender}</span> 
          <p className={'py-3 px-5 rounded-lg  text-sm bg-red-500 text-white'}>
            {message}
          </p>
        </div>
      ): (
        <div className={"flex gap-2 items-center font-medium flex-row-reverse" }>
          <span className='text-gray-600 capitalize text-xs '>{sender}</span> 
          <p className={'py-3 px-5 rounded-lg  text-sm bg-gray-200/75 text-gray-700'}>
            {message}
          </p>
        </div>
      )
      }
    </div>

  )
}

export default Chat