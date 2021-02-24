## Technical Assessment Melonn
test: https://www.notion.so/Technical-Assessment-903bdd76deba40a0b9c061b036af07f8  
  
To start the backend go to melonn-test/sellers-back and run npm start. The API will start to work in localhost:3001  
  
To start the app go to melonn-test/sellers-front and run npm start. Open in the browser the port localhost:3000 to use the application  
  
The current API key is not working properly (limit exceeded). In melonn-test/sellers-front modify the variable REACT_APP_API_KEY in the .env file to a working API key. In melonn-test/sellers-back modify the variable API_KEY in the .env file to a working API key.  (I know the .env files should be kept hidden but for the sake of simplicity and to avoid misunderstandings I've put them in the repository. Anyway I deleted the api key fields) 
  
The project can create orders according to the user inputs  and show to the user the promises about the delivery date. The sell order list and the sell order details aren't ready because the API key stopped working. If necessary these items can be finished in 1-2 days after getting a working API key. 