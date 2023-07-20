const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const mongoose = require("mongoose");

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB", {useNewUrlParser: true});

const wikiSchema = new mongoose.Schema ({
    title: String,
    content: String
  });

const Wiki = mongoose.model("wiki", wikiSchema);

app.route("/wikis")
.get(function(req,res){
  Wiki.find({})
  .then(function(founds){
    res.send(found);
  })
  .catch(function(err){
    console.log(err);
  })
})

.post(function(req,res){
  const wiki = new Wiki({
  title: req.body.title ,
  content: req.body.content
})
wiki.save()
.then(function(){
  res.send("success");
})
.catch(function(err){
  console.log(err);
})
})
app.route("/wikis/:wikiTitle")
.get(function(req,res){

Wiki.findOne({title: req.params.wikiTitle})
 .then(function(found){
  if(found){
    res.send(found);
  }
  else {
    console.log("nothing");
  }
 })

})

.put(function(req,res){
  Wiki.replaceOne({
    title:req.params.wikiTitle},
    {title:req.body.title,
    content:req.body.content
  },
  {overwrite:true})
  .then(function()
    {res.send("success")}
  )
  .catch(function(err){
    res.send(err);
  })
  
})

.patch(function(req,res){
  Wiki.updateOne({
    title:req.params.wikiTitle},
    {$set: req.body
  })
  .then(function()
    {res.send("success")}
  )
  .catch(function(err){
    res.send(err);
  })
  
})

.delete(function(req,res){
  Wiki.deleteOne({title: req.params.wikiTitle})
   .then(function(){
    res.send("deleted");
   })
   .catch(function(err){
    res.send(err);
   })
});

app.listen(3000 , function(req,res){
    console.log("server is up at 3000 port");
})

