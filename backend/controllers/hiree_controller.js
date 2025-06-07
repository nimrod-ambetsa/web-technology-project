const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sequelize } = require('../models');
const { DataTypes } = require('sequelize');
const HireeModel = require('../models/hiree')(sequelize, DataTypes);


exports.register_hiree = async (req, res) => {
    console.log("Registering hiree with data:", req.body);
    const { firstName, lastName, phoneNumber, skill, experience, location, password } = req.body;
    const hadhedPassword = await bcrypt.hash(password, 10);

    try {
        const hiree_user = {
            firstName,
            lastName,
            phoneNumber,
            skill,
            experience,
            location,
            password: hadhedPassword
        }
        await HireeModel.create(hiree_user).then(data => {
            res.status(201).send("Hiree registered successfully")
        })
    } catch (error) {
        console.error("Error registering hiree:", error);
        res.status(500).send("Internal server error");
    }
}


exports.login_hiree = async (req, res) => {
    const { phoneNumber, password } = req.body;

    try {
        const hiree = await HireeModel.findOne({ where: { phoneNumber } });

        if (!hiree) {
            return res.status(404).json({ message: "Account not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, hiree.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: hiree.id }, 'your_jwt_secret_key', { expiresIn: '1h' });

        res.status(200).json({
            message: "Login successful",
            token,
            hiree
        });
    } catch (error) {
        console.error("Error logging in hiree:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.logout_hiree = (req, res) => {
    // Invalidate the token on the client side by removing it from storage
    res.status(200).json({ message: "Logout successful" });
}

exports.get_all_hirees = async (req, res) => {
    try {
        const hirees = await HireeModel.findAll({
            attributes: { exclude: ['password'] }
        });
        res.status(200).json(hirees);
    } catch (error) {
        console.error("Error fetching hirees:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}