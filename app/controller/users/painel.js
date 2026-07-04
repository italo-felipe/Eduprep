async function get_user() {
    const res_cookie = await fetch('http://localhost:3000/api/get_cookie',{method:'GET',credentials: 'include'})
    const {user} = await res_cookie.json()
    const data = {id:user}
    const res_user = await fetch('http://localhost:3000/api/get_usuario',{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    const {usuario} = await res_user.json()
    const user_name = document.getElementById('user-name')
    const user_email = document.getElementById('user-email')
    user_name.innerText = usuario.nome
    user_email.innerText = usuario.email
}
get_user()