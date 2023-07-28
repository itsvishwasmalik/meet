import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);

        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("Mongo Database connected");
        });
        connection.on("error", (err) => {
            console.log("Mongo Database connection error", err);
            process.exit();
        });
    } catch (err) {
        console.log(err);
    }
};
