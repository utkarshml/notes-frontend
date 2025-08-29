# Note Taker

A modern, full-stack note-taking web application built with React and TypeScript. This frontend application provides an intuitive interface for creating, managing, and organizing your notes with a clean, responsive design.

## 🛠️ Tech Stack

<div align="center">

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

</div>



## ✨ Features

- **Dark Mode**: Toggle between light and dark themes for comfortable viewing
- **Multiple Authentication Options**: 
  - OTP-based login for secure access
  - Google OAuth integration for quick sign-in
- **Complete Note Management**:
  - Create notes with title, content, and custom tags
  - Pin important notes to keep them at the top
  - Unpin/Pin notes anytime for better organization
  - Delete notes when no longer needed
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Fast Performance**: Built with Vite for lightning-fast development and builds
- **Type Safety**: Full TypeScript support for better code quality and developer experience

## 🛠️ Technologies Used

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Development**: Hot Module Replacement (HMR)

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js (version 16 or higher)
- npm or yarn package manager

**Install Node.js with nvm** (recommended):
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use the latest LTS version of Node.js
nvm install --lts
nvm use --lts
```

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/utkarshml/notes-frontend.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd notes-frontend
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

## 📝 Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 🎨 Development

Clone this repository and work with your preferred IDE:

```bash
# Clone the repository
git clone https://github.com/utkarshml/notes-frontend.git

# Navigate to project directory
cd notes-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

You can also edit files directly in GitHub using the edit button (pencil icon) or use GitHub Codespaces for a cloud-based development environment.

## 🌍 Deployment

Build the project for production:

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

## 📁 Project Structure

```
note-taker/
├── public/                 # Static assets
├── src/                   # Source code
│   ├── components/        # Reusable UI components
│   ├── pages/            # Application pages
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript type definitions
│   ├── services/         # API services and auth
│   └── styles/           # Global styles
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── vite.config.ts        # Vite configuration
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Utkarsh** - [@utkarshml](https://github.com/utkarshml)

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/) and [Vite](https://vitejs.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Authentication powered by Google OAuth and OTP services

---

⭐ **Star this repository if you found it helpful!**