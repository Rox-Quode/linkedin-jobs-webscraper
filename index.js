//to use all the packages installed, we need to require them in the index.js file
const PORT = 8000
const axios = require('axios');
const express = require('express');
const cheerio = require('cheerio');

// initialize express and call it 

const app = express()

const url = 'https://www.linkedin.com/jobs/frontend-developer-jobs'

axios(url)
    .then(response => {
        const html= response.data
        const $ = cheerio.load(html)
        const jobs = []
        // $('.base-search-card__subtitle', html).each(function() {
        //     const title = $(this).text()
        //     const url = $(this).find('a').attr('href')
        //     jobs.push({
        //         title,
        //         url
        //     })
        $('.base-card', html).each(function() {
            // const title = $(this).text()
            const url = $(this).find('a').attr('href')
            jobs.push({
                // title,
                url
            })
        })
        console.log(jobs)
    }).catch(err => console.log(err))

app.listen(PORT, () => console.log('server running on PORT ${PORT}'))