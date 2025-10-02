# Routine

Daily Routine & Mess Menu application with Google Calendar integration.

## Features

- 📚 **Class Schedule Display**: View your daily class schedule with time slots
- 🍽️ **Mess Menu**: See today's breakfast, lunch, snacks, and dinner menu
- ⏰ **Current Time Tracking**: Highlights current class and meal times
- 📅 **Google Calendar Sync**: Export your schedule and menu to Google Calendar
- 🔄 **Recurring Events**: Creates weekly recurring events for the entire semester
- 🎨 **Beautiful UI**: Clean, colorful interface with animated elements

## Quick Start

1. Open `index.html` in your web browser
2. View your daily schedule and mess menu
3. (Optional) Connect Google Calendar to sync your schedule

## Google Calendar Integration

### Setup Instructions

To enable Google Calendar integration, follow these steps:

#### 1. Copy Configuration File
```bash
cp config.example.js config.js
```

#### 2. Set Up Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Calendar API:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Calendar API"
   - Click "Enable"

#### 3. Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Configure the OAuth consent screen (if prompted)
4. Select "Web application" as application type
5. Add authorized JavaScript origins:
   - `http://localhost:8000` (for local testing)
   - Your production domain (e.g., `https://yourdomain.com`)
6. Copy your **Client ID** and **API Key**

#### 4. Update config.js

Edit `config.js` and add your credentials:

```javascript
const GOOGLE_CONFIG = {
    CLIENT_ID: 'YOUR_CLIENT_ID_HERE.apps.googleusercontent.com',
    API_KEY: 'YOUR_API_KEY_HERE',
    // ... rest of the config
};
```

### Using Google Calendar Sync

1. **Connect to Google Calendar**
   - Click the "Connect Google Calendar" button
   - Sign in with your Google account
   - Grant calendar permissions

2. **Export Your Schedule**
   - Click "Export to Calendar"
   - Choose what to export:
     - Class Schedule
     - Mess Menu
     - Both
   - Click "Export"

3. **View in Google Calendar**
   - Open your Google Calendar
   - Events will be color-coded:
     - 🔵 Blue: Classes
     - 🟠 Orange: Meals
     - 🟡 Yellow: Snacks

### Features

- **Automatic Reminders**: Get notifications before classes and meals
- **Recurring Events**: Events repeat weekly for 16 weeks (one semester)
- **Smart Filtering**: Only exports actual classes (skips "Free" slots)
- **Detailed Descriptions**: Full menu items in meal events

### Troubleshooting

**"Configuration error"**
- Make sure you've created `config.js` from `config.example.js`
- Verify your Client ID and API Key are correct

**"Events not showing"**
- Check if you granted calendar permissions
- Verify the correct calendar is selected in Google Calendar

**Need More Help?**
- See [GOOGLE_CALENDAR_INTEGRATION.md](GOOGLE_CALENDAR_INTEGRATION.md) for detailed guide
- Check the Google Calendar API documentation

## File Structure

```
.
├── index.html              # Main application (with Google Calendar)
├── newer/
│   └── index_simple.html   # Simple version (no Google Calendar)
├── routine.csv             # Class schedule data
├── menu.csv                # Mess menu data
├── config.example.js       # Configuration template
├── config.js               # Your credentials (create this, not in git)
├── README.md               # This file
└── GOOGLE_CALENDAR_INTEGRATION.md  # Detailed integration guide
```

## Usage Without Google Calendar

If you don't want Google Calendar integration:
- Use `newer/index_simple.html` instead
- Or simply don't configure the Google Calendar credentials

The app works perfectly fine without Google Calendar integration!

## Data Format

### routine.csv
```csv
Day,9:00 - 10:00,10:00 - 11:00,...
Monday,SD,Free,...
```

### menu.csv
```csv
Column 1,Sunday,Monday,...
Breakfast,"Items...","Items...",...
Lunch,"Items...","Items...",...
```

## Customization

Edit `config.js` to customize:
- Time zone
- Event colors
- Reminder times
- Number of recurring weeks
- And more!

## License

Open source - feel free to use and modify!