"use strict";

var express = require("express");

var router = express.Router();

var student = require("../models/student");

var mentor = require("../models/mentor");

router.get("/", function _callee(req, res) {
  var students;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(student.find());

        case 3:
          students = _context.sent;
          res.json(students);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.json({
            message: _context.t0
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.post("/", function _callee2(req, res) {
  var newStudent, savedStudent;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log(req.body);
          newStudent = new student({
            studentId: req.body.studentId,
            name: req.body.name,
            "class": req.body["class"],
            age: req.body.age,
            mentor: req.body.mentor
          });
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(newStudent.save());

        case 5:
          savedStudent = _context2.sent;
          res.json(savedStudent);
          _context2.next = 12;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](2);
          res.json({
            message: _context2.t0
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 9]]);
});
router.get("/:studentId", function _callee3(req, res) {
  var find;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(student.findOne({
            studentId: req.params.studentId
          }));

        case 3:
          find = _context3.sent;
          res.json(find);
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          res.json({
            message: _context3.t0
          });

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.patch("/update", function _callee4(req, res) {
  var find, mentorChange, studentDoc, mentorDoc;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(student.findOne({
            studentId: req.body.studentId
          }));

        case 3:
          find = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(mentor.findOneAndUpdate({
            name: find.mentor
          }, {
            $pull: {
              students: req.body.studentId
            }
          }, {
            "new": true
          }));

        case 6:
          mentorChange = _context4.sent;
          _context4.next = 9;
          return regeneratorRuntime.awrap(student.findOneAndUpdate({
            studentId: req.body.studentId
          }, {
            mentor: req.body.mentor
          }, {
            "new": true
          }));

        case 9:
          studentDoc = _context4.sent;
          _context4.next = 12;
          return regeneratorRuntime.awrap(mentor.findOneAndUpdate({
            name: req.body.mentor
          }, {
            $push: {
              students: req.body.studentId
            }
          }, {
            "new": true
          }));

        case 12:
          mentorDoc = _context4.sent;
          res.json({
            studentDoc: studentDoc,
            mentorDoc: mentorDoc,
            mentorChange: mentorChange
          });
          _context4.next = 19;
          break;

        case 16:
          _context4.prev = 16;
          _context4.t0 = _context4["catch"](0);
          res.json({
            message: _context4.t0
          });

        case 19:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 16]]);
});
module.exports = router;