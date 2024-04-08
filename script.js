const formEle = document.getElementById('formEle')

//To be executed when the form is submitted
formEle.addEventListener('submit', (event)=>{
    event.preventDefault()

    const formData = new FormData(formEle)
    
    //Getting form data
    const idInput = formData.get('id')
    const nameInput = formData.get('name')
    const addressInput = formData.get('address')
    const statusInput = formData.get('status')

    //Send post request to backend with form data
    fetch('https://sodv1201-a2-q2-backend-1.onrender.com/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({idInput, nameInput, addressInput, statusInput})
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Response Error')
        }
        return response.json()
    })
    //Get the response from backend with form data and fee to update the page with confirmation notice
    .then((regData) => {
        console.log(regData)
        var containerEle = document.getElementById('container')
        containerEle.innerHTML=""
        containerEle.innerHTML=
        `<div id="confirmationNotice">
            <h3>Registration Confirmed</h3>
            <p>ID: ${regData[0].id}</p>
            <p>Full Name: ${regData[0].name}</p>
            <p>Address: ${regData[0].address}</p>
            <p>Status: ${regData[0].status}</p>
            <p>Fee: ${regData[0].fee}$</p>
        </div>`
    })
    .catch((error) => {
        console.error('Error:', error);
    })
})