const http = require('http');
const usuariosRoutes = require('./rotas/usuarios');

const server = http.createServer((req, res) => {
    if (req.url.startsWith('/usuarios')) {
        usuariosRoutes(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ mensagem: 'Rota não encontrada!' }));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
