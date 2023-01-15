# Running Tad's User Data App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Steps To Run

### Download
#### `git clone` this repo and run `npm install`.

This will install the node packages you need to run the app.

From the root directory of the `line-up` project, run:

#### `pip install fastapi`
#### `pip install "uvicorn[standard]"`

These will install `fastapi` and `uvicorn`. This will allow the Python app to be deployable locally.

### Run the Python server.
From the root directory of the `line-up` project run:

#### `uvicorn server:app --reload --port 8000`
Runs the python server to interact with REQRES and get user data.
This server must be running in order for the React Application to extract data. 
The server must be run on the same local device as the react application as the endpoints in the react app
have been written to localhost and the port is hard set to 8000.

If you wish to run on a different port, edit the endpoint inside useUserDataRequest and change the port you pass into the --port tag above.

## Run the React App
### Dev Mode

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Prod Mode
#### Step 1: `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

#### Step 2: serve -s build -l 3000
This will deploy the bund you created with the above command to run on your \
http://localhost:3000 location! Again, it must run on this location or CORS from the python
server will block requests for data. And that's it!