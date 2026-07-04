async function index() {
   const link = document.getElementById('link')
    const res = await fetch('http://localhost:3000/api/comentarios_video',{method:'GET',credentials: 'include'})
    const {success} = await res.json()
    if(success){
        link.innerText='Perfil'
        link.href = '../views/user/painel.html'
    }
    else{
        link.innerText = 'Entrar'
       link.href = '../views/user/user.html'
    }  
} 
index()