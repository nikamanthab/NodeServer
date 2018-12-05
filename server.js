const express = require("express");
const hbs = require("hbs");
const fs = require("fs");


var app = express();

hbs.registerPartials(__dirname+"/views/partials");
hbs.registerHelper('getYear' , ()=>{
	return new Date().getFullYear();
});
hbs.registerHelper('capitalize' , (text)=>{
	return text.toUpperCase();
});

app.set('view engine','hbs');
app.use(express.static(__dirname+"/public"));

app.use((req,res,next)=>{
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFileSync('server.log',log+"\n");
	next();
});


app.get('/',(request,response)=>{
	response.send({
		key:"nitin",
		password:"nitin321"
	});
});

app.get('/about',(request,response)=>{
	response.render('about.hbs',{
		title: "About nitin",
		// year: new Date().getFullYear(),
	});
})

app.listen(3000 ,()=>{
	console.log("server is started in 3000!")
});