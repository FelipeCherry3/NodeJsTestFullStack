const validarValor = (request, response, next) => {
    const { body }  = request;

    if (body.nome === undefined) {
        return response.status(400).json({ message : 'precisa do titulo'});
    }
    if (body.nome === '') {
        return response.status(400).json({ message : 'O campo "nome" esta vazio'});
    }
    next();
};

module.exports = {
    validarValor,
};