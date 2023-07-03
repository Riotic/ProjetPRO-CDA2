const mongoose = require('mongoose');

// lignes de connections à modifier selon votre pc
mongoose.connect('mongodb://rio:dossierPro@127.0.0.1:27017/renduPro', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then( () => {
    console.log("connection ok");
}).catch( err => {
    console.log("fail");
    console.log(err);
})

