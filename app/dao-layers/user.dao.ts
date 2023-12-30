import { encryptPassword } from "../../library/password.process";
import User from '../model/user.model'

const saveUser = (body: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashedPassword = await encryptPassword(body.password);
            let user = new User({
                full_name: body.full_name,
                email: body.email,
                password: hashedPassword,
            });

            let savedUser = await user.save();
            resolve({ msg: "User registered successfully", user: savedUser });
        } catch (error: any) {
            if (error.code == "11000") {
                reject({ msg: "User is already registered with this email" });
            } else if (error.errors) {
                reject({ msg: error.errors.email.message });
            } else {
                reject(error);
            }
        }
    });
};



const getUsers = (args: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await User.find(args);
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
};

const updateUser = (_id: any, body: any) => {
    return new Promise<any>(async (resolve, reject) => {
        try {
            await findUserById(_id);
            let user = await User.findByIdAndUpdate(_id, body);
            resolve({ msg: "User updated successfully", user });
        } catch (error: any) {
            if (error.code == "11000") {
                reject("User is already registered with this email");
            } else {
                reject(error);
            }
        }
    });
};

const removeUser = (_id: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            await findUserById(_id);
            let user = await User.findByIdAndDelete(_id);
            resolve({ msg: "User deleted successfully", user });
        } catch (error) {
            reject(error);
        }
    });
};

const findUserById = (_id: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findById(_id);
            if (user) {
                resolve(user);
            } else {
                reject({ msg: "User not found" });
            }
        } catch (error: any) {
            reject(error);
        }
    });
};


export const UserDao = { saveUser, getUsers, updateUser, removeUser };