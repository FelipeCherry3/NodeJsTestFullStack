const validarNome = (request, response, next) => {
    const { body }  = request;

    if (body.nome === undefined) {
        return response.status(400).json({ message : 'precisa do titulo'});
    }
    if (body.nome === '') {
        return response.status(400).json({ message : 'O campo "nome" esta vazio'});
    }
    next();
};

const validarStatus = (request, response, next) => {
    const { body }  = request;

    if (body.status === undefined) {
        return response.status(400).json({ message : 'precisa de status'});
    }
    if (body.status === '') {
        return response.status(400).json({ message : 'O campo status esta vazio'});
    }
    next();
};



module.exports = {
    validarNome,
    validarStatus
};