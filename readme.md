# Task Management Application

This project is a full-stack Task Management application built with **Next.js/Tailwind CSS** on the frontend and **Node.js/Sequelize ORM/MySQL** on the backend.

## Setup Guidelines

### Step 1: Clone the Repository

```bash
git clone https://github.com/muthu4600/task_management.git
cd  task_management
```

### Step 2: Set Up the Server

----------------------------------------------------------------------------------------------

#### 1. MySQL Database Setup

1. Open your terminal or command prompt.
2. Log in to your MySQL server by running the following command:

```bash
mysql -u root -p
```
   Enter your password when prompted.

3. Create the `task_management` database by executing:

```sql
CREATE DATABASE IF NOT EXISTS task_management;
```

4. (Optional) Import the provided SQL dump into the `task_management` database:

   Navigate to config directory

```bash
cd config
mysql -u root -p task_management < task_dump.sql
   ```

   For Windows
```bash
cd config
Get-Content task_dump.sql | mysql -u root -p task_management
   ```

   Enter your password when prompted.

5. Verify the database and its tables:

```sql
USE task_management;
SHOW TABLES;
DESC users;
DESC tasks;
SELECT * FROM users;
SELECT * FROM tasks;
```

#### 2. Modify .env variables [ database config ]
```bash
DB_NAME = task_management
DB_USER = root
DB_PASSWORD = <Your MySQL Database Password>
DB_HOST = localhost
```

#### 3. Install Server Dependencies

1. Navigate to the server directory:

```bash
cd server
   ```

2. Install the required dependencies:

```bash
npm install
   ```

#### 3. Start the Server

Start the development server using one of the following commands:

```bash
npm run dev
```

-----------------------------------------------------------------------------------------------

### Step 3: Set Up the Client

1. Navigate to the client directory:

 ```bash
cd client
   ```

2. Install the required dependencies:

```bash
npm install
   ```

3. Start the client in development mode:

```bash
npm run dev
   ```

4. For production:

```bash
npm run build
npm start
   ```

---

### Routes

- Home: `http://localhost:3000/`
- Login: `http://localhost:3000/login`
- Sign Up: `http://localhost:3000/signup`
- Task Management: `http://localhost:3000/task`

---

### Notes

- Ensure that the MySQL server is running before starting the backend.
- If you encounter any issues during setup, check if the MySQL configuration in `server/config` is correct.

---