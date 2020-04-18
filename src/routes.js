const express = require('express');
const knex = require('./database/connection');
const fs = require('fs');
const log = require('./logger');

const routes = express.Router();

routes.post('/cadastro', async (req, res) => {
    const {login, senha, email, pergunta, resposta} = req.body;
    const ip = req.connection.remoteAddress;

    const data = {
        loc: "D:\\Downloads\\XWYD 7.56\\Release XWYD\\DBSRV\\run\\account",
        loginlength: login.length,
        passlength: senha.length,
        inicial: login.substring(0,1).toUpperCase()
    }

    if (!fs.existsSync(data.loc + '\\' + data.inicial + '\\' + login)) {
        await knex('contas').insert({
            login,
            senha,
            email,
            pergunta,
            resposta
        });
        
        fs.readFile("./src/fileUtils/7556xt", function (err, file) {
            log(err, ip);
            file.fill(login, 0, data.loginlength);
            file.fill(senha, 16, 16 + data.passlength);
    
            fs.writeFile(data.loc + '\\' + data.inicial + '\\' + login, file, ()=>{});
    
            return res.json({sucess: "Conta criada com sucesso."});
        });
    } else {
        log(`Conta '${login}' já existente`, ip);
        return res.json({error: "Conta já existente."});
    }
});

routes.get('/', async (req, res) => {
    const dados = await knex('contas').select('*');
    return (
        res.json({dados})
    );
})

module.exports = routes;