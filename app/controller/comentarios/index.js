export async function read_comentarios(url,comentarios_page) {
    const main = document.getElementById(comentarios_page)
    const comentarios = document.getElementsByClassName('paragrafo')
    const res = await fetch('http://localhost:3000/api/'+url,{method:'GET',credentials: 'include'})
    const {success,data,onDelete} = await res.json();
    if(success){
        async function comentario_show(element) {
             const data_idUser = {id:element.userId}
            const comentario = document.createElement('p')
            comentario.className = 'paragrafo '
            const res_usuario = await fetch('http://localhost:3000/api/get_usuario',{
                  method:'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data_idUser)
            });
            const {usuario} = await res_usuario.json();
            comentario.innerText = usuario.nome+':'+element.conteudo
            comentario.id = element.id
            main.append(comentario)
        }
        for (let index = 0; index < data.length; index++) {
            const paragrafo = data[index];
            await comentario_show(paragrafo);
            
        }
        onDelete.forEach(element=>{
            for (let index = 0; index < comentarios.length; index++) {
                const elemento = comentarios[index];
                console.log(elemento)
                if(elemento.id == element.id){
                    
                    const button = document.createElement('button')
                    button.className = 'btn bg-primary hover:bg-secondary text-white font-medium py-2 px-2 rounded-lg'
                    button.innerText = 'x'
                    button.type = 'submit'
                    button.addEventListener('click', async function () {
                        const data = {id:element.id}
                        const { isConfirmed } = await Swal.fire({
                            title: 'Tem certeza?',
                            text: "Esta ação não pode ser desfeita!",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Sim',
                            willClose: () => {
                                location.reload(); 
                            }
                        });
                        if(isConfirmed){
                        await fetch('http://localhost:3000/api/deletar_comentario',{
                            method:'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(data)
                        })
            
                    }
                    })
                    elemento.append(button)
                }
            }
            
        })
}
else{
    main.innerHTML='Faça login para ver os comentarios'
}
}
export async function create_comentario(tipoComentario,form_id) {
    const form = document.getElementById(form_id)
    form.addEventListener('submit',async function (event) {
        event.preventDefault()
        const formData = new FormData(form)
        const data = {
            conteudo: formData.get('conteudo'),
            tipo:tipoComentario
        }
    try{
    await fetch('http://localhost:3000/api/create_comentario',{
        method:'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    location.reload()
}catch(erro){
    console.log(erro)
}
    })
}