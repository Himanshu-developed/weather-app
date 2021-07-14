const geoCode= require('./utils/geocode')
const forecast=require('./utils/forecast')
const express= require('express')
const path=require('path')
const hbs=require('hbs')
const app= express()
publicDirectoryPath=path.join(__dirname,'../public')
const viewPath= path.join(__dirname, '../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)
app.use(express.static(publicDirectoryPath))
app.get('',(req, res)=>{
    res.render('index',{
        title:'Weather',
        name:'Himanshu'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About',
        name:'Himanshu'
    })
})
app.get('/help',(req, res)=>{
    
    res.render('help',{
        title:'Help',
        name:'Himanshu'
    })
})
app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geoCode(req.query.address,(error,{latitude , longitude, location})=>{
        if(error){
            return res.send( {error})
        }
        forecast(latitude, longitude, (error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
            
        })
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:'you must provide search term'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})
app.get('*',(req, res)=>{
    res.send('404')
})

app.listen(3000,()=>{
    console.log('server on')
})