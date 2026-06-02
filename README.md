StyleHub

this is my ecommerce project built using react and vite. its a fashion store website where users can buy clothes.


1. what i used

- react 19
- react router dom
- react icons
- vite
- pure css
- localstorage for storing data


2. how to run

first install the packages

npm install

then start the project

npm run dev

then open browser and go to

http://localhost:5173


3. admin login

email    - admin@stylehub.com
password - admin123

to go to admin panel just login with the above details and click admin panel in the account dropdown or just go to /admin in the url


4. pages i made

user pages
- home
- products
- product detail
- cart
- wishlist
- checkout
- order success
- my orders
- my profile
- contact
- about
- login
- signup
- forgot password

admin pages
- dashboard
- products - add edit delete
- orders - view and update status
- users - view and delete
- coupons - create and delete


5. what features work

- register and login
- remember me option
- add to cart
- add to wishlist
- move wishlist item to cart
- apply coupon code
- checkout with address form
- order placed and saved
- view order history
- edit profile and change password
- admin can manage everything


6. coupon codes

these 3 coupons work by default

- STYLE10 - rs 10 off
- HUB20 - rs 20 off
- SAVE50 - rs 50 off


7. where data is saved

everything is saved in localstorage

- sh_users - all users
- sh_session - who is logged in
- sh_products - all products
- sh_orders - all orders
- sh_coupons - all coupons
- sh_wishlist_userId - wishlist for each user
- cart - cart items


8. folder structure

src/
  components/
    Navbar.jsx
    Footer.jsx
    AccountDropdown.jsx
    Modal.jsx
    AppTable.jsx
    FormField.jsx
    ProtectedRoutes.jsx

  context/
    AuthContext.jsx
    CartContext.jsx
    WishlistContext.jsx
    ToastContext.jsx

  pages/
    Home.jsx
    Products.jsx
    ProductDetail.jsx
    Cart.jsx
    Wishlist.jsx
    Checkout.jsx
    OrderSuccess.jsx
    MyOrders.jsx
    MyProfile.jsx
    Contact.jsx
    About.jsx
    Login.jsx
    Signup.jsx
    Forgot.jsx

    admin/
      AdminLayout.jsx
      Dashboard.jsx
      AdminProducts.jsx
      AddProduct.jsx
      EditProduct.jsx
      AdminOrders.jsx
      AdminUsers.jsx
      AdminCoupons.jsx
      ProductForm.jsx

  data/
    products.js

  App.jsx
  main.jsx
  index.css


9. contact

- address - KK Nagar, Coimbatore
- phone - +91 9360553112
- email - stylehub@gmail.com

made with react + vite
