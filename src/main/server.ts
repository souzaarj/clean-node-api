import app from './config/app'

const PORT = process.env.PORT ?? 5050

app.listen(5050, () => console.log(`Server running at http://localhost:${PORT}`))
