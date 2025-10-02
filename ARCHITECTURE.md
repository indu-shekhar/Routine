# Google Calendar Integration Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    Daily Routine & Mess Menu App                 │
│                          (index.html)                            │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 │ User opens app
                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                       Load CSV Data                              │
│  ┌──────────────────┐              ┌──────────────────┐         │
│  │  routine.csv     │              │    menu.csv      │         │
│  │                  │              │                  │         │
│  │ • Class schedule │              │ • Breakfast      │         │
│  │ • Time slots     │              │ • Lunch          │         │
│  │ • Days of week   │              │ • Snacks         │         │
│  │                  │              │ • Dinner         │         │
│  └──────────────────┘              └──────────────────┘         │
└─────────────────┬───────────────────────────────────────────────┘
                  │
                  │ Data loaded
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Display UI                                    │
│  ┌──────────────────────────────────────────────────────┐       │
│  │  Header                                              │       │
│  │  • Current Date/Time                                 │       │
│  │  • Google Calendar Connect Button                   │       │
│  └──────────────────────────────────────────────────────┘       │
│  ┌──────────────────────────────────────────────────────┐       │
│  │  Today's Schedule                                    │       │
│  │  • Current class highlighted                         │       │
│  │  • Time slots displayed                              │       │
│  └──────────────────────────────────────────────────────┘       │
│  ┌──────────────────────────────────────────────────────┐       │
│  │  Today's Menu                                        │       │
│  │  • Current meal highlighted                          │       │
│  │  • All meals with items                              │       │
│  └──────────────────────────────────────────────────────┘       │
└─────────────────┬───────────────────────────────────────────────┘
                  │
                  │ User clicks "Connect Google Calendar"
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│              Google OAuth2 Authentication Flow                   │
│                                                                  │
│  1. Load Google API Client (gapi)                               │
│     ↓                                                            │
│  2. Initialize with config.js credentials                       │
│     • CLIENT_ID                                                  │
│     • API_KEY                                                    │
│     • SCOPES: calendar.events                                   │
│     ↓                                                            │
│  3. User signs in with Google account                           │
│     ↓                                                            │
│  4. User grants calendar permissions                            │
│     ↓                                                            │
│  5. App receives access token                                   │
│     ↓                                                            │
│  6. Update UI: Show "Export" and "Sign Out" buttons             │
│                                                                  │
└─────────────────┬───────────────────────────────────────────────┘
                  │
                  │ User clicks "Export to Calendar"
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Export Modal                                │
│  ┌────────────────────────────────────────────────────┐         │
│  │  Choose what to export:                            │         │
│  │  ☑ Class Schedule (Weekly recurring)              │         │
│  │  ☑ Mess Menu (Weekly recurring)                   │         │
│  │                                                    │         │
│  │  [Cancel]  [Export]                                │         │
│  └────────────────────────────────────────────────────┘         │
└─────────────────┬───────────────────────────────────────────────┘
                  │
                  │ User clicks "Export"
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│              Data Processing & Event Creation                    │
│                                                                  │
│  ┌─────────────────────────────────────────────────┐            │
│  │  Process Routine Data                           │            │
│  │  ────────────────────                           │            │
│  │  For each day (Mon-Sun):                        │            │
│  │    For each time slot:                          │            │
│  │      If not "Free" or "Lunch":                  │            │
│  │        Create class event                       │            │
│  │        • Set start/end time                     │            │
│  │        • Add subject name                       │            │
│  │        • Set blue color                         │            │
│  │        • Add 15-min reminder                    │            │
│  │        • Set weekly recurrence (16 weeks)       │            │
│  └─────────────────────────────────────────────────┘            │
│                                                                  │
│  ┌─────────────────────────────────────────────────┐            │
│  │  Process Menu Data                              │            │
│  │  ─────────────────                              │            │
│  │  For each meal type (Breakfast/Lunch/etc):      │            │
│  │    For each day (Sun-Sat):                      │            │
│  │      Create meal event                          │            │
│  │      • Set meal time                            │            │
│  │      • Add menu items to description            │            │
│  │      • Set orange/yellow color                  │            │
│  │      • Add 30-min reminder                      │            │
│  │      • Set weekly recurrence (16 weeks)         │            │
│  └─────────────────────────────────────────────────┘            │
└─────────────────┬───────────────────────────────────────────────┘
                  │
                  │ Batch API Call
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Google Calendar API                            │
│                                                                  │
│  POST https://www.googleapis.com/calendar/v3/calendars/         │
│       primary/events                                             │
│                                                                  │
│  Batch Request with ~100+ events:                               │
│  • Class events for entire semester                             │
│  • Meal events for entire semester                              │
│                                                                  │
│  Response:                                                       │
│  • Event IDs                                                     │
│  • Creation timestamps                                           │
│  • Calendar links                                                │
│                                                                  │
└─────────────────┬───────────────────────────────────────────────┘
                  │
                  │ Success
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Update UI                                      │
│  • Show success message: "✅ Exported 120 events!"              │
│  • User can now view events in Google Calendar                  │
└─────────────────────────────────────────────────────────────────┘
```

## Event Structure

### Class Event
```json
{
  "summary": "📚 NLP",
  "description": "Class: NLP\nTime: 4:00 - 5:00",
  "start": {
    "dateTime": "2024-10-07T16:00:00.000Z",
    "timeZone": "Asia/Kolkata"
  },
  "end": {
    "dateTime": "2024-10-07T17:00:00.000Z",
    "timeZone": "Asia/Kolkata"
  },
  "colorId": "9",
  "recurrence": ["RRULE:FREQ=WEEKLY;COUNT=16"],
  "reminders": {
    "useDefault": false,
    "overrides": [{"method": "popup", "minutes": 15}]
  }
}
```

### Meal Event
```json
{
  "summary": "🌅 Breakfast",
  "description": "Palak Paratha, Mysore Bonda, Aloo Bhujia...",
  "start": {
    "dateTime": "2024-10-07T08:00:00.000Z",
    "timeZone": "Asia/Kolkata"
  },
  "end": {
    "dateTime": "2024-10-07T09:00:00.000Z",
    "timeZone": "Asia/Kolkata"
  },
  "colorId": "6",
  "recurrence": ["RRULE:FREQ=WEEKLY;COUNT=16"],
  "reminders": {
    "useDefault": false,
    "overrides": [{"method": "popup", "minutes": 30}]
  }
}
```

## Data Flow

```
CSV Files → Parse → JavaScript Objects → Filter → Format → API Call → Google Calendar
    ↓
routine.csv         Class objects      Remove "Free"    Event JSON    Batch Insert
menu.csv            Meal objects       Skip Lunch       with times    to Calendar
```

## Component Interaction

```
┌──────────────────┐
│  RoutineMenuApp  │ ← Main application class
│                  │   • Loads CSV data
│                  │   • Renders UI
│                  │   • Manages state
└────────┬─────────┘
         │
         │ Has access to
         │
         ▼
┌──────────────────┐
│GoogleCalendarSync│ ← Integration class
│                  │   • Handles OAuth
│                  │   • Exports events
│                  │   • Manages UI state
└──────────────────┘
```

## Security Architecture

```
┌───────────────┐
│   User's PC   │
└───────┬───────┘
        │
        │ 1. Requests access
        ▼
┌──────────────────┐      2. Redirects to auth      ┌──────────────┐
│   Your Web App   │─────────────────────────────────▶│   Google     │
│  (index.html)    │                                  │   OAuth      │
│                  │◀─────────────────────────────────│              │
└──────────────────┘   3. Returns access token       └──────────────┘
        │
        │ 4. Calls API with token
        ▼
┌──────────────────┐
│ Google Calendar  │
│       API        │
└──────────────────┘

Notes:
• Credentials stored locally in config.js (git-ignored)
• Access token never leaves browser
• Only calendar.events scope requested
• User must explicitly grant permission
```

## Error Handling Flow

```
┌─────────────┐
│   Action    │
└──────┬──────┘
       │
       ▼
┌──────────────────┐    No      ┌──────────────────┐
│ Config loaded?   │────────────▶│ Show: "Config    │
└──────┬───────────┘             │  not found"      │
       │ Yes                     └──────────────────┘
       ▼
┌──────────────────┐    No      ┌──────────────────┐
│ User signed in?  │────────────▶│ Show: "Connect   │
└──────┬───────────┘             │  Google Calendar"│
       │ Yes                     └──────────────────┘
       ▼
┌──────────────────┐    No      ┌──────────────────┐
│ Data loaded?     │────────────▶│ Show: "No data"  │
└──────┬───────────┘             └──────────────────┘
       │ Yes
       ▼
┌──────────────────┐
│ Export events    │
└──────┬───────────┘
       │
       ├──Success──▶ Show: "✅ Exported!"
       │
       └──Error────▶ Show: "❌ Failed: [reason]"
```

## File Dependencies

```
index.html
    ├── Requires: routine.csv
    ├── Requires: menu.csv
    ├── Requires: config.js (optional, for Google Calendar)
    └── Loads: Google API (https://apis.google.com/js/api.js)

config.js
    ├── Defines: GOOGLE_CONFIG
    └── Defines: CALENDAR_SETTINGS

Google Cloud Console
    ├── Provides: CLIENT_ID
    ├── Provides: API_KEY
    └── Manages: OAuth consent screen
```

## Typical User Journey

```
1. User opens index.html
   ↓
2. Sees schedule and menu
   ↓
3. Clicks "Connect Google Calendar"
   ↓
4. Signs in with Google
   ↓
5. Grants calendar permission
   ↓
6. Clicks "Export to Calendar"
   ↓
7. Selects what to export
   ↓
8. Clicks "Export" button
   ↓
9. Events created in Google Calendar
   ↓
10. Receives notifications before classes/meals
```

## Performance Considerations

- **Batch API Calls**: All events sent in one request
- **Client-side Processing**: No server required
- **Caching**: CSV data loaded once per session
- **Lazy Loading**: Google API loaded only when needed
- **Event Limits**: ~100-200 events per export (within API limits)

## Browser Compatibility

- Modern browsers with ES6+ support
- Fetch API support required
- Google API JavaScript client compatible
- Tested: Chrome, Firefox, Safari, Edge
