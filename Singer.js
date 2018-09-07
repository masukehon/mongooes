const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/singer")
    .then(() => console.log("Database connected"))
    .catch(() => process.exit(1));

const singerSchema = new mongoose.Schema({
    name: { type: String, trim: true, unique: true },
    link: { type: String, trim: true, unique: true },
    image: { type: String, trim: true, unique: true }
});

const Singer = mongoose.model('Singer', singerSchema);

module.exports = { Singer };

// Singer.insertMany([
//         { name: "Tran Thanh Lich", link: "facebook.com/tranthanhlich", image: "2" },
//         { name: "Nguyen Tien Huu", link: "facebook.com/nguyentienhuu", image: "3" }
//     ]).then(() => console.log("thanh cong"))
//     .catch((error) => console.log(error));

// Singer.findByIdAndRemove({ _id: "5b92200a8a0d5c1d2027d0b1" })
//     .then(() => console.log("Xoa thanh cong"));

// Singer.find({}).then((x) => console.log(x));