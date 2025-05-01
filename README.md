# Supabase Google Auth with Custom Username Template

This is a React application that implements Google OAuth authentication using Supabase. After signing in, users can optionally set a custom username, which is saved to their `user_metadata`.

---

## 🔧 Features

- 🔐 Google Sign-in using Supabase Auth
- ✍️ Prompt user to set a unique username (stored in metadata)
- 💾 Persist user sessions across reloads
- 👋 Sign out functionality
- ⚛️ Built with React and Supabase SDK

---

## 🚀 Getting Started

1. **Clone the repo**

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

## 📦 Dependencies

These are the required dependencies based on [Supabase's React Auth Quickstart](https://supabase.com/docs/guides/auth/quickstarts/react):

```bash
npm install @supabase/supabase-js @supabase/auth-ui-react @supabase/auth-ui-shared
