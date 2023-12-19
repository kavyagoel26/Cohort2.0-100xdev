const express = require("express")
const app =express();
var users=[{
    name :'john',
    kidney:[{
        healthy: true
    } ,{
        healthy:false

    }]
}]

// user can check how many kidneys they have their health
app.get("/", function(req, res){
    const johnKidney = users[0].kidney;
    const numberOfKidneys = johnKidney.length;
    let healthyKidney = 0;
  for(let i=0 ; i<johnKidney.length; i++){
    if(johnKidney[i].healthy){
        healthyKidney = healthyKidney + 1;
    }
    const unhealthyKidney = numberOfKidneys - healthyKidney;
    res.json({
        johnKidney,
        numberOfKidneys,
        healthyKidney,
        unhealthyKidney
    })
  }
})
//user can add a new kidney
app.use(express.json());
app.post("/" , function(req, res){
    const isHealthy = req.body.isHealthy;
    users[0].kidney.push({
        healthy: isHealthy
    })
    res.json({
        msg:"done"
    })

})
// user can update a unhealthy kidney to healthy one
app.put("/", function(req, res){
    if(isThereAnyUnHealthyKidney()){
    for(let i=0; i<users[0].kidney.length; i++){
        users[0].kidney[i].healthy = true;
    }
    res.json({})
}else{
    res.status(411).json({
        msg: "no bad kidney present"
    })
}

})



//user can delete the unhealthy kidney
app.delete("/", function(req, res){
if(isThereAnyUnHealthyKidney()){
    const newKidney = [];
    for(let i =0; i<users[0].kidney.length; i++){
        if(users[0].kidney[i].healthy){
            newKidney.push({
                healthy: true
            })
        }
    }
    users[0].kidney = newKidney;
    res.json({msg: "done!!"})
}else{
    res.status(411).json({
        msg: "you have no bad kidneys"
    })
}

})
function isThereAnyUnHealthyKidney(){
    let isThereUnhealthyKidney = false;
    for(let i =0; i<users[0].kidney.length; i++){
        if(!users[0].kidney[i].healthy){
            isThereUnhealthyKidney = true
        }
    }
    return isThereUnhealthyKidney

}
app.listen(3000);