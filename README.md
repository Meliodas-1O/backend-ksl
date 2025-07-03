# Backend-ksl

---

## 🚀 Features

- ✅ Register users
- ✅ Login with email + password
- ✅ Delete users
- ✅ Password hashing with **bcrypt**
- ✅ Token generation with **JWT**
- ✅ Domain-Driven and Clean Architecture
- ✅ Typed from top to bottom using **TypeScript**
- ✅ Easily testable and extendable

---

## 🛠 Tech Stack

- **Node.js**
- **TypeScript**
- **Express.js**
- **JWT**
- **bcrypt**
- **dotenv**

---

## 📦 Setup

1. **Clone the repo:**

```bash
git clone https://github.com/Meliodas-1O/backend-ksl.git
cd backend-ksl
```

2. **Install dependencies :**
   Install dependencies:

```bash
npm install
```

3. **Run the project**

```bash
npm run dev
```

## 🧪 API Endpoints

### 🔹 POST `api/auth/signup`

Register a new user.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "secure123",
  "role": "TEACHER"
}
```

### 🔹 POST `api/auth/login`

Login using email and password.

```bash
{
  "email": "user@example.com",
  "password": "secure123"
}
```

### 🔹 DELETE `api/auth/user/:id`

Delete a user by their unique ID.
