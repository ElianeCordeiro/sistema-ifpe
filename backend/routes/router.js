const router = require("express"). Router()
const serviceRouterStudents = require("./students")
const serviceRouterSubjects = require("./subjects")
const serviceRouterEnrollments = require("./enrollments")
const loginEnrollments = require("./login")

router.use("/", serviceRouterStudents)
router.use("/", serviceRouterSubjects)
router.use("/", serviceRouterEnrollments)
router.use("/", loginEnrollments)

module.exports = router