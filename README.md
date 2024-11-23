Menu and Order Management API
First npm i to install a node_modules 

This backend API is designed to manage a food ordering system, with features such as menu item management, order processing, and user authentication. It is built using Node.js with Express and MongoDB for data management.

User Collection 
https://backend-1065.postman.co/workspace/Backend-Workspace~95105469-0751-4bbb-9246-28dfe20d7652/collection/28187906-b6816ca9-b21c-402b-957e-2c3fce5dc75b?action=share&creator=28187906

Order Collection 
https://backend-1065.postman.co/workspace/Backend-Workspace~95105469-0751-4bbb-9246-28dfe20d7652/collection/28187906-e85f395e-81bf-4fa8-9880-76631ec908a9?action=share&creator=28187906
 
Menu Collection 
https://backend-1065.postman.co/workspace/Backend-Workspace~95105469-0751-4bbb-9246-28dfe20d7652/collection/28187906-f1a1a33c-61f8-4753-acac-a5786e229760?action=share&creator=28187906

This is Postman collection you can easily access a API 

Database Setup
Ensure MongoDB is installed: Install MongoDB on your machine or use a cloud-based solution like MongoDB Atlas.

Connect to MongoDB: In the .env file, set the MONGO_URI variable to your MongoDB connection string.(ENV file already in Zip)


For Run project 
npm run start OR node app.js


MONGO_URI=mongodb://localhost:27017/FoodTask
SECRET_KEY=your-secret-key
