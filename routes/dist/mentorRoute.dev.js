"use strict";

var express = require("express");

var router = express.Router();

var mentor = require("../models/mentor");

var student = require("../models/student");

router.get("/", function _callee(req, res) {
  var mentors;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(mentor.find());

        case 3:
          mentors = _context.sent;
          res.json(mentors);
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
router.get("/allotment", function _callee2(req, res) {
  var mentorAlloted, mentors, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, a, studentName, i, find;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          mentorAlloted = [];
          _context2.next = 4;
          return regeneratorRuntime.awrap(mentor.find());

        case 4:
          mentors = _context2.sent;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context2.prev = 8;
          _iterator = mentors[Symbol.iterator]();

        case 10:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context2.next = 27;
            break;
          }

          a = _step.value;
          //console.log(a.students);
          studentName = [];
          i = 0;

        case 14:
          if (!(i < a.students.length)) {
            _context2.next = 23;
            break;
          }

          if (!(a.students[i] !== null)) {
            _context2.next = 20;
            break;
          }

          _context2.next = 18;
          return regeneratorRuntime.awrap(student.findOne({
            studentId: a.students[i]
          }));

        case 18:
          find = _context2.sent;

          if (find !== null) {
            console.log(find.name);
            studentName.push(find.name);
          }

        case 20:
          i++;
          _context2.next = 14;
          break;

        case 23:
          mentorAlloted.push({
            mentor: a.name,
            subject: a.subject,
            studentNames: studentName
          });

        case 24:
          _iteratorNormalCompletion = true;
          _context2.next = 10;
          break;

        case 27:
          _context2.next = 33;
          break;

        case 29:
          _context2.prev = 29;
          _context2.t0 = _context2["catch"](8);
          _didIteratorError = true;
          _iteratorError = _context2.t0;

        case 33:
          _context2.prev = 33;
          _context2.prev = 34;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 36:
          _context2.prev = 36;

          if (!_didIteratorError) {
            _context2.next = 39;
            break;
          }

          throw _iteratorError;

        case 39:
          return _context2.finish(36);

        case 40:
          return _context2.finish(33);

        case 41:
          res.json(mentorAlloted);
          _context2.next = 47;
          break;

        case 44:
          _context2.prev = 44;
          _context2.t1 = _context2["catch"](0);
          res.json({
            message: _context2.t1
          });

        case 47:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 44], [8, 29, 33, 41], [34,, 36, 40]]);
});
router.post("/", function _callee3(req, res) {
  var newMentor, savedMentor;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log(req.body);
          newMentor = new mentor({
            mentorId: req.body.mentorId,
            name: req.body.name,
            subject: req.body.subject,
            age: req.body.age,
            students: req.body.students
          });
          _context3.prev = 2;
          _context3.next = 5;
          return regeneratorRuntime.awrap(newMentor.save());

        case 5:
          savedMentor = _context3.sent;
          res.json(savedMentor);
          _context3.next = 12;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](2);
          res.json({
            message: _context3.t0
          });

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 9]]);
});
router.get("/:mentorId", function _callee4(req, res) {
  var find;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(mentor.findOne({
            mentorId: req.params.mentorId
          }));

        case 3:
          find = _context4.sent;
          res.json(find);
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          res.json({
            message: _context4.t0
          });

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.patch("/update", function _callee5(req, res) {
  var doc;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(mentor.findOneAndUpdate({
            name: req.body.mentor
          }, {
            $push: {
              students: req.body.students
            }
          }, {
            "new": true
          }));

        case 3:
          doc = _context5.sent;
          res.json(doc);
          _context5.next = 10;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          res.json({
            message: _context5.t0
          });

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
module.exports = router;