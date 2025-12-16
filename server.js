import express from "express";
import usersRoute from "./routes/user.js";
import { set } from "mongoose";

const app = express();

// app.use() is middleware
// Order of instructions is important in middleware
//express.json() -Express cannot read JSON data to we use this function
app.use(express.json());
app.use(express.static('public')); // folder name for static resources

// Measure request duration (start -> finish) and log route + duration
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} -> ${duration}ms`);
  });
  next();
});

// If JSON body contains { name }, convert it to uppercase before routes
app.use((req, res, next) => {
  if (req.body && typeof req.body.name === 'string') {
    req.body.name = req.body.name.toUpperCase();
    console.log(req.body);
  }
  next();
});

// Middleware-only handler for /magic
app.use((req, res, next) => {
  if (req.path === '/magic') {
    return res.send('✨ Middleware is magic ✨');
  }
  next();
});

// Allow requests only during business hours (9 AM - 5 PM)
// app.use((req, res, next) => {
//   const hour = new Date().getHours();
//   if (hour < 9 || hour >= 17) {
//     return res.status(403).send('Server closed. Try again later.');
//   }
//   next();
// });

// Block requests coming from Postman clients (simplified)
// app.use((req, res, next) => {
//   const ua = req.headers['user-agent'] || '';
//   if (/postman/i.test(ua) || req.headers['postman-token']) {
//     console.log('Blocked Postman request:', req.method, req.url);
//     return res.status(403).send('Requests from Postman are not allowed.');
//   }
//   next();
// });

//Maintenance
function maintenance(req,res,next){
    res.send("Site under maintenance, come back tomorrow")
}
// app.use(maintenance);

// Counts how many total requests the server has received.
let count = 0;

function countRequests(req, res, next) {
  count++;
  console.log(`Total requests so far: ${count}`);
  next();
}

app.use(countRequests);

// Track requests per route
const routeCounts = {};
function countPerRoute(req, res, next) {
  const path = req.path || req.url;
  routeCounts[path] = (routeCounts[path] || 0) + 1;
  console.log(`Route hit counts: ${path} -> ${routeCounts[path]}`);
  next();
}

app.use(countPerRoute);

// Add a timestamp to every request
app.use((req, res, next) => {
  req.requestTime = Date.now();
  console.log(`Request sent at time ${req.requestTime}`);
  next();
});

// Block DELETE requests
app.use((req, res, next) => {
  if (req.method === "DELETE") {
    return res.status(403).send("DELETE disabled");
  }
  next();
});

// Checks if the user sent mandatory data.
function validateUser(req, res, next) {
  const { name, age } = req.body;

  if (!name || !age) {
    return res.status(400).send("Missing name or age");
  }
  next();
  app.use((req, res, next) => {
    res.setHeader('X-Powered-By', 'Express-Lesson');
    next();
  });
}

app.post('/users', validateUser, (req, res) => {
  res.send("User is valid!");
});

app.use(express.urlencoded()); // for html form submission

//App Level Custom Middleware
app.use((req,res,next) => {
//logging all request
    console.log(`${req.method} ${req.url} received at ${new Date().getTime()}`);
    next(); //Forces the request to go to the next stage(Middleware or Endpoint)
});

//Slowdown and not overwhelm a server
// Achieve a linear queue of requests than a bottleneck
// Conditional slowdown: delay 3s only when ?slow=true
app.use((req, res, next) => {
  if (req.query && req.query.slow === 'true') {
    setTimeout(() => next(), 3000);
  } else {
    next();
  }
});


// We are instructing if the user types /users , go to user.js
app.use('/users', usersRoute); //Route-level middleware

// Profile route with inline middleware that runs before the handler
app.get('/profile', (req, res, next) => {
  console.log('Checking profile access...');
  next();
}, (req, res) => {
  res.send('Profile page');
});

// /search route: require ?term= ; respond 400 if missing
app.get('/search', (req, res) => {
  const term = req.query.term;
  if (!term) {
    return res.status(400).send('Missing term query parameter');
  }
  res.send(`Search results for "${term}"`);
});


app.listen(3000, () => console.log("Server running on port 3000"));


