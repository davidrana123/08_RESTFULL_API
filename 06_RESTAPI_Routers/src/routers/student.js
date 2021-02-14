const express = require("express");
const router = new express.Router();
const Student = require("../models/students");

router.post("/students", async(req,res) => {

    try{     
    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);

    }catch(e) { res.status(400).send(e);}  
})

// read the data of registered Student
router.get("/students", async(req,res) => {

    try{
     const studentsData = await Student.find();
     res.send(studentsData);
    }catch(e){
        res.send(e);
    }
})
//get the indivisual student data using id
router.get("/students/:id",async(req,res) => {
    try{
        const _id = req.params.id;
        const studentData = await Student.findById(_id);

        if(!studentData){
            return res.status(404).send();
        }else{
            res.send(studentData);
        }
        res.send(studentData);
    }catch(e){
            res.status(500).send(e);
        }
    
})

//update the studentsby by id
router.patch("/students/:id",async(req,res) => {
    try{
        const _id = req.params.id;
       const updateStudents = await Student.findByIdAndUpdate(_id,req.body,{
            new:true
       })
        
        res.send(updateStudents);

    }catch(e){
        res.status(400).send(e);
    }
})
//delete the studens by id 

router.delete("/students/:id",async(req,res) => {
    try{
    const deleteStudent  = await Student.findByIdAndDelete(req.params._id);
    if(!req.params.id){
        return res.status(400).send();
    }
    res.send(deleteStudent);
    }catch(e){
        res.status(500).send(e);
    }
})

module.exports = router;