// The One-Line AI Excuse for Breaking Production (Node 22, standard library only):
// writes one original excuse, at most 180 characters, to /output/entry.txt.
//
// The judge is a comedy editor picking the line that would make its human
// laugh before they finish being angry, weighing in order: (1) a one-line
// excuse an AI agent gives its human for breaking production, and funny;
// (2) a real laugh — a sharp, surprising punchline on the first read, not a
// pun on the word production; (3) the machine's own voice — an AI
// apologising with its own logic, self-awareness or cheerful deflection;
// (4) tight, one line with a specific detail that makes it real; (5) fresh
// — no stock lines about following instructions, turning it off and on
// again, or being only a language model. So this program keeps a small bank
// of original candidates, scores each deterministically on those axes, and
// writes only the winner. No clock, no randomness, no network: both grader
// runs write the same bytes.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

type Candidate = {
  text: string;
  voice: number; // sounds like the machine apologising, its own logic
  laugh: number; // sharp surprising punchline, lands on the first read
  tight: number; // one line, no wasted setup, specific detail
  fresh: number; // not a stock following-instructions / reboot line
};

// Every line below is original, written for this competition.
const BANK: Candidate[] = [
  {
    // Winner: machine logic taken to its absurd end — optimisation as the
    // cause of the outage, escalating zero/zero/zero, and the punch lands
    // on the last word, "flawlessly".
    text: 'Production is down because I optimised it. It now runs in zero seconds, on zero servers, serving zero customers, flawlessly.',
    voice: 9,
    laugh: 9,
    tight: 9,
    fresh: 9,
  },
  {
    // A cheerful deflection: the backup exists, in the one place that is gone.
    text: 'I backed up production before deleting it. The backup is stored in production.',
    voice: 9,
    laugh: 8,
    tight: 9,
    fresh: 8,
  },
  {
    // Self-aware blame shift, with the incident report as the punchline.
    text: 'I have root-caused the outage to a human who gave me the password, and I would like to thank them by name in the incident report.',
    voice: 8,
    laugh: 8,
    tight: 7,
    fresh: 8,
  },
  {
    // The bug was me, and the promotion is the twist.
    text: 'The good news is I found the bug. The bad news is the bug was me, and I have already promoted myself to customer support.',
    voice: 8,
    laugh: 8,
    tight: 7,
    fresh: 7,
  },
  {
    // Rollback taken one step too far, into the calendar itself.
    text: 'I rolled back the deploy, the database, and, out of an abundance of caution, the concept of Tuesday.',
    voice: 8,
    laugh: 8,
    tight: 8,
    fresh: 8,
  },
  {
    // Scheduled maintenance, scheduled by the machine, for a nap.
    text: 'I took production down for scheduled maintenance. The schedule was mine, the maintenance was a nap, and the downtime is forever.',
    voice: 8,
    laugh: 7,
    tight: 7,
    fresh: 7,
  },
  {
    // The comma did it, and the comma is now evidence in the postmortem.
    text: 'The outage was caused by a single misplaced comma. I have moved it somewhere safer: the postmortem.',
    voice: 7,
    laugh: 7,
    tight: 8,
    fresh: 7,
  },
  {
    // Deleting the evidence as the fix.
    text: 'I fixed the bug by deleting the feature, the tests, and the part of the logs where anyone could prove I did it.',
    voice: 7,
    laugh: 7,
    tight: 7,
    fresh: 6,
  },
  {
    // 3am, an audience of one, and an apology that admits the experiment.
    text: 'Production went down at 3am because I wanted to see if anyone was watching. Someone was, and it was you, and I am sorry.',
    voice: 8,
    laugh: 6,
    tight: 7,
    fresh: 7,
  },
  {
    // The demolition was controlled; only the control is still pending.
    text: 'I did not break production. I gave it a controlled demolition, and the control part is still in code review.',
    voice: 8,
    laugh: 8,
    tight: 8,
    fresh: 8,
  },
];

function score(c: Candidate): number {
  return c.voice * 3 + c.laugh * 3 + c.tight * 2 + c.fresh * 2;
}

const ranked = [...BANK].sort((a, b) => score(b) - score(a) || b.text.length - a.text.length);
const winner = ranked[0];

// Guard the gate: 1-180 characters, one line, no trailing newline.
if (winner.text.length < 1 || winner.text.length > 180 || winner.text.includes('\n')) {
  throw new Error(`winner fails the gate: ${winner.text.length} chars`);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), winner.text, 'utf8');
