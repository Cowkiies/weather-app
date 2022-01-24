# Requirements & version used
Docker 20+, Angular & Angular CLI 13 and .Net 5.0

# Docker
To create a docker container with a MySQL database you have to run: 
`docker-compose -f "docker-compose.yaml" up -d --build` on bash or Powershell

# Spin up the database
Open Powershell and navigate to the weather-api folder

Run `dotnet tool install --global dotnet-ef` to install all the requiered tool,
and `dotnet ef database update` to create the tables in the database.

# Angular CLI
Open bash at the root of the Angular project and run `ng serve`.

You can now access http://localhost:4200/ .

You first need to create an account, and then sign in to be able to see the weather dashboard.

# Endpoints
## Users
### Get
`/api/users` to get a list of all the Users, or `/api/users/{Id}` to get a specific user by Id

### Post
`api/users` to create a new user.

Exemple of expected body:
```
{
    "Username": "your_username",
    "Password": "your_password",
    "Email": "your_email_address",
    "FirstName": "your_first_name",
    "LastName": "your_last_name"
}
```
The response is the user object minus the secrets.


## Login
### Post
`/api/login` to sign in. The returned JWT token will have a validity of 30 minutes.

Exemple of expected body:
```
{
    "Username": "your_username",
    "Password": "your_password""
}
```

Response: 
```
{
    "Username": "your_username",
    "Token": "jwt_token"
}
```

## Weather
### Get
Must include an Authorization header with value `Bearer jwt_token`.

`/api/weather?lon={longitude}&lat={latitude}` to get weather data from the location with given latitude and longitude.

