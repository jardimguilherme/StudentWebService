const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;

//retorna todos os alunos
router.get("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
      });
    }

    conn.query(
        "SELECT * FROM alunos;",
        (error, resultado, fields) => {
            if(error) { return res.status(500).send({ error: error })}
            return res.status(200).send({ response: resultado })
        }
        );
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
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
      });
    }

    conn.query(
      "INSERT INTO alunos (rga, nome, curso, situacao) VALUES (?,?,?,?);",
      [req.body.rga, req.body.nome, req.body.curso, req.body.situacao],
      (error, resultado, field) => {
        conn.release();

        if (error) {
          return res.status(500).send({
            error: error,
            response: null,
          });
        }

        res.status(201).send({
          mensagem: "Aluno criado com sucesso",
          id_aluno: resultado.insertId,
        });
      }
    );
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
