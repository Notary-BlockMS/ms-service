module.exports = (app, repository) => {

    app.get('/', async (req, res) => await res.json({ message: 'Funcionando - Microsserviço Serviços!' })) //apagavel

    app.get('/servicos', async (req, res, next) => {
        await repository.getAllServices((err, servicos) => {
            if (err) res.json({ "success": false, "message": "Deu algo errado!" });
            res.json({ "success": true, "message": "OK", "servicos": servicos });
            //res.json(servicos);
        });
    })

    app.get('/servicos/:id', async (req, res, next) => {
        await repository.getServicesById(req.params.id, (err, servico) => {
            if (err) return next(err);
            if (servico) {
                return res.json({ "success": true, "message": "Servico retornado com sucesso!", "servico": servico })
            } else {
                return res.json({ "success": false, "message": "Servico não encontrado" })
            }

        });
    })

    app.post('/criarservico', async (req,res) => {
        const nome = req.body.nome
        const descricao = req.body.descricao
        const valor = req.body.valor

        if (!req.body.nome || !req.body.descricao || !req.body.valor) {
            return res.json({ "success": false, "message": "Dados inválidos" });
        }
        

        await repository.criarservico({'nome':nome, 'descricao':descricao, 'valor':valor}, (err,result) => {
            if(err){ res.json({ "success": false, "message": 'Erro ao cadastrar o pedido!' }) }
            res.json({ "success": true, "message": 'Pedido cadastrado com sucesso!' })
            //res.redirect('/?criarservico=true')
        })
    })

    app.delete('/servicos/:id', async (req, res) => {
        await repository.deleteServico(req.params.id, (err, servico) => {
            if (err) return next(err);
            if (servico) {
                return res.json({ "success": true, "message": 'Servico excluído com sucesso!' })
            } else {
                return res.json({ "success": false, "message": 'Erro ao deletar o servico!' });
            }

        })
    })

    app.put('/servicos/:id', async (req, res) => {
        const id = req.params.id
        const servico = req.body
        await repository.updateServico(id, servico, (err, result) => {
            res.json({ "success": true, "message": 'Servico atualizado com sucesso!' })
            if (err) res.json({ "success": false, "message": 'Erro ao atualizar os dados do servico!' });
        })
    })

    app.patch('/servicos/:id', async (req, res) => {
        const id = req.params.id
        const updates = req.body
        await repository.patchServico(id, updates, (err, result) => {
            if (err) res.json({ "success": false, "message": 'Erro ao atualizar os dados do servico!' });
            else res.json({ "success": true, "message": 'Servico atualizado com sucesso!' })
        })
    })

    //require('../eureka-helper/eureka-helper').registerWithEureka('servico-service', 8082);
    var PORT = process.env.PORT || 8082;
    require('../eureka-helper').registerWithEureka('servico-service-ms', PORT);
}
