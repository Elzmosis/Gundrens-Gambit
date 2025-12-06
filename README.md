# Gundren's Gambit

A fantasy campaign journal and character tracker for tabletop RPG adventures. Built with a dark medieval aesthetic, this app lets you chronicle your party's adventures, manage character information, and track important NPCs.

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Features

- 📜 **Campaign Journal** - Record and edit session notes and story developments
- ⚔️ **Player Character Tracker** - Manage your party with character cards, portraits, and descriptions
- 👥 **NPC Directory** - Keep track of important non-player characters
- 🔐 **Admin Mode** - Password-protected editing (default: "dragon")
- 💾 **Local Storage** - All data persists in your browser
- 🎨 **Medieval Theme** - Dark, atmospheric design with custom fonts

## Live Demo

Visit the live site: [https://YOUR-USERNAME.github.io/Gundrens-Gamit/](https://YOUR-USERNAME.github.io/Gundrens-Gamit/)

## Local Development

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR-USERNAME/Gundrens-Gamit.git
cd Gundrens-Gamit

# Install dependencies
npm install

# Start development server
npm run dev:client
```

The app will be available at `http://localhost:5000`

## Scripts

- `npm run dev:client` - Start Vite dev server for client
- `npm run build:static` - Build for static deployment (GitHub Pages)
- `npm run preview` - Preview production build locally
- `npm run check` - Run TypeScript type checking

## Usage

### Editing Content

1. Click the **wax seal** icon in the header
2. Enter password: `dragon`
3. Click anywhere to edit text, add entries, or manage characters
4. Click the seal again to lock editing

### Adding Journal Entries

- In admin mode, click the **+** button on the home page
- Edit the title, date, and content
- Upload an optional image

### Managing Characters

- Navigate to **PCs** or **NPCs** pages
- In admin mode, click **"Recruit Hero"** or **"Record Person"**
- Fill in character details and upload portraits
- Edit or delete characters as needed

## Deployment

The app automatically deploys to GitHub Pages when you push to the `main` branch.

### Manual Setup

1. Go to your repository Settings → Pages
2. Source: **GitHub Actions**
3. Push to `main` branch to trigger deployment

### Custom Domain (Optional)

Add a `CNAME` file to the `client/public/` folder with your domain name.

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS 4** - Styling
- **Wouter** - Client-side routing
- **Radix UI** - Accessible components
- **Lucide React** - Icons

## Customization

### Changing the Admin Password

Edit `client/src/components/layout.tsx`:

```tsx
if (passwordInput === "dragon") {  // Change "dragon" to your password
```

### Modifying Theme Colors

Edit `client/src/index.css` to customize the color palette.

### Custom Fonts

The app uses:
- **Cinzel Decorative** for headings
- **Cormorant Garamond** for body text

These are loaded via Google Fonts in `client/index.html`.

## License

MIT License - feel free to use this for your own campaigns!

## Acknowledgments

- Map image from Forgotten Realms
- Built for D&D 5e and similar TTRPG campaigns
