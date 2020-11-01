const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;
const getDate = require("get-date");

//retorna todos os alunos
router.get("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
      });
    }

    conn.query("SELECT * FROM alunos;", (error, resultado, fields) => {
      if (error) {
        return res.status(400).send({
          mensagem: "parametros invalidos",
          error: error,
        });
      }
      return res.status(200).send({ response: resultado });
    });
  });
});

//retorna dados de um aluno
router.get("/:idAluno", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
      });
    }

    conn.query(
      "SELECT * FROM alunos WHERE idAluno = ?;",
      [req.params.idAluno],
      (error, resultado, fields) => {
        if (error) {
          return res.status(404).send({
            mensagem: "Aluno nao encontrado",
            error: error,
          });
        }
        return res.status(200).send({ response: resultado });
      }
    );
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
          return res.status(400).send({
            mensagem: "Parametros invalidos",
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
router.put("/:idAluno", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
      });
    }

    conn.query(
      "UPDATE alunos SET rga = ?, nome = ?, curso = ?, situacao = ? WHERE idAluno = ?;",
      [
        req.body.rga,
        req.body.nome,
        req.body.curso,
        req.body.situacao,
        req.body.idAluno,
      ],
      (error, resultado, fields) => {
        if (error) {
          return res.status(404).send({
            mensagem: "Aluno nao encontrado",
            error: error,
          });
        }
        return res.status(200).send({
          mensagem: "Aluno alterado com sucesso",
          response: resultado,
        });
      }
    );
  });
});

//trata o erro de put em students/
router.put("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
      return res.status(405).send({
        mensagem: "metodo nao permitido",
        erro: 405,
      });
  });
});

//deleta um aluno
router.delete("/:idAluno", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
      });
    }

    conn.query(
      "DELETE FROM alunos WHERE idAluno = ?;",
      [req.body.idAluno],
      (error, resultado, fields) => {
        if (error) {
          return res.status(404).send({
            mensagem: "Aluno nao encontrado",
            error: error,
          });
        }
        return res.status(200).send({
          mensagem: "Aluno removido com sucesso",
          response: resultado,
        });
      }
    );
  });
});

//trata o erro de delete em students/
router.delete("/", (req, res, next) => {
    mysql.getConnection((error, conn) => {
        return res.status(405).send({
          mensagem: "metodo nao permitido",
          erro: 405,
        });
    });
  });

module.exports = router;
