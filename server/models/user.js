const mongoose = require("mongoose")
const Schema = mongoose.Schema

const user = new Schema({
email:String,
password:String,
first_name:String,
last_name:String,
data:[{
    date:String,
    new_cat:Array,
    diff_cat:Array,
    achieve_cat:Array,
    new_d:String,
    achieve_d:String,
    diff_d:String,
    score:{
        type:Number,
        default:0
    }
}],
overall_score:{
    type:Number,
    default:0
},
starter_badge: {type:Boolean,default:false},
achiever_badge:{type:Boolean,default:false},
perseverance_badge:{type:Boolean,default:false}
})

module.exports = mongoose.model("user",user)