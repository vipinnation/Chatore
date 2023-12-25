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


export const UserDao = { saveUser }