const form = document.getElementById('form');
form.addEventListener('submit',async function(event){
    event.preventDefault()
    const formData = new FormData(form);
    const nome = formData.get('nome');
    const email = formData.get('email');
    const password = formData.get('password');
    const password_repeat = formData.get('password_repeat');
    
    const data={
        nome:nome,
        email: email,
        senha: password,
        senha_rep:password_repeat
    }
    const res = await fetch('http://localhost:3000/api/user',{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    console.log(res.ok)
    if(!res.ok){
        document.getElementById('alert').innerText="Digite as senhas iguais"
    }else{
        window.location.replace('../../views/user/user.html')
    }
    
})