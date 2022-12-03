const feedDisplay = document.querySelector('#feed')

fetch('http://localhost:8000/results')
.then(response => {return response.json()})
.then(data => {
    data.forEach(jobs => {
        const jobsItem = '<li><h3>' + jobs.title + '</h3><a href="' + jobs.url + '">' + jobs.url + '</a></li>'
        feedDisplay.insertAdjacentHTML("beforeend", jobsItem)
    })
})
.catch(err => console.log(err))

