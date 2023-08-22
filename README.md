# VIP NCS FANS

[VIP NCS Fans](https://vnf-website.vercel.app) is a web app created for NCS Fans with the purpose to provide the lost media that the record label NoCopyrightSounds has released over the years. It was built with the idea for fans to connect with others through the media, and offering things like:

- Background images
- Deleted releases
- Artists
- Minigames

It also has a system for admins to constantly Upload/Delete/Edit backgrounds/songs when any changes happen, to keep everything up to date.

## **Tech Stack**

**Programming Language**

- Javascript

**Frontend**

- React
- React Router

**Backend**

- Node.js
- Express
- JWT

## **Installation Process**

1. Clone this repository
   ```
   git clone https://github.com/rami-platero/multiplayer-trading-game.git
   ```
2. Install npm packages
   - Install frontend packages
   ```
   cd client
   npm install
   ```
   - Install backend packages
   ```
   cd server
   npm install
   ```
3. Create .env file 
    - In the backend create a .env file and follow the sample code
    ```javascript
    MONGODB_URI=YOUR_MONGODB_URI
    SECRET=YOUR_JWT_SECRET_TOKEN
    PORT=PORT_NUMBER
    ```
4. Change api endpoints
    1. inside the App.tsx file, in one of the first lines of code. You will have to change the axios base url to the url of where your backend is being hosted.
        ```javascript
        axios.defaults.baseURL = `YOUR_URL`; 
        ```
    2. Inside the hooks folder, you will change the endpoints of the useLogin hook and useSignUp hook.
        ```javascript
        const res = await fetch("YOUR_URL/login", {
        method: "POST",
        ...
        ```
        ```javascript
        const res = await fetch("YOUR_URL/signup", {
        method: "POST",
        ...
        ```
5. Run the app
    - if you are running the app in the localhost execute this command, both in the backend and frontend:
        ```
        npm run dev
        ```

## The community

All the information/data used for to make this app has been recovered by fans of the discord community VIP NCS Fans.
If you are an NCS Fan feel free to join the [VNF discord server](https://discord.gg/AGCzqea​​ ).
