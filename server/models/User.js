const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
// Schema to create Student model
const UserSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            maxlength: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 1,
        },
        firstName: {
            type: String,
            required: true,
            minlength: 1,
        },
        lastName: {
            type: String,
            required: true,
            minlength: 1,
        },
        scores: [
            {
            type: Schema.Types.ObjectId,
              ref: 'Score',
            }
          ]
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

UserSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  
  UserSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };
  
  
  const User = model('User', UserSchema);
  
  module.exports = User;