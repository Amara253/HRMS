const User = require("../models/Applicants_DB")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { CreateError } = require("../utilis/createError")

const register = async (req,res, next) => {

    try {
        const hash = bcrypt.hashSync(req.body.password, 5)
        const newUser = new User({
            ...req.body,
            password: hash
        })
        await newUser.save()
        res.status(201).send("User has been Created!")

    } catch (error) {
        next(error)
    }
}

const login = async (req,res, next) => {
    try {
        const user = await User.findOne({email: req.body.email})
        
        if(!user) return next(CreateError(404,"user not found"))

        const isCorrect = bcrypt.compareSync(req.body.password, user.password)
        if (!isCorrect) return next(400, "wrong password or username!")

        const token = jwt.sign(
            {
            id: user._id,
            },
             process.env.JWT_KEY
        )
        
        const {password, ...info} = user._doc
        res
            .cookie("accessToken", token, {
                httpOnly: false,
            })
            .status(200)
            .send(info)

    } catch (error) {
        next(error)
    }
}


// const login = async (req, res, next) => {
//     try {
//         const user = await User.findOne({ username: req.body.username });

//         if (!user) {
//             return next(CreateError(404, "User not found"));
//         }

//         const isCorrect = bcrypt.compareSync(req.body.password, user.password);
//         if (!isCorrect) {
//             return next(400, "Wrong password or username!");
//         }

//         let userType;
//         if (user.isAdmin) {
//             userType = "admin";
//         } else if (user.isEmployee) {
//             userType = "employee";
//         } else if (user.isApplicant) {
//             userType = "applicant";
//         } else {
//             return next(400, "Invalid user type!");
//         }

//         const token = jwt.sign(
//             {
//                 id: user._id,
//                 userType: userType
//             },
//             process.env.JWT_KEY
//         );

//         const { password, ...info } = user._doc;
//         res.cookie("accessToken", token, {
//                 httpOnly: true,
//             })
//             .status(200)
//             .send(info);
//     } catch (error) {
//         next(error);
//     }
// };

const logout = async (req,res) => {   
    res
        .clearCookie("accessToken", {
            sameSite: "none",
            secure: true
        })
        .status(200)
        .send("User has been logged out!")
}

module.exports = {
    register,
    login,
    logout
}