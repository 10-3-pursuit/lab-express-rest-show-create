# Notes for Express.js Backend
There's a test at the end!

## Middleware

To mount middleware functions in your Express app, you will use the Express function app.use().
Since you always want to parse any incoming JSON data, you should put this function inside app.js after configuration but BEFORE the routes. Remember, the flow of the server when adding and designing your middleware and routes.

```js
//app.js
// CONFIGURATION
const app = express()

// MIDDLEWARE
app.use(express.json()) // parse incoming middleware

// ROUTES
// Home Page
app.get('/', (req, res) => {
  res.send('Welcome to Colors App')
})
```

Your comment indicates you want the middleware to execute after any route handler if no specific route is matched, but this behavior is a bit different in Express. Middleware in Express is executed in the order they are defined. If you define this middleware before your route handlers, it will execute before any route handler for all incoming requests. If you define it after your route handlers, it will not automatically execute "after any route cycles" unless those routes explicitly pass control to the next middleware without sending a response.

For middleware to act as a fallback or to execute in cases where no route is matched, you'd typically place it at the end of all your route definitions. This ensures that if no route matches the incoming request, the request then falls through to this middleware.

Here's a corrected approach based on common practices:

```javascript
// Define your routes here
app.get('/some-route', (req, res) => {
    res.send('This is some route.');
});

// other route handlers...

// Middleware as a fallback for unmatched routes
app.use((req, res, next) => {
    console.log('This middleware acts as a fallback for unmatched routes.');
    // Optionally, you could send a response here indicating the route was not found
    // For example:
    // res.status(404).send('404 Not Found');
    next();
});
```

If you're looking to create a middleware that should execute after your routes for specific post-processing (and assuming the route handlers call `next()`), you'd indeed place it after your route definitions. However, it's crucial to note that for the middleware to run after a route handler, the route handler must call `next()` unless it ends the request-response cycle, e.g., by sending a response to the client.

For middleware that you want to ensure runs before your routes, simply place it before them:

```javascript
// Middleware to run before any route handler
app.use((req, res, next) => {
    console.log('Hello from the middleware!!!!');
    next();
});

// Define your routes here
app.get('/another-route', (req, res) => {
    res.send('This is another route.');
});
```

Remember, middleware execution order is critical in Express, and it follows the order of definition in your code.

## cURL
**Doing a POST request currently won't modify the data in the server**

To send the JSON object to the endpoint `http://localhost:3333/logs/` using `curl`, you'll open your terminal or command line interface and use the following command:

```bash
curl -X POST http://localhost:3333/logs/ \
-H "Content-Type: application/json" \
-d '{"captainName": "Juli", "title": "What is sleep?", "post": "Never heard of it lol", "mistakesWereMadeToday": true, "daysSinceLastCrisis": 0}'
```

This command will send a POST request to your local server running on port 3333 at the `/logs/` endpoint with the specified JSON data. Make sure your server is running and listening on port 3333 before executing this command!

Yes, the `curl` request was successful. The server responded with a JSON object that includes an array of `logs`, with the last entry showing the data you sent:

```json
{
  "captainName": "Juli",
  "title": "What is sleep?",
  "post": "Never heard of it lol",
  "mistakesWereMadeToday": true,
  "daysSinceLastCrisis": 0,
  "id": 8
}
```

This indicates that the server successfully received your POST request, processed it, and added your new log entry to its collection. The new entry has been assigned an `id` of `8`, which typically signifies that it has been stored successfully and can be uniquely identified within the system. The response doesn't explicitly state a status code because `curl` in its default mode does not show HTTP status codes unless you include the `-i`, `-I`, or `-v` flag. However, the JSON response content clearly indicates a successful operation.


## Quiz

Here's a test to assess your understanding of the provided code, including the concepts and syntax related to Express.js and Node.js project setup:

### Question 1
What does the `require('express')` statement do in the given code snippets?

A) Imports the Express framework to enable routing and middleware functionality.
B) Creates a new Express application.
C) Connects to a database.
D) Starts the server on the specified port.

### Question 2
What is the purpose of `logsData` in the `logs.controller.js` file?

A) To store temporary data received from client requests.
B) To serve as a database for log entries.
C) To configure the Express server.
D) To validate incoming request data.

### Question 3
What does the `logs.get('/:id', (req, res) => {...})` endpoint do?

A) It creates a new log entry with a unique ID.
B) It updates an existing log entry by its ID.
C) It deletes a log entry by its ID.
D) It retrieves a log entry by its ID.

### Question 4
In the `logs.post('/', (req, res) => {...})` endpoint, what is the purpose of calculating `newId`?

A) To ensure each new log entry has a unique identifier.
B) To count the total number of log entries.
C) To update the ID of an existing log entry.
D) To delete a log entry by its ID.

### Question 5
What role does `module.exports = logs;` play in the `logs.controller.js` file?

A) It imports the logs router into the server configuration.
B) It exports the logs router for use in other files.
C) It starts the server and listens on a specified port.
D) It configures the environment variables.

### Question 6
What is the purpose of the `app.use('/logs', logsController);` statement in the `app.js` file?

A) To direct all requests to the root URL to the logs controller.
B) To register the logs router with a base path of '/logs'.
C) To create a new instance of the logs controller.
D) To configure the server's listening port.

### Question 7
What is the significance of the `PORT` variable in the `server.js` file?

A) It specifies the database connection port.
B) It defines the port on which the Express server listens for requests.
C) It sets the version of the Express framework to use.
D) It configures the routing for the application.

### Question 8
What does the `app.get('*', (req, res) => {...})` endpoint in `app.js` do?

A) It handles all GET requests to any endpoint.
B) It serves as a catch-all for requests to undefined routes.
C) It redirects all traffic to the homepage.
D) It configures global middleware for the application.

Please select the most appropriate answer for each question.

## Answers to Quiz:
Here are the answers to the provided questions:

### Question 1
**Correct Answer:** A) Imports the Express framework to enable routing and middleware functionality.

### Question 2
**Correct Answer:** B) To serve as a database for log entries.

### Question 3
**Correct Answer:** D) It retrieves a log entry by its ID.

### Question 4
**Correct Answer:** A) To ensure each new log entry has a unique identifier.

### Question 5
**Correct Answer:** B) It exports the logs router for use in other files.

### Question 6
**Correct Answer:** B) To register the logs router with a base path of '/logs'.

### Question 7
**Correct Answer:** B) It defines the port on which the Express server listens for requests.

### Question 8
**Correct Answer:** B) It serves as a catch-all for requests to undefined routes.

These answers reflect an understanding of basic Express.js concepts, including routing, middleware, and server configuration.