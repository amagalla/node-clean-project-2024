# Docker React Node Boilerplate

Welcome to the Docker React Node Boilerplate! This boilerplate helps you set up a development environment for your React and Node.js application using Docker. Follow these steps to get started:

## Table of Contents
- [1. Update MySQL Settings](#1-update-mysql-settings)
- [2. Create .env File](#2-create-env-file)
- [3. Initialize the Database](#3-initialize-the-database)
- [4. Start the Application](#4-start-the-application)
- [5. Access the Application](#5-access-the-application)
- [6. Connect to MySQL](#6-connect-to-mysql)

---

### 1. Update MySQL Settings

In the `docker-compose.yml` file, make sure to update the MySQL settings to match your requirements.
In `package.json` file, make sure to update username to match Mysql settings.

---

### 2. Create .env File

Create a `.env` file in the root directory of your project. Copy the server environment variables from `DB_HOST` to `WAIT_HOSTS` in this file.

---

### 3. Initialize the Database

Modify the `app/lib/db/init.sql` file to set up your database and tables according to your project's needs.

---

### 4. Start the Application

To start the application, run the following command:

```shell
npm run serve
```
### 5. Access the Application

You can access the application in your web browser:

- **Client:** [http://localhost:8080](http://localhost:8080)
- **Server:** [http://localhost:3000](http://localhost:3000)
- **Swagger:** [http://localhost:3000/admin/swagger](http://localhost:3000/admin/swagger)

### 6. Connect to MySQL

To connect to MySQL, use the following command:

```shell
npm run mysql
```

Enter your password when prompted

Enjoy using this as your base for Dockerized node projects!

Happy coding! 👨‍💻👩‍💻