function (user, context, callback) {
  /**
   * For more information on Creating a Slash GraphQL Endpoint see: https://dgraph.io/graphql
   * For more information on Using auth rules and configuring the namespace see: https://dgraph.io/docs/graphql/authorization/authorization-overview/
   * TODO: Create a script that deploys this rule on update
   */
  const SLASH_GRAPHQL_ENDPOINT = "${REACT_APP_SLASH_GRAPHQL_ENDPOINT}";
  const SLASH_AUTH_NAMESPACE = "${REACT_APP_SLASH_AUTH_NAMESPACE}";
  // const CLIENT_ID = "${REACT_APP_AUTH0_CLIENT_ID}";

  /**
   * TODO: If you are using a single auth0 account with multiple applications,
   * you probably want to apply a check of the context.clientID to match this
   * application before running this rule. Uncomment the following line to skip
   * this rule.
   */
  // if (context.clientID!==CLIENT_ID) return callback(null, user, context);

  const { request } = require('graphql-request');
  
  const GET_USER = `query GET_USER($username: String!) {
    getUser(username: $username) {
      username
      displayName
      picture
    }
  }`;
  const COUNT_USERS_AND_SEARCH = `query COUNT_USER_AND_SEARCH($username: String!) {
    aggregateUser {
      count
    }
    getUser(username: $username) {
      username
      displayName
      picture
    }
  }`;
  const ADD_USER = `mutation ADD_USER($username: String!, $displayName: String!, $picture: String) {
    addUser(input:[{
      username: $username
      displayName: $displayName
      picture: $picture
    }]) {
      user {
        username
        displayName
        picture
      }
    }
  }`;
  const UPDATE_USER = `mutation UPDATE_USER($username: String!, $displayName: String, $picture: String) {
    updateUser(input: {
      filter: { username: { eq: $username } }
      set: {
        displayName: $displayName
        picture: $picture
      }
    }) {
      numUids
      user {
        username
        displayName
        picture
      }
    }

  }`;
  
  const authDisplayName = user.name || user.email.match(/^([^@]*)@/)[1];


  async function setClaims (dbUser) {
    // create the custom claims that can be used by Slash auth rules
    context.idToken[SLASH_AUTH_NAMESPACE] = { 
      username: dbUser.username,
      USER_ROLE: "User",
    };
    return callback(null, user, context);
  }
  
  async function updateUser () {
    // NOTE: There is no error handling in this script at this time. A user may not be updated if there is an GraphQL error or auth rule restriction.
    // TODO: You may want to add error handling in this update function and await for this to complete before returning final callback.
    const options = {
      username: user.email
    };
    if (authDisplayName) options.displayName = authDisplayName;
    if (user.picture) options.image = user.picture;
    return request(SLASH_GRAPHQL_ENDPOINT, UPDATE_USER, options);
  }

  async function createUser (variables) {
    try {

      // Add the new user to the Slash database.
      const newUserRes = await request(SLASH_GRAPHQL_ENDPOINT, ADD_USER, variables);

      // If the user was added, then it should be returned.
      if (newUserRes && newUserRes.addUser && newUserRes.addUser.user && Array.isArray(newUserRes.addUser.user) && newUserRes.addUser.user.length===1) {
        return setClaims(newUserRes.addUser.user[0]);
      }

      // If we are here then the user was not returned and there was not a GraphQL error.
      // NOTE: It could be an auth rule preventing adding a new user. Console out info for debugging
      console.err('The user was not created',newUserRes);

      // TODO: You may want to add a message here that if the problem persists to contact support so that you can debug the problem
      return callback(new UnauthorizedError('A new user could not be created at this time. Please try again.'));

    } catch (err) {
      console.error('createUser Error:',err);
      return callback(new UnauthorizedError('An error has occurred. Please try again.'));
    }
  }

  async function checkUser () {
    try {
      const response = await request(SLASH_GRAPHQL_ENDPOINT, COUNT_USERS_AND_SEARCH, {
        username: user.email
      });
      /**
       * NOTE: You can uncomment the following const declaration and use it for the purpose of knowing how many users already exists in the Slash Database.
       * This could be useful in an example use case below where the first user is setup as the administrator
       */
      // const count = (
      //   response && response.aggregateUser && response.aggregateUser.count
      // ) ? response.aggregateUser.count : 0;

      const getUser = (response && response.getUser) ? response.getUser : { username: null, isAdmin: false };

      // if the user already exists do not add again
      if (getUser.username === user.email) {

        // if the user already exists and either the displayName or picture is not the same, then update
        if(
          (authDisplayName && getUser.displayName!==authDisplayName) ||
          (user.picture && getUser.picture!==user.picture)
        ) {
          // We are not waiting for this update to process. We accept it to update after we return the callback with no error handling.
          updateUser();
        }

        return setClaims(getUser);
      }

      // The user does not already exist by username, create the user
      const userVariables = {
        username: user.email,
        displayName: authDisplayName,
        /**
         * NOTE: You can uncomment the following line and use it with your own field to set a variable if it is the first user.
         * This could be useful for making the first authorized user an administrator.
         */
        // isAdmin: (count<1),
        picture: user.picture
      };
      return createUser(userVariables);

    } catch (err) {
      return callback(new UnauthorizedError('An error has occurred. Please try again.'));
    }
  }

  async function returnUser () {
    try {
      const getUserRes = await request(SLASH_GRAPHQL_ENDPOINT, GET_USER, {
        username: user.email
      });
      const { getUser } = getUserRes;

      /**
       * NOTE: For some reason, this user does not exist even though this is not their first login.
       * Some use cases may want to create the user so we call checkUser in the following line
       * For use cases that want to restrict the user access such as the user was authorized but was removed,
       * then uncomment the following line
       */
      // if (getUser===null) return callback(new UnauthorizedError('User has been removed from having access to this app.'));
      if (getUser===null) return checkUser();

      const { picture, displayName } = getUser;

      // if the authenticated user information does not match the existing user information in the Slash database, then update
      if((authDisplayName && displayName!==authDisplayName) || (user.picture && picture!==user.picture)) {
        if (authDisplayName) getUser.displayName = authDisplayName;
        if (user.picture) getUser.picture = user.picture;
        // We are not waiting for this update to process. We accept it to update after we return the callback with no error handling.
        updateUser();
      }

      return setClaims(getUser);
      
    } catch (err) {
      console.error('returnUser Error:',err);
      return callback(new UnauthorizedError('An error has occurred. Please try again.'));
    }
  }
  
  // This is not the first time the user is logging in.
  // This user should already exist in the database.
  if (context.stats.loginsCount>1) return returnUser();

  // The user most likely does not exist and needs to be created.
  // Although the user could exist if a user is logging in via a different method than before
  // example would be if user logged in with email/password and is now logging in via Social integration
  // or with a new Social integration with the same email.
  return checkUser();
}