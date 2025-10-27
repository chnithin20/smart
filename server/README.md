# Smart Parking - Email Server

Backend email notification server for the Smart Parking application.

## 📋 Features

- Send booking confirmation emails
- Send reminder emails (24h, 1h before booking)
- Send cancellation confirmation emails
- Send payment receipts
- RESTful API endpoints
- CORS enabled for frontend integration

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your email credentials:

```bash
cp .env.example .env
```

Edit `.env`:
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

**For Gmail:**
- Go to https://myaccount.google.com/apppasswords
- Generate an App Password
- Use that password (not your regular Gmail password)

### 3. Start the Server

```bash
npm start
```

Or with auto-reload:
```bash
npm run dev
```

Server will run on `http://localhost:3001`

### 4. Test the Server

```bash
npm test
```

## 📡 API Endpoints

### Health Check
```http
GET /health
```

### Send Email
```http
POST /api/send-email
Content-Type: application/json

{
  "to": "user@example.com",
  "subject": "Test Email",
  "html": "<h1>Hello</h1>",
  "text": "Hello"
}
```

### Send Booking Confirmation
```http
POST /api/send-booking-confirmation
Content-Type: application/json

{
  "to": "user@example.com",
  "confirmationNumber": "ABC123",
  "booking": {
    "level": "level-A",
    "slot": { "number": "23" },
    "date": "2025-10-27",
    "startTime": "10:00 AM",
    "duration": 2,
    "vehicleNumber": "KA01AB1234",
    "price": 200
  }
}
```

## 🔧 Configuration

### Supported Email Services

- Gmail
- Outlook
- Yahoo
- Custom SMTP

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3001 |
| `EMAIL_SERVICE` | Email provider | gmail |
| `EMAIL_USER` | Your email address | - |
| `EMAIL_PASSWORD` | App password | - |

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server with auto-reload
npm run dev

# Run tests
npm test
```

## 📝 Notes

- Never commit `.env` file to version control
- Use App Passwords for Gmail (not regular password)
- Enable "Less secure app access" if using other providers
- Check spam folder if emails don't arrive

## 🐛 Troubleshooting

**Email not sending?**
1. Check `.env` configuration
2. Verify email credentials
3. Check server logs
4. Test with `npm test`

**Gmail authentication error?**
1. Use App Password, not regular password
2. Enable 2-factor authentication
3. Generate new App Password

## 📄 License

MIT
