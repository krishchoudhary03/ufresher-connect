# U-fresher ❤

A cosmic community platform where freshers connect with mentors, join collaborative clubs, and grow together in a safe, AI-moderated environment.

## 🌟 Features

- **Multi-Role Authentication**: Support for Juniors, Mentors, and Admins
- **Google OAuth Integration**: Quick sign-in with Google accounts
- **Admin Panel**: Special admin access with secure admin codes
- **Community Management**: Create and join communities and clubs
- **Real-time Chat**: Interactive chat rooms with live participants
- **AI Content Moderation**: Gemini AI-powered content filtering
- **Responsive Design**: Beautiful cosmic-themed UI that works on all devices
- **Profile Customization**: Choose from multiple profile pictures

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Supabase account
- Vercel account (for deployment)
- Gemini API key (for moderation)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd u-fresher
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in the required values in `.env.local`:
   - `SUPABASE_URL` and `SUPABASE_ANON_KEY` from your Supabase project
   - `ADMIN_CODE` (default: "Createrkkrishavya")
   - `GEMINI_API_KEY` for content moderation

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:8080`

## 🗃️ Database Setup (Supabase)

### Required Tables

Run these SQL commands in your Supabase SQL editor:

```sql
-- Users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  role VARCHAR CHECK (role IN ('admin', 'mentor', 'junior')) NOT NULL,
  profile_pic TEXT,
  age INTEGER,
  college VARCHAR,
  stream VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Communities table
CREATE TABLE communities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Clubs table
CREATE TABLE clubs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  type VARCHAR,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Chat rooms table
CREATE TABLE chat_rooms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR NOT NULL,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Messages table
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  sender_id UUID REFERENCES users(id),
  room_id UUID REFERENCES chat_rooms(id),
  flagged BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Posts table
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  user_id UUID REFERENCES users(id),
  community_id UUID REFERENCES communities(id),
  club_id UUID REFERENCES clubs(id),
  flagged BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Community memberships
CREATE TABLE community_members (
  user_id UUID REFERENCES users(id),
  community_id UUID REFERENCES communities(id),
  joined_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (user_id, community_id)
);

-- Club memberships
CREATE TABLE club_members (
  user_id UUID REFERENCES users(id),
  club_id UUID REFERENCES clubs(id),
  joined_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (user_id, club_id)
);
```

### Row Level Security (RLS)

Enable RLS and create policies:

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Users can read all users but only update their own profile
CREATE POLICY "Public profiles" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Communities are public to read, but only authenticated users can create
CREATE POLICY "Public communities" ON communities FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create communities" ON communities FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Similar policies for clubs, chat_rooms, messages, and posts
CREATE POLICY "Public clubs" ON clubs FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create clubs" ON clubs FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Public chat rooms" ON chat_rooms FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create chat rooms" ON chat_rooms FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Messages can be read by anyone in the chat room, created by authenticated users
CREATE POLICY "Chat room messages" ON messages FOR SELECT USING (true);
CREATE POLICY "Authenticated users can send messages" ON messages FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Posts follow similar pattern
CREATE POLICY "Public posts" ON posts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create posts" ON posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

## 🔑 Authentication Setup

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add your domain to authorized domains
6. In Supabase, go to Authentication → Settings → Auth Providers
7. Enable Google and add your Client ID and Secret

### Admin Code Security

The admin code is set in environment variables. To rotate it:

1. Update `ADMIN_CODE` in your environment variables
2. Redeploy your application
3. Inform current admins of the new code

**Important**: Never commit the admin code to your repository!

## 🤖 AI Moderation Setup

### Gemini AI Integration

1. Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add it to your environment variables as `GEMINI_API_KEY`
3. The moderation system will automatically flag inappropriate content
4. Admins can review and approve/reject flagged content

### Moderation Features

- **Automatic Filtering**: All posts and messages are checked for inappropriate content
- **Admin Review**: Flagged content requires admin approval
- **Toggle Moderation**: Admins can temporarily disable moderation
- **Custom Keywords**: Extend the filtering system with custom inappropriate words

## 🚀 Deployment

### Deploy to Vercel

1. **Connect to Vercel**
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

2. **Set Environment Variables**
   In your Vercel dashboard, go to Settings → Environment Variables and add:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `ADMIN_CODE`
   - `GEMINI_API_KEY`

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Custom Domain Setup

1. In Vercel dashboard, go to your project
2. Navigate to Settings → Domains
3. Add your custom domain
4. Update your DNS records as instructed
5. SSL certificates are automatically provisioned

## 👥 User Roles & Permissions

### Junior (Student)
- ✅ Join communities and clubs
- ✅ Create one chat room
- ✅ Send messages and posts
- ✅ Find and connect with mentors
- ✅ Edit own profile

### Mentor
- ✅ All Junior permissions
- ✅ View connected students
- ✅ Moderate own chat rooms (if enabled)
- ✅ Create multiple chat rooms

### Admin
- ✅ All Mentor permissions
- ✅ Create and manage communities
- ✅ View all members and activity
- ✅ Moderate flagged content
- ✅ Toggle moderation features
- ✅ Access analytics dashboard
- ✅ Secure login with admin code

## 🔧 Configuration

### Theme Customization

The app uses a cosmic theme with glassmorphism effects. You can customize colors in `src/index.css`:

```css
:root {
  --primary: 217 91% 59%;
  --secondary: 263 70% 50%;
  --accent: 280 100% 70%;
  /* ... other variables */
}
```

### Animation Settings

Animations can be customized in `tailwind.config.ts`:

```typescript
animation: {
  "fade-in": "fade-in 0.6s ease-out",
  "cosmic-pulse": "cosmic-pulse 3s ease-in-out infinite",
  // ... other animations
}
```

## 🛡️ Security

### Best Practices

- ✅ Environment variables for sensitive data
- ✅ Row Level Security (RLS) in Supabase
- ✅ Input validation and sanitization
- ✅ Admin code rotation capability
- ✅ Content moderation with AI
- ✅ Secure authentication with OAuth

### Security Checklist

- [ ] Admin code is set in environment variables
- [ ] RLS policies are properly configured
- [ ] Google OAuth is set up with correct redirect URLs
- [ ] Gemini API key is secure
- [ ] All user inputs are validated
- [ ] Content moderation is active

## 🐛 Troubleshooting

### Common Issues

**Issue**: "Invalid admin code" error
**Solution**: Check that `ADMIN_CODE` environment variable matches the code being entered

**Issue**: Google OAuth not working
**Solution**: Verify redirect URLs in Google Console match your domain

**Issue**: Supabase connection errors
**Solution**: Check `SUPABASE_URL` and `SUPABASE_ANON_KEY` are correct

**Issue**: Moderation not working
**Solution**: Verify `GEMINI_API_KEY` is set and valid

### Debug Mode

To enable debug logging, set:
```bash
NODE_ENV=development
```

## 📞 Support

- **Documentation**: [U-fresher Docs](#)
- **Community**: Join our Discord server
- **Issues**: [GitHub Issues](#)
- **Email**: support@u-fresher.com

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ using React, TypeScript, Tailwind CSS
- Powered by Supabase for backend services
- AI moderation by Google Gemini
- Hosted on Vercel

---

**U-fresher ❤** - Where learning meets community in a cosmic environment! 🌌
