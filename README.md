# Smart Parking Dashboard

A comprehensive parking management system built with React, designed to streamline parking operations for modern malls and commercial complexes. Features real-time monitoring, automated booking systems, and advanced analytics for parking facility managers.

![Smart Parking Dashboard](https://img.shields.io/badge/React-19.2.0-blue) ![Node.js](https://img.shields.io/badge/Node.js-Latest-green) ![Socket.io](https://img.shields.io/badge/Socket.io-Real--time-orange) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.1-blue)

## 🚀 Features

### Core Functionality
- **🔐 User Authentication**: Secure login/registration with role-based access
- **🅿️ Smart Booking**: Multi-location parking booking with real-time availability
- **📊 Real-time Dashboard**: Live parking maps and occupancy monitoring
- **👨‍💼 Admin Panel**: Comprehensive management interface
- **📱 QR Verification**: Digital entry system for parking validation
- **📈 Analytics & Reports**: Detailed reporting with export capabilities
- **💳 Payment Integration**: Secure payment processing
- **🔔 Notifications**: Real-time alerts and updates

### Technical Highlights
- **Real-time Updates**: WebSocket integration for live data synchronization
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **AI Predictions**: 2-hour parking trend forecasting
- **Multi-location Support**: 4 premium mall locations in Hyderabad
- **Export Functionality**: CSV and Excel report generation

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 19.2.0 with Hooks and Context API
- **Styling**: Tailwind CSS for responsive design
- **Real-time**: Socket.io for live updates
- **Icons**: Lucide React for consistent iconography
- **Charts**: Recharts for data visualization
- **PDF Generation**: jsPDF with autoTable for receipts
- **QR Codes**: QRCode.react for booking verification

### Project Structure
```
smart-parking-dashboard/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── ParkingLevel.jsx
│   │   └── ...
│   ├── pages/              # Main application pages
│   │   ├── Dashboard.jsx
│   │   ├── Booking.jsx
│   │   ├── Admin.jsx
│   │   ├── Reports.jsx
│   │   └── ...
│   ├── context/            # React Context providers
│   │   ├── AuthContext.jsx
│   │   ├── ParkingContext.jsx
│   │   └── ThemeContext.jsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useParkingData.js
│   │   └── useSocket.js
│   ├── services/           # API service functions
│   ├── utils/              # Utility functions
│   │   └── validation.js
│   ├── api/                # API configuration
│   └── assets/             # Static assets
├── server/                 # Backend server (if applicable)
├── package.json
├── tailwind.config.js
└── README.md
```

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Modern web browser with JavaScript enabled

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/smart-parking-dashboard.git
cd smart-parking-dashboard
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
REACT_APP_API_BASE_URL=http://localhost:3001/api
REACT_APP_SOCKET_URL=http://localhost:3001
REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_key_here
```

### 4. Start the Development Server
```bash
npm start
```

The application will be available at `http://localhost:3000`

### 5. Build for Production
```bash
npm run build
```

## 📖 Usage Guide

### For Users

1. **Registration**: Create an account with email and password
2. **Login**: Access your dashboard with credentials
3. **Book Parking**:
   - Select a mall location
   - Choose date, time, and duration
   - Pick an available parking slot
   - Enter vehicle and contact details
   - Complete payment
4. **Manage Bookings**: View, download receipts, and track booking history
5. **Parking Entry**: Present QR code at the entrance for automatic validation

### For Administrators

1. **Dashboard Overview**: Monitor real-time parking status and KPIs
2. **User Management**: View and manage user accounts
3. **Booking Management**: Oversee all parking bookings and reservations
4. **Parking Management**: Control parking levels and slot configurations
5. **Revenue Analytics**: Track financial performance and generate reports
6. **System Monitoring**: Check system health and perform maintenance
7. **QR Verification**: Use the scanner for entry validation

## 🔧 Configuration

### Parking Locations
The application supports 4 mall locations in Hyderabad:
- Inorbit Mall (Madhapur)
- The Forum Sujana Mall (Kukatpally)
- GVK One Mall (Banjara Hills)
- Sarath City Capital Mall (Gachibowli)

### Pricing Structure
- Base rate: ₹50 per hour
- Vehicle types: Car and SUV
- Duration options: 1-24 hours
- Advance booking: Up to 3 years

### System Settings
- Real-time update intervals
- Notification preferences
- Payment gateway configuration
- Security settings

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage --watchAll=false

# Run tests in CI mode
npm test -- --watchAll=false --passWithNoTests
```

## 📦 Deployment

### Using Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `build`
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Using Netlify
1. Build the project: `npm run build`
2. Upload the `build` folder to Netlify
3. Configure redirects for SPA routing

### Manual Deployment
```bash
# Build the application
npm run build

# Serve the build folder using any static server
# Example with serve:
npx serve -s build -l 3000
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

### Development Guidelines
- Follow React best practices and hooks patterns
- Use TypeScript for type safety (planned)
- Maintain consistent code formatting with ESLint
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📄 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

### Parking Endpoints
- `GET /api/parking/levels` - Get parking levels
- `GET /api/parking/slots/:levelId` - Get slots for a level
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get user bookings

### Admin Endpoints
- `GET /api/admin/users` - Get all users
- `GET /api/admin/bookings` - Get all bookings
- `GET /api/admin/revenue` - Get revenue data
- `POST /api/admin/qr-verify` - Verify QR code

## 🐛 Troubleshooting

### Common Issues

**Application not starting**
- Ensure Node.js v16+ is installed
- Clear node_modules: `rm -rf node_modules && npm install`
- Check for port conflicts on 3000

**Real-time updates not working**
- Verify Socket.io server is running
- Check WebSocket connection in browser dev tools
- Ensure correct SOCKET_URL in environment variables

**Payment integration issues**
- Verify Stripe keys are correctly set
- Check payment gateway configuration
- Ensure HTTPS in production

**Build failures**
- Clear build cache: `rm -rf build && npm run build`
- Update dependencies: `npm update`
- Check for deprecated packages

## 📞 Support

For support and questions:
- 📧 Email: support@smartparking.com
- 📱 Phone: +91-XXXXXXXXXX
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/smart-parking-dashboard/issues)
- 📖 Documentation: [Wiki](https://github.com/your-username/smart-parking-dashboard/wiki)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React community for excellent documentation
- Tailwind CSS for the amazing utility-first framework
- Lucide React for beautiful icons
- Socket.io for real-time capabilities
- All contributors and users of this project

---

**Built with ❤️ for efficient parking management**
