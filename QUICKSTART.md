# Quick Start Guide - Google Calendar Integration

Get your class schedule and mess menu synced to Google Calendar in 5 minutes!

## 🚀 Option 1: Use Without Google Calendar (Simplest)

Just open `index.html` in your browser - it works perfectly without any setup!

## 📅 Option 2: Enable Google Calendar Sync

### Step 1: Copy Configuration File (30 seconds)
```bash
cp config.example.js config.js
```

### Step 2: Get Google API Credentials (3 minutes)

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (e.g., "My Routine Calendar")
3. Enable Google Calendar API:
   - Go to "APIs & Services" → "Library"
   - Search "Google Calendar API"
   - Click "Enable"

### Step 3: Create OAuth Credentials (2 minutes)

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. If prompted, configure OAuth consent screen:
   - User Type: External
   - App name: "Routine Calendar Sync"
   - Your email address
   - Click "Save and Continue" (skip optional fields)
4. Create OAuth Client:
   - Application type: **Web application**
   - Name: "Routine Calendar"
   - Authorized JavaScript origins:
     - Add: `http://localhost:8000`
     - Add your domain if deploying online
   - Click "Create"
5. **Copy your Client ID**

### Step 4: Get API Key (1 minute)

1. Still in "Credentials" page
2. Click "Create Credentials" → "API key"
3. **Copy your API Key**
4. (Optional) Click "Restrict Key" → Select "Google Calendar API"

### Step 5: Update config.js (30 seconds)

Open `config.js` and paste your credentials:

```javascript
const GOOGLE_CONFIG = {
    CLIENT_ID: 'paste-your-client-id-here.apps.googleusercontent.com',
    API_KEY: 'paste-your-api-key-here',
    // ... rest stays the same
};
```

### Step 6: Start Using! 🎉

1. **Start a local server:**
   ```bash
   python3 -m http.server 8000
   # or
   python -m http.server 8000
   ```

2. **Open in browser:**
   ```
   http://localhost:8000/index.html
   ```

3. **Connect & Export:**
   - Click "📅 Connect Google Calendar"
   - Sign in with your Google account
   - Click "⬆️ Export to Calendar"
   - Select what to export
   - Click "Export"
   - Done! Check your Google Calendar!

## 📱 What Gets Exported

### Class Schedule (Blue Events 🔵)
- All your classes with time slots
- Repeats weekly for 16 weeks
- 15-minute reminder before each class

### Mess Menu (Orange Events 🟠)
- Breakfast, Lunch, Snacks, Dinner
- Full menu details in event description
- Repeats weekly for 16 weeks
- 30-minute reminder before meals

## 🎨 Customization

Edit `config.js` to change:
- **Timezone:** Default is `Asia/Kolkata`
- **Event colors:** Blue, orange, green, yellow
- **Reminder times:** 15 or 30 minutes before
- **Recurring weeks:** 16 weeks (one semester)

Example:
```javascript
const CALENDAR_SETTINGS = {
    TIMEZONE: 'America/New_York',  // Change your timezone
    REMINDERS: {
        CLASS: [15, 30],  // Two reminders: 15 and 30 min before
        MEAL: [45]        // 45 min before meals
    },
    RECURRENCE: {
        ENABLED: true,
        WEEKS: 20  // 20 weeks instead of 16
    }
};
```

## 🔧 Troubleshooting

**"Configuration error" message?**
- Check that config.js exists and has valid credentials
- Make sure Client ID ends with `.apps.googleusercontent.com`

**Events not showing in calendar?**
- Refresh Google Calendar
- Check you're viewing the correct calendar (Primary)
- Verify time zone settings

**Can't connect?**
- Make sure you're accessing via `http://localhost:8000`
- Check OAuth origins match in Google Cloud Console
- Try signing out and in again

**Want to re-export?**
- Delete old events in Google Calendar first
- Or use a different calendar

## 📚 More Information

- Detailed guide: See [GOOGLE_CALENDAR_INTEGRATION.md](GOOGLE_CALENDAR_INTEGRATION.md)
- Google's documentation: [Calendar API](https://developers.google.com/calendar)
- Repository: [GitHub](https://github.com/indu-shekhar/Routine)

## 💡 Tips

1. **Testing:** Use a test Google account first
2. **Privacy:** Never commit `config.js` to git (it's in .gitignore)
3. **Updates:** To update schedule, delete old events and re-export
4. **Sharing:** Each user needs their own Google credentials
5. **Simple version:** Use `newer/index_simple.html` for no Google Calendar

## ❓ Need Help?

1. Check the troubleshooting section above
2. Read [GOOGLE_CALENDAR_INTEGRATION.md](GOOGLE_CALENDAR_INTEGRATION.md)
3. Open an issue on GitHub
4. Review Google Calendar API documentation

---

**Ready to sync?** Follow the steps above and have your schedule in Google Calendar in minutes! 🎉
