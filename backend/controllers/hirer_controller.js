const hirerModel = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register_hirer = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const hirer_user = {
            firstName,
            lastName,
            email,
            password: hashedPassword
        };
        await hirerModel.create(hirer_user).then(data => {
            res.status(201).json({
                message: "Hirer registered successfully"
            });
        });
    } catch (error) {
        console.error("Error registering hirer:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.login_hirer = async (req, res) => {
    const { email, password } = req.body;

    try {
        const hirer = await hirerModel.findOne({ where: { email } });

        if (!hirer) {
            return res.status(404).json({ message: "Account not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, hirer.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: hirer.id }, 'your_jwt_secret_key', { expiresIn: '1h' });

        res.status(200).json({
            message: "Login successful",
            token,
            hirer
        });
    } catch (error) {
        console.error("Error logging in hirer:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}   