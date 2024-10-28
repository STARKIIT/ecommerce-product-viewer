# ecommerce-product-viewer

# React E-commerce Product Viewer

A modern e-commerce product viewer built with React featuring real-time delivery estimation, dynamic product filtering, and responsive design. This application demonstrates best practices in React development with a focus on user experience and performance.

## Features

- 🛍️ Product listing with grid and list views
- 🔍 Detailed product pages with image galleries
- 🚚 Real-time delivery estimation system
- 📍 Pincode-based delivery provider selection
- ⏲️ Live countdown timers for delivery cutoffs
- 📱 Fully responsive design
- 🛡️ Trust badges and social proof elements
- 🔢 Quantity selection and cart functionality

## Live Demo

View the live application: [E-commerce Product Viewer](https://your-app-name.vercel.app)

## Quick Start

### Prerequisites

- Node.js 16.x or later
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/ecommerce-product-viewer.git
cd ecommerce-product-viewer
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install required shadcn/ui components:
```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add alert
```

4. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

5. Start the development server:
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── components/
│   │   └── ui/
│   └── lib/
├── public/
├── tailwind.config.js
└── next.config.js
```

## Core Components

The application consists of three main components:

1. **ProductListingPage**: Displays the grid of available products
2. **ProductDetailPage**: Shows detailed product information
3. **App**: Main component handling routing between views

## Configuration

### Delivery Provider Rules

Located in the main component, these rules define delivery timeframes:

```javascript
const PROVIDER_RULES = {
  A: { cutoffHour: 17, sameDayEligible: true },
  B: { cutoffHour: 9, sameDayEligible: true },
  general: { minDays: 2, maxDays: 5 }
};
```

### Pincode Database

Defines which delivery provider serves each area:

```javascript
const PINCODE_PROVIDERS = {
  "110001": "A", // Delhi
  "400001": "A", // Mumbai
  "560001": "B", // Bangalore
  "700001": "B", // Kolkata
};
```

## Available Scripts

```bash
# Development
npm run dev       # Start development server
npm run build     # Build for production
npm start         # Start production server
npm run lint      # Run ESLint
```

## Dependencies

- React 18
- Next.js 14
- Tailwind CSS
- shadcn/ui components
- Lucide React (icons)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch:
```bash
git checkout -b feature/AmazingFeature
```
3. Commit your changes:
```bash
git commit -m 'Add some AmazingFeature'
```
4. Push to the branch:
```bash
git push origin feature/AmazingFeature
```
5. Open a Pull Request

## Deployment

### Vercel Deployment

1. Create a Vercel account at [vercel.com](https://vercel.com)
2. Install Vercel CLI:
```bash
npm i -g vercel
```
3. Run deployment:
```bash
vercel
```

### Manual Deployment

1. Build the application:
```bash
npm run build
```
2. Start the production server:
```bash
npm start
```

## Troubleshooting

Common issues and solutions:

1. **Module not found errors**
   - Ensure all dependencies are installed
   - Check import paths are correct
   - Run `npm install` again

2. **Styling issues**
   - Verify Tailwind CSS is properly configured
   - Check for conflicting class names
   - Clear browser cache

3. **Build errors**
   - Clear `.next` folder
   - Delete `node_modules` and run `npm install`
   - Verify Node.js version matches requirements



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---


