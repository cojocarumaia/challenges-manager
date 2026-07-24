# Participation Feature Specification

## Goal

Allow authenticated users to join a challenge and record their walking steps.

---

## What the user can do

- Join a challenge.
- Submit walking steps after joining.
- View their total submitted steps.

---

## Rules

- Only authenticated users can join a challenge.
- A user cannot join the same challenge more than once.
- Steps must be a positive number.
- Only users who joined a challenge can submit steps.
- Submitted steps are added to the user's total.

---

## How we know it works

- A logged-in user can successfully join a challenge.
- Attempting to join the same challenge again returns an appropriate error.
- A joined user can submit positive step values.
- Invalid step values are rejected.
- The total number of steps updates after each submission.