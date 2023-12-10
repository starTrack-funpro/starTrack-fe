# starTrack - Frontend

Part of Functional Programming Odd Semester 2023/2024 Final Project

by: bonaventuragal

## Overview

starTrack is a web based series (TV Series, Film, Comic, Novel) progress tracker. Built using NextJS.

## How To Run

### Prerequisites and Setup

1. Install `node` and `yarn`.
2. Clone this repository.
3. Run `yarn` to install the dependencies.
4. Create a `.env` file at the root of the project.
5. Fill the `.env` file with:
```env
NEXT_PUBLIC_BACKEND_URL=**YOUR STARTRACK BACKEND URL**
```

Set the values according to your specific configuration. For example (the default):

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

### Running the Website

Run `yarn dev` to start the website. You can access the website at `http://localhost:3000`. Please note that the backend is configured to serve the frontend on `http://localhost:3000`.
