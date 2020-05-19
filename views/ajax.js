const express = require('express');
const router = express.Router();
const moongose = require('mongoose');
const users = moongose.model('users');
const course = moongose.model('course');
const faculty = moongose.model('faculty');
const program = moongose.model('program');
const student = moongose.model('student');
const question = moongose.model('question');

console.log("hello")
$(function() {

    var $courses = $('#course');
    var $name = $('#name');
    var $code = $('#code');
  
    //var orderTemplate = $('#order-template').html();
  
    // function addOrder(order) {
    //   $courses.append(Mustache.render(orderTemplate, order));
    // };
  
    // $.ajax({
    //   type: 'GET',
    //   url: 'http://rest.learncode.academy/api/learncode/friends',
    //   success: function(data) {
    //     $.each(data, function(i, order) {
    //       if (order.id) {
    //         addOrder(order);
    //       }
    //     });
    //   },
    //   error: function() {
    //     alert('error loading courses');
    //   }
    // });
  
  
    // $('#update-course').on('click', function() {
    //   var course = {
    //     _id: $_id.val(),
    //     name: $name.val(),
    //     code: $code.val()
    //   };
  
    //   $.ajax({
    //     type: 'POST',
    //     url: '/removecourse',
    //     data: course,
    //     success: function(newCourse) {
    //       editCourse(newCourse);
    //     }
    //   });
    // });
  
    // listen to remove items that aren't there yet
    // delegate bc it applies to things that haven't been created and things that are existing
    $courses.delegate('.delete', 'click', function() {
  
      var $tr = $(this).closest('tr');
  
      $.ajax({
        type: 'DELETE',
        url: '/removecourse',
        success: function() {
          $tr.fadeOut(300, function() {

            $(this).remove();
          });
        }
      });
    });
  
    $courses.delegate('.edit', 'click', function() {
      var $tr = $(this).closest('tr');
      $tr.find('input.name').val();
      $tr.find('input.code').val();
    //   $tr.addClass('edit');
    // });
  
    // $courses.delegate('.cancelEdit', 'click', function() {
    //   $(this).closest('li').removeClass('edit');
    // });
  
    // $courses.delegate('.saveEdit', 'click', function() {
    //   var $tr = $(this).closest('tr');
  
      var newCourse = {
        name: $tr.find('input.name').val(),
        drink: $tr.find('input.drink').val()
      };
  
      $.ajax({
        type: 'PUT',
        url: '/removecourse',
        data: newCourse,
        success: function(editCourse) {
          $tr.find('input.name').html(newCourse.name);
          $tr.find('input.drink').html(newCourse.code);
          //$tr.removeClass('edit');
        },
        error: function() {
          alert('error updating newCourse');
       }
      });
  
    });
  
  
  });

  function editCourse(newCourse){
    course.findOneAndUpdate({_id: newCourse._id},{$set: {code: newCourse.code,name: newCourse.name}},{new: true}, function (err, doc) {
        if (err) {
            console.log("update document error");
        } else {
            console.log("update document success");
            console.log(doc);
        }
    });
  }
  function deleteCourse(_id){
    course.findOneAndUpdate({_id: _id},{$set: {active: false}},{new: true}, function (err, doc) {
        if (err) {
            console.log("delete document error");
        } else {
            console.log("delete document success");
            console.log(doc);
        }
    });
  }
  var courseEdit={
    _id: "5eb6ed6dca27d91624ca91cf",
    code: "IT110",
    name: "SWE",
    active: true,
  }
  //editCourse(courseEdit);