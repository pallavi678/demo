const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/Sample')
        console.log("connected to the databse")
    }
    catch (err) {
        console.log("error while connecting to the databse", err)
    }
}
connectDB()
app.use(cors())
//create schema
const empSchema = new mongoose.Schema({
    end_year: String,
    intensity: Number,
    sector: String,
    topic: String,
    insight: String,
    url: String,
    region: String,
    start_year: Number,
    impact: String,
    added: String,
    published: String,
    country: String,
    relevance: Number,
    pestle: String,
    source: String,
    title: String,
    likelihood: Number
})

const empModel = mongoose.model('empModel', empSchema,'new')
app.get('/api/data', async(req, res) => {

    try {
        const data = await empModel.find();
        res.json(data);
    }
    catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Server error' });
    }
})
app.post('/api/data', async(req, res) => {

    try {
        const data = await empModel.find();
        res.json(data);
    }
    catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Server error' });
    }
})

app.listen(8000, console.log("conetced"))