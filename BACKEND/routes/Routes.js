// backend/routes/routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controller/Controller');
const emailController = require('../nodemailController');
const { verifyToken } = require("../middleware/jwt")

// email routes
 
// emailRoutes.js
router.get('/email-count',verifyToken, emailController.getEmailCount);
 
// Define routes
router.post('/send-email', verifyToken, emailController.sendEmail);
router.get('/email-count',verifyToken, emailController.getEmailCount);

// admin
router.post('/add_admin', controller.add_admin);
router.post('/login_admin', controller.login_admin);
 
 
// Employee routes
// Add this line inside your routes configuration
router.get('/employee/designation-count', controller.countEmployeesByDesignation);
router.post('/add_employee',verifyToken, controller.addEmployee);
router.post('/login_employee', controller.login_employee);

router.get('/get_employees',verifyToken,controller.getAllEmployees);
router.put('/edit_employee/:id',verifyToken, controller.editEmployee);
router.get('/get_employee/:id',verifyToken, controller.getEmployeeById);
router.delete('/delete_employee/:id',verifyToken, controller.deleteEmployee);
router.get('/search_employee/:query',verifyToken, controller.searchEmployee);

router.put('/employeeName/:id',verifyToken, controller.editEmployeeName);
router.put('/employeeEmail/:id',verifyToken, controller.editEmployeeEmail);
router.put('/employeePassword/:id',verifyToken, controller.editEmployeePassword);
router.put('/addEmployeeimg/:id', verifyToken,controller.editEProfilePic);
router.put('/addEmployeecv/:id', verifyToken,controller.editECV);

router.get('/get_admin/:id',verifyToken, controller.getAdminById);
router.put('/adminName/:id',verifyToken, controller.editAdminName);
router.put('/adminEmail/:id',verifyToken, controller.editAdminEmail);
router.put('/adminPassword/:id',verifyToken, controller.editAdminPassword);
router.put('/addAdminimg/:id', verifyToken,controller.editAdminProfilePic);
router.put('/addAdmincv/:id', verifyToken,controller.editAdminCV);

 
 
// Job routes
router.post('/add_job',verifyToken, controller.addJob);
router.get('/get_jobs', verifyToken,controller.getAllJobs);
router.put('/edit_job/:id', verifyToken,controller.editJob); // Add this line for editing jobs
router.delete('/delete_job/:id', verifyToken,controller.deleteJob);
router.get('/get_all_jobs',verifyToken, controller.getEveryJob);
router.get('/get_job/:id', verifyToken,controller.getJobById);
router.put('/activate_deactivate_job/:id', verifyToken,controller.activateDeactivateJob);
 
// Allowance routes
router.post('/add_allowance', verifyToken,controller.addAllowance);
router.get('/get_allowances', verifyToken,controller.getAllAllowances);
router.put('/edit_allowance/:id', verifyToken,controller.editAllowance);
router.delete('/delete_allowance/:id',verifyToken, controller.deleteAllowance);
 
// Basic Salary routes
router.post('/add_basic_salary',verifyToken, controller.addBasicSalary);
router.get('/get_basic_salaries', verifyToken,controller.getAllBasicSalaries);
router.put('/edit_basic_salary/:id', verifyToken,controller.editBasicSalary);
router.delete('/delete_basic_salary/:id', verifyToken,controller.deleteBasicSalary);
//helloooo
// Deduction routes
router.post('/add_deduction',verifyToken, controller.addDeduction);
router.get('/get_deductions', verifyToken,controller.getAllDeductions);
router.put('/edit_deduction/:id', verifyToken,controller.editDeduction);
router.delete('/delete_deduction/:id', verifyToken,controller.deleteDeduction);
 
// Payslip route
router.get('/payslip/:id', verifyToken,controller.generatePayslip);
 
//Applicants add and edit
router.post('/applicants', verifyToken,controller.addApplicant);
router.put('/applicantsName/:id',verifyToken, controller.editApplicantsName);
router.put('/applicantsEmail/:id',verifyToken, controller.editApplicantsEmail);
router.put('/applicantsPassword/:id',verifyToken, controller.editApplicantsPassword);
router.get('/applicants/:id', verifyToken,controller.getApplicantById);
 
router.put('/addimg/:id', verifyToken,controller.editProfilePic);
router.put('/addcv/:id', verifyToken,controller.editCV);
router.get('/piechartdata', controller.getPieChartData);
 
//for applicantsapplied
router.post('/applied-applicants',verifyToken, controller.addAppliedApplicants);

router.get('/applied-applicants/:jobTitle',verifyToken, controller.getApplicantsByJobTitle);
 
// Route for shortlisting an applicant
router.post('/shortlist/:applicantId',verifyToken, controller.shortlistApplicant);
 
// Route for unshortlisting an applicant
router.post('/unshortlist/:applicantId',verifyToken, controller.unshortlistApplicant);
 
// Route for selecting an applicant
router.post('/select/:applicantId', verifyToken,controller.selectApplicant);
 
// Route for unselecting an applicant
router.post('/unselect/:applicantId', verifyToken,controller.unselectApplicant);
 
 //admin_side
router.get('/get_leaves', verifyToken,controller.getAllLeaves);
router.post('/add_leave', verifyToken,controller.addLeave);
router.put('/edit_leave/:id', verifyToken,controller.editLeave);
router.delete('/delete_leave/:id', verifyToken,controller.deleteLeave);
router.put('/activate_deactivate_leave/:id', verifyToken,controller.activateDeactivateLeave);
router.get('/get_leave/:id', verifyToken,controller.getLeaveById);

//employee_side
router.post('/requests', verifyToken,controller.addLeaveRequest);
router.get('/requests',verifyToken, controller.getAllLeaveRequests);
router.get('/requestsbyid/:userID',verifyToken, controller.getAllLeaveRequestsbyid);
router.patch('/requests/:id',verifyToken, controller.cancelLeaveRequest);

//admin side
router.patch('/approve_requests/:id', verifyToken,controller.approveLeaveRequest);
router.patch('/reject_requests/:id', verifyToken,controller.rejectLeaveRequest);
router.post('/subscribe',verifyToken, controller.subscribe);
router.get('/subscribers', verifyToken,controller.getAllSubscribers);

router.get('/applicants', verifyToken, controller.getAllApplicants);
// Add route for getting email count


 
module.exports = router;
 