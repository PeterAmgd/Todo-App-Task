# Laravel & Next.js TODO APP

This project is a **TODO APP** built using **Laravel** (backend) and **Next.js** (frontend). It allows users to manage tasks, set priorities, and upload files.

---

## Features

<ul>
  <li>User authentication with Laravel Sanctum</li>
  <li>Task creation, update, and deletion</li>
  <li>File uploads with Laravel API</li>
  <li>Responsive UI with Tailwind CSS</li>
  <li>API integration with Next.js</li>
</ul>

---

## 🛠 Installation

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/PeterAmgd/Todo-App-Task.git
cd your-repo
2️⃣ Backend (Laravel) Setup
<ol> <li>Navigate to the backend directory:</li>

<li>Install dependencies:</li>

composer install
<li>Copy the environment file:</li>

cp .env.example .env
<li>Generate the application key:</li>

php artisan key:generate
<li>Configure the <code>.env</code> file (Database, Mail, etc.).</li> <li>Run database migrations:</li>

php artisan migrate
<li>Start the Laravel development server:</li>

php artisan serve
</ol>
3️⃣ Frontend (Next.js) Setup
<ol> <li>Navigate to the frontend directory:</li>

<li>Install dependencies:</li>

npm install
<li>Create an environment file:</li>

cp .env.local.example .env.local
<li>Update the <code>.env.local</code> file with:</li>

NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
<li>Run the Next.js development server:</li>

npm run dev
</ol>
⚡ Usage
<ul> <li>Open the frontend in your browser:</li>

http://localhost:3000
<li>Login or Register.</li> <li>Create, update, and delete tasks.</li> <li>Upload attachments.</li> <li>View tasks with dynamic updates.</li> </ul>
📜 API Endpoints (Backend)
<table> <tr> <th>Method</th> <th>Endpoint</th> <th>Description</th> </tr> <tr> <td>POST</td> <td>/api/auth/login</td> <td>User Login</td> </tr> <tr> <td>POST</td> <td>/api/auth/register</td> <td>User Registration</td> </tr> <tr> <td>GET</td> <td>/api/list-tasks</td> <td>Fetch all tasks</td> </tr> <tr> <td>POST</td> <td>/api/list-tasks</td> <td>Create a new task</td> </tr> <tr> <td>PUT</td> <td>/api/list-tasks/{id}</td> <td>Update an existing task</td> </tr> <tr> <td>DELETE</td> <td>/api/list-tasks/{id}</td> <td>Delete a task</td> </tr> </table>
📌 Technologies Used
Backend (Laravel)
<ul> <li>Laravel 10</li> <li>Sanctum for authentication</li> <li>MySQL Database</li> <li>File Uploads with Storage</li> <li>RESTful API</li> </ul>
Frontend (Next.js)
<ul> <li>Next.js 14</li> <li>Tailwind CSS</li> <li>Axios for API requests</li> <li>React Hooks (useState, useEffect)</li> </ul>