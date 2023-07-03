const mongoose = require('mongoose');

mongoose.connect('mongodb://softia:softia@192.168.10.133:27017/ezAdmin', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then( () => {
    console.log("connection ok");
}).catch( err => {
    console.log("fail");
    console.log(err);
})

