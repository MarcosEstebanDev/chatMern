import Message from '../models/message.js'

const controller = {
    save:(req,res) =>{

        const params = req.body
        const message = new Message()
        message.message =  params.message
        message.from = params.from
        console.log(message)

        message.save((error, messageStored)=>{

            if(error || !messageStored){
                return res.status(404).send({
                    status: 'error',
                    message:'No hay mensajes'
                })
            }
            return res.status(200).send({
                status:'Success',
                messageStored
            })
        })
        console.log(message)
    },

    getMessages:(req,res)=>{

        let query = Message.find({})

        query.sort('-_id').exec((error,messages)=>{
            if(error){
                return res.status(500).send({
                    status:'error',
                    message:"Error Extraccion Fallida"
                })
            }
            if(!messages){
                return res.status(404).send({
                    status:'error',
                    message:"No Hay Mensajes"
                })
            }
            return res.status(200).send({
                status:'Success',
                messages
            })
        })
    }
}

export default controller