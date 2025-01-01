1.# Portfolio Tracker Frontend

This is the frontend of the **Portfolio Tracker** application, built using React. It allows users to interact with their stock portfolio, view key portfolio metrics, and manage stock holdings.

## Features
- View the **dashboard** showing portfolio metrics like total value and top-performing stock.
- **Add, edit, and delete** stock holdings.
- Display a **list of current stock holdings** with stock details (e.g., stock name, ticker, quantity, buy price).
- Track portfolio value based on **real-time stock prices**.

## Prerequisites
Ensure you have the following installed:
- **Node.js** - To run and build the React application.
- **npm** or **yarn** (npm comes with Node.js by default).

## Setup Instructions

### 1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio-tracker-frontend.git
cd portfolio-tracker-frontend


2.  Install dependencies:
npm install
or if you're using yarn:yarn install

3. Run the development server:
npm start
or if you're using yarn:
yarn start
The frontend will be accessible at  http://localhost:3000 in your browser.


4. API Integration:

1.The frontend interacts with the backend API for CRUD operations on stock holdings.
2.Ensure the backend server is running and accessible.

5. Build the application for production:
npm run build
This will create a production-ready build in the build folder.

6.UI Design:
Responsive design: The app is designed to be responsive and should work on both desktop and mobile devices


7.Deployment:
Deployed Frontend Link: https://simpleportfoliotracker.netlify.app/

8.Assumptions & Limitations
The portfolio initially includes 5 random stocks, each with a quantity of 1.
The real-time stock prices are fetched from a third-party stock price API (e.g., Alpha Vantage, Yahoo Finance, or Finnhub).
There may be a rate limit on stock price updates based on the API used.


9.API Endpoints:
The frontend communicates with the following backend endpoints:
GET /stocks: Fetch all stocks in the portfolio.
POST /stocks: Add a new stock.
PUT /stocks/{id}: Update stock details.
DELETE /stocks/{id}: Remove a stock from the portfolio.









