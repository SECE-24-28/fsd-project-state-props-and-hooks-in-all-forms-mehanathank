StyleHub

StyleHub is a fashion e-commerce web app I built from scratch using React on the frontend and Node.js with MongoDB on the backend. It covers everything a basic online store needs — browsing products, managing a cart, placing orders, and an admin panel to manage everything.

Live site: https://stylehub-frontend-phi.vercel.app


What's inside

The frontend is built with React 19 and Vite, uses React Router for navigation, and is styled with pure CSS — no component library. The backend runs on Node.js with Express, stores data in MongoDB Atlas, and uses Resend for sending OTP emails.


Running it locally

You'll need Node.js and a MongoDB connection string before starting.

Backend

    cd backend
    npm install

Create a .env file inside the backend folder:

    MONGO_URL=your_mongodb_connection_string
    RESEND_API_KEY=your_resend_api_key
    FRONTEND_URL=http://localhost:5173
    NODE_ENV=development

    npm start

Backend runs on http://localhost:5000

Frontend

    cd frontend
    npm install
    npm run dev

Frontend runs on http://localhost:5173


Admin panel

Log in with these credentials and you'll see an Admin Panel option in the account dropdown.

    Email:    admin@stylehub.com
    Password: admin123

From there you can manage products, orders, users, and coupons.


Features

For customers:
- Register and log in
- Browse products filtered by men, women, kids, and baby categories
- View product details with colour and size options
- Add items to cart or wishlist
- Apply coupon codes at checkout
- Place orders and track their status
- Edit profile and change password
- Forgot password flow using OTP sent to email

For admins:
- Dashboard with store overview
- Add, edit, and delete products
- View all orders and update their status
- View and delete users
- Create and delete coupon codes


Default coupon codes

    STYLE10 — 10 off
    HUB20   — 20 off
    SAVE50  — 50 off


API overview

Auth
    POST /api/users/signup
    POST /api/users/login
    POST /api/users/send-otp
    POST /api/users/verify-otp
    POST /api/users/change-password

Users
    GET    /api/users
    GET    /api/users/:id
    PUT    /api/users/:id
    DELETE /api/users/:id

Products
    GET    /api/products
    POST   /api/products
    PUT    /api/products/:id
    DELETE /api/products/:id

Cart
    GET    /api/cart/:userId
    POST   /api/cart
    DELETE /api/cart/:userId

Wishlist
    GET  /api/wishlist/:userId
    POST /api/wishlist

Orders
    POST   /api/orders
    GET    /api/orders
    GET    /api/orders/user/:userId
    PUT    /api/orders/:id
    DELETE /api/orders/:id

Coupons
    GET    /api/coupons
    POST   /api/coupons
    DELETE /api/coupons/:id
    GET    /api/coupons/validate/:code


Folder structure

    stylehub clothing/
    ├── backend/
    │   ├── Controllers/
    │   ├── Models/
    │   ├── Routers/
    │   ├── Utils/
    │   ├── server.js
    │   └── package.json
    │
    └── frontend/
        └── src/
            ├── components/
            ├── context/
            ├── pages/
            │   └── admin/
            ├── App.jsx
            ├── main.jsx
            └── index.css


Deployment

The frontend is deployed on Vercel and the backend on Render. MongoDB is hosted on Atlas.

For the OTP email feature, Resend is used instead of Gmail SMTP because Gmail SMTP causes connection timeouts on Render's free tier.


Contact

Built by Mehanathan — based in KK Nagar, Coimbatore.

Phone: +91 9360553112
Email: stylehub@gmail.com
