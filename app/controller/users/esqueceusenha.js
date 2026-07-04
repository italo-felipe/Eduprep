const form = document.getElementById('form')
form.addEventListener('submit',async function (event) {
    event.preventDefault()
    const formData = new FormData(form)
    const data = {
        email: formData.get('email'),
        senha: formData.get('password')
    }
    const res = await fetch('http://localhost:3000/api/esqueceusenha',{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    if(res.ok){
        window.location.replace('../../views/user/user.html')
    }else{
        document.getElementById('alert').innerText="Digite um usuario válido"
    }
})