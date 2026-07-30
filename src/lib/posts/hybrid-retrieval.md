---
title: Hybrid retrieval beat my vector database, and it wasn't close
date: '2026-06-02'
tags:
  - rag
  - ai
  - mcp
  - python
summary: Building a data-science assistant taught me that pure semantic search quietly fails on the queries experts actually ask — and that BM25, a 30-year-old algorithm, fixes it.
readingTime: 8 min
related: ds-ai-assistant
---

I built DS Assistant to answer data-science questions the way a good TA would: grounded in a real source — the *Python Data Science Handbook* — instead of hallucinating from vibes. It ended up scoring **0.93 retrieval precision** and **4.8/5 answer relevance** in evaluation. The single decision that mattered most was refusing to choose between semantic search and keyword search.

## Where pure vectors fail

The first version was the standard RAG recipe: chunk the handbook, embed the chunks, store them in ChromaDB, retrieve by cosine similarity. It worked beautifully on questions like *"how do I deal with missing data?"* — conceptual queries are exactly what embeddings are for.

Then I asked it about `pd.DataFrame.pivot_table` and watched it confidently retrieve three chunks about groupby.

Embeddings compress meaning, and compression is lossy in a very particular way: **rare, exact tokens get blurred into their semantic neighborhood.** To an embedding model, `pivot_table`, `crosstab`, and `groupby` live close together. To a person debugging code at midnight, they are not interchangeable — the one with the API name they typed is right and the others are wrong.

Data-science questions are full of these tokens: function names, parameter names, error strings. Which means a data-science assistant built on pure vector search fails precisely on the queries where the user knows exactly what they want.

## The hybrid pipeline

The fix is old. BM25 — the ranked keyword algorithm behind classic search engines — treats `pivot_table` as a rare term worth its weight in gold, which is exactly the behavior embeddings lose. So DS Assistant runs both retrievers and fuses the rankings:

```python
def hybrid_retrieve(query: str, k: int = 5) -> list[Chunk]:
    vec_hits = chroma_collection.query(          # semantic recall
        query_embeddings=[embed(query)], n_results=20
    )
    bm25_hits = bm25_index.get_top_n(            # lexical precision
        tokenize(query), corpus, n=20
    )
    return reciprocal_rank_fusion(vec_hits, bm25_hits)[:k]
```

Reciprocal rank fusion is almost insultingly simple — each document scores by the inverse of its rank in each list, summed. No tuning, no learned weights, robust to the two retrievers disagreeing. Conceptual queries win through the vector side, exact-API queries win through BM25, and mixed queries ("why does my pivot_table drop NaN groups") get carried by both.

Embeddings are generated locally with sentence-transformers. That was partly a cost decision, but it bought something better: **the retrieval layer has no API dependency at all.** It's fast, free, reproducible, and it works when the network doesn't.

## MCP: tools instead of prompt spaghetti

The second architectural decision was wiring capabilities through the Model Context Protocol rather than stuffing everything into one mega-prompt. The assistant's MCP server exposes typed tools — one recommends ML models given a dataset description and task, one generates runnable Python for a requested analysis — and Google Gemini calls them when the conversation warrants.

The win is separation of concerns you can actually feel while developing. Retrieval quality, tool logic, and generation quality became three independently testable systems. When answers got worse, I could tell *which layer* regressed — which, in a prompt-only architecture, is somewhere between painful and impossible.

## Measuring it, or it didn't happen

"It feels better" is not an engineering claim, so evaluation was a first-class part of the build: a labeled set of questions with known-relevant chunks for retrieval precision, and human-scored answer relevance for the end-to-end system. Retrieval precision landed at 0.93, and answer relevance at 4.8/5.

The number I actually care about is the first one. **Retrieval quality is the ceiling on a RAG system** — generation cannot cite what retrieval never found. Most of the "my RAG app hallucinates" complaints I see are retrieval failures wearing a language model's face.

## What I'd tell anyone building RAG in 2026

- **Hybrid by default.** If your domain contains identifiers — code, law, medicine, part numbers — pure vector search will fail your hardest users silently.
- **Own your embeddings.** Local sentence-transformers made evals reproducible and development free.
- **Put capabilities behind a protocol.** MCP tools gave the system boundaries; boundaries gave me the ability to debug it.
- **Build the eval before the demo.** The demo convinces your friends. The eval convinces you.

A 30-year-old ranking algorithm rescued a 2026 AI system. The lesson generalizes: the history of information retrieval didn't start when embeddings got good, and the old tools know things.
