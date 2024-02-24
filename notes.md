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

curl http://localhost:3000/api/v1/tours will display the response in the terminal rather than using postamn (postamn is easier)

To make a POST request to add a new tour using `curl` in your terminal, you would need to target the `/api/v1/tours` endpoint of your API. Assuming you are running the API locally and it is accessible at `http://localhost:3000/api/v1/tours`, and you want to add a new tour with specific details, you can use UNIX-like shell command on your MacBook Air, you can use single quotes for the entire JSON payload and double quotes for the keys and string values inside the JSON data:

```bash
curl -X POST http://localhost:3000/api/v1/tours -H 'Content-Type: application/json' -d '{"name":"Juli'"'"'s Tour","duration":5,"maxGroupSize":20,"difficulty":"easy","ratingsAverage":4.9,"ratingsQuantity":30,"price":500,"summary":"A summary of the new tour","description":"A detailed description of what the tour involves.","imageCover":"new-tour-cover.jpg","images":["new-tour-1.jpg","new-tour-2.jpg"],"startDates":["2024-04-25,10:00","2024-07-20,10:00"]}'
```

This command uses single quotes for the -d argument to avoid having to escape double quotes inside the JSON data. However, since you have Juli's Tour with an apostrophe in the name, which conflicts with the use of single quotes for the shell, the section around the apostrophe is broken into separate strings and concatenated. This technique uses '"'"' to effectively insert a single quote into the string: the first single quote ends the current string, then " starts a quoted string that contains a single quote, followed by another " to close that quoted string, and finally another single quote to restart the JSON string.

The same command without the quote problem:

```bash
curl -X POST http://localhost:3000/api/v1/tours -H 'Content-Type: application/json' -d '{"name":"Tour de Juli Part II","duration":5,"maxGroupSize":20,"difficulty":"easy","ratingsAverage":4.9,"ratingsQuantity":30,"price":500,"summary":"A summary of the new tour","description":"A detailed description of what the tour involves.","imageCover":"new-tour-cover.jpg","images":["new-tour-1.jpg","new-tour-2.jpg"],"startDates":["2024-04-27,10:00","2024-07-25,10:00"]}'
```

Here's a breakdown of this command:

- `-X POST`: Specifies the request method, which is POST in this case.
- `http://localhost:3000/api/v1/tours`: The URL where your request is being sent. Adjust the hostname and port as necessary for your environment.
- `-H 'Content-Type: application/json'`: Sets the `Content-Type` header to `application/json` to indicate that the request body is formatted as JSON.
- `-d '{...}'`: The data payload of your POST request. Replace the placeholder content with the actual details of the new tour you want to add. Make sure the JSON is properly formatted.

This command sends a POST request to the server, instructing it to create a new tour resource with the details provided in the JSON payload. If successful, the server should respond with a `201 Created` status code and a JSON response containing the details of the newly created tour, as per your `createTour` function's implementation.

if successful Terminal looks like this:

```bash
julissagarcia@Julissas-MacBook-Air starter % curl -X POST http://localhost:3000/api/v1/tours -H 'Content-Type: application/json' -d '{"name":"Tour de Juli Part II","duration":5,"maxGroupSize":20,"difficulty":"easy","ratingsAverage":4.9,"ratingsQuantity":30,"price":500,"summary":"A summary of the new tour","description":"A detailed description of what the tour involves.","imageCover":"new-tour-cover.jpg","images":["new-tour-1.jpg","new-tour-2.jpg"],"startDates":["2024-04-27,10:00","2024-07-25,10:00"]}'
{"status":"success","data":{"tour":{"id":12,"name":"Tour de Juli Part II","duration":5,"maxGroupSize":20,"difficulty":"easy","ratingsAverage":4.9,"ratingsQuantity":30,"price":500,"summary":"A summary of the new tour","description":"A detailed description of what the tour involves.","imageCover":"new-tour-cover.jpg","images":["new-tour-1.jpg","new-tour-2.jpg"],"startDates":["2024-04-27,10:00","2024-07-25,10:00"]}}}%
```
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