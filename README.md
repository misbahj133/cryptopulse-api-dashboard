# CryptoPulse - Live Market Dashboard (Task 1)

A clean, high-performance frontend dashboard built with Vanilla JavaScript, HTML5, and CSS3 that connects to a public API to fetch, render, and filter real-time cryptocurrency metrics. This project focuses heavily on asynchronous data streams, client-side state management, and resilient error boundary interfaces.

## 🚀 Live Demo
- **Deployment URL:** [Insert your Vercel / Netlify / GitHub Pages link here]

## ✨ Features Demonstrated

- **Successful Data State:** Displays standard coin parameters including asset rankings, names, dynamic symbols, global pricing matrices, and colored percentage trends.
- **Visible Loading State:** Implements a user-friendly status message during active asynchronous data operations to eliminate blank screen flicker.
- **Graceful Error State:** Catches network failures and rate limits, displaying a user-friendly error notice banner alongside functional fallback metrics so the workspace remains usable.
- **Client-Side Live Filter:** Features a search input listener that matches user keystrokes against active coin metadata to instantaneously filter visible results without lag.

## 🛠️ Project Architecture

```text
cryptopulse-api-dashboard/
│
├── index.html   # Main structural bones, control forms, and state wrappers
├── styles.css   # Clean, dark-mode design system with visual hierarchies
└── app.js       # Asynchronous API data pipeline, error catching, and filters
```

## 🔌 API Integration Details
This application interacts with the free **CoinGecko API** v3 markets endpoint:
`https://coingecko.com`

### Error & Rate-Limit Handling Strategy
Public browser requests executed directly from local files (`file:///`) frequently run into strict third-party API rate-limiting thresholds. To prevent the interface from breaking or rendering a blank container, this application intentionally incorporates standard try-catch logic:
1. It attempts to request live asset metrics across the network.
2. If the API returns a status exception or block, the `catch(error)` structural block intercepts it.
3. The UI seamlessly replaces the blank container with an explicit error alert banner while loading safe backup data to preserve dashboard functionality.

## 💻 Local Quickstart

1. Clone or download this project directory folder onto your local computer.
2. Open the directory inside any text editor (such as VS Code).
3. Double-click the `index.html` file to instantly launch the live interactive app directly inside your web browser.

---
*Built as part of a frontend engineering portfolio assessment.*
