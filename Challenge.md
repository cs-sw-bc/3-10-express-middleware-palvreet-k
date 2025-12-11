# 🚀 Middleware Challenges — Lesson 10

### *You may take AI assistance to figure out the answers, BUT you must understand every single line of code you write.*

---

## ⭐ Challenge 1 — Block Requests From a Specific User-Agent

**Goal:** Prevent requests coming from "Postman".

**Hint:** Use `req.headers["user-agent"]`.

**Expected:**

* If user-agent contains "Postman" → send 403
* Otherwise → continue

---

## ⭐ Challenge 2 — Add a Custom Header to Every Response

**Goal:** Add this header before sending any response:

```
X-Powered-By: Express-Lesson
```

**Hint:** `res.setHeader()` then `next()`.

---

## ⭐ Challenge 3 — Middleware That Only Runs for a Specific Route

**Goal:** Before `/profile`, print:

```
Checking profile access...
```

**Hint:** Add middleware *inside* the route definition.

---

## ⭐ Challenge 4 — Delay Requests Conditionally

**Goal:** If `?slow=true`, delay the request by 3 seconds.

**Hint:** Use `setTimeout(() => next(), 3000)`.

---

## ⭐ Challenge 5 — Allow Requests Only During Business Hours

**Goal:** Allow only between **9 AM and 5 PM**.

**Hint:** Get current hour with:

```js
new Date().getHours()
```

Outside this range → respond with "Server closed. Try again later.".

---

## ⭐ Challenge 6 — Count Requests Per Route

**Goal:** Track how many times each route is hit.

**Hint:** Use an object with keys like:

```js
counts[req.path]
```

---

## ⭐ Challenge 7 — Validate Required Query Parameters

**Goal:** For `/search`, require `?term=`.

If missing → send 400.

**Hint:** `req.query.term`.

---

## ⭐ Challenge 8 — Convert Incoming Names to Uppercase

**Goal:** If JSON body has `{ "name": "jack" }`, convert it to uppercase before routes.

**Hint:** Modify `req.body.name`.

---

## ⭐ Challenge 10 — Log How Long Each Request Takes

**Goal:** Measure the time between request start and end.

**Hint:**

```js
const start = Date.now();
// later
const duration = Date.now() - start;
```

Log route + duration.

---

## ⭐ Bonus Challenge — Easter Egg Middleware

**Goal:** When user visits `/magic`, respond with:

```
✨ Middleware is magic ✨
```

WITHOUT using a route — only middleware.

**Hint:** Check `req.path`.

---

### ✔ Remember:

> **You can use AI to help brainstorm or debug, but you MUST understand every line of your final code.**

Happy coding! ⚡
