const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require ('jsonwebtoken')
const config = require("../../../config/db")


const User = mongoose.model(
    "User",
    new mongoose.Schema(
        {
            name: {
                type: String,
                required: [true, 'Veuillez insérer un nom']
            },
            email: {
                type: String,
                required: [true, 'Veuillez insérer une adresse mail']
            },
            password: {
                type: String, 
                required: [true, 'Veuillez insérer un mot de passe']
            },
            created_at: {
                type: Date,
                default: new Date()
            },
            updated_at: {
                type: Date,
                default: new Date()
            },
            roles: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Role"
                }
            ]
        }
    )
)
module.exports = User