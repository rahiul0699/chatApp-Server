const port=process.env.PORT || 3003
const {server} =require('./server')
require('./socket')
server.listen(port,()=>{
    console.log("Listening @ port ",port)
})

