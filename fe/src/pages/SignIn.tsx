import {  useState } from "react";
import { useNavigate } from "react-router-dom";


const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
        navigate("/chat", {
          state : {
            username,
            room: roomName
          },
          replace: true
        });
  };

  return (
    <div className=" w-full max-w-sm">
      <h2 className="text-3xl text-white font-bold py-3 text-center border-b-2 border-white">
        Join The Chat
      </h2>
      <form className="flex flex-col gap-6 mt-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" className="text-white mb-1 inline-block">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            id="name"
            value={username}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(ev.target.value)
            }
            className="py-2 px-4 w-full rounded-md"
          />
        </div>
        <div>
          <label htmlFor="username" className="text-white mb-1 inline-block">
            Room Name
          </label>
          <input
            type="text"
            name="room"
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
              setRoomName(ev.target.value)
            }
            placeholder="Room Name"
            value={roomName}
            id="name"
            className="py-2 px-4 w-full rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-fit font-medium bg-indigo-500 text-white py-2 px-8 rounded-md"
        >
          Join
        </button>
      </form>
    </div>
  );
};

export default SignIn;
