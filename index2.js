const express = require("express")
function sum(n){
    let ans =0;
    for(let i=0; i<n ;i++){
        ans = ans +i;
    }
    return ans;
}

const app =express();
app.get("/", function(req , res){
    const n = req.query.n;
    const ans = sum(n);
    res.send("hi there the sum is: "+ ans); //localhost:3000/?n=10
})
app.listen(3000);
