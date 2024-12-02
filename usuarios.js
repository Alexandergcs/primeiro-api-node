const { parseBody } = require('../util/parseBody');
const crypto = require('crypto');

let usuarios = [];

const usuariosRoutes = async (req, res) => {
    const { method, url } = req;

    if (url === '/usuarios' && method === 'POST') {
        const body = await parseBody(req);
        try {
            const usuario = JSON.parse(body);
            if (usuario.nome && usuario.email) {
                usuario.id = crypto.randomUUID(); // Gerar um ID único para o usuário
                usuarios.push(usuario);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ mensagem: 'Usuário adicionado com sucesso!', usuario }));
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ mensagem: 'Dados inválidos!' }));
            }
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ mensagem: 'Erro ao processar os dados!' }));
        }
    } else if (url === '/usuarios' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(usuarios));
    } else if (url.startsWith('/usuarios/') && method === 'PUT') {
        const id = url.split('/')[2];
        const body = await parseBody(req);
        try {
            const usuarioAtualizado = JSON.parse(body);
            const index = usuarios.findIndex((user) => user.id === id);
            if (index !== -1) {
                usuarios[index] = { ...usuarios[index], ...usuarioAtualizado };
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ mensagem: 'Usuário atualizado com sucesso!', usuario: usuarios[index] }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ mensagem: 'Usuário não encontrado!' }));
            }
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ mensagem: 'Erro ao processar os dados!' }));
        }
    } else if (url.startsWith('/usuarios/') && method === 'DELETE') {
        const id = url.split('/')[2];
        const index = usuarios.findIndex((user) => user.id === id);
        if (index !== -1) {
            usuarios.splice(index, 1);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ mensagem: 'Usuário deletado com sucesso!' }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ mensagem: 'Usuário não encontrado!' }));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ mensagem: 'Rota não encontrada!' }));
    }
};

module.exports = usuariosRoutes;
