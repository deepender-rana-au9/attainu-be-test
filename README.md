# attainu-be-test
use npm install for installing dependencies

use npm start for starting server with nodemon


#Usage

Login
Request Body -> { "username":"YOUR_USERNAME", "password":"YOUR_PASSWORD" }
Returned -> user containing token and user details

JSON Patch
Header -> Authorization : "Bearer YOUR_TOKEN"
Request Body -> { "jsonObject": {JSON_OBJECT} , "jsonPatch": [{JSON_PATCH}] }
Returned -> { "Patched":"JSON_OBJECT_WITH_PATCH" }

Thumbnail Creation
Header -> Authorization : "Bearer YOUR_TOKEN"
Request Body -> { "url":"IMAGE_URL" }
Returned -> { "message":"RESPECTIVE_MESSAGE" }
Thumbnail stored in /public/images/thumbnails

AddAddress->{"streetAddress":"USER_ADDRESS",
    "route":"USER_ROUTE",
    "city":"USER_CITY",
    "state":"USER_STATE",
    "zip":"USER_ZIP",
    "country":"USER_COUNTRY"}
    
Returned -> updated user containing given address

