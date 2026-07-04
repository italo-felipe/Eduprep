const form = document.getElementById('form');
form.addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const formData = new FormData(form);
  const data = {
    email: formData.get('email'),
    senha: formData.get('password')
  };

  try {
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Importante para cookies
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.ok) {
      window.location.replace('../../views/index.html');
    } else {
      document.getElementById('alert').innerHTML = "Usuário ou senha incorretos";
    }
    
  } catch (error) {
    console.error('Erro na requisição:', error);
    document.getElementById('alert').innerHTML = "Erro de conexão com o servidor";
  }
});