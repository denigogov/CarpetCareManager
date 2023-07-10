# CarpetCareManager

CarpetCareManager is a carpet cleaning service management app designed to streamline and optimize the operations of carpet cleaning businesses. It provides an intuitive user interface and powerful features to simplify order management, track inventory, and monitor business performance.

**Please note:** The project is currently under development. While it's a work in progress, the provided GIF demonstrates the initial functionality and user interface design.

<p align="center">
  <img src="./luxyCo%20Client/src/assets/demoApp.gif.gif" alt="App gif" width="500px" />
</p>

## Purpose

CarpetCareManager aims to:

- Simplify order creation, tracking, and assignment to workers.
- Manage inventory and stock levels of cleaning equipment and supplies.
- Provide insights into business performance through analytics and reporting.

## Project Structure

This project follows a monorepo-like structure to manage the front-end and back-end code within the same repository. While no specific monorepo tool is used, the project is organized in the following manner:

- The **luxyCo Client directory** contains the front-end code.
- The **luxyCo Server directory** contains the back-end code.
- To start both the front-end and back-end simultaneously, run the following command from the root directory:

```bash
pnpm run dev
```

This command **installs the necessary dependencies** for both projects and starts their respective servers concurrently.

The frontend will be available at `http://localhost:3000/`, while the backend will be accessible at `http://localhost:4001/`.

**Please note** that this setup does not rely on dedicated monorepo tools like Lerna or Yarn Workspaces. It offers a basic monorepo structure and can be expanded upon as the project evolves.

<div style="text-align:center; padding: 20px;" 
<img src="./luxyCo%20Client//src/assets/Recording%202023-06-30%20123141.gif" alt="App gif" width="400px" />
</div>
