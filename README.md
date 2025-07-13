# Dhukuti — Digital Group Savings Platform

Dhukuti is a **web-based platform for managing group savings (rotating money circles)** inspired by Nepal’s traditional Dhukuti system.  
Members pool money regularly and take turns receiving the collected amount. Dhukuti adapts this centuries-old savings model into a modern, global-friendly app anyone can use.

---

## Key Features Implemented So Far

- **Hero Homepage:** Eye-catching landing page with **Get Started** and **Learn More** buttons.  
- **Public Navbar:** Responsive top navigation for public visitors with links to About, Signup, and Login.  
- **Signup & Terms:** Signup form with linked Terms and Conditions page.  
- **Dashboard Interface:**  
  - Top buttons for **Create Group**, **My Groups**, and **Notifications**.  
  - Group Activity Feed styled like a GameFAQs board with user avatars and clickable entries.  
  - Right sidebar with User Profile, Invite Friends, Group Chat preview, and Help Center widgets.  
  - Demo user avatars loaded from [randomuser.me](https://randomuser.me).

---

## Tech Stack

- **Next.js (App Router) with TypeScript**  
- **Tailwind CSS** for styling  
- **React Icons & React Avatar** for UI components  
- **Placeholder images** from Unsplash and randomuser.me

---

## Folder Structure

```
src/
 ├── app/
 │    ├── dashboard/       # Dashboard page and related components
 │    ├── signup/          # Signup page
 │    ├── terms/           # Terms and Conditions page
 │    ├── page.tsx         # Homepage
 │    └── layout.tsx       # Root layout with Navbar
 └── components/           # Shared UI components (Navbar, widgets, cards, etc.)
```

---

## Setup Instructions

1. Ensure [Node.js](https://nodejs.org/) is installed.  
2. Run in project root:  
   ```bash
   npm install
   npm run dev
   ```  
3. Visit [http://localhost:3000](http://localhost:3000) to view the app.  
4. Configure `next.config.js` to allow remote images from `randomuser.me` and any other image hosts you use.

---

## Next Steps

- Add user authentication (JWT, Clerk, or other)  
- Connect to backend APIs for real group, user, and chat data  
- Build Create Group and Group Details pages  
- Integrate backend logic for contribution tracking and payouts  
- Prepare deployment scripts and CI/CD pipelines

---

## Contributing

Contributions are welcome! Please open issues or pull requests on GitHub for any bugs, features, or improvements.

---

## License

This project is intended to be open source under the MIT License.

---

*This README reflects the current state of the Dhukuti project as of July 2025, capturing implemented features and future plans.*
