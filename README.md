# CA Monk Blog Application 🚀

**Developed by [Akhil Kumar Rotta](https://www.linkedin.com/in/rotta-akhil-kumar/)**

A modern, high-performance blog platform built with **React**, **TypeScript**, and **Tailwind CSS**. This application features a responsive design, dynamic content filtering, and a seamless reading experience tailored for finance and technology professionals.

![Project Preview](public/homepage%20scrrenshot.png)

## ✨ Key Features

* **Responsive Design:** Fully optimized layouts for Mobile, Tablet, and Desktop screens.
* **Dynamic Category System:** Interactive category cards (Finance, IT, Business, etc.) that filter content and smoothly scroll users to relevant articles.
* **Immersive Reading Experience:**
    * Clean typography using *Plus Jakarta Sans*.
    * Sticky sidebars for "Related Articles" and "Share" widgets on large screens.
    * Estimated read time and author metadata.
* **Content Creation:** A dedicated "Write a Blog" interface with form validation, image previews, and a focused writing environment.
* **Performance:** Efficient data fetching and caching using **TanStack Query**.
* **Modern UI:** Built with **Shadcn/ui** components and **Lucide** icons for a polished look.

## 🛠️ Tech Stack

* **Frontend Framework:** React (Vite)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **State Management & Data Fetching:** TanStack Query (React Query)
* **Routing:** React Router DOM
* **Icons:** Lucide React
* **UI Components:** Radix UI / Shadcn
* **Mock Backend:** JSON Server

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/camonk-blog.git](https://github.com/your-username/camonk-blog.git)
cd camonk-blog

### 2. Install Dependencies
This project requires Node.js. Install all necessary packages with:

Bash
npm install

### 3. Start the Mock Database
This project uses json-server to simulate a REST API. Open a terminal and run:

Bash
npx json-server --watch db.json --port 3000

### 4. Run the Application
Open a second terminal window and start the React development server:

Bash
npm run dev

The application will be available at http://localhost:5173.

### 📂 Project Structure
src/
├── api/            # API fetch functions (axios/fetch wrappers)
├── components/     # Reusable UI components (Buttons, Inputs, etc.)
├── pages/          # Main Page Views
│   ├── Home.tsx        # Landing page with categories & grid
│   ├── Detail.tsx      # Single blog post view
│   └── CreateBlog.tsx  # Blog submission form
├── App.tsx         # Main Router setup
└── index.css       # Global styles & Tailwind imports

## 🎨 Branding & Customization
Colors: The theme utilizes a clean Black & White aesthetic with vibrant pastel accents for categories.

Typography: The project is configured to use Plus Jakarta Sans for a modern, professional feel.

Logos: Ensure camonk-logo.webp and category icons are placed in the /public folder.

# 🤝 Contributing
Fork the project.

Create your feature branch (git checkout -b feature/AmazingFeature).

Commit your changes (git commit -m 'Add some AmazingFeature').

Push to the branch (git push origin feature/AmazingFeature).

Open a Pull Request.

# 📜 License
Distributed under the MIT License. See LICENSE for more information.

#👨‍💻 Developer
Developed by Akhil Kumar Rotta

# Note: Portions of this project's code structure and UI logic were developed with the assistance of Google Gemini AI to accelerate development and ensure best practices in responsiveness and accessibility.