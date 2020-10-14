export default {
  mongoDBAtlasConfig: {
    mongoURI:
      process.env.MONGO_URL ??
      'mongodb+srv://root:business1466@cluster0-umchi.gcp.mongodb.net/clean-node-api?retryWrites=true&w=majority',
    mongoCFG: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  mongoLocalUrl:
    process.env.MONGO_URL ?? 'mongodb://mongo:27017/clean-node-api',
  port: process.env.PORT ?? 5050,
  jwtSecret: process.env.JWT_SECRET || 'is very secret: #=$@!$dfda123E$544 '
}
