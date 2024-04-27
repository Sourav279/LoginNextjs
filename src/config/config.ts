require('dotenv').config();
export default{
    dbUrl:process.env.MONGO_URL,
    clientURL:process.env.DOMAIN,
    token:process.env.TOKEN_SECRET
}