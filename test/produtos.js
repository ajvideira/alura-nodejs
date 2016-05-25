var express = require('../config/express')();
var request = require('supertest')(express);
var DatabaseCleaner = require('database-cleaner');
var connection = express.infra.connectionFactory();

describe('#ProdutosController', function(){

  beforeEach(function(done){
    var databaseCleaner = new DatabaseCleaner('mysql');
    databaseCleaner.clean(connection, function(){
      done();
    });
  });

  it('#listagem json', function(done) {
    request.get('/produtos')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('#cadastro de novo produto com dados inválidos', function(done){
    request.post('/produtos')
      .send({titulo: '', descricao: 'Novo Livro'})
      .expect(400, done);
  });

  it('#cadastro de novo produto com dados válidos', function(done){
    request.post('/produtos')
      .send({titulo: 'Livrooooo', descricao: 'Novo Livro', preco: 2})
      .expect(302, done);
  });
});



/*
var http = require('http');
var assert = require('assert');

describe('#ProdutosController', function(){
  it('#listagem json', function(done) {
    var configuracoes = {
      hostname: 'localhost',
      port: 3000,
      path: '/produtos',
      headers: {
        'Accept': 'application/json'
      }
    };
    http.get(configuracoes, function(response){
      assert.equal(response.statusCode, 200, 'Status deve ser 200');
      assert.equal(response.headers['content-type'], 'application/json; charset=utf-8', 'Content-type deve ser JSON');
      done();
    });
  });
});*/
