import nc from "next-connect";
import db from "../../../utils/db";
import User from "../../../models/User"
import auth from "../../../middleware/auth";

const handler = nc().use(auth);

handler.post( async (req, res) => {     
    try {
        await db.connectDb();
        const {address } = req.body;
        const user = await User.findById(req.user);
        // console.log('user > ', user, 'user.address > ', user.address)
        await user.updateOne({
            $push: {
                address: address,
            }
        }, {new: true})
        await db.disconnectDb();
        res.json({address: user.address});
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

export default handler;