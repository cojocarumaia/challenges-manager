# Challenges Manager 

STEPathON Intership Preoject 

This project is developed as part of the STEPathON Intership Project. 
  
The goal of the project is to learn and practice: 
- Git and GitHub 
- Node.js 
- MongoDB Atlas 
- Software developement best practices 

## Scripts

### Seed Database
Run the following command to populate the database with sample challenges:
```bash
node scripts/seed.js
```
This script removes the existing challenges and inserts four sample challenges into the database.

### Aggregation
Run the following command to execute the aggregation example:
```bash
node scripts/aggregation.js
```
This script counts the number of challenges with `targetSteps` greater than or equal to `100000`.

# API Endpoints
GET /api/challenges
- Returns all challenges.
GET /api/challenges/:id
- Returns one challenge by ID.
POST /api/challenges
- Creates a new challenge.
PUT /api/challenges/:id
- Updates an existing challenge.
DELETE /api/challenges/:id
- Deletes a challenge by ID.
 
## Sprint 1 Checklist 
 
- [x] Day 1 
- [x] Day 2 
- [x] Day 3 
- [x] Day 4 
- [x] Day 5 
- [ ] Day 6 
- [ ] Day 7 
- [ ] Day 8 
- [ ] Day 9 
- [ ] Day 10 
