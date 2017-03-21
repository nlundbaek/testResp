var mongoose = require('mongoose');

var courseSchema = new mongoose.Schema
({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    maxattend: {
      type: Number,
      required:true
    },
    lecturer: {
      type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type:String,
        required:true
    },
    department: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    addressname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    member: {
        type: Boolean, default: false
    },
    chk_administration: {
        type: Boolean, default: false
    },
    chk_grafisk: {
        type: Boolean, default: false
    },
    chk_hr : {
        type: Boolean, default: false
    },
    chk_it: {
        type: Boolean, default: false
    },
    chk_kommunikation: {
        type: Boolean, default: false
    },
    chk_kundeservice: {
        type: Boolean, default: false
    },
    chk_laboratorie : {
        type: Boolean, default: false
    },
    chk_ledelse: {
        type: Boolean, default:false
    },
    chk_logistik: {
        type: Boolean, default:false
    },
    chk_raadgivning: {
        type: Boolean, default:false
    },
    chk_salg: {
        type: Boolean, default:false
    },
    chk_sundhed: {
        type: Boolean, default:false
    },
    chk_oekonomi: {
        type: Boolean, default:false
    },
    registered: {
        type: Array
    },
    feedbacks: {
        type: Array
    }
});

module.exports= mongoose.model("course", courseSchema);