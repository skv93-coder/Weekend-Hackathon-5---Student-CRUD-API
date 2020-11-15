const express = require('express')
let stu=require("./InitialData");
let ptr=stu.length;
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here

app.get("/api/student",(req,res)=>{
  //  console.log(stu);
res.send(stu);
});
app.get("/api/student/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    let student=stu.find((st)=>st.id===id);
    if(student){
        res.send(student);
    }else{
        res.sendStatus(404)
            .send();
    }

})
app.post("/api/student",(req,res)=>{
const body=req.body;
console.log(body);
if(body.name&&body.currentClass&&body.division){
    ptr++;
    let student={id:ptr,...body};
    stu.push(student);
    res.send(student);

}else{
    res.sendStatus(400)
        .send();
}
})
app.put("/api/student/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const body=req.body;
    let sig=false;
    stu=stu.filter((st)=>st.id!==id?st:req.body);
    for(let i=0;i<stu.length;i++){
        if(stu[i].id===id){
            if(body.name){
                stu[i].name=body.name;
            }
            if(body.currentClass){
                stu[i].currentClass=body.currentClass;
            }
            if(body.division){
                stu[i].division=body.division;
            }
            sig=true;
        }
    }
    
    if(sig){
        res.send(body);
    }else{
        res.sendStatus(400)
        .send();
    }
    
})

app.delete("/api/student/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    let copystu=[];
    let sig=false;
    for(let i=0;i<stu.length;i++){
        if(stu[i].id===id){
            sig=true;
        }else{
            copystu.push(stu[i]);
        }
    }
    stu=copystu;
    if(sig){
        res.send(stu);
    }else{
        res.sendStatus(404)
            .send();
    }
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   