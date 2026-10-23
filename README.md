# SpendWise — Personal Expense Tracker

**Track smarter. Spend better.**

SpendWise is a lightweight personal expense-tracking application built with **React** and **Electron**. It helps you record income and expenses, review your transaction history, and understand your spending with a clean, light-themed dashboard.

Developed as a minor project for the **Application Development** course.

## Features

- **Dashboard:** View your all-time balance, selected-month income and expenses, category chart, and recent transactions.
- **Transactions:** Add, edit, delete, search, and filter income and expense entries.
- **Reports:** Explore monthly income vs. expenses, net savings, and expense breakdowns by category.
- **Settings:** Select a display currency (INR, USD, EUR, or GBP) and reset saved transactions after confirmation.
- **Local storage:** Transactions and preferences persist using browser `localStorage`; no account or backend is required.
- **Light-mode UI:** A clean desktop-oriented interface with sidebar navigation.

> **Currency note:** Changing the selected currency changes display formatting only. It does **not** convert amounts using exchange rates.

## Tech Stack

| Technology | Purpose |
| --- | --- |
| React | User interface |
| Vite | Development server and production build |
| JavaScript | Application logic |
| Tailwind CSS | Styling |
| React Router | Page navigation |
| Recharts | Financial charts |
| Lucide React | Icons |
| Electron | Desktop window and application shell |
| localStorage | Local transaction and settings persistence |

## Getting Started

### Prerequisites

Install **Node.js** and **npm** on your computer.

### Installation

Clone your repository, enter the project directory, and install dependencies:

```bash
git clone https://github.com/YOUR_USERNAME/SpendWise.git
cd SpendWise
npm install
```

Replace `YOUR_USERNAME` with your GitHub username (and adjust the repository name if needed).

## Run the Desktop Application

For the **two-terminal workflow** used in class:

**Terminal 1 — Start the React development server**

```bash
npm run dev
```

Keep this terminal running. Vite serves the website at `http://127.0.0.1:5173`.

**Terminal 2 — Launch Electron**

```bash
npm run electron
```

SpendWise opens in its desktop window and loads the React development server.

**Alternative: Run both processes with one command**

```bash
npm run electron:dev
```

**Run only the web version**

```bash
npm run dev
```

Then open the local URL shown in the terminal in your web browser.

## Other Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite development server |
| `npm run electron` | Launch Electron (requires the Vite server running in development) |
| `npm run electron:dev` | Start Vite and Electron together |
| `npm run build` | Build the React frontend into `dist/` |
| `npm run preview` | Preview the frontend production build |
| `npm test` | Run Node-based project tests |
| `npm run electron:package` | Build frontend and package Electron using electron-builder |

## Application Screens

### 1. Dashboard

An overview of total balance, monthly income and expenses, recent transactions, and spending distribution.

### 2. Transactions

Manage income and expense records with a transaction form, editable entries, search, filters, and delete confirmation.

### 3. Reports

Review monthly figures and charts showing income, expenses, savings, and category-wise spending.

### 4. Settings

Choose how amounts are displayed and manage locally stored transactions.

## How Data Is Stored

SpendWise stores transactions and settings using **`localStorage`**. The Electron version currently uses the renderer's browser storage; it does **not** use an external database or a separate JSON file.

- Data normally remains available across app restarts in the same browser or Electron profile.
- The web browser and Electron may have **separate** stored data.
- Clearing application/browser storage or using **Reset All Data** may permanently remove transactions.
- There is no cloud synchronization, login, or automatic backup.

## Project Structure

```text
SpendWise/
├── electron.js                # Electron main process
├── scripts/
│   └── launch-electron.js     # Desktop development launcher
├── src/
│   ├── components/            # Reusable UI components
│   ├── context/               # App state
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Transactions.jsx
│   │   ├── Reports.jsx
│   │   └── Settings.jsx
│   ├── services/
│   │   └── storage.js         # localStorage access
│   ├── utils/                 # Calculations, formatting, categories
│   ├── App.jsx
│   └── main.jsx
├── tests/                     # Project tests
├── package.json
└── vite.config.js
```

## Scope and Limitations

SpendWise is designed for **personal tracking and educational use**, not banking or accounting. It does not connect to financial institutions, process payments, synchronize across devices, or perform currency conversion.

## Author

**Het Javiya**  
Application Development — Minor Project

---

Made with React + Electron.
