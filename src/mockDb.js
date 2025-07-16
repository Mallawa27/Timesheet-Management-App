// src/mockDb.js
// IMPORTANT: This file must be placed directly in your 'src' folder.
// This file simulates your db.json data structure, acting as a local "database".
// All data operations (add, retrieve) will directly modify this object in memory.
const mockDb = {
  "timesheets": [
    {
      "week": 1,
      "date": "1–5 January, 2024",
      "status": "COMPLETED"
    },
    {
      "week": 2,
      "date": "8–12 January, 2024",
      "status": "COMPLETED"
    },
    {
      "week": 3,
      "date": "15–19 January, 2024",
      "status": "INCOMPLETE"
    },
    {
      "week": 4,
      "date": "22–26 January, 2024",
      "status": "COMPLETED"
    },
    {
      "week": 5,
      "date": "28 January–1 February, 2024",
      "status": "MISSING"
    }
  ],
  "entries": {
    "1–5 January, 2024": [
      {
        "date": "Jan 1, 2024",
        "tasks": [
          "Homepage Development"
        ],
        "hours": [
          4
        ],
        "project": "Project Name"
      },
      {
        "date": "Jan 2, 2024",
        "tasks": [
          "Homepage Development"
        ],
        "hours": [
          4
        ],
        "project": "Project Name"
      }
    ],
    "8–12 January, 2024": [
      {
        "date": "Jan 8, 2024",
        "tasks": [
          "Homepage Development"
        ],
        "hours": [
          4
        ],
        "project": "Project Name"
      },
      {
        "date": "Jan 9, 2024",
        "tasks": [
          "Homepage Development"
        ],
        "hours": [
          4
        ],
        "project": "Project Name"
      }
    ],
    "15–19 January, 2024": [
      {
        "date": "Jan 15, 2024",
        "tasks": [
          "Homepage Development"
        ],
        "hours": [
          4
        ],
        "project": "Project Name"
      },
      {
        "date": "Jan 16, 2024",
        "tasks": [
          "Homepage Development"
        ],
        "hours": [
          4
        ],
        "project": "Project Name"
      }
    ],
    "22–26 January, 2024": [
      {
        "date": "Jan 22, 2024",
        "tasks": [
          "Homepage Development",
          "Homepage Development"
        ],
        "hours": [
          4,
          4
        ],
        "project": "Project Name"
      },
      {
        "date": "Jan 23, 2024",
        "tasks": [
          "Homepage Development",
          "Homepage Development"
        ],
        "hours": [
          4,
          4
        ],
        "project": "Project Name"
      },
      {
        "date": "Jan 24, 2024",
        "tasks": [
          "Homepage Development",
          "Homepage Development",
          "Homepage Development"
        ],
        "hours": [
          4,
          4,
          4
        ],
        "project": "Project Name"
      },
      {
        "date": "Jan 25, 2024",
        "tasks": [
          "Homepage Development",
          "Homepage Development"
        ],
        "hours": [
          4,
          4
        ],
        "project": "Project Name"
      },
      {
        "date": "Jan 26, 2024",
        "tasks": [
          "Homepage Development",
          "Homepage Development"
        ],
        "hours": [
          4,
          4
        ],
        "project": "Project Name"
      }
    ],
    "28 January–1 February, 2024": [
      {
        "date": "Jan 28, 2024",
        "tasks": [
          "Homepage Development"
        ],
        "hours": [6],
        "project": "Project Name"
      },
      {
        "date": "Jan 29, 2024",
        "tasks": [
          "Homepage Development"
        ],
        "hours": [4],
        "project": "Project Name"
      }
    ]
  },
  "users": [
    {
      "email": "user@example.com",
      "password": "password123",
      "token": "dummy-token-123"
    }
  ]
};

export default mockDb;