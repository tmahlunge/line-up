from typing import Union
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests

base_reqres_user_url = "https://reqres.in/api/users"

app = FastAPI()

# I have white-listed only the expected port we want to run the React app on.
# All other ports will have requests blocked by the CORS protocol.
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/users/")
def root():
    # api-endpoint to get a list of users from reqres;
    list_users_url = base_reqres_user_url
      
    # sending get request and saving the response as response object
    response = requests.get(url = list_users_url, params = {})

    # printing the output
    return response.json()

@app.get("/api/users/{user_id}")
def get_user(user_id: int, q: Union[str, None] = None):  
    # api-endpoint to get a single user by id from reqres;
    single_user_url = f"{base_reqres_user_url}/{user_id}"
      
    # sending get request and saving the response as response object
    response = requests.get(url = single_user_url, params = {})

    if not response:
         raise HTTPException(
            status_code=404
        )

    # printing the output
    return response.json()
