const users=[]

const joinRoom=(id,roomName,userName)=>{
    userName=userName.trim().toLowerCase()
    roomName=roomName.trim().toLowerCase()
   if(!userName || !roomName)
   {
       return {error:"Username and room are required"}
   }
   let existingUser=users.find((user)=>{
       return user.name===userName && user.room===roomName

   })
   if(existingUser)
   {
       return {error:"Username is taken !"}
   }
   const user={
    id,
    name:userName,
    room:roomName
}
   users.push(user)
    return {user:user}
}
const deleteUser=(id)=>{
const index=users.findIndex((user)=>{
    return user.id===id
})
if(index!=-1)
{
    return users.splice(index,1)[0]
}
}
const getUser=(id)=>{
   const user= users.find((user)=>{
       return user.id===id
   })
   return user
}
const getUsersInRoom=(roomName)=>{
    const roomUsers=users.filter((user)=>{
        return user.room ===roomName
    })
    return roomUsers

    
}

module.exports={
    joinRoom,
    deleteUser,
    getUsersInRoom,
    getUser

}





