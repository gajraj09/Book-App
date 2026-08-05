import app from './src/app.js'





const startServer = ()=>{
    const port = process.env.PORT || 5000;
    app.listen(port , ()=>{
        console.log(`Server is running on http://localhost:${port}`);
    })
}

startServer();