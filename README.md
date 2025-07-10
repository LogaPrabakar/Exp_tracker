# Expense Tracker App

A modern, feature-rich expense tracking application built with React, TypeScript, and Tailwind CSS. Track your daily expenses, categorize them, and get insights into your spending patterns with year-wise and month-wise breakdowns.

## ✨ Features

- **📊 Year-wise Expense Tracking**: View your expenses organized by year with detailed monthly breakdowns
- **📅 Month-wise Analysis**: Click on any month to see all expenses with categories and amounts
- **💰 Indian Rupee Support**: All amounts displayed in Indian Rupees (₹)
- **🏷️ Category Management**: Organize expenses into predefined categories
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **💾 Local Storage**: Your data is saved locally in your browser
- **🎨 Modern UI**: Beautiful, intuitive interface with smooth animations

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd expense-tracker-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Built With

- **React 18** - Frontend framework
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server
- **Lucide React** - Beautiful icons
- **Local Storage** - Data persistence

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── AddExpenseModal.tsx
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   └── YearlyExpenseView.tsx
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   ├── auth.ts
│   └── expenses.ts
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## 🎯 Usage

### Adding Expenses
1. Click the "Add New Expense" card on the dashboard
2. Fill in the expense details (title, amount, category, date)
3. Optionally add a description
4. Click "Add Expense" to save

### Viewing Yearly Overview
1. Click the "View Yearly" card on the dashboard
2. Navigate between years using the arrow buttons
3. Click on any month to see detailed expenses for that month

### Managing Expenses
- **Delete**: Hover over an expense and click the delete button
- **Categories**: Expenses are automatically categorized and color-coded
- **Search**: Use the yearly view to find expenses by month and year

## 🎨 Features in Detail

### Expense Categories
- Food & Dining
- Transportation
- Shopping
- Entertainment
- Bills & Utilities
- Healthcare
- Travel
- Education
- Other

### Currency Formatting
All amounts are displayed in Indian Rupees (₹) with proper formatting:
- ₹1,000 (no decimal places for cleaner display)
- Automatic thousand separators
- Consistent formatting across the application

### Data Persistence
- All data is stored in your browser's local storage
- No external database required
- Data persists between browser sessions
- Private and secure

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Tailwind CSS for styling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by the need for simple, effective expense tracking
- Designed for the Indian market with rupee support

---

**Note**: This is a client-side application. All data is stored locally in your browser. Make sure to backup your data if needed. 