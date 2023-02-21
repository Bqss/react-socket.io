import fs from "node:fs";
import dotenv from 'dotenv';

dotenv.config();
const {env} = process;


export const getAllUser = () => {
    const result = JSON.parse(fs.readFileSync(env.DB_USER,{
        encoding : "utf-8"
    }));    
    return result;
}

export const saveUserIfNotExist = ({ username, room, id }) => {
  if (!username || !room) {
    return { error: "Username and room is required" };
  }
  if (isUserExist(username, room)) {
    return { error: "Username for this room is already taken" };
  }
  
  const newUser = {id, username, room}; 
  const users = getAllUser();
  users.push(newUser)
  fs.writeFileSync(env.DB_USER,JSON.stringify(users));
  return {data: newUser} ;
};

export const userLogout = ({userId}) => {
    const other = getAllUser().filter(user => user.id !== userId);
    fs.writeFileSync(env.DB_USER,JSON.stringify(other));
}

export const getUserById = ({userId}) =>{
    console.log(userId);
    return getAllUser().find(user => user.id === userId);
} 



const isUserExist = (username, room) => {
  return getAllUser().find((user) => user.username === username && user.room === room);
};
