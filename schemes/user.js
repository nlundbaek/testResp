var mongoose = require("mongoose");


var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String, default:""
    },
    born: {
        type: String, default: ""
    },
    sex: {
        type: String, default: ""
    },
    zip: {
        type: String, default:""
    },
    status: {
        type: String, default: ""
    },
    subject: {
        type: String, default:""
    },
    member :{
      type: Boolean, default:false
    },
    chk_administration :{
       type:Boolean, default:false
    },
    chk_grafisk :{
        type: Boolean, default:false
    },
    chk_hr :{
        type: Boolean, default:false
    },
    chk_it :{
        type: Boolean, default:false
    },
    chk_kommunikation :{
        type: Boolean, default:false
    },
    chk_kundeservice : {
        type: Boolean, default:false
        },
    chk_laboratorie : {
        type: Boolean, default:false
    },
    chk_ledelse : {
        type: Boolean, default:false
    },
    chk_logistik : {
        type: Boolean, default:false
    },
    chk_raadgivning : {
        type: Boolean, default:false
    },
    chk_salg : {
        type: Boolean, default:false
    },
    chk_sundhed : {
        type: Boolean, default:false
    },
    chk_oekonomi : {
        type: Boolean, default:false
    },
    chk_newsletter : {
        type: Boolean, default:false
    },
    admin:{
        type: Boolean, default:false
    },
    courses:{
        type:Array
    }
});

module.exports = mongoose.model("users", userSchema);
