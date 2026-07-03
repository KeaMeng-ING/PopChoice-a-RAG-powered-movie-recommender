# PopChoice

A RAG-powered movie recommender.

Answer a few quick questions about your taste, and PopChoice embeds your
answers, finds the closest-matching movie in a Supabase vector store, and
asks Gemini to turn that match into a personalized recommendation.

## How it works

1. **Ingest** (`index.js`, run manually, not part of the dev server) — splits
   `movies.txt` into chunks, embeds each chunk with Gemini, and stores it in
   Supabase's `movies` table (`pgvector`).
2. **Retrieve** — the app embeds your quiz answers and calls the
   `match_movies` RPC to find the nearest movie by vector similarity.
3. **Generate** — the matched movie's content is passed to Gemini as context,
   which writes the final recommendation.

## Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file with the following variables:

```
VITE_GEMINI_API_KEY=
VITE_SUPABASE_URL=
VITE_SUPABASE_API_KEY=
```

These are used by the browser app (`src/config/browserConfig.js`) and must
be `VITE_`-prefixed, since Vite only exposes prefixed env vars to client
code.

(Re)populate the vector store once, whenever `movies.txt` changes:

```bash
node index.js
```

Note: this always inserts new rows rather than upserting, so re-running it
against an already-populated table will duplicate entries.

## Scripts

```bash
npm run dev      # start the Vite dev server
npm run build    # production build
npm run preview  # preview the production build
```
