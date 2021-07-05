const express = require('express')
const hbs = require('hbs')

const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const path = require('path') //it's core module so no need of installation
const app = express()

const publicDirectoryPath = path.join(__dirname,'../public')  //setting path of public directory---__dirname gives current directory of app.js file

const viewsPath = path.join(__dirname,'../templates/views') //setting path of templates
const partialsPath = path.join(__dirname,'../templates/partials') //setting path of partials

//This line is required to use hbs
app.set('view engine','hbs')
app.set('views',viewsPath)//this is customizable not like above always use 'view engine'
hbs.registerPartials(partialsPath)

//setup static directory
app.use(express.static(publicDirectoryPath)) //let's say this is a function to set up path


//app.com is root domain
//app.com/help can be another route

//this below default route is never going to work as express.static is now set with index.html

app.get('/',(req,res)=>{    //app.get() method takes 2 parameters, route and callback function which has req and res

       res.render('index',{
           title:"Weather",
           create:"Nikhil"
       }) 
})

// Help route
//These all are done by HBS
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help Page',
        create:"By Meow Cat"
    }) //Serving HTML on the route
})

// About route

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Cat",
        create: "Nikhil"
    }) //Serving HTML  on the route
})



//Weather route
app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:'Address is needed'
        })
    }

    geoCode(req.query.address,(error, [lat,lng,location] = [])=>{
        if(error){
            return res.send({
                error
            })
        }

        forecast(lat,lng,(error,response)=>{
            if(error){
                res.send({error})
            }

            res.send({
                forecast:response,
                location,
                address:req.query.address
            })
        })
    })

    // res.send({                      //Serving JSON object on weather route
    //     forecast: 'It is snowing',
    //     temperature: '-5 degree celcius',
    //     address: req.query.address
    // })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"404",
        errmsg:"Help Article Not Found"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:"404",
        errmsg:"Page Not Found"
    })
})


app.listen(3000, () =>{         //app.listen(port_number,callback function)
    console.log('Server is up and running on 3000');
})