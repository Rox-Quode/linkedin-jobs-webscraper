//to use all the packages installed, we need to require them in the index.js file

const PORT = 8000
const axios = require('axios')
const express = require('express')
const cheerio = require('cheerio')
const app = express()
const cors = require('cors')
app.use(cors())

// initialize express and call it 

const url = 'https://www.linkedin.com/jobs/frontend-developer-jobs'

app.get('/', function(req, res) {
    res.json('This is my webscaper')
})

// we show the results from our web scaping in the browser when we visit a certain endpoint ('/results')

app.get('/results', (req, res) => {
    axios(url)
    .then(response => {
        const html= response.data
        const $ = cheerio.load(html)
        const jobs = []
        $('.base-card', html).each(function() {
            const title = $(this).find('span.sr-only').text()
            const url = $(this).find('a').attr('href')
            jobs.push({
                title,
                url
            })
        })
        res.json(jobs)
    }).catch(err => console.log(err))
})
app.listen(PORT, () => console.log('server running on PORT ${PORT}'))