// Google Calendar API Configuration
// Copy this file to 'config.js' and fill in your credentials

const GOOGLE_CONFIG = {
    // Get your Client ID from Google Cloud Console
    // https://console.cloud.google.com/apis/credentials
    CLIENT_ID: 'YOUR_CLIENT_ID_HERE.apps.googleusercontent.com',
    
    // API Key for Google Calendar API
    API_KEY: 'YOUR_API_KEY_HERE',
    
    // Discovery document for Google Calendar API v3
    DISCOVERY_DOCS: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
    
    // Authorization scopes required for the app
    // calendar.events allows creating/modifying calendar events
    SCOPES: "https://www.googleapis.com/auth/calendar.events"
};

// Calendar Settings
const CALENDAR_SETTINGS = {
    // Default timezone for events
    TIMEZONE: 'Asia/Kolkata',
    
    // Color codes for different event types
    COLORS: {
        CLASS: '9',      // Blue
        MEAL: '6',       // Orange
        FREE: '10',      // Green
        SNACK: '5'       // Yellow
    },
    
    // Default event duration in minutes
    DEFAULT_DURATION: {
        CLASS: 60,       // 1 hour
        MEAL: 60,        // 1 hour
        SNACK: 30        // 30 minutes
    },
    
    // Notification/Reminder settings (minutes before event)
    REMINDERS: {
        CLASS: [15],     // 15 minutes before
        MEAL: [30],      // 30 minutes before
        SNACK: [15]      // 15 minutes before
    },
    
    // Recurring event settings
    RECURRENCE: {
        ENABLED: true,
        WEEKS: 16        // Number of weeks to repeat (one semester)
    }
};
