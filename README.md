
# MyAnimeList User Stats

[![GitHub deployments](https://img.shields.io/github/deployments/dustinn1/mal-user-stats/production?label=vercel&logo=vercel&logoColor=white)](https://mal-user-stats.vercel.app/)

A website to generate statistics similar to [AniList](https://anilist.co/) ([example](https://anilist.co/user/triplezko/stats/anime/overview)) using data from your [MyAnimeList](https://myanimelist.net/) profile.

https://mal-user-stats.vercel.app/
## Run Locally

Clone the project

```bash
  git clone https://github.com/dustinn1/mal-user-stats.git
```

1. Install the dependencies

```bash
  npm install
```

2. To start the dev server

```bash
  npm run dev
```

3. To start the production server
```bash
  npm run build
  npm run start
```

Both the frontend and backend use the same commands. 

To access the backend, run `cd backend`.

**Environment Variables**

To run this project, you will need to add the following environment variables to your .env.local file at the top level directory of the project.

`NEXT_PUBLIC_BACKEND_URL` = `<url of backend>`

Locally, it would be equal to `http://localhost:8000`.
## Tech Stack

**Frontend:** React, Next.js, TailwindCSS

**Backend:** Node, Fastify

Both Written in TypeScript

Uses [MyAnimeList API](https://myanimelist.net/apiconfig/references/api/v2) for data


## License

[MIT](https://github.com/dustinn1/mal-user-stats/blob/main/LICENSE)

