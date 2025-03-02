# Laravel & Next.js TODO APP

This project is a **TODO APP** built using **Laravel** (backend) and **Next.js** (frontend). It allows users to manage tasks, set priorities, and upload files.

---

## Features

- User authentication with Laravel Sanctum  
- Task creation, update, and deletion  
- File uploads with Laravel API  
- Responsive UI with Tailwind CSS  
- API integration with Next.js  

---

## Installation

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/PeterAmgd/Todo-App-Task.git
cd Todo-App-Task
```

### 2️⃣ Backend (Laravel) Setup

1. Navigate to the backend directory:

   

2. Install dependencies:

   ```sh
   composer install
   ```

3. Copy the environment file:

   ```sh
   cp .env.example .env
   ```

4. Generate the application key:

   ```sh
   php artisan key:generate
   ```

5. Configure the `.env` file (Database, Mail, etc.).

6. Run database migrations:

   ```sh
   php artisan migrate
   ```

7. Start the Laravel development server:

   ```sh
   php artisan serve
   ```

---

### 3️⃣ Frontend (Next.js) Setup

1. Navigate to the frontend directory:

   ```sh
   cd frontend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create an environment file:

   ```sh
   cp .env.local.example .env.local
   ```

4. Update the `.env.local` file with:

   ```sh
   NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
   ```

5. Run the Next.js development server:

   ```sh
   npm run dev
   ```

---

## Usage

1. Open the frontend in your browser:  

   ```sh
   http://localhost:3000
   ```

2. Login or Register.  
3. Create, update, and delete tasks.  
4. Upload attachments.  
5. View tasks with dynamic updates.  

---

## API Endpoints (Backend)

| Method | Endpoint               | Description            |
|--------|------------------------|------------------------|
| POST   | `/api/auth/login`      | User Login            |
| POST   | `/api/auth/register`   | User Registration     |
| GET    | `/api/list-tasks`      | Fetch all tasks       |
| POST   | `/api/list-tasks`      | Create a new task     |
| PUT    | `/api/list-tasks/{id}` | Update an existing task |
| DELETE | `/api/list-tasks/{id}` | Delete a task         |

---

## Technologies Used

### **Backend (Laravel)**

- Laravel 10  
- Sanctum for authentication  
- MySQL Database  
- File Uploads with Storage  
- RESTful API  

### **Frontend (Next.js)**

- Next.js 14  
- Tailwind CSS  
- Axios for API requests  
- React Hooks (`useState`, `useEffect`)  

---





**Peter Amgd**  
📧 Email: [peteramgd143@gmail.com](mailto:peteramgd143@gmail.com)  
🔗 [LinkedIn](https://linkedin.com/in/PeterAmgd)  
🐙 [GitHub](https://github.com/PeterAmgd)  

---

