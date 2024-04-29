const express = require('express');
const router = express.Router();
const User = require('../auth/User'); 

router.delete('/admin/delete', async (req, res) => {
    try {
        const { userIds } = req.body;
        if (!userIds || !Array.isArray(userIds)) {
            return res.status(400).json({ error: 'User IDs are required' });
        }

        const result = await User.deleteMany({ _id: { $in: userIds } });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'No users found to delete' });
        }

        res.status(200).json({ message: 'Users deleted successfully' });
    } catch (error) {
        console.error('Error deleting users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



router.put('/admin/block', async (req, res) => {
    try {
        const { userIds } = req.body;

        if (!userIds || !Array.isArray(userIds)) {
            return res.status(400).json({ error: 'User IDs are required' });
        }

        const result = await User.updateMany(
            { _id: { $in: userIds } },
            { status: 'blocked' }
        );

        if (result.nModified === 0) {
            return res.status(404).json({ error: 'No users found to block' });
        }

        if (userIds.includes(req.user._id.toString())) { 
            
            return res.redirect('/login'); 
        }

        res.status(200).json({ message: 'Users blocked successfully' });
    } catch (error) {
        console.error('Error blocking users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.put('/admin/unblock', async (req, res) => {
    try {
        const { userIds } = req.body;
        if (!userIds || !Array.isArray(userIds)) {
            return res.status(400).json({ error: 'User IDs are required' });
        }

        const result = await User.updateMany(
            { _id: { $in: userIds } },
            { status: 'active' } 
        );

        if (result.nModified === 0) {
            return res.status(404).json({ error: 'No users found to unblock' });
        }

        res.status(200).json({ message: 'Users unblocked successfully' });
    } catch (error) {
        console.error('Error unblocking users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;