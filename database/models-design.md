# MongoDB Models Design

This document describes the data models for the Ministry Website using MongoDB (Mongoose).

---

## User Model (Partners/Members)

### Fields
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | String | Yes | Full name of the user |
| email | String | Yes (unique) | Email address |
| password | String | Yes | Hashed password |
| phone | String | No | Phone number |
| role | String | Default: 'user' | 'user' or 'admin' |
| status | String | Default: 'pending' | 'pending', 'approved', 'rejected', 'contacted' |
| spiritualBackground | Object | No | Denomination, salvation date, baptism date |
| interests | Array | No | Areas of interest (worship, evangelism, etc.) |
| skills | Array | No | User's skills/talents |
| createdAt | Date | Auto | Creation timestamp |

### Example
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+256 700 123 456",
  "role": "user",
  "status": "pending",
  "spiritualBackground": {
    "denomination": "Anglican",
    "salvationDate": "2020-01-15",
    "baptismDate": "2020-02-20"
  },
  "interests": ["worship", "youth", "media"],
  "skills": ["guitar", "graphic design"],
  "createdAt": "2025-01-29T10:00:00Z"
}
```

---

## Testimony Model

### Fields
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| author | Object | Yes | Author info (name, email, photo) |
| title | String | Yes | Title of the testimony |
| content | String | Yes | Main testimony content |
| category | String | Default: 'other' | 'healing', 'provision', 'salvation', etc. |
| isAnonymous | Boolean | Default: false | Whether author is anonymous |
| isApproved | Boolean | Default: false | Admin approval status |
| views | Number | Default: 0 | View count |
| likes | Number | Default: 0 | Like count |
| createdAt | Date | Auto | Creation timestamp |

### Example
```json
{
  "author": {
    "name": "Mary N.",
    "email": "mary@example.com",
    "phone": "+256 700 789 012",
    "photo": "/images/mary.jpg"
  },
  "title": "God Healed My Back",
  "content": "I had been suffering from back pain for 5 years...",
  "category": "healing",
  "isAnonymous": false,
  "isApproved": true,
  "views": 150,
  "likes": 23,
  "createdAt": "2025-01-28T14:30:00Z"
}
```

---

## Event Model

### Fields
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | String | Yes | Event title |
| description | String | Yes | Event description |
| location | String | Yes | Event location |
| date | Date | Yes | Event date |
| time | String | Yes | Event time |
| endDate | Date | No | End date (for multi-day events) |
| category | String | Default: 'other' | 'worship', 'conference', 'youth', etc. |
| image | String | No | Event image URL |
| isFeatured | Boolean | Default: false | Featured on homepage |
| isPublished | Boolean | Default: true | Published status |
| registrationRequired | Boolean | Default: false | Requires registration |
| registrationLink | String | No | External registration URL |
| contactEmail | String | No | Contact email |
| contactPhone | String | No | Contact phone |
| attendees | Number | Default: 0 | Current attendee count |
| maxAttendees | Number | No | Maximum capacity |
| createdAt | Date | Auto | Creation timestamp |

### Example
```json
{
  "title": "Sunday Worship Service",
  "description": "Join us for worship, prayer, and the Word...",
  "location": "ROCMI Main Hall, Gayaza",
  "date": "2025-02-02T08:00:00Z",
  "time": "8:00 AM - 11:00 AM",
  "category": "worship",
  "image": "/images/sunday-service.jpg",
  "isFeatured": true,
  "isPublished": true,
  "registrationRequired": false,
  "attendees": 150,
  "createdAt": "2025-01-25T12:00:00Z"
}
```

---

## API Endpoints

### Authentication (auth)
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | /api/auth/register | Register new user | Public |
| POST | /api/auth/login | Login user | Public |
| GET | /api/auth/me | Get current user profile | Protected |
| GET | /api/auth/users | Get all users | Admin |
| PATCH | /api/auth/users/:id/status | Update user status | Admin |
| DELETE | /api/auth/users/:id | Delete user | Admin |

### Testimonies
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | /api/testimonies | Get approved testimonies | Public |
| POST | /api/testimonies | Submit testimony | Public |
| GET | /api/testimonies/:id | Get single testimony | Public |
| POST | /api/testimonies/:id/like | Like testimony | Public |
| GET | /api/testimonies/admin/all | Get all testimonies | Admin |
| PATCH | /api/testimonies/:id/approve | Approve testimony | Admin |
| DELETE | /api/testimonies/:id | Delete testimony | Admin |

### Events
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | /api/events | Get published events | Public |
| POST | /api/events | Create event | Admin |
| GET | /api/events/:id | Get single event | Public |
| PUT | /api/events/:id | Update event | Admin |
| DELETE | /api/events/:id | Delete event | Admin |
| POST | /api/events/:id/register | Register for event | Public |
| PATCH | /api/events/:id/featured | Toggle featured | Admin |

---

## Data Flow

```
React Frontend
   ↓ (fetch/axios)
Express API Routes
   ↓
Controller Logic
   ↓
Mongoose Models
   ↓
MongoDB Database
```

---

## Example: Fetching Testimonies

```javascript
// Frontend (React)
const fetchTestimonies = async () => {
  const response = await fetch('http://localhost:5000/api/testimonies');
  const data = await response.json();
  setTestimonies(data.data);
};

// Backend Route (routes/testimonies.routes.js)
router.get('/', getTestimonies);

// Backend Controller (controllers/testimonies.controller.js)
exports.getTestimonies = async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    
    const query = { isApproved: true };
    if (category) query.category = category;

    const testimonies = await Testimony.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ success: true, data: testimonies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};