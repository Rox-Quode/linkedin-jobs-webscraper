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

// how to do routing in express
// app.METHOD(PATH, HANDLER)

// most common methods used in expresss

// app.get() get data
// app.post() add data
// app.put() edit data
// app.delete() delete data

// handler is a callback function that gets executed when we visit the PATH- the path on the serveer which we will define
//'/' the homepage of the local port 8000 - our path of choice
// we show the text from our backend in our browser 

app.get('/', function(req, res) {
    res.json('This is my webscaper')
})

// we show the results from our webscapping in the browser when we visit a certain endpoint ('/results')

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