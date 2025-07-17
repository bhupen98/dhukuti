
# Dhukuti — Digital Group Savings Platform

Dhukuti is a web application for creating and managing *group savings circles*, inspired by Nepal’s traditional **Dhukuti** (धुकुटी) system. In a Dhukuti (a type of *rotating savings and credit association*), a community of members regularly contributes funds and takes turns receiving the pooled amount. This platform modernizes that concept by providing an online interface where members can join groups, track contributions, and communicate, all in one place.

## Features

- **Landing Page:** Eye-catching homepage with a “Get Started” call-to-action and “Learn More” buttons to guide new users.
- **Public Navigation:** A responsive top navbar (shown on all public pages) with links to *About*, *Sign Up*, and *Log In* pages.
- **User Registration:** A signup form collecting name, email, password (with confirmation), country (optional), and Terms agreement. The form provides inline feedback for errors (e.g. empty fields, password mismatch) and displays a success message upon completion.
- **Dashboard UI:** After login, users land on a dashboard that organizes group activity:
  - **Top Controls:** Buttons to **Create Group**, **My Groups**, and **Notifications** (implemented with React Icons).
  - **Activity Feed:** A live “game board”-style feed of recent group events, where each item shows a demo avatar (fetched via the Random User API) and a clickable update. This simulates real activity (future work will hook this to a Django backend).
  - **Sidebar Widgets:** On the right side, several card components enhance the user experience:
    - **User Profile Card:** Shows the user’s name and a Boring Avatars avatar (SVG based on their name), along with status badges (e.g. group leader, on-time payer, verified email).
    - **Invite Friends Widget:** Displays a shareable invite link for the current group, with a copy-to-clipboard button.
    - **Group Chat Preview:** Shows a snippet of recent chat messages within the group, with a link to open the full chat.
    - **Help Center Widget:** Provides a link to the help/FAQ page for user support.
- **Visuals:** User avatars and placeholder images are generated using the Boring Avatars library and the Random User Generator API. For example, demo avatars in the feed come from randomuser.me.

## Tech Stack

- **Next.js (App Router)** with TypeScript – the frontend framework (React-based) used for server-side rendering and routing.
- **Tailwind CSS** – a utility-first CSS framework for rapid custom styling.
- **React Icons** – a popular library of SVG icon components.
- **Boring Avatars** – an open-source React library to generate unique SVG avatars from a username.
- **React Avatar** (and similar) – additional avatar/placeholder utilities.
- **Node.js & npm** – required to run the development server.
- **RandomUser.me API** – supplies placeholder user data (names, avatars).
- **Placeholder Images** – sourced from Unsplash for demo backgrounds and illustrations.

## Folder Structure

```
.
├── backend/           # Django REST API backend (in development)
├── frontend/          # Next.js front-end application (TypeScript)
└── README.md          # Project overview (this file)
```

The **frontend** app uses the Next.js App Router. Key directories under `frontend/src/` include:

```
src/
├── app/
│   ├── dashboard/    # Dashboard page and related components
│   ├── signup/       # Signup page
│   ├── terms/        # Terms and Conditions page
│   ├── page.tsx      # Homepage (landing page)
│   └── layout.tsx    # Root layout (includes Navbar component)
└── components/       # Shared UI components (Navbar, cards, widgets, etc.)
```

Each page and component follows a clear structure for maintainability. The **backend** folder contains a Django project (with REST endpoints) that will handle data once integration is complete.

## Setup Instructions

1. **Prerequisites:** Install [Node.js](https://nodejs.org/) (which includes npm). Optionally set up Python/Django if developing the backend.
2. **Install Dependencies:** In the project root, run:
   ```bash
   npm install
   npm run dev
   ```
3. **Run the App:** The Next.js development server starts on `http://localhost:3000`. Navigate there in your browser to view the app.
4. **Image Domains:** If using external images (e.g. from `randomuser.me` or Unsplash), configure `next.config.js` to allow those domains.
5. **Backend (optional):** A Django backend is sketched out in `backend/` but not yet connected. In future, you would run the Django development server and update API endpoints in the front-end.

## Roadmap

Planned features and improvements include:

- **User Authentication:** Implement secure login/signup (e.g. JWT, Clerk) so users can create real accounts.
- **Backend Integration:** Connect the dashboard to the Django REST API for actual data (groups, payments, chat).
- **Group Creation Flow:** Build the *Create Group* page and *Group Details* page to set up and view a savings circle.
- **Contribution Logic:** Add backend logic for tracking member contributions, calculating payouts, and bidding (if applicable).
- **Real-time Updates:** Integrate WebSocket or polling for live chat and activity updates.
- **Deployment/CI:** Prepare production deployment (e.g. Vercel, Heroku) and set up CI/CD pipelines.
- **Additional Pages:** Implement an *About* page and any other informational pages.

*(This roadmap is based on existing TODOs and the current code state as of July 2025.)*

## Contributing

Contributions are welcome! If you find bugs or have feature ideas, please open an issue or submit a pull request on the [GitHub repository](https://github.com/bhupen98/dhukuti). Developers can contribute UI enhancements, backend features, translations, or documentation. 

## License

This project is open source and available under the **MIT License**. You are free to use, modify, and distribute the code under the terms of MIT.

---

*Dhukuti provides a simple web interface for a centuries-old community savings model. By combining modern web technologies (Next.js, Tailwind, etc.) with traditional financial practice, it aims to make group savings easy and transparent.*  
