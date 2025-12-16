import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("All users");
});

router.post("/", (req, res) => {
  res.send("Create a user");
});

//Route-level Middleware
//send to next if user has a secret in body
//if the secret is missing then error response
function validateSecret(req,res,next){
  if(req.body.secret){
    next();
  }else{
    res.status(401).json({message: "Unauthorized"});
  }
}

//After this call this function in next line (then go to postman and run test-json query with/without secret)
// map function to following route
router.post("/test-json", validateSecret, (req, res) => {
  console.log("Received JSON body:", req.body);
  res.json({
    message: "JSON parsed successfully!",
    yourData: req.body
  });
});

router.post("/test-form", (req, res) => {
  console.log("Received FORM body:", req.body);
  res.json({
    message: "Form data parsed successfully!",
    yourData: req.body
  });
});



export default router;
