import mongoose, { mongo } from 'mongoose';


const connection = async (username,password) => {
    const URL = `mongodb+srv://${username}:${password}@blog-app.btcuew0.mongodb.net/?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting with the database', error);
    }
    
}

export default connection;