---
title: Synheart log — week one on the kinematics team
date: '2026-07-13'
tags:
  - synheart
  - research
  - hsi
summary: First entry in a running log from the Synheart AI research team — what human state recognition actually involves, and what my first week looked like.
readingTime: 3 min
series: Synheart Research Log
related: synheart
---

This is the first entry in a running log about my work on Synheart AI's research team. I want a record of the work while it's happening — decisions look obvious in retrospect and never are at the time. One entry a week, roughly.

## The problem space

Synheart works on **human state recognition from kinematics** — reading what a person's movement says about them. The signals we care about split into a few families:

- **Activity states** — what the person is doing (walking, sitting, climbing stairs)
- **Postural states** — how they're holding themselves while doing it
- **Locomotion** — the mechanics of how they move through space
- **Movement regularities** — the patterns and rhythms that make one person's movement different from another's

The long-term direction is folding all of these into an **HSI (Human State Inference) model** — one system that takes motion signals in and produces a coherent picture of the person's state, rather than four separate classifiers that disagree with each other.

## What week one actually looked like

Research week one is unglamorous in exactly the way I expected:

- **Reading.** A stack of papers on activity recognition and postural analysis, each of which I summarize for the team — writing the summary is how I find out whether I understood the paper.
- **Data.** Working on dataset collection for the states we want to model. The quality of everything downstream is capped by decisions made here, which is a familiar lesson from RAG work: the model can't infer what the data never captured.
- **First experiments.** Getting baseline models running so we have numbers to beat, not vibes to argue about.

## A note on why I'm logging this

My blog posts so far have been retrospectives — the compiler story, the payments story — written after the ending was known. This series is the opposite: notes from inside the work, before I know how it turns out. If you're reading this as a hiring manager or a fellow researcher, that's the point — this is what my week actually contains.

Next entry: baselines, and whatever the data collection breaks first.
