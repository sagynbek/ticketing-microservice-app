import mongoose from 'mongoose';

interface IUserAttrs {
  email: string,
  password: string,
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(atts: IUserAttrs): UserDoc,
}

interface UserDoc extends mongoose.Document {
  _id: string,
  email: string,
  password: string,
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});
userSchema.statics.build = (attrs: IUserAttrs) => {
  return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
