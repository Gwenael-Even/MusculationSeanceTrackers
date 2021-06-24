const db = require('../model/index')
const User = db.user
const Role = db.role
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../../../config/db')

/**
 * Crée un nouvelle utilisateur
 * @param {object} req 
 * @param {object} res 
 * @returns 
 */
exports.registerNewUser = async (req, res) => {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        })

        user.save((err, user) => {
            if(err) {
                res.status(500).send({ message: err })
                return  
            }

            if(req.body.roles) {
                Role.find(
                    {
                        name: { $in: req.body.roles }
                    },
                    (err, roles) => {
                        if(err) {
                            res.status(500).send({ message: err })
                            return 
                        }
                        user.roles = roles.map(role => role._id)
                        user.save(err => {
                            if(err) {
                                res.status(500).send({ message: err })
                                return  
                            }
                        })
                    }
                )
            } else {
                Role.findOne({ name: "user" }, (err, role) => {
                    if(err) {
                        res.status(500).send({ message: err })
                        return  
                    }
                })
            }
            res.send({ message : "L'utilisateur à bien été crée"})
        })
}

/**
 * Log un utilisateur
 * @param {object} req 
 * @param {object} res 
 * @returns 
 */
exports.loginUser = async (req, res) => {
    console.log('req :', req)
   User.findOne({
       email: req.body.email
   })
   .populate("roles", "-__v")
   .exec((err, user) => {
       if(err) {
           res.status(500).send({ message: err })
           return
       }

       if(!user) {
           return res.status(404).send({ message: "Email ou mot de passe incorrect" })
       }

       let passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

       if(!passwordIsValid) {
           return res.status(401).send({
               accessToken: null,
               message: "Invalid password"
           })
       }

       let token = jwt.sign({ id: user.id}, config.secret, {
           expiresIn: 86400 // 24 heures
       })

       let authorities = []

       for(let i = 0; i < user.roles.length; i++) {
        authorities.push(`ROLES ${user.roles[i].name.toUpperCase()}`)
       }

       res.status(200).send({
           id: user._id,
           email: user.email,
           roles: authorities,
           accessToken: token,
           message: 'La connexion à bien été effectué'
       })
   })
}

exports.getUserDetails = async (req, res) => {
    await res.json(req.userData)
}