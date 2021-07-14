console.log('client side js loaded')

const weatherForm=document.querySelector('form')
const search= document.querySelector('input')
const messageone=document.querySelector('#message-1')
messageone.textContent=''
const messagetwo=document.querySelector('#message-2')
messagetwo.textContent=''
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location= search.value
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageone.textContent=data.error
        }
        messageone.textContent=data.location
        messagetwo.textContent=data.forecast
    })
})
})
