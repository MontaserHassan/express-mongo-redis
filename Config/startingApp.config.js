const startingApp = (app) => {
    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}`);
    });
};



module.exports = {
    startingApp
};