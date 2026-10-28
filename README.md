# IMovies

A movie ticket booking website I built as my capstone project for the Full Stack
Development (MERN Stack) course on SkillWallet. Users can browse movies, pick a
show, choose their seats and book tickets. There is also an admin side for adding
movies and shows.

I picked this project because everyone already knows how booking a movie ticket
works, so I could focus on learning how the frontend, backend and database fit
together instead of figuring out what the app should do.

## Screenshots

![Home page](screenshots/home.png)
![Seat selection](screenshots/seats.png)
![Admin page](screenshots/admin.png)

## What it does

- Sign up and log in (passwords are hashed, login uses JWT tokens)
- See all movies and their show timings
- Pick seats on a seat map and confirm the booking
- Seats that are already booked can't be selected again
- My Bookings page showing your past tickets
- Admin page to add or delete movies and add shows
- Admin-only routes are protected on the server, not just hidden in the UI

## Built with

- **React** (with Vite) for the frontend
- **Node.js and Express** for the backend API
- **MongoDB with Mongoose** for the database
- **JWT and bcrypt** for login and password security

## Running it locally

You need Node.js and MongoDB installed, with MongoDB running.

1. Clone the repo

   ```
   git clone https://github.com/YOUR_USERNAME/imovies.git
   ```

2. Start the backend

   ```
   cd imovies/server
   npm install
   ```

   Copy `.env.example` to `.env`. The default values work with a local MongoDB.

   ```
   npm run seed
   npm run dev
   ```

   You should see "MongoDB connected" and "Server running".

3. Start the frontend in a second terminal

   ```
   cd imovies/client
   npm install
   npm run dev
   ```

4. Open http://localhost:5173

Admin login for testing: `admin@imovies.com` / `admin123`
(demo credentials from the seed file, not meant for real use). Running
`npm run seed` again wipes the database and resets it.

## How the seat booking works

When someone confirms a booking, the browser sends the show ID and the chosen seat
numbers to the server. The server first checks the seat numbers are valid, then
runs a single MongoDB update that says: "add these seats to this show, but only if
none of them are already booked."

Because MongoDB does the check and the update as one step, two people clicking the
same seat at the same moment can't both get it. The second person gets an error
and the seat map refreshes. If I had checked in JavaScript first and saved
afterwards, both requests could have passed the check before either one saved.

## How the frontend and backend talk

The React app calls the Express API using `fetch`, and the server replies with
JSON. In development, Vite proxies any request starting with `/api` to the backend
on port 5000, which avoids CORS errors. After login, the server returns a JWT. The
frontend stores it and sends it in the `Authorization` header, and a `protect`
middleware on the server checks it before allowing bookings or admin actions.

## API endpoints

| Method | Route | Access | What it does |
|---|---|---|---|
| POST | /api/auth/register | public | create an account |
| POST | /api/auth/login | public | log in, returns a token |
| GET | /api/movies | public | list movies |
| POST | /api/movies | admin | add a movie |
| DELETE | /api/movies/:id | admin | delete a movie and its shows |
| GET | /api/shows | public | list shows |
| GET | /api/shows/:id | public | one show with its booked seats |
| POST | /api/shows | admin | add a show |
| POST | /api/bookings | logged in | book seats |
| GET | /api/bookings/mine | logged in | my bookings |

## Folder structure

```
imovies/
├── server/
│   ├── models/       User, Movie, Show, Booking
│   ├── routes/       auth, movies, shows, bookings
│   ├── middleware/   JWT check and admin check
│   ├── index.js      server entry point
│   └── seed.js       sample data and admin account
└── client/
    └── src/
        ├── pages/    Movies, Auth, Seats, MyBookings, Admin
        ├── App.jsx   navbar and routes
        └── api.js    helper for calling the backend
```

## Problems I ran into

- **PowerShell blocked npm.** `npm -v` failed with a "running scripts is disabled"
  error. I fixed it by running
  `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.
- **"node is not recognized" right after installing.** My VS Code terminal had been
  opened before the install, so it didn't know about Node yet. Closing and
  reopening VS Code fixed it.
- **Getting MongoDB connected.** The app can't connect unless the MongoDB server is
  actually running, even if it's installed. I checked the service with
  `Get-Service *mongo*` and then the backend connected.
- **Looking for the admin buttons.** The admin tools are on a separate `/admin`
  page that only appears in the navbar when logged in as an admin, so I thought
  they were missing at first.

## Things I want to add

- Edit movie (right now admins can only add and delete)
- Booking cancellation
- Movie posters and a better, more 3D-style UI
- Search and genre filter
- Payment using Razorpay test mode
- Deploying it online

## What I learned

Before this project I didn't know how the frontend, backend and database connect.
Setting it up and running it showed me how a React page calls an API, how Express
routes handle requests, and how Mongoose models describe data in MongoDB. I also
learned why passwords are hashed instead of stored directly, how JWT tokens prove
who a user is, and why the booking logic uses one atomic database update to stop
double booking. I'm still learning JavaScript and React in more depth so I can
extend the project myself.

## Notes

I used an AI assistant (Claude) to help generate the initial code and to explain
how each part works. I set up the environment, ran and tested the app myself, and
I'm continuing to study the code and add features on my own.

Made by Tanishq Soni
