# DevTinder Fronted

- Created a Vite+react project
- Created git repo of it
- Daisy UI + Tailwind
- Created a Navbar using daisyUi
- Created Routing , Outlet
- Create a Login Page
- install axios {withCredentials:true} , if you not pass this , you will not get the token.
- setup cors in backend { origin: "http://localhost:5173",
  credentials: true,}
- installed redux-toolkit react-redux
- configStore , provider the app , create SLice , add reducer to store,
- to add data dispatch the action
- to get the data subscribe the store
- tokenNot present then redirect it .
- Logout featutre
- User card
  -Edit profile feature
- toast message
  -See all my connection
- requests page

# Deployment

- Signup on AWS
- Launch instance
- chmod 400 <secret>.pem
- ssh -i "devTinder-secret.pem" ubuntu@ec2-43-204-96-49.ap-south-1.compute.amazonaws.com
- Install Node version 16.17.0
- Git clone
- Frontend
  - npm install -> dependencies install
  - npm run build
  - sudo apt update
  - sudo apt install nginx
  - sudo systemctl start nginx
  - sudo systemctl enable nginx
  - Copy code from dist(build files) to /var/www/html/
  - sudo scp -r dist/\* /var/www/html/
  - Enable port :80 of your instance
- Backend
  - updated DB password
  - allowed ec2 instance public IP on mongodb server
  - npm intsall pm2 -g
  - pm2 start npm --name "devTinder-backend" -- start
  - pm2 logs
  - pm2 list, pm2 flush <name> , pm2 stop <name>, pm2 delete <name>
  - config nginx - /etc/nginx/sites-available/default
  - restart nginx - sudo systemctl restart nginx
  - Modify the BASEURL in frontend project to "/api"
