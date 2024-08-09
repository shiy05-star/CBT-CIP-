const express = require("express");
const router = express.Router();
const Concontroller = require("../controller/controller");

router.post('/userRegister', Concontroller.userRegistration);
router.post('/userlogin', Concontroller.userLoginDetails)





/**
* @swagger
* /api/v1/userRegister:
*   post:
*     tags:
*       - userController
*     summary: Used to insert products
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               user_name:
*                 type: string
*               user_password:
*                 type: string
*               user_email:
*                 type: string
*     responses:
*       '200':
*         description: Data Inserted Successfully.
*       '400':
*         description: Bad request - Missing or invalid parameters
*/

// --------------------------
 
/**
* @swagger
* /api/v1/userlogin:
*   post:
*     tags:
*       - userController
*     summary: User login endpoint
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               user_email:
*                 type: string
*               user_password:
*                 type: string
*     responses:
*       '200':
*         description: User logged in successfully
*       '400':
*         description: Bad request - Missing or invalid parameters
*/
 
module.exports = router;