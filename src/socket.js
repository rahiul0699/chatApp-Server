const {io}= require('./server')
const {joinRoom,getUsersInRoom,getUser,deleteUser}=require('./utils')
const { v4: uuidv4 } = require('uuid');
io.on('connection', (socket) => {
    socket.on("join",({userName,roomName},callback)=>{
       const {error,user}= joinRoom(socket.id,roomName,userName)
       if(error)
       {
              return callback(error,undefined)
       }
       callback(undefined,user)
      

          socket.join(user.room)
          
          
          
         })
         socket.on("connected",()=>{
            const user=getUser(socket.id)
            socket.emit("message",{user:"admin",text:`Welcome ${user.name} to ${user.room}`,key:uuidv4()})
            socket.broadcast.to(user.room).emit("message",{user:"admin",text:`${user.name} has joined`,key:uuidv4()})
            io.to(user.room).emit("roomData",getUsersInRoom(user.room))
       
            })
    socket.on("sendMessage",(message)=>{
       const user=getUser(socket.id)
      io.to(user.room).emit("message",{user:user.name,text:message,key:uuidv4()})
      
    })
    socket.on('disconnect',()=>{
       const user=deleteUser(socket.id)
    
       if(user)
       {
       io.to(user.room).emit("message",{user:"admin",text:`${user.name} has left the room`,key:uuidv4()})
       io.to(user.room).emit("roomData",getUsersInRoom(user.room))

      }
      
   })
    



  });