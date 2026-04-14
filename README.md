# HackHilis - Cybersecurity Strategy Game

A multiplayer web-based game where players take on the role of cybersecurity experts in a dog-eat-dog world. Build your skills, hack other players, form alliances, and work towards the ultimate goal of taking down the Hilis organization.

## 🎮 Game Features

### Core Gameplay
- **Character Progression**: Start with basic skills and money, level up through experience
- **Skill Development**: Learn hacking, networking, cryptography, social engineering, forensics, and malware
- **Equipment System**: Buy laptops, routers, VPNs, and hacking tools to improve your capabilities
- **Education System**: Take courses and exams to improve your skills and earn certifications

### Economy & Career
- **Money Management**: Earn money through hacking, jobs, and contracts
- **Job System**: Work for cybersecurity companies or freelance
- **Store**: Purchase equipment and tools to enhance your hacking abilities

### Social Features
- **Alliance System**: Create or join alliances with other players
- **PvP Hacking**: Target other players in the game world
- **Reputation System**: Build your reputation through successful hacks and achievements

### End Game
- **Hilis Target**: The ultimate goal is to hack the Hilis organization (contains everyone's data)
- **Alliance Cooperation**: Team up with other players to take down the final boss
- **Game Reset**: Once Hilis is hacked, the game resets with new challenges

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hackhilis
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   ```bash
   cp server/.env.example server/.env
   # Edit server/.env with your MongoDB connection string
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start both the React frontend (port 3000) and Node.js backend (port 5000).

### Alternative Setup

**Frontend only:**
```bash
cd client
npm install
npm start
```

**Backend only:**
```bash
cd server
npm install
npm run dev
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI framework
- **React Router** - Client-side routing
- **Styled Components** - CSS-in-JS styling
- **Framer Motion** - Animations
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Rate Limiting** - API protection

## 🎯 Game Mechanics

### Skills System
- **Hacking**: Core skill for successful attacks
- **Networking**: Understanding of network protocols and security
- **Cryptography**: Encryption and decryption abilities
- **Social Engineering**: Psychological manipulation techniques
- **Forensics**: Digital investigation and evidence analysis
- **Malware**: Malicious software creation and analysis

### Equipment Types
- **Laptops**: Primary computing power and hacking capability
- **Routers**: Network access and range
- **VPN Services**: Anonymity and security
- **Hacking Tools**: Specialized software and hardware

### Progression
- Gain experience through successful hacks and completed courses
- Level up to unlock new targets and equipment
- Earn money to purchase better gear
- Build reputation to join elite alliances

## 🎨 UI/UX Design

The game features a cyberpunk aesthetic with:
- Dark color scheme with neon green accents
- Matrix-style animations and effects
- Glitch effects for cyberpunk atmosphere
- Responsive design for all screen sizes
- Intuitive navigation and user experience

## 🔧 Development

### Project Structure
```
hackhilis/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # Game state management
│   │   └── App.js         # Main app component
│   └── package.json
├── server/                # Node.js backend
│   ├── server.js          # Main server file
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

### Available Scripts
- `npm run dev` - Start both frontend and backend
- `npm run client` - Start only the React frontend
- `npm run server` - Start only the Node.js backend
- `npm run build` - Build the React app for production
- `npm run install-all` - Install dependencies for all packages

## 🚧 Future Features

- Real-time multiplayer functionality
- Advanced hacking mini-games
- More detailed equipment stats
- Guild wars and territory control
- Mobile app version
- Tournament system
- Achievement system expansion

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎮 How to Play

1. **Create Account**: Register with a username and email
2. **Learn Skills**: Take courses to improve your abilities
3. **Buy Equipment**: Visit the store to upgrade your gear
4. **Start Hacking**: Target other players and organizations
5. **Join Alliance**: Team up with other hackers
6. **Take Down Hilis**: Work with your alliance to hack the ultimate target

---

**Welcome to the cyber underworld. Your journey as a hacker begins now.**



