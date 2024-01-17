**Assessment Review**


**Positive Points:**

1. Proper naming of variables and routes.
2. Proper code structure is used each modules are in saperate folder.
3. Authantication is managed properly using middleware.
4. Common function is used to manage failure response.
5. Proper code commenting is done.

**Improvements:**

1. There is no environment file for the database credentials.
2. Response format need to be consistant. (Admin login / logout)
    - Current success response is 
    {
        message: "Success message",
        data: {}
    }
    - Error response is
    {
        error: "Some error"
    }
    - Error should also need to send "message" key not "error".

3. Same message is given to different errors in admin login
    - For user not found and invalid credentials

4. Zero require field validations in create user, admin can create user without filling any fields.

5. Payload for updating user is wrong
    - personal details of user not needed to take in array as admin is only going to update one user at a time.

6. For updating other details of user like "Education" and "Known languages" there is validation issue that any user can update any other user's details.

7. If admin need to update any detail of user like changing languange english to hindi there is userUpdate API. But it admin needs to add new language for any existing user there is different API.
    - Both operations should be managed in updateUser API.