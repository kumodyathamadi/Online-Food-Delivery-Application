import mongoose from "mongoose";



export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://kumo_food_del:Eii9jMLqEm3eu8sj@cluster0.jbjptjj.mongodb.net/FOOD-DEL').then(()=>console.log("DB connected"));
}