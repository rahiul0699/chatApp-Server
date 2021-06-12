const fs=require('fs')

const joinRoom=(id,userName,roomName)=>{
    const users=getDB()
   
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
   save(users)
    return {user:user}    
}
const save=(db)=>{
    console.log("savingd")
    fs.writeFileSync('db.json',JSON.stringify(db))
    
}

const getDB=()=>{
    try{
        let db=fs.readFileSync('db.json').toString()
        db=JSON.parse(db)
        return db

    }
    catch(e)
    {
        return []
    }
}
console.log(joinRoom(1,"Rahul","React"))