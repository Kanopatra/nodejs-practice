import User from '../models/user.js';

async function handlerGetAllUser(req, res) {
    try {
        const allUsers = await User.find({});

        if (!allUsers || allUsers.length === 0) {
            return res.status(404).json({
                status: "No users found"
            });
        }

        return res.status(200).json(allUsers);

    } catch (error) {
        return res.status(500).json({
            status: "Error fetching users",
            error: error.message
        });
    }
}

async function handlerCreateUser(req, res) {
    try {
        const body = req.body;

        if (
            !body ||
            !body.first_name ||
            !body.last_name ||
            !body.email ||
            !body.gender ||
            !body.job_title
        ) {
            return res.status(400).json({
                status: "All fields are required"
            });
        }

        const result = await User.create({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            gender: body.gender,
            job_title: body.job_title
        });

        return res.status(201).json({
            status: "Created Successfully",
            result
        });

    } catch (error) {
        return res.status(500).json({
            status: "Error creating user",
            error: error.message
        });
    }
}

async function handlerGetUserById(req, res) {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                status: 'User Not Found'
            });
        }

        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json({
            status: "Error fetching user",
            error: error.message
        });
    }
}

async function handlerUpdateUserById(req, res) {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { last_name: "changed" },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                status: "User not found"
            });
        }

        return res.status(200).json({
            status: "Updated Successfully",
            user
        });

    } catch (error) {
        return res.status(500).json({
            status: "Error updating user",
            error: error.message
        });
    }
}

async function handlerDeleteUserById(req, res) {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({
                status: "User not found"
            });
        }

        return res.status(200).json({
            status: "User Deleted Successfully",
            id: deletedUser.id
        });

    } catch (error) {
        return res.status(500).json({
            status: "Error deleting user",
            error: error.message
        });
    }
}

export{
    handlerGetAllUser,
    handlerCreateUser,
    handlerGetUserById,
    handlerUpdateUserById,
    handlerDeleteUserById
};