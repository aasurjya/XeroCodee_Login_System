const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ReturnDocument } = require("mongodb");
const SECRET_KEY = "NOTESAPI"
const UserModel = require('../database/user_schema')

const signup = async (req,res)=>{
    //Existing User Check
    //Hashed Password
    //User Creation
    //Take Generate
    const {username, email, passsword}= req.body;
    try {
        const ExistingUser = await UserModel.findOne({email: email});
        if(ExistingUser){
            return res.status(400).json({message: "Lol, User already Exist"})
        }
        //Hasing the password
        const HashedPassword = await bcrypt.hash(passsword, 10);

        // User Creation
        const result = await UserModel.create({
            email: email,
            passsword: HashedPassword,
            username: username
        })

        //Token Generator
        const token = jwt.sign({email: result.email,id: result._id},SECRET_KEY);
        res.status(201).json({user:result, token:token})

    } catch (error) {
        let a = console.log(Error)
        console.log(a);
        res.status(500).json({message:"Something is Wrong"});
    }
};

const signin = async (req, res)=>{
    //Checking Credentials if it exist
    const {email, passsword} = req.body;
    try {
        const ExistingUser = await UserModel.findOne({email: email})
        if(!ExistingUser){
            return res.status(404).json({message: "User not found Damnnn"})
        }
    //
    const matchPassword = await bcrypt.compare(passsword, ExistingUser.passsword);
    if(!matchPassword){
        return res.status(400).json({message: "Wrong Password ha Bhai, Yaad karle"})
    }
    const token = jwt.sign({email:ExistingUser.email, id: ExistingUser._id}, SECRET_KEY);
    res.status(200).json({user: ExistingUser, token: token});
    } catch (error) {
        console.log("error");
        res.status(500).json({message: "Something is Wrong"});
    }

}
module.exports = {signup, signin};