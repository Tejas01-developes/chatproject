"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getcontact = exports.adduser = exports.loginuser = exports.registeruser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const userschema_js_1 = __importDefault(require("../schemas/userschema.js"));
const refreshschema_js_1 = __importDefault(require("../schemas/refreshschema.js"));
const generatetoken_js_1 = require("../tokenhandelling/generatetoken.js");
const contactschema_js_1 = require("../schemas/contactschema.js");
const registeruser = async (req, resp) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        resp.status(400).send({ succes: false, message: "Fields are missing" });
        return;
    }
    try {
        const res = await userschema_js_1.default.findOne({ email });
        if (!res) {
            const hash = await bcrypt_1.default.hash(password, 10);
            const userid = crypto_1.default.randomUUID();
            await userschema_js_1.default.create({ id: userid, name, email, password: hash });
            resp.status(200).send({ success: true, message: "registration success" });
            return;
        }
        else {
            resp.status(400).send({ succes: false, message: "Email is already registered" });
            return;
        }
    }
    catch (err) {
        resp.status(400).send({ succes: false, message: "Registration failed" });
        return;
    }
};
exports.registeruser = registeruser;
const loginuser = async (req, resp) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return resp.status(400).send({ success: false, message: "Fields are empty" });
    }
    try {
        const res = await userschema_js_1.default.findOne({ email });
        if (!res) {
            return resp.status(400).send({ success: false, message: "Email is not registered" });
        }
        const compare = await bcrypt_1.default.compare(password, res.password);
        if (!compare) {
            return resp.status(400).send({ success: false, message: "password is incorrect" });
        }
        const id = res.id;
        const access = (0, generatetoken_js_1.accesstoken)(id);
        let refresh;
        const refreshres = await refreshschema_js_1.default.findOne({ userid: id });
        if (!refreshres) {
            refresh = (0, generatetoken_js_1.refreshtoken)(id);
            const refreshid = crypto_1.default.randomUUID();
            await refreshschema_js_1.default.create({ id: refreshid, userid: id, token: refresh, added_at: Date.now(), expired_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
        }
        else {
            const now = Date.now();
            const expireddate = refreshres.expired_at;
            if (now > expireddate.getTime()) {
                refresh = (0, generatetoken_js_1.refreshtoken)(id);
                await refreshschema_js_1.default.updateOne({ userid: id }, { $set: { token: refresh, added_at: Date.now(), expired_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) } });
            }
            else {
                refresh = refreshres.token;
            }
        }
        resp.cookie("refresh", refresh, {
            httpOnly: true,
            sameSite: "lax",
            secure: true,
            path: "/"
        });
        return resp.status(200).send({ success: true, message: "Login success", access });
    }
    catch (err) {
        console.log(err);
        return resp.status(400).send({ success: false, message: "login failed" });
    }
};
exports.loginuser = loginuser;
const adduser = async (req, resp) => {
    const userid = req.userId;
    if (!userid) {
        return resp.status(400).send({ success: false, message: "Authentication error" });
    }
    const { email } = req.body;
    if (!email) {
        return resp.status(400).send({ success: false, message: "no email recived" });
    }
    const res = await userschema_js_1.default.findOne({ email: email });
    if (!res) {
        return resp.status(400).send({ success: false, message: "no email recived" });
    }
    const name = res.name;
    const id = crypto_1.default.randomBytes(3).toString("hex");
    const contact_id = `${name}_${id}`;
    await contactschema_js_1.contact_collection.create({ user_id: userid, contact_id, email, name });
    return resp.status(200).send({ success: true, message: "Contact added", name });
};
exports.adduser = adduser;
const getcontact = async (req, resp) => {
    const userid = req.userId;
    if (!userid) {
        return resp.status(400).send({ success: false, message: "Authentication error" });
    }
    const res = await contactschema_js_1.contact_collection.find({ user_id: userid });
    if (res.length === 0) {
        return resp.status(400).send({ success: false, message: "No contact" });
    }
    return resp.status(200).send({ success: true, res });
};
exports.getcontact = getcontact;
//# sourceMappingURL=userauth.js.map