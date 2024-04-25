document.getElementById('btnLogin').addEventListener('click', function (){
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;
    console.log(email, senha)
    
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": email,
            "senha": senha,
        })
    })
    .then(resp => resp.json())
    .then(infoUsuario =>{
        console.log(infoUsuario)
        console.log(infoUsuario.result[0].token)
    })
})