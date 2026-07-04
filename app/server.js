const express = require('express');
const cookieParser = require('cookie-parser');
const {Users, create_user} = require('./models/user/user.js');
const {Apostilas} = require('./models/materias/apostilas.js')
const {Comentarios} = require('./models/materias/comentarios.js');
const {Videos} = require('./models/materias/videos.js')
const crypto = require('crypto');
const app = express();
const cors = require('cors');


app.use(cors({
  origin: 'http://localhost:5500', 
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.get('/api/get_cookie',async (req,res)=>{
  const user = req.cookies.session_user
  res.json({user})
})
app.post('/api/get_usuario',async (req,res)=>{
  const {id} = req.body;
  const usuario = await Users.findByPk(id)
  return res.status(201).json({usuario})
})
app.post('/api/login', async (req, res) => {
  try {
    const {email, senha} = req.body;
    const hashSenha = crypto.createHash('sha256');
    hashSenha.update(senha);
    
    const usuario = await Users.findOne({
      where: {
        email: email,
        senha: hashSenha.digest('hex')
      }
    });

    if (!usuario) {
      return res.status(401).json({ ok: false }); // 401 Unauthorized
    }

    res.cookie('session_user', usuario.id, { 
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: 'lax'
    });
    
    return res.status(200).json({ ok: true});
    
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ ok: false, message: 'Erro interno' });
  }
});
app.post('/api/user',async (req,res) =>{
    const {nome, email, senha, senha_rep} = req.body
    
    if(senha==senha_rep){
         await create_user({ nome: nome, email: email, senha: senha, senha_rep: senha_rep })
         return res.status(201).json({ok:true})
    }
    else{
       return res.status(400).json({ok:false})
    }
   
})
app.post('/api/esqueceusenha',async (req,res)=>{
   const {email,senha} = req.body
   const usuario = await Users.findOne({
      where:{email: email}
   })
   console.log(usuario.nome)
   if(usuario === null){
      return res.status(400).json({ok:false})
   }else{
      const hashSenha = crypto.createHash('sha256')
      hashSenha.update(senha)
      usuario.senha = hashSenha.digest('hex')
      usuario.save()
      return res.status(200).json({ok:true})

   }
})

app.get('/api/comentarios_video',async (req, res) => {
  if(req.cookies.session_user){
  console.log(req.cookies.session_user)
  const dados = await Comentarios.findAll({
    where:{
      tipo:'Video'
    }
  })
  const onDelete = await Comentarios.findAll({
    where:{
      userId: req.cookies.session_user
    }
  })
  return res.json({
    success: true,
    data: dados,
    onDelete: onDelete,
  }); // Envia resposta como JSON
}
else{
   return res.json({
    seccess:false,
    data:undefined,
    onDelete:undefined
  })
}
});

app.post('/api/create_comentario', async (req,res)=>{
      const {conteudo,tipo} = req.body
      const usuario = await Users.findByPk(req.cookies.session_user)
      console.log(usuario.id)
      await Comentarios.create({
        conteudo:conteudo,
        tipo:tipo,
        userId: usuario.id
      })
      return res.status(200)
})
app.post('/api/deletar_comentario',async (req,res)=>{
  const {id} = req.body
  await Comentarios.destroy({
    where:{id:id}
  })
  res.status(200)
})
app.get('/api/videos', async (req,res)=>{
  const data = await Videos.findAll()
  res.json(data)
})
app.get('/api/apostilas', async (req,res)=>{
  const data = await Apostilas.findAll()
  res.json(data)
})
app.get('/api/comentarios_apostilas',async (req, res) => {
  if(req.cookies.session_user){
    console.log(req.cookies.session_user)
    const dados = await Comentarios.findAll({
      where:{
        tipo:'Apostilas'
      }
    })
    const onDelete = await Comentarios.findAll({
      where:{
        userId: req.cookies.session_user
      }
    })
    return res.json({
      success: true,
      data: dados,
      onDelete: onDelete,
    }); // Envia resposta como JSON
}
else{
  return res.json({
    seccess:false,
    data:undefined,
    onDelete:undefined
  })
}
});
app.listen(3000, () => console.log('Servidor rodando na porta 3000'));