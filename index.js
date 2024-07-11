const express = require('express')
require('dotenv').config()

let app=express()

app.use(express.json())
let arr=[];
let id=0;

// app.get('/',(req,res)=>{
//     res.send('helloo worldd')
// })

app.get('/first',(req,res)=>{
    res.redirect('/check')
})

app.get('/check',(req,res)=>{
    res.send('helloo check')
})

app.get('/second',(req,res)=>{
    res.send('<h1>helloo worldd</h1>')
})

app.post('/createproduct',(req,res)=>{
    console.log(req.body)
    let obj = req.body
    obj.isDeleted=false
    id++
    obj.id=id
    
    if(obj.name && obj.cost && obj.desc)
    {
        if(arr.find((val)=>{
            return val.name==obj.name
        })){
            res.send({issuccessful:false,msg:"Already exist"})
        }
        arr.push(obj)
        res.send({issuccessful:true,prod:obj})
    }
    else{
        res.send({issuccessful:false,msg:"invalid"})
    }
    
})

// app.get('/getallproduct',(req,res)=>{
//     // console.log(req.body)

//     let ans=arr.filter((val)=>{
//         return val.isDeleted==false
//     }) 

//     res.send({ans})
// })

app.put('/updateprod',(req,res)=>{
    console.log(req.query)
    // console.log(req.body) 
    let id = req.query.id;
    let idx = arr.findIndex((val)=>(val.id==id));
    if(idx>=0)
    {
        let obj=arr[idx]
        obj={
            ...obj,
            ...req.body
        }
        arr[idx]=obj
        res.send({isSuccess:true,updateVal:obj})
    }
    else
    {
        res.send({isSuccess:false,msg:"product not found"})
    }
    
})

app.delete('/deleteprod',(req,res)=>{
    console.log(req.query)
    // console.log(req.body) 
    let id = req.query.id;
    let idx = arr.findIndex((val)=>(val.id==id));
    console.log("index",idx);
    if(idx>=0)
    {
        
        let delobj=arr[idx];

        arr.splice(idx,1)

        res.send({isSuccess:true,msg:'Product deleted successfully'})
    }
    else
    {
        res.send({isSuccess:false,msg:"product not found"})
    }
    
})

app.delete('/softdeleteprod',(req,res)=>{
    console.log(req.query)
    // console.log(req.body) 
    let id = req.query.id;
    let idx = arr.findIndex((val)=>(val.id==id));
    let isDeleted=true
    console.log("index",idx);
    if(idx>=0)
    {
        
        let delobj=arr[idx];

        arr.splice(idx,1)

        res.send({isSuccess:true,msg:'Product deleted successfully'})
    }
    else
    {
        res.send({isSuccess:false,msg:"product not found"})
    }
    
})

app.post('/error',(req,res)=>{
    try
    {
        app.get('/getallproduct',(req,res)=>{
            // console.log(req.body)
        
            let ans=arr.filter((val)=>{
                return val.isDeleted==false
            }) 
        
            res.send({ans})
        })
    }
    catch(err)
    {
        res.status(500).send({isSuccess:true,msg:'errorrrrr'})
    }
})

app.listen(process.env.PORT,()=>{
    console.log('port started on 4200')
})

