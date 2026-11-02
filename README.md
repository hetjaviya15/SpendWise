# SpendWise 💸
### Track smarter. Spend better.

SpendWise is a desktop expense-tracking application built with **React, TypeScript, Vite, and Electron**. It helps users manage their daily expenses, monitor spending habits, organize transactions, and understand their financial activity through a clean and intuitive dashboard.

Designed with simplicity in mind, SpendWise provides an easy way to keep track of personal finances without requiring an account, backend server, or internet connection for everyday use.

---

## ✨ Features

- **📊 Dashboard** – Get an overview of your financial activity, including income, expenses, and balance.
- **💳 Transaction Management** – Add, view, and manage your financial transactions.
- **📈 Reports & Analytics** – Understand your spending patterns through visual reports.
- **⚙️ Settings** – Customize your application preferences, including currency.
- **💾 Local Data Persistence** – Keep your financial data saved locally on your device.
- **🎨 Clean User Interface** – Enjoy a modern, minimal, and easy-to-use light-mode interface.
- **🖥️ Desktop Experience** – Built with Electron to provide a native desktop application experience.
- **🌍 Multiple Currency Support** – Choose between INR, USD, EUR, and GBP.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Building the user interface |
| TypeScript | Type-safe development |
| Vite | Frontend development and build tool |
| Electron | Desktop application framework |
| CSS | Application styling |
| Local Storage | Local data persistence |
| Electron Builder | Desktop application packaging |

---

## 📸 Application Screens

SpendWise consists of four main sections:

| Screen | Description |
|---|---|
| Dashboard | Overview of income, expenses, and balance |
| Transactions | Manage and review transactions |
| Reports | Visualize financial activity |
| Settings | Manage application preferences |

<!-- Add your application screenshots below -->

### Dashboard
<!-- ![Dashboard](screenshots/dashboard.png) -->

### Transactions
<!-- ![Transactions](screenshots/transactions.png) -->

### Reports
<!-- ![Reports](screenshots/reports.png) -->

### Settings
<!-- ![Settings](screenshots/settings.png) -->

---

## 🚀 Getting Started

Follow these instructions to run SpendWise on your local machine.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/hetjaviya15/SpendWise.git
```

### 2. Navigate to the Project Directory

```bash
cd SpendWise
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Application

**Option A: Start everything with one command**

```bash
npm run electron:dev
```

**Option B: Run using two terminals**

Terminal 1 – Start the Vite development server:

```bash
npm run dev
```

Terminal 2 – Start the Electron desktop application:

```bash
npm run electron
```

The SpendWise desktop application should now launch on your machine.

---

## 📦 Build the Desktop Application

To package SpendWise as a desktop application, run:

```bash
npm run electron:package
```

The generated application packages will be available inside the `release/` directory.

For macOS, the project is configured to generate a DMG installer.

> **Note:** The generated macOS package architecture depends on the build environment. Code signing may also be required for distributing the application to other users.

---

## 📁 Project Structure

```text
SpendWise/
│
├── src/                  # React application source code
│
├── public/               # Static assets
│
├── scripts/              # Development and launch scripts
│
├── electron.js           # Electron main process
│
├── index.html            # Application HTML entry point
│
├── package.json          # Project configuration and scripts
│
├── package-lock.json     # Dependency lock file
│
├── vite.config.ts        # Vite configuration
│
├── tsconfig.json         # TypeScript configuration
│
└── .gitignore            # Git ignored files
```

---

## 🔒 Privacy & Data Storage

SpendWise is designed as a local-first desktop application.

- No account registration is required.
- No external backend is required.
- No third-party AI API is required.
- Financial data is stored locally on the user's device.

Your financial information stays on your device rather than being sent to an external application server.

---

## 🎯 Project Objective

SpendWise was developed as a desktop application project to demonstrate the practical implementation of modern frontend technologies and desktop application development using Electron.

The project focuses on providing a simple and functional personal expense management experience while applying concepts such as component-based architecture, TypeScript, local data persistence, and desktop application packaging.

---

## 🔮 Future Improvements

Some possible enhancements for future versions include:

- Export transactions to CSV or PDF.
- Advanced expense categorization.
- Monthly and yearly financial comparisons.
- Budget limits and spending alerts.
- Backup and restore functionality.
- Improved financial analytics.

---

## 👨‍💻 Author

**Het Javiya**

Second-Year B.Tech Student – Computer Science & Artificial Intelligence

Newton School of Technology, Rishihood University

GitHub: [@hetjaviya15](https://github.com/hetjaviya15)

---

## 📄 License

This project is developed for educational and learning purposes.

---

<p align="center">
  **SpendWise – Track smarter. Spend better.** 💚
</p>
