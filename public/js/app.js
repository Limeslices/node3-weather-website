const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const location = search.value

    fetch(`/weather?address=${location}`)
    .then((response)=> {
        response.json()
            .then((data) => {
                if(data.error) {
                     console.log(data.error)
                     messageTwo.textContent = data.error
                } else {
                    console.log(data.address)
                    console.log(data.forcast)
                    console.log(data.temp)
                    messageOne.textContent = data.forcast +', ' + data.temp + ' degrees'
                }
                
            })
    })
})
