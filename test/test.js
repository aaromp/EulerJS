var should = require('should');
var generate = require('../lib/utils/generator');
var validate = require('../lib/utils/validator');
var find = require('../lib/utils/finder');
var get = require('../lib/utils/getter');

describe('Generator', function(){

  describe('* generate preview', function(){

    it('should generate preview for a prompt that exists', function(){
      var answer, solution;

      solution = 
        'Problem 1\n' +
        '=========\n' +
        '\n' +
        'If we list all the natural numbers below 10 that are multiples of 3 or 5,\n' +
        'we get 3, 5, 6 and 9. The sum of these multiples is 23.\n' +
        '\n' +
        'Find the sum of all the multiples of 3 or 5 below 1000.';

      generate.preview(function(prompt) {
        answer = prompt;
      }, function() {
        answer = '';
      }, '001');

      answer.should.equal(solution);
    });

    it('should call failure callback on request for prompt below lowest number', function(){
      var test;

      generate.preview(function(prompt) {
        console.log(prompt);
        test = false;
      }, function() {
        test = true;
      }, '000');

      test.should.be.true;
    });

    it('should call failure callback on request for prompt above maximum number', function(){
      var test;

      generate.preview(function(prompt) {
        console.log(prompt);
        test = false;
      }, function() {
        test = true;
      }, '405');

      test.should.be.true;
    });

  });

  xdescribe('* generate file', function(){

    it('should generate a js style template for a prompt that exists', function(){
      var answer, solution;

      solution = 
        '// Problem 1\n' +
        '// =========\n' +
        '// \n' +
        '// If we list all the natural numbers below 10 that are multiples of 3 or 5,\n' +
        '// we get 3, 5, 6 and 9. The sum of these multiples is 23.\n' +
        '// \n' +
        '// Find the sum of all the multiples of 3 or 5 below 1000.\n\n\n\n' +
        '// TODO: return your answer for this prompt.\n' +
        'return solution;\n';

      generate.file(function(prompt) {
        answer = prompt;
      }, function() {
        answer = '';
      }, 'js', '001');

      answer.should.equal(solution);
    });

    it('should generate a coffeescript style template for a prompt that exists', function(){
      var answer, solution;

      solution = 
        '# Problem 1\n' +
        '# =========\n' +
        '# \n' +
        '# If we list all the natural numbers below 10 that are multiples of 3 or 5,\n' +
        '# we get 3, 5, 6 and 9. The sum of these multiples is 23.\n' +
        '# \n' +
        '# Find the sum of all the multiples of 3 or 5 below 1000.\n\n\n\n' +
        '# TODO: return your answer for this prompt.\n' +
        'return solution\n';

      generate.file(function(prompt) {
        answer = prompt;
      }, function() {
        answer = '';
      }, 'coffee', '001');

      answer.should.equal(solution);
    });

    it('should call failure callback on request to generate prompt numbered below minimum', function(){

    });
  
    it('should call failure callback on request to generate prompt numbered above maximum', function(){
  
    });

  });

});

xdescribe('Validator', function(){

  describe('* validate one', function(){

    it('should validate a javascript answer against its solution', function() {
      validate.one(function(answer, solution, number) {

      }, function() {

      }, 'js', '001');
    });

    it('should validate a coffeescript answer against its solution', function() {
      validate.one(function(answer, solution, number) {

      }, function() {

      }, 'coffee', '001');
    });

    it('should call failure callback if file does not exist', function() {
      validate.one(function(answer, solution, number) {

      }, function() {

      }, 'coffee', '000');
    });

    it('should call failure callback if solution does not exist', function() {
      validate.one(function(answer, solution, number) {

      }, function() {

      }, 'coffee', '000');
    });

  });

  describe('* validate all', function(){

    it('should validate all answers against their solution', function() {
      validate.all(function(answers) {

      }, function() {

      });
    });

    it('should validate all javascript answers against their solution', function() {
      validate.all(function(answers) {

      }, function() {

      }, 'js');
    });

    it('should validate all coffeescript answers against their solution', function() {
      validate.all(function(answers) {

      }, function() {

      }, 'coffee');
    });

  });

});

xdescribe('Finder', function() {

  describe('* find all', function(){

    it('should return an array of all solution  files', function(){
      find.all();
    });

    it('should return an array of all javascript solution files', function(){
      find.all('js');
    });

    it('should return an array of all coffeescript solution files', function(){
      find.all('coffee');
    });

    it('should return an array of all solution files for a given number', function(){
      find.all(undefined, '001');
    });

    it('should return an array containing only a specified javascript file', function(){
      find.all('js', '001');
    });

    it('should return an array containing only a specified coffeescript file', function(){
      find.all('coffee', '001');
    });

    it('should return an empty array if no solution files files exist', function() {
      find.all('');
    });

  });

  describe('* find highest', function(){

    it('should find highest solution file number', function() {
      find.highest(function(number) {

      }, function() {

      });
    });

    it('should find highest coffeescript solution file number', function() {
      find.highest(function(number) {

      }, function() {

      }, 'coffee');
    });

    it('should find highest javascript solution file number', function() {
      find.highest(function(number) {

      }, function() {

      });
    }, 'js');

    it('should return 000 if no solution files exist', function() {
      find.highest(function(number) {

      }, function() {

      });
    });

  });
});

describe('Getter', function(){

  describe('* get solution', function(){

    it('should return the solution for a given prompt', function(){
      var answer;

      get.solution(function(solution) {
        answer = solution;
      }, function() {
        answer = null;
      }, '010');

      answer.should.equal('142913828922');
    });

    it('should call failure callback as the solution for a file that is numbered below the minimum', function(){
      var test;

      get.solution(function(solution) {
        test = false;
      }, function() {
        test = true;
      }, '000');

      test.should.be.true;
    });

    it('should call failure callback as the solution for a file that is numbered above the maximum', function(){
      var test;

      get.solution(function(solution) {
        test = false;
      }, function() {
        test = true;
      }, '405');

      test.should.be.true;
    });

  });

  describe('* get answer', function(){

    it('should evaluate coffeescript functions', function() {
      var script, answer;

      script = 'script = ->\n' +
                 '\t100\n' +
               '\n' +
               'return do script';

      answer = get.answer(script, 'coffee');

      answer.should.equal('100');
    });

    it('should evaluate javascript functions', function() {
      var script, answer;

      script = 'var script = function() {\n' + 
                  '\treturn 100;\n' + 
                '};\n' +
                'return script();';

      answer = get.answer(script, 'js');

      answer.should.equal('100');
    });

  });

});

