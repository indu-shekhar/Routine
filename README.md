# Routine Documentation: Campus Companion app for students

**It's very simple to get it running, actually ..**

![](https://github.com/indu-shekhar/Routine/blob/main/useful_components/Adobe%20Express%20-%20Screen%20Recording%202025-10-03%20at%2010.42.43%E2%80%AFPM.gif?raw=true)

![](https://github.com/indu-shekhar/Routine/blob/main/useful_components/desktop_med.gif?raw=true)

---

### Overview

This guide walks you through setting up a personal schedule and assignment tracker by integrating your Moodle calendar with Google Calendar, then connecting it to the application.

---

### Prerequisites

- A fork of the repository
- Access to your Moodle account
- A Google account with Google Calendar enabled

---

### Step 1 — Fork the repository

1. Fork the repository to your own GitHub account from : https://github.com/indu-shekhar/Routine
2. Clone your fork locally and open the project in your editor.

---

### Step 2 — Update your daily class schedule

1. Open `routine.csv` in the project.
2. Update the entries for each day according to your classes, following the existing format.

---

### Step 3 — Get your Moodle iCal export URL

1. In Moodle, navigate to Calendar and find the iCal export option.
2. Copy the export URL.

[https://scribehow.com/embed/Export_Your_Calendar_Events_From_Eabyas__VEJsXn-0S-Cggpnp0gOQEQ](https://scribehow.com/embed/Export_Your_Calendar_Events_From_Eabyas__VEJsXn-0S-Cggpnp0gOQEQ)

> Tip: Make sure the export includes all events you want to track.
> 

---

### Step 4 — Integrate Moodle with Google Calendar

1. Open Google Calendar.
2. Add a new calendar by URL and paste the Moodle iCal export link.
3. Confirm and let Google Calendar sync the events.

[http://scribehow.com/embed/Add_a_Calendar_From_a_URL__y1wgwojvT2uy3AIh9kTS4A?as=video](http://scribehow.com/embed/Add_a_Calendar_From_a_URL__y1wgwojvT2uy3AIh9kTS4A?as=video)

---

### Step 5 — Add your Google Calendar to the application

1. In Google Calendar, get the secret public address as required by the app.
2. Follow the instructions as given below: also make sure to change the default view to Schedule 

[https://scribehow.com/embed/Get_Embed_Code_for_Google_Calendar__0YNAbZaBRXSH-cbil4cOxQ?as=video](https://scribehow.com/embed/Get_Embed_Code_for_Google_Calendar__0YNAbZaBRXSH-cbil4cOxQ?as=video)

---

### Step 6 — Update the source link in code

- Open the relevant source file and locate the configuration at line 785.
- Replace the existing source attribute with your new Google Calendar link.
- Here:  ⇒ src=”” →replace this with the copied link from the Google calendar.
- Be assured that the calendar cannot be viewed by anybody else, as it can only be opened on your logged-in browsers.

![Screenshot 2025-10-03 at 10.01.02 PM.png](Routine%20Documentation%202810323f0ea8809fae2bea26b5ad2241/Screenshot_2025-10-03_at_10.01.02_PM.png)

<aside>
💡

If your editor shows different line numbers, search for the configuration key related to the calendar source and update that value.

</aside>

---

### Optional — Deploy to a free hosting service

Follow this short tutorial to deploy and have your tracker available everywhere for free.

[Deploy your tracker in ~5 minutes](https://youtube.com/shorts/WqOXxoGSpbs?si=WZqD49sW1-iN2Iv5)

---

### You’re all set

You now have a personal, always-available tracker that keeps you on top of your routine and deadlines.

---

### Final checklist

- [ ]  Fork the repository
- [ ]  Update `routine.csv` with your classes
- [ ]  Copy Moodle iCal export URL
- [ ]  Add Moodle iCal to Google Calendar
- [ ]  Get Google Calendar iCal link
- [ ]  Update the app’s source link in code
- [ ]  Deploy to a free hosting service (optional)
