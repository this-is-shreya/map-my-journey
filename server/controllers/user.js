const { ObjectID } = require("bson")
const userSchema = require("../models/user")

module.exports.getUser = async(req,res)=>{
    try{
        const data = await userSchema.findById(req.user._id)

        return res.status(200).json({
            success:true,
            message:"data fetched successfully",
            data:data
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal server error "+error,
            data:null
        })
    }
}
module.exports.addEvent = async(req,res)=>{
    try{
        let data  = await userSchema.find({_id:req.user._id})
        let score = data[0].overall_score
        if(req.body.new_cat != ""){
            score += 1
        }
        if(req.body.achieve_cat == "biggest achievement"){
            score += 2
        }
        if(req.body.achieve_cat != ""){
            score += 1
        }
        if(req.body.diff_cat != ""){
            score -=1
        }
        await userSchema.findByIdAndUpdate(req.user._id,{
            $push:{
                data:{
                    date: req.body.date,
                    new_cat:req.body.new_cat,
                    diff_cat:req.body.diff_cat,
                    achieve_cat:req.body.achieve_cat,
                    new_d:req.body.new_d,
                    achieve_d:req.body.achieve_d,
                    diff_d:req.body.diff_d,
                    score:score
                }
            }
        })
        await userSchema.findByIdAndUpdate(req.user._id,{
            $set:{
                overall_score:score
            }
        })
        return res.status(200).json({
            success:true,
            message:"added event successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal server error "+error,
            data:null
        })
    }
}
module.exports.getEvents = async(req,res)=>{
        await userSchema.find({_id:req.user._id,"data.$.date":{$gte:req.params.date}}).then(data=>{
            let arr=[]
            for(let ele of data[0].data){
                if(ele.date >= req.params.date){
                    arr.push(ele)
                }
            }
            return res.status(200).json({
                sucess:true,
                message:"data retrieved sucessfully",
                data:arr
            })
        }).catch(error=>{
            return res.status(500).json({
                success:false,
                message:"Internal server error "+error,
                data:null
            })
        })
    
   
}
module.exports.getMaps = async(req,res)=>{

    let diff =[], tried =[], achieve = []
    // console.log(req.params.date)
    await userSchema.find({_id:req.user._id,"data.date":{$gte:req.params.date}})
    .then(data=>{
        
        if(data.length > 0){

        
         data[0].data.forEach((item,index,array)=>{
            if(item.date >= req.params.date){
                if(item.new_cat.length > 0 && item.new_cat[0] != ''){
                    tried.push([item.new_cat,item.new_d])

                }
                if(item.diff_cat.length>0 && item.diff_cat[0] != ''){
                    diff.push([item.diff_cat,item.diff_d])
                }
                if(item.achieve_cat.length>0 && item.achieve_cat[0] != ''){
                    // console.log(item.achieve_cat[0])
                    achieve.push([item.achieve_cat,item.achieve_d])
                }
            }
            if(index == array.length - 1){
                return res.status(200).json({
                    success:true,
                    message:"maps retrieved successfully",
                    data:{tried:tried, diff:diff,achieve:achieve}
                })
                
            }
        
       }) 
    }
    else{
        return res.status(204).json({
            success:true,
            message:"no maps found",
            
        })
    }
            
        
    }).catch(error=>{
        return res.status(500).json({
            success:false,
            message:"Internal server error "+error,
            data:null
        })
    })
    
    
}
module.exports.modifyBadge = async(req,res)=>{
   try{
    const data = await userSchema.findById(req.user._id)
    if(data.starter_badge != true){
        await userSchema.findByIdAndUpdate(req.user._id,{
            $set:{
                starter_badge : true
            }
        })
    }
    else if(data.overall_score >= 50 & data.achiever_badge != true){
   
    
        await userSchema.findByIdAndUpdate(req.user._id,{
            $set:{
                achiever_badge : true
            }
        })
    }
        else if(data.overall_score >= 100 & data.perseverance_badge != true){
   
    
            await userSchema.findByIdAndUpdate(req.user._id,{
                $set:{
                    perseverance_badge : true
                }
            })
    
}
return res.status(200).json({
    success:true,
    message:"Badge modified successfully",
})
}
catch(error){
    return res.status(500).json({
        success:false,
        message:"Internal server error "+error,
        data:null
    })
}
}
module.exports.getSpecificEvent = async(req,res)=>{

    try{
        let result = []
    const data = await userSchema.find({_id:req.user._id,"data.date":req.params.date})
        
        if(data.length != 0){

    
        data[0].data.forEach((item,index,array)=>{
            if(item.date == req.params.date){
                result.push(item)
            }
        })
    }
    return res.status(200).json({
        success:true,
        message:"data retrieved successfully",
        data:result
    })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal server error "+error,
            data:null
        })
    }
}
module.exports.updateEvent = async(req,res)=>{
    try{
        const data = await userSchema.findById(req.user._id)
        const len = data.data.length
        let score = 0
        if(len > 1)
            score = data.data[len-2].score

        if(req.body.new_cat != ""){
            score += 1
        }
        if(req.body.achieve_cat == "biggest achievement"){
            score += 2
        }
        if(req.body.achieve_cat != ""){
            score += 1
        }
        if(req.body.diff_cat != ""){
            score -=1
        }
        await userSchema.findOneAndUpdate({_id:req.user._id},{

            $set:{
                "data.$[t].new_cat"  : req.body.new_cat,
                "data.$[t].diff_cat":req.body.diff_cat,
                "data.$[t].achieve_cat":req.body.achieve_cat,
                "data.$[t].new_d":req.body.new_d,
                "data.$[t].achieve_d":req.body.achieve_d,
                "data.$[t].diff_d":req.body.diff_d,
                "data.$[t].score":score,
                overall_score:score
                 
             }
         },{arrayFilters:[{"t._id" : ObjectID(req.params.id)}]})
         
         return res.status(200).json({
            success:true,
            message:"updated successfully"
         })
        
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal server error "+error,
            data:null
        })
    }
}

module.exports.deleteEvent = async(req,res)=>{
    try{
        await userSchema.findOneAndUpdate({_id:req.user._id},{
                $pull:{"data":{_id:ObjectID(req.params.id)}}
        })
        return res.status(200).json({
            success:true,
            message:"deleted successfully"
         })
        
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal server error "+error,
            data:null
        })
    }
}
module.exports.deleteAccount = async(req,res)=>{
    try{
        await userSchema.findByIdAndDelete(req.user._id)
        return res.status(200).json({
            sucess:true,
            message:"deleted account successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal server error "+error,
            data:null
        })
    }
}