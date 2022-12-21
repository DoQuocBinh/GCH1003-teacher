var express = require('express')
const { insertCustomer,getAllCustomers } = require('./customerService')
var router= express.Router()

router.get('/', async (req,res)=>{
    const results = await getAllCustomers()
    res.render('customers/customerHome',{result:results})
})

router.post('/create',async(req,res)=>{
    const name = req.body.txtName
    const age = req.body.txtAge
    const customer = {
        name: name,
        age:age
    }
    await insertCustomer(customer)
    res.redirect('/')
})

router.get('/create',(req,res)=>{
    res.render('customers/createCustomer')
})

module.exports = router


