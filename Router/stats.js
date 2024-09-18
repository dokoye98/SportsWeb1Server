const express = require('express')
const router = express()
const Stats = require('../model/Stats.js')
const axios = require('axios')

router.get('/update-stats',async(req,res)=>{

    try{
        const response = await axios.get('https://api.example.com/players/otega-oweh/stats')
        const { season, points, assists, rebounds } = response.data


        const newStats = new Stats({
            season,
            points,
            assists,
            rebounds
        })
        await newStats.save()
        res.status(200).send({ message: 'Stats saved successfully', newStats })
    }catch(err){
        res.status(500).send({ message: 'Failed to fetch or save stats', err })
    }
})
module.exports = router