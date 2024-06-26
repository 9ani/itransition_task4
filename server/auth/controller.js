const User = require('./User');
const bcrypt = require('bcrypt');

const signUp = async (req, res) => {
    try {
        const { email, full_name, password, re_password } = req.body;

        if (!email || !full_name || !password || !re_password) {
            return res.redirect('/register?error=Missing required fields');
        }

        if (password !== re_password) {
            return res.redirect('/register?error=Passwords do not match');
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.redirect('/register?error=Email already registered');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            full_name,
            password: hashedPassword,
            registrationTime: new Date(),
            status: 'active',
        });
        await newUser.save();

        res.redirect('/login');
    } catch (error) {
        console.error("Error during sign-up:", error);
        res.redirect('/register?error=Unexpected error');
    }
};


// Sign In
const signIn = async (req, res) => {
    try {
        // Update lastLogin timestamp for the user
        const userId = req.user._id;
        await User.findByIdAndUpdate(userId, { lastLogin: new Date() });

        // Redirect based on user type
        if (req.user.isAdmin) {
            res.redirect(`/admin/${req.user._id}`);
        } else {
            res.redirect('/');
        }
    } catch (error) {
        console.error("Error during sign-in:", error);
        res.status(500).send("An error occurred while signing in");
    }
};

const editUser = async (req, res) => {
    try {
        const { full_name, password, re_password, about } = req.body;
        const userId = req.user._id;

        if (!full_name || !password || !re_password || !about) {
            return res.redirect(`/edit/${userId}?error=Missing required fields`);
        }

        if (password !== re_password) {
            return res.redirect(`/edit/${userId}?error=Passwords do not match`);
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.redirect(`/edit/${userId}?error=User not found`);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user.full_name = full_name;
        user.about = about;
        user.password = hashedPassword;

        await user.save();

        res.redirect('/');
    } catch (error) {
        console.error("Error during edit:", error);
        res.redirect(`/edit/${userId}?error=Unexpected error`);
    }
};

const signOut = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error("Error during sign-out:", err);
            res.status(500).send("An error occurred while signing out");
        } else {
            res.redirect('/');
        }
    });
};
const blockUser = async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.status = 'blocked';
        await user.save();

        res.status(200).json({ message: 'User blocked successfully' });
    } catch (error) {
        console.error('Error blocking user:', error);
        res.status(500).json({ message: 'An error occurred while blocking the user' });
    }
};

const unblockUser = async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.status = 'active';
        await user.save();

        res.status(200).json({ message: 'User unblocked successfully' });
    } catch (error) {
        console.error('Error unblocking user:', error);
        res.status(500).json({ message: 'An error occurred while unblocking the user' });
    }
};
module.exports = { signUp, signIn, signOut, editUser, blockUser,unblockUser };
