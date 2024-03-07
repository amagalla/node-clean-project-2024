const express = require("express"),
    router = express.Router(),
    {
        registerUser,
        getUser,
        deleteUser,
        updateUser,
    } = require("../../controller/registeration"),
    axios = require("axios");

/**
 * @swagger
 *
 * definitions:
 *      RegisterUser:
 *          type: object
 *          description: User's information
 *          properties:
 *              first_name:
 *                  type: string
 *                  example: John
 *              last_name:
 *                  type: string
 *                  example: Doe
 *              email:
 *                  type: string
 *                  example: email@a1.test
 *              password:
 *                  type: string
 *                  example: abc123
 *      UpdateUser:
 *          type: object
 *          description: User's information
 *          properties:
 *              first_name:
 *                  type: string
 *                  example: Asuna
 */

/**
 * @swagger
 *
 *  /api/profiles/register:
 *
 *  post:
 *      description: Register a new User
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: body
 *            name: User to register
 *            description: The user's information
 *            required: true
 *            schema:
 *              $ref: '#/definitions/RegisterUser'
 *      responses:
 *          200:
 *              description: User registered successfully
 *          400:
 *              description: Registration failed
 */

router.post("/register", async (req, res, next) => {
    let resp, error;

    if (Object.keys(req.body).length === 0) {
        error = new Error("Body data is required");
        error.status = 400;
        return next(error);
    }

    try {
        resp = await registerUser(req.body);
    } catch (err) {
        return next(new Error(resp.error));
    }

    if (resp.error) {
        error = new Error(resp.error);
        error.status = 400;
        return next(error);
    }

    res.status(200).send(resp);
});

/**
 * @swagger
 *
 *  /api/profiles/login:
 *
 *  get:
 *      description: Get all registered users
 *      responses:
 *          200:
 *              description: Received all users
 *          400:
 *              description: Failed to get users
 */

router.get("/login", async (req, res, next) => {
    let resp, restResp;

    try {
        [resp, restResp] = await Promise.all([
            getUser(),
            axios.get("https://api.sampleapis.com/csscolornames/colors"),
        ]);
    } catch (err) {
        return next(new Error(err));
    }

    if (resp.error) {
        return next(new Error(resp.error));
    }

    const result = {
        profile: resp,
        colors: restResp.data.slice(0, 10),
    };

    return res.status(200).send(result);
});

/**
 * @swagger
 *
 *  /api/profiles/deleteUser/{id}:
 *
 *  delete:
 *      description: Delete a User
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The id of a user
 *            required: true
 *            type: number
 *      responses:
 *          200:
 *              description: User deleted successfully
 *          400:
 *              description: User deletion failed
 */

router.delete("/deleteUser/:id", async (req, res, next) => {
    let resp;

    try {
        resp = await deleteUser(req.params.id);
    } catch (err) {
        return next(new Error(err));
    }

    if (resp.error) {
        const error = new Error(resp.error);
        error.status = 400;
        return next(error);
    }

    return res.status(200).send(resp);
});

/**
 * @swagger
 *
 *  /api/profiles/updateUser/{id}:
 *
 *  patch:
 *      description: Update User First Name
 *      produces:
 *          - application/json
 *      parameters:
 *          - in: body
 *            name: Name to replace first name
 *            description: The user's first name
 *            required: true
 *            schema:
 *              $ref: '#/definitions/UpdateUser'
 *          - in: path
 *            name: id
 *            description: The id of a user
 *            required: true
 *            type: number
 *      responses:
 *          200:
 *              description: User first name updated successfully
 *          400:
 *              description: User first name update failed
 */

router.patch("/updateUser/:id", async (req, res, next) => {
    let resp;

    try {
        resp = await updateUser(req.params.id, req.body.first_name);
    } catch (err) {
        return next(new Error(err));
    }

    if (resp.error) {
        const error = new Error(resp.error);
        error.status = 400;
        return next(error);
    }

    return res.status(200).send(resp);
});

module.exports = router;
