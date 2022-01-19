import Order from "../../models/order";
import jwt from "jsonwebtoken";

export default async (req, res) => {
    try {
        const { userId } = jwt.verify(req.headers.authorization,
            process.env.JWT_SECRET);
        const orders = await Order.find({ user: userId })
            .sort({ createAt: "desc" })
            .populate({
                path: "products.product",
                model: "Product"
            });
        res.status(200).json({ orders });
    } catch (error) {
        console.error(error);
        res.status(403).send("Please login again");
    }
}