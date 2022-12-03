const feedDisplay = document.querySelector('#feed')

// fetch api provides a js interface for accessing and manipulating parts if the http pipeline such as req and res

// general syntax
fetch('http://localhost:8000/results')
.then(response => {return response.json()})
.then(data => {
    data.forEach(jobs => {
        const jobsItem = '<li><h3>' + jobs.title + '</h3><a href="' + jobs.url + '">' + jobs.url + '</a></li>'
        feedDisplay.insertAdjacentHTML("beforeend", jobsItem)
    })
})
.catch(err => console.log(err))

