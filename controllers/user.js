const user = require('../models/user');
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
    const { email, password, nom, prenom, tel, adress, birthdate  } = req.body;

    let avatar = 'avatar.png';
    if (req.file) {
        avatar = req.file.filename;
    }
    const hashedpassword = await bcrypt.hash(password, 12);

    const newuser = new user({
        email, 
        password: hashedpassword,
        nom, 
        prenom, 
        tel, 
        adress, 
        avatar,
        birthdate 
    })

    try {
        await newuser.save();
    } catch (error) {
        return res.status(500).json({message: "something went wrong ", data: error});
    }

    return res.status(201).json({message: 'success', data: newuser});
}

const login = async (req, res) => {
    const {email, password} = req.body;

    let existinguser;

    try {
        existinguser = await user.findOne({email: email});
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong ", data: error});
    }

    if (!existinguser) {
        return res.status(500).json({success: false, message: "user doens't exist!!"});
    }

    const check = await bcrypt.compareSync(password, existinguser.password);

    if (!check) {
        return res.status(500).json({success: false, message: "Password is wrong"});
    }

    return res.status(201).json({success: true, message: 'success', data: existinguser});
}



const GetAll = async (req, res) => {

    let existinguser;
    try {
        existinguser = await user.find();
    } catch (error) {
        return res.status(500).json({success: false, message: "something went wrong ", data: error});
    }

    return res.status(200).json({success: true, message: 'success', data: existinguser});
}

const FindById = async (req, res) => {

    const {id} = req.params;
    let existinguser;

    try {
        existinguser = await user.findById(id);
    } catch (error) {
        return res.status(500).json({message: "something went wrong ", data: error});
    }

    if (!existinguser) {
        return res.status(500).json({message: "user doens't exist!!"});
    }

    return res.status(200).json({messag: 'success', data: existinguser});
}

const UpdateUser = async (req, res) => {

    const {email, password} = req.body;
    const {id} = req.params;

    let existinguser;

    try {
        existinguser = await user.findById(id);
    } catch (error) {
        return res.status(500).json({message: "something went wrong ", data: error});
    }

    if (!existinguser) {
        return res.status(500).json({message: "user doens't exist!!"});
    }

    existinguser.email = email;
    existinguser.password = password;

    try {
        await existinguser.save();
    } catch (error) {
        return res.status(500).json({message: "something went wrong ", data: error});
    }

    return res.status(200).json({messag: 'success', data: existinguser});

}

const Ajout = async (req, res) => {

    const { email, password } = req.body;

    const newuser = new user({
        email, 
        password
    })

    try {
        await newuser.save();
    } catch (error) {
        return res.status(500).json({message: "something went wrong ", data: error});
    }

    return res.status(201).json({messag: 'success', data: newuser});
}


const Deleteuser = async (req, res) => {
 
    const {id} = req.params;

    let existinguser;

    try {
        existinguser = await user.findById(id);
    } catch (error) {
        return res.status(500).json({message: "something went wrong ", data: error});
    }

    if (!existinguser) {
        return res.status(500).json({message: "user doens't exist!!"});
    }

    try {
        await existinguser.remove();
    } catch (error) {
        return res.status(500).json({message: "something went wrong ", data: error});
    }

    return res.status(200).json({message: 'deleted successfully'});

}

exports.GetAll = GetAll;
exports.FindById = FindById;
exports.UpdateUser = UpdateUser;
exports.Ajout = Ajout;
exports.Deleteuser = Deleteuser;
exports.register = register;
exports.login = login;

