
# Ashima Empowers - HTML Export

This is a complete HTML export of the Ashima Empowers astrology website. The React/Next.js application has been converted to static HTML, CSS, and JavaScript while maintaining the exact same appearance and functionality.

## Files Included

- `index.html` - Main HTML file containing all the website content
- `styles.css` - Complete CSS with all styles, animations, and responsive design
- `script.js` - JavaScript for interactivity, animations, and form handling

## Features

✨ **Complete Website Sections:**
- Hero section with floating animations
- About Ashima with stats and certifications  
- Services showcase
- Client testimonials with real profile images
- Pricing tiers for astrology readings and NLP sessions
- Contact form with birth details collection
- Interactive map showing location in Surrey, BC
- Footer with social media links

🎨 **Design Elements:**
- Custom color palette (A4BD84, FCAB92, B17C82, f9dddc, f7d0a9)
- Luxury fonts (Playfair Display, Inter)
- Smooth animations and hover effects
- Mobile-responsive design
- Professional astrology-themed icons

🔧 **Interactive Features:**
- Sticky navigation with scroll effects
- Mobile hamburger menu
- Smooth scrolling between sections
- Contact form with validation
- Loading states and success messages
- Parallax background effects
- Testimonial carousel functionality

## How to Use

### Option 1: Local Hosting
1. Download all three files to a folder on your computer
2. Open `index.html` in any modern web browser
3. The website will work completely offline

### Option 2: Web Hosting
1. Upload all three files to your web hosting provider
2. Ensure `index.html` is in the root directory
3. Your website will be live at your domain

### Option 3: Local Development Server
```bash
# Using Python
python -m http.server 8000

# Using Node.js (if you have it installed)
npx serve .

# Then open http://localhost:8000 in your browser
```

## Customization

### Colors
Edit the CSS variables in `styles.css` to change the color scheme:
```css
:root {
    --color-a4bd84: #A4BD84;
    --color-fcab92: #FCAB92;
    --color-b17c82: #B17C82;
    --color-f9dddc: #f9dddc;
    --color-f7d0a9: #f7d0a9;
}
```

### Content
- Edit text content directly in `index.html`
- Replace images by updating the `src` attributes
- Modify contact information in the footer section

### Functionality
- Form submission can be connected to any backend service
- Update social media links in the footer
- Modify the Google Maps embed URL for different locations

## Browser Compatibility

✅ **Supported Browsers:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Features

- Optimized images with proper sizing
- Efficient CSS with minimal redundancy
- Lightweight JavaScript with no external dependencies
- Fast loading times and smooth animations

## Original Features Preserved

All features from the original React/Next.js application have been preserved:
- Responsive design that works on all screen sizes
- Smooth animations and transitions
- Interactive elements and hover effects
- Form validation and submission handling
- Navigation functionality
- Professional appearance and user experience

## Support

This HTML export provides a complete, production-ready website that can be hosted anywhere without requiring Node.js, React, or any other dependencies.

For any modifications or questions about the code, refer to the well-commented HTML, CSS, and JavaScript files.

---

**Note:** The contact form currently shows a success message after submission. To make it functional, you'll need to connect it to a backend service or form handling service like Formspree, Netlify Forms, or your preferred solution.
