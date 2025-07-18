const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const generateToken = require("../Config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;
    if (!name || !email || !password) {
        res.status(401);
        throw new Error("Please Enter all the Fields")
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(401);
        throw new Error("User already exists")
    }

    const user = await User.create({ name, email, password, pic })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            password: user.password,
            token: generateToken(user._id)

        })
    } else {
        res.status(401);
        throw new Error("Failed to create User")
    }
})

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            password: user.password,
            token: generateToken(user._id)
        })
    } else {
        res.status(401);
        throw new Error("Invalid Email or password")
    }
});

module.exports = { registerUser, authUser };