const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const hbs = require('hbs');
const path = require('path');

//local
const {mongoose} = require('./db/mongoose');
const {Url} = require('./models/shortUrl');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.post(`/Url`,(req,res)=>{
  console.log(req.body);
  const url = new Url({
    originalURL:req.body.originalURL,
    shortenedUrl:req.body.shortenedUrl
  })
  url.save().then(doc=>{
    res.send(doc);
  }, e=>{
    res.send(e);
  })
})
  app.get(`/Url`,(req,res)=>{
    Url.find()
    .then(Url=>{
      res.send({Url})
    },e=>{
      res.status(404).send(e);
    })
  })
  app.get(`/Url/new`,(req,res)=>{
    res.render(`./Url/new.hbs`);
  })
  app.get(`/Url/:id`,(req,res)=>{
    const id =req.params.id;
    Url.findById(id)
    .then(todo =>{
      res.send({Url})
    },e=>{
      res.status(404).send(e);
    })
  })

  app.delete(`/Url/:id`,(req,res)=>{
    const id =req.params.id;
    Url.findByIdAndRemove(id)
    .then(Url=>{
      res.send({Url})
    },e=>{
      res.status(404).send(e);
    })
  })
  app.patch(`Url/:id`,(req,res)=>{
    const id= req.params.id;
    const body = _.pick(req.body,[`originalURL`,`shortenedUrl`]);


  Url.findByIdAndUpdate(id,{$set:body},{new:true})
  .then(Url=>{
    if(!Url){
      res.status(404).send()
    }else{
      res.send(Url);
    }
  },e=>{
    res.status(404).send(e);
  })
})

  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  })
