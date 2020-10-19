const functions = require('firebase-functions');
const express=require('express')
const cors=require('cors')
const stripe=require('stripe')('sk_test_OS1aCGhe7nPj4DRdvJGFpG7800KtYRyTOi')
const app=express()
app.use(cors({origin:true}));
app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).send('Hello')
})
app.post('/payments/create',async (req,res)=>{
    const total=req.query.total
    const paymentIntent=await stripe.paymentIntents.create({
        amount:total,
        currency:'inr'
    });
    res.status(201).send({
        clientSecret:paymentIntent.client_secret
    })
})
exports.api=functions.https.onRequest(app)

