const express = require("express");
const router = express.Router();

//retorna todos os alunos
router.get("/", (req, res, next) => {
  res.status(200).send({
    messagem: "Retorna os alunos",
  });
});

//retorna dados de um aluno
router.get("/:id_student", (req, res, next) => {
    const id = req.params.id_student;
  
    res.status(200).send({
      mensagem: "Retorna um aluno",
      id: id,
    });
  });

//insere um aluno
router.post("/", (req, res, next) => {

    const student = {
        id: req.body.id,
        rga: req.body.rga,
        nome: req.body.name,
        curso: req.body.curso,
        situacao: req.body.situ,
        registrado_em: req.body.registrado_em
    };

  res.status(201).send({
    mensagem: "O aluno foi criado",
    alunoCriado: student
  });
});

//atualiza um aluno
router.put("/", (req, res, next) => {
  const id = req.params.id_student;

  res.status(200).send({
    mensagem: "O aluno foi atualizado",
    id: id,
  });
});

//deleta um aluno
router.delete("/", (req, res, next) => {
  const id = req.params.id_student;

  res.status(200).send({
    mensagem: "O aluno foi excluído",
    id: id,
  });
});

module.exports = router;
