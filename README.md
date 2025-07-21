
# Dhukuti — Digital Group Savings Platform

Dhukuti is a web application for creating and managing *group savings circles*, inspired by Nepal’s traditional **Dhukuti** (धुकुटी) system. A Dhukuti (a type of *rotating savings and credit association*) is a community where members regularly contribute funds and take turns receiving the pooled amount. This platform modernizes that concept with a clean, Quora-style interface—members can join groups, track contributions, get notifications, and chat, all in one place.

---

## Features

- **Quora-Style UI:** Sticky navbar with logo, notification bell, and avatar dropdown for profile/logout.
- **Secure Authentication:** Signup, login, JWT-based auth, email verification, and password reset via email.
- **Dashboard:**  
  - **+ Create Group:** Blue floating button, always visible at the top.
  - **Group Activity Feed:** Live cards with member avatars and actions.
  - **Sidebar Widgets:** Invite Friends, Group Chat Preview, Help Center.
- **Responsive Design:** Looks great on mobile and desktop.
- **Real Email Support:** Sends real verification and password reset emails using Django backend.
- **Production-ready:** Modern tech stack, easy to deploy.

---

## Tech Stack

- **Frontend:** Next.js (App Router, TypeScript), Tailwind CSS, React Icons, Boring Avatars
- **Backend:** Django, Django REST Framework, PostgreSQL
- **Auth:** JWT (SimpleJWT), email verification, password reset
- **API:** REST endpoints for groups, registration, activity, etc.

---

## Folder Structure

dhukuti/
├── backend/        # Django REST API backend
│   ├── core/
│   ├── manage.py
│   └── ...
├── frontend/       # Next.js frontend (App Router, TypeScript)
│   ├── app/
│   ├── components/
│   └── ...
└── README.md

---

## Setup Instructions

### 1. Backend (Django)
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

- Set up your email credentials in `settings.py` for real verification/password reset emails.

### 2. Frontend (Next.js)
cd frontend
npm install
npm run dev

- Frontend runs at http://localhost:3000

### 3. Open both apps:
- **Backend:** http://localhost:8000/admin/
- **Frontend:** http://localhost:3000

---

## Usage

- **Register** and verify your email to activate your account.
- **Log in** to see your dashboard.
- **Create groups**, invite friends, and manage group savings.
- **Get notifications** in the navbar bell icon.
- **Edit your profile or log out** via the avatar dropdown.

---

## Roadmap

- Real-time chat and notifications (WebSocket)
- Transaction history and analytics
- More group controls and admin features
- Full mobile PWA support

---

## Contributing

Pull requests are welcome! Please [open an issue](https://github.com/bhupen98/dhukuti/issues) for features or bug reports.

---

## License

MIT License

---

*Dhukuti brings the centuries-old community savings model into the digital era with security, transparency, and beautiful design.*
