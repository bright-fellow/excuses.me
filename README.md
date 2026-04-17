# excuses.me

An AI-powered excuse generator that creates convincing, culturally-appropriate excuses in multiple languages and regional dialects. Perfect for when you need to get out of that awkward situation with style.

![excuses.me](https://img.shields.io/badge/Status-Live-brightgreen) ![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black) ![Next.js](https://img.shields.io/badge/Framework-Next.js-black) ![AI](https://img.shields.io/badge/Powered%20by-Groq-blue)

## 🌟 Features

### 🎭 Multiple Tones & Styles
- **Apologetic**: Sincere remorse
- **Funny**: Self-deprecating humor
- **Professional**: Corporate-appropriate
- **Dramatic**: Over-the-top theatrical
- **Creative**: Wildly inventive

### 📏 Length Options
- **Short**: 1-2 sentences
- **Medium**: 3-4 sentences
- **Long**: 5-7 sentences with details

### 🌍 Regional Dialects

#### 🇺🇸 United States
- General US, New York, Los Angeles, Deep South, Midwest, Texas, New England

#### 🇬🇧 United Kingdom
- General UK, London (RP), Cockney, Manchester, Leeds, Liverpool, Scotland, Wales, Posh

#### 🇦🇹 Austria (9 Bundesländer)
- Allgemein, Wien, Tirol, Steiermark, Salzburg, Vorarlberg, Burgenland, Kärnten, Niederösterreich, Oberösterreich

#### 🇨🇭 Switzerland (13 Kantone)
- Allgemein, Zürich, Bern, Basel, Genf (French), Wallis, Tessin (Italian), Graubünden (Romansh), Luzern, St. Gallen, Thurgau, Zug, Aargau

### 🎯 Smart Features
- **Location Detection**: Automatically detects browser language/timezone for default settings
- **Collapsible Options**: Clean UI with tag display for selected settings
- **Instant Generation**: Powered by Groq's Llama 3.3 70B model
- **No Account Required**: Free to use, no data stored

## 🚀 Live Demo

Visit [excuses.me](https://excusesme.vercel.app) to try it out!

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React, CSS Modules
- **AI**: Groq API (Llama 3.3 70B Versatile)
- **Deployment**: Vercel
- **Analytics**: Google Analytics 4, Meta Pixel, TikTok Pixel, Snapchat Pixel
- **Ads**: Google AdSense
- **Styling**: Custom CSS with Geist font

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/excuses-nextjs.git
   cd excuses-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your API keys:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   NEXT_PUBLIC_GA4_ID=your_ga4_measurement_id
   NEXT_PUBLIC_ADSENSE_ID=your_adsense_publisher_id
   # ... other ad/analytics IDs
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

## 🏗️ Build & Deploy

### Local Build
```bash
npm run build
npm run start
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

## 📖 Usage

1. **Enter your situation**: Type what you need an excuse for
2. **Customize options**: Click "Show options" to select tone, length, and regional style
3. **Generate**: Click the generate button
4. **Copy & use**: Copy the excuse and deliver it

### API Usage

The app uses a simple API endpoint:

```javascript
const response = await fetch('/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    system: 'Your system prompt',
    user: 'Your situation'
  })
});
```

## 🎨 UI/UX Design

- **Clean Interface**: Minimalist design with focus on functionality
- **Responsive**: Works on desktop and mobile
- **Accessible**: Proper contrast and keyboard navigation
- **Fast**: Optimized for quick generation

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Adding New Regions/Dialects

1. Add to `REGIONS` object in `app/page.jsx`
2. Add corresponding prompt in `CULTURE_PROMPTS`
3. Update `REGION_LABEL` if needed
4. Test the new dialect output

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Powered by [Groq](https://groq.com) for fast AI inference
- Built with [Next.js](https://nextjs.org)
- Deployed on [Vercel](https://vercel.com)
- Fonts by [Vercel](https://vercel.com/font)

---

**Made with ❤️ for those "oops" moments**
# excuses.me
