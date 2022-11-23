var express = require('express')
var app = express()
var fs = require('fs')

app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))

const fileName = "data.txt"

app.get('/view',(req,res)=>{
    let arra = []
    readDataFile(arra)
    res.render('view',{'ds':arra})
})
app.get('/delete',(req,res)=>{
    const name = req.query.name
    let arra = []
    readDataFile(arra)
    let result = arra.filter((value,index,array)=>{
        return value.name != name
    })
    writeDataFile(result)
    res.redirect("/")
})

app.post('/new',(req,res)=>{
    const name =req.body.txtName
    const country = req.body.country
    if(name.trim().length==0){
        res.render("new",{'errorMsg':"Ten k de trang"})
        return
    }
    const content = name + ";" + country + "\n"
    fs.appendFileSync(fileName,content)
    res.redirect('/')

})

app.get('/new',(req,res)=>{
    res.render('new')
})

app.get('/',(req,res)=>{
    res.render('home')
})

const PORT = 3000
app.listen(PORT)
console.log("Server is running!")
function readDataFile(arra) {
    const fileContent = fs.readFileSync(fileName, "utf8").trim()
    if(fileContent.length==0)
        return;
    const lines = fileContent.split("\n")
    lines.forEach(element => {
        let nameAndCountry = element.split(";")
        const employee = {
            name: nameAndCountry[0],
            country: nameAndCountry[1]
        }
        arra.push(employee)
    })
    console.log(arra)
}
function writeDataFile(result){
    let content = ""
    result.forEach( element => {
        content  += element.name + ";" + element.country + "\n"
        
    });
    fs.writeFileSync(fileName,content)
}

