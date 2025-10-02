# Google Calendar Integration Guide

## Overview
This guide explains how to integrate Google Calendar with your Daily Routine & Mess Menu application, allowing you to sync your class schedule and meal times directly to your Google Calendar.

## Features
- **One-Click Export**: Export your entire weekly class schedule to Google Calendar
- **Automatic Event Creation**: Creates calendar events for classes, meals, and free time
- **Smart Scheduling**: Automatically sets appropriate start and end times
- **Color Coding**: Different colors for different types of events (classes, meals, free time)
- **Recurring Events**: Option to create recurring weekly events
- **Two-Way Sync**: View and manage your schedule in Google Calendar

## Prerequisites

### 1. Google Cloud Project Setup
Before you can integrate Google Calendar, you need to set up a Google Cloud Project and enable the Calendar API:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Calendar API:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Calendar API"
   - Click on it and press "Enable"

### 2. OAuth 2.0 Credentials
You need OAuth 2.0 credentials to authenticate users:

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Configure the OAuth consent screen if prompted:
   - User Type: External (for testing) or Internal (for organization)
   - Add application name, user support email, and developer contact
   - Add scopes: `https://www.googleapis.com/auth/calendar.events`
4. Create OAuth client ID:
   - Application type: Web application
   - Name: "Daily Routine Calendar Sync"
   - Authorized JavaScript origins: 
     - `http://localhost` (for local testing)
     - `https://yourdomain.com` (for production)
   - Authorized redirect URIs:
     - `http://localhost/callback` (for local testing)
     - `https://yourdomain.com/callback` (for production)
5. Copy your Client ID and Client Secret

### 3. Configure the Application
Update the `config.js` file with your credentials:

```javascript
const GOOGLE_CONFIG = {
    CLIENT_ID: 'YOUR_CLIENT_ID_HERE.apps.googleusercontent.com',
    API_KEY: 'YOUR_API_KEY_HERE',
    DISCOVERY_DOCS: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
    SCOPES: "https://www.googleapis.com/auth/calendar.events"
};
```

## Implementation Guide

### Step 1: Add Google API Client Library
Add the Google API Client library to your HTML file:

```html
<script src="https://apis.google.com/js/api.js"></script>
<script src="https://accounts.google.com/gsi/client" async defer></script>
```

### Step 2: Initialize the API
Initialize the Google Calendar API when the page loads:

```javascript
function initGoogleCalendar() {
    gapi.load('client:auth2', () => {
        gapi.client.init({
            apiKey: GOOGLE_CONFIG.API_KEY,
            clientId: GOOGLE_CONFIG.CLIENT_ID,
            discoveryDocs: GOOGLE_CONFIG.DISCOVERY_DOCS,
            scope: GOOGLE_CONFIG.SCOPES
        });
    });
}
```

### Step 3: Authentication Flow
Implement sign-in and sign-out functionality:

```javascript
function signIn() {
    gapi.auth2.getAuthInstance().signIn();
}

function signOut() {
    gapi.auth2.getAuthInstance().signOut();
}
```

### Step 4: Create Calendar Events
Export routine to Google Calendar:

```javascript
async function exportToGoogleCalendar(routineData, menuData) {
    const batch = gapi.client.newBatch();
    
    // Create events for each class
    routineData.forEach(slot => {
        if (slot.subject !== 'Free') {
            const event = {
                'summary': slot.subject,
                'description': 'Class Schedule',
                'start': {
                    'dateTime': slot.startDateTime,
                    'timeZone': 'America/Los_Angeles'
                },
                'end': {
                    'dateTime': slot.endDateTime,
                    'timeZone': 'America/Los_Angeles'
                },
                'recurrence': [
                    'RRULE:FREQ=WEEKLY;COUNT=52'
                ],
                'colorId': '9' // Blue for classes
            };
            
            batch.add(
                gapi.client.calendar.events.insert({
                    'calendarId': 'primary',
                    'resource': event
                })
            );
        }
    });
    
    return batch.then(response => {
        console.log('Events created:', response);
    });
}
```

### Step 5: Handle Menu Events
Create meal reminder events:

```javascript
function createMealEvents(menuData, day) {
    const mealTimes = {
        'Breakfast': '08:00',
        'Lunch': '13:00',
        'Snacks': '16:30',
        'Dinner': '20:00'
    };
    
    Object.keys(mealTimes).forEach(meal => {
        const event = {
            'summary': `${meal} 🍽️`,
            'description': menuData[meal],
            'start': {
                'dateTime': `${day}T${mealTimes[meal]}:00`,
                'timeZone': 'America/Los_Angeles'
            },
            'end': {
                'dateTime': `${day}T${addHour(mealTimes[meal])}:00`,
                'timeZone': 'America/Los_Angeles'
            },
            'colorId': '6' // Orange for meals
        };
        
        gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event
        });
    });
}
```

## Usage Instructions

### For End Users:

1. **Connect Google Calendar**
   - Click the "Connect to Google Calendar" button
   - Sign in with your Google account
   - Grant calendar permissions

2. **Export Schedule**
   - Click "Export to Google Calendar"
   - Choose what to export:
     - [ ] Class Schedule
     - [ ] Mess Menu
     - [ ] Both
   - Select date range (single day, this week, semester)
   - Click "Confirm Export"

3. **View in Google Calendar**
   - Open Google Calendar
   - Your events will appear with color coding:
     - 🔵 Blue: Classes
     - 🟠 Orange: Meals
     - 🟢 Green: Free time (optional)

4. **Manage Events**
   - Edit, delete, or reschedule events directly in Google Calendar
   - Changes won't sync back to the app (one-way sync)

## Advanced Features

### Sync Options
- **One-time export**: Export current schedule once
- **Weekly sync**: Automatically sync each Sunday evening
- **Smart updates**: Only sync changes, avoid duplicates

### Notification Settings
Configure when to receive notifications:
- 15 minutes before class
- 30 minutes before meals
- Custom reminders

### Calendar Preferences
- Choose which calendar to sync to (primary or create new)
- Set default event duration
- Customize event colors
- Add custom event descriptions

## Troubleshooting

### Common Issues:

**"Authorization failed"**
- Check that OAuth credentials are correctly configured
- Verify redirect URIs match your domain
- Ensure Calendar API is enabled

**"Events not showing up"**
- Check if you're looking at the correct calendar
- Verify time zone settings
- Refresh Google Calendar

**"Duplicate events"**
- Clear existing events before re-exporting
- Use the "Smart sync" option to prevent duplicates

**"Permission denied"**
- Make sure you granted calendar.events permission
- Try signing out and signing in again
- Check Google Cloud Console for API quotas

### Error Codes:
- `401 Unauthorized`: Re-authenticate with Google
- `403 Forbidden`: Check API quotas and permissions
- `404 Not Found`: Calendar ID may be incorrect
- `409 Conflict`: Event already exists

## Security Best Practices

1. **Never commit credentials**: Keep API keys and secrets in environment variables
2. **Use HTTPS**: Always serve your application over HTTPS in production
3. **Limit scopes**: Only request calendar.events scope, not full calendar access
4. **Token storage**: Store tokens securely (httpOnly cookies or secure storage)
5. **Validate input**: Sanitize all data before creating calendar events
6. **Rate limiting**: Respect Google Calendar API quotas (1,000,000 requests/day)

## API Quotas and Limits

- **Requests per day**: 1,000,000
- **Requests per 100 seconds per user**: 1,500
- **Batch requests**: Up to 1,000 operations per batch
- **Event size**: Up to 2,048 characters for summary, description combined

## Testing

### Local Testing:
1. Start a local server: `python -m http.server 8000`
2. Open `http://localhost:8000`
3. Use test Google account
4. Verify events are created correctly

### Production Checklist:
- [ ] OAuth consent screen approved
- [ ] Credentials configured for production domain
- [ ] HTTPS enabled
- [ ] Error handling implemented
- [ ] User feedback for all actions
- [ ] Privacy policy published

## Additional Resources

- [Google Calendar API Documentation](https://developers.google.com/calendar)
- [OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)
- [API Client Library for JavaScript](https://github.com/google/google-api-javascript-client)
- [Calendar API Quotas](https://developers.google.com/calendar/api/guides/quota)

## Support

For issues with this integration:
1. Check the troubleshooting section above
2. Review Google Calendar API documentation
3. Open an issue on the GitHub repository
4. Contact the maintainers

## License

This integration guide is part of the Daily Routine & Mess Menu application.
