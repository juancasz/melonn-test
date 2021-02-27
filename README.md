## Technical Assessment Melonn
test: https://www.notion.so/Technical-Assessment-903bdd76deba40a0b9c061b036af07f8  

Before starting the project configure the environment variables first as follows:  
  
Go to melonn-test/sellers-back and create a file named .env  
In this file you must add these variables:  
  
PORT = 3001  
API_BASE_URL = https://yhua9e1l30.execute-api.us-east-1.amazonaws.com/sandbox  
API_KEY = yourAPIKey  
  
Go to melonn-test/sellers-front and create a file named .env  
In this file you must add these variables:  
  
REACT_APP_API_BASE_URL = https://yhua9e1l30.execute-api.us-east-1.amazonaws.com/sandbox  
REACT_APP_API_URL_PROMISE =  http://localhost:3001/api/promise  
REACT_APP_API_KEY = yourAPIKey    
  
After configuring the environment variables the project can be started:  
  
To start the backend go to melonn-test/sellers-back and run npm start. The API will start to work in localhost:3001  
  
To start the app go to melonn-test/sellers-front and run npm start. Open in the browser the port localhost:3000 to use the application   