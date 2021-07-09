console.log('Client Side Javascript Loaded!');

// fetch('http://localhost:3000/weather?address=mumbai')
// .then((res)=>res.json())
// .then(data=>{
//     if(data.error)
//     console.log(data.error);
//     else{
        
//     console.log(data.location);
//     console.log(data.forecast);
//     }
// })

const form = document.querySelector('form');

const locationInput = document.querySelector('input');

const messageOne = document.querySelector('#message-1')

const messageTwo = document.querySelector('#message-2')

form.addEventListener('submit',function(e){
    e.preventDefault()

    messageOne.textContent = 'Loading...'

    fetch(`/weather?address=${locationInput.value}`)
    .then((res)=>res.json())
    .then(data=>{
        if(data.error)
        messageOne.innerHTML = data.error
        else{
        messageOne.innerHTML = `Location: ${data.location}`
        messageTwo.innerHTML = `Weather: ${data.forecast}`            
        }
    })
})