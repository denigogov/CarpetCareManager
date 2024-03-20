# CarpetCareManager

CarpetCareManager is a comprehensive carpet cleaning service management app designed to optimize the operations of carpet cleaning businesses. With an intuitive user interface and powerful features, it simplifies order management, tracks inventory, and provides valuable insights into business performance.



**Project Status:** This project is currently under development. While it's a work in progress, you can access the live version of the application [here](https://carpetcaremanager.onrender.com/).

To access the live app, please use the following login credentials:

- **Username:** demo
- **Password:** demo123

Please note that this is a development version, and the login credentials are provided for testing purposes.



<p align="center">

  <img src="./luxyCo%20Client/src/assets/demoApp.gif" alt="App gif" width="500px" />

## Purpose

CarpetCareManager aims to achieve the following objectives:

- **Streamlined Order Management**: Simplify the process of order creation, tracking, and assignment to workers. The app provides an efficient way to manage all carpet cleaning orders, ensuring timely completion and customer satisfaction.

- **Inventory Control**: Effectively manage inventory and stock levels of cleaning equipment and supplies. Keep track of available resources to ensure smooth operations and timely restocking when needed.

- **Business Performance Insights**: CarpetCareManager offers comprehensive analytics and reporting features that provide valuable insights into the business's performance. Monitor key metrics, such as total orders, monthly orders, revenue generated, and the busiest times of the week or month.

## Features

CarpetCareManager comes equipped with a range of powerful features to streamline carpet cleaning businesses:

1. **Dashboard**: Upon login, users are presented with a feature-rich dashboard. It includes a calculator to quickly calculate the area (m2) of carpets based on length and width inputs. The dashboard also showcases LineCharts with various statistics, such as total orders, monthly orders, m2 of carpets cleaned, and total earnings. These visual representations help users track business performance at a glance.

2. **Order Management**: The app provides a user-friendly interface to manage all orders efficiently. Users can view all orders for the current day, and the app automatically categorizes them as "In Progress" or "Pending" based on the scheduled date. The order table is searchable by date, status, and customer name, enabling quick access to specific orders. Moreover, users can download all orders for a selected date in PDF format.

3. **Order Creation Wizard**: Creating a new order is a seamless process through the three-step wizard. Step 1 involves entering the size of the carpet in m2, selecting the desired service (e.g., Premium Cleaning), and specifying if delivery is needed. In Step 2, users can add existing customers or create new ones. The app automatically checks for duplicate customer information based on phone numbers. Step 3 allows users to select the scheduled date for carpet cleaning, facilitating better task organization.

4. **Delivery Management**: This feature enables users to manage and track deliveries with ease. By searching for orders using the order number, users can access detailed information about the order. They can update the order status, search orders by date range, and download customer order history as a PDF. This ensures seamless coordination and transparency in the delivery process.

5. **User Management**: The management section is accessible only to the owner, ensuring security and control. Owners can add new users with different credentials, such as owner or production roles. They can also edit user information or delete users as needed.

## Installation and Setup

To run CarpetCareManager locally, follow these steps:

1. Import the provided MySQL database in Workbench or any suitable tool.

2. Create a `.env` file in the `Server` folder and specify the necessary credentials (see `.env.sample` for reference).

3. Ensure that PNPM is installed globally on your machine. If not installed, follow the instructions on [PNPM's website](https://pnpm.io/) to install it.

4. This project follows a monorepo-like structure to manage the front-end and back-end code within the same repository. While no specific monorepo tool is used, the project is organized in the following manner:
   - The **luxyCo Client directory** contains the front-end code.
   - The **luxyCo Server directory** contains the back-end code.
   - To start both the front-end and back-end simultaneously, run the following command from the root directory:

```bash
pnpm run dev
```

This command **installs the necessary dependencies** for both projects and starts their respective servers concurrently.
The frontend will be available at `http://localhost:3000/`, while the backend will be accessible at `http://localhost:4000/`.

**Please note** that this setup does not rely on dedicated monorepo tools like Lerna or Yarn Workspaces. It offers a basic monorepo structure and can be expanded upon as the project evolves.

## Technologies Used

**Front-end (Client)**:

- React
- React Router
- Chart.js for interactive and visually appealing charts
- React PDF for generating PDF documents
- Sass for organized and maintainable styles
- SWR for efficient data fetching and state synchronization

**Back-end (Server)**:

- Node.js with Express
- MySQL2 for efficient database operations
- Argon2 for secure password hashing
- JSON Web Token (JWT) for user authentication and secure session management
- Cors for enabling Cross-Origin Resource Sharing
- Joi for data validation
- Express Validator for further request data validation

## Contributing

We welcome contributions to improve CarpetCareManager. If you encounter any issues or have suggestions, feel free to open an issue or submit a pull request.

## License

CarpetCareManager is released under the ISC License.

This README.md is for the app's phase 2 completion. The app is approximately 70% complete, and the remaining features (Users, Analytics, Expenses, Prices, Inventory) will be implemented in phase 3.
