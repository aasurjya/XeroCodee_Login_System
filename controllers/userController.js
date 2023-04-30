const UserModel = require();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOtesapi"

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
        console.log(Error)
        res.status(500).json({message:"Something is Wrong"});
    }
};

const signin = (req, res)=>{

}
module.exports = {signup, signin};