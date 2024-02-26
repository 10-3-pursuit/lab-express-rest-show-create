# Notes for Express.js Backend
There's a test at the end!

## fs

This is to convert JSON file in server to be used within server?

```js
const fs = require('fs'); // works with json.parse (turns data into Javascript obj) and json.stringify(turns into string)

JSON.parse( // to turn the following into a javascript object to be used in next lines of code
    fs.readFileSync(`path to JSON file in Express.js server`)
)
```
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

## DELETE http fx

Here is an example of what a delete fx might look like:

```js
// delete fx works but doesn't persist unless parsed to JSON and data exists in JSON or database
logs.delete('/:id', (req, res) => {
    const { id } = req.params;
    // const id = parseInt(req.params.id, 10); // Convert to number for accurate comparison (second param is for base 10)
    const index = logsData.findIndex(log => log.id === +id); // Find the log by ID
    if (index >= -1) { // when log not found .findIndex returns -1
        return res.status(404).json({ // 404 is error
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    logsData.splice(index, 1); // Delete the log from the array if found
    res.status(204).json({
        status: 'success',
        // data: null // indicate the deletion was successful
        data: logsData //return all the data minus the deleted one
    });
});
```