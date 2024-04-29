const User = require('../auth/User');
const bcrypt = require('bcrypt');

const addUser = async (req, res) => {
    try {
        const { email, full_name, password } = req.body;

        if (!email || !full_name || !password) {
            return res.status(400).json({ error: 'Email, full name, and password are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            full_name,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const editUserbyAdmin = async (req, res) => {
    try {
        const userId = req.params.id;
        const { full_name } = req.body; // Adjusted to correct parameter

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.full_name = full_name;

        await user.save();

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error editing user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { addUser, editUserbyAdmin, deleteUser }; // Export controller functions
