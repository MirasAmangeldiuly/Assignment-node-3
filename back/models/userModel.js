const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        id: mongoose.Schema.Types.ObjectId,
        username: { type: String, required: true },
        password: { type: String, required: true },
        createdData: { type: Date, required: true },
        updatedData: { type: Date, required: true },
        deletedData: { type: Date, required: false },
        isAdmin: { type: Boolean, required: true },
    },
    { versionKey: false } // Disable the version key (__v)
);

const User = mongoose.model('Users', userSchema);

module.exports = User;
