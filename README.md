# Our Story - Dark Fantasy Romance Mobile Experience

A fully immersive, production-ready mobile web experience celebrating a 6-year romantic journey. Built with React 19, TypeScript, Tailwind CSS 4, Framer Motion, and GSAP.

## 🎨 Design Philosophy

**Theme:** Cyberpunk Romanticism — A fusion of neon-soaked dystopian aesthetics with intimate emotional storytelling.

### Core Aesthetics
- **Dark void background** (#050010 to #0D021F) representing infinite depth and mystery
- **Neon pink glow** (#FF1493 to #FF4DA6) as the unmistakable heartbeat
- **Purple nebula clouds** (#A020F0) creating depth and mystique
- **Glassmorphism cards** with subtle backdrop blur and neon borders
- **Floating particles** (fireflies, sparkles, bokeh lights) for magical atmosphere
- **Smooth, physics-based animations** that reinforce emotional beats

### Typography
- **Display:** Playfair Display (bold, luxury serif)
- **Body:** Poppins (clean, readable sans-serif)

## 📱 Four-Page Journey

### Page 1: Welcome Experience
The opening introduction page that sets the emotional tone.

**Features:**
- Large neon heart with glowing portal effect
- Animated text reveal with staggered timing
- Floating hearts and twinkling stars
- "Begin Our Story" CTA button with hover glow effects
- Smooth entrance animations

**Animations:**
- Text fades in and scales up (0.95 → 1)
- Portal pulses with 3-second glow cycle
- Floating hearts drift with sine/cosine waves
- Button scales and glows on hover

### Page 2: Countdown Experience
A romantic countdown to a special day with live updates.

**Features:**
- Large glowing heart ring with animated progress circle
- Live countdown (Days, Hours, Minutes, Seconds)
- Auto-updates every second
- Progress percentage (Passed/Remaining)
- Glassmorphic countdown boxes
- Heart pulse animation in the center

**Animations:**
- Progress ring animates smoothly as time passes
- Countdown numbers scale and fade on update
- Heart pulses at 1.2-second intervals
- Particles accelerate on hover

### Page 3: Journey Timeline
An interactive relationship timeline with expandable year cards.

**Features:**
- Vertical glowing timeline with heart markers
- 6 expandable year cards with images and descriptions
- Smooth expand/collapse animations
- Glassmorphic card design with neon borders
- Timeline glow effect with gradient line
- Scroll-based animations

**Interactions:**
- Click heart markers to expand/collapse cards
- Smooth height animations on expand
- Image placeholders with hover effects
- Floating sparkles throughout

### Page 4: Memory Gallery
A polaroid-style photo collage with filtering and lightbox.

**Features:**
- Polaroid-style cards with slight rotation
- Filter categories: All, Memories, Trips, Special, Us
- Fullscreen lightbox viewer with navigation
- Smooth layout transitions on filter change
- Hover glow effects on cards
- Previous/Next navigation in lightbox

**Interactions:**
- Click filter buttons to show/hide categories
- Click photos to open fullscreen lightbox
- Navigate between photos with Previous/Next buttons
- Click outside or X button to close lightbox

## 🚀 Technical Stack

- **Framework:** React 19 with TypeScript
- **Styling:** Tailwind CSS 4 with custom theme
- **Animation:** Framer Motion + GSAP
- **Routing:** Wouter (client-side)
- **Build:** Vite 7
- **UI Components:** shadcn/ui (pre-configured)

## 📁 Project Structure

```
client/
  src/
    pages/
      Welcome.tsx          # Page 1: Welcome experience
      Countdown.tsx        # Page 2: Countdown with live timer
      JourneyTimeline.tsx  # Page 3: Interactive timeline
      MemoryGallery.tsx    # Page 4: Photo gallery
    components/
      BackgroundEffects.tsx # Global background with stars, particles
      ErrorBoundary.tsx
      ui/                  # shadcn/ui components
    lib/
      animations.ts        # Framer Motion animation variants
      utils.ts
    contexts/
      ThemeContext.tsx      # Dark theme provider
    App.tsx               # Main app with page routing
    index.css             # Global styles + custom animations
    main.tsx
  index.html
  public/
```

## 🎬 Animation Details

### Global Animations
- **pulse-glow:** 3s infinite glow pulse for hearts and borders
- **float:** 4s vertical floating motion
- **float-slow:** 8s slow drift with x/y variation
- **twinkle:** 3s opacity pulse for stars
- **glow-pulse:** 2s text shadow glow effect
- **heart-beat:** 1.2s scale pulse for hearts

### Page-Specific Animations
- **Welcome:** Portal scales and glows, text staggered reveal, floating hearts
- **Countdown:** Progress ring animates, numbers scale on update, heart pulses
- **Timeline:** Cards slide in with stagger, expand/collapse smooth height animation
- **Gallery:** Photos scale in on filter change, lightbox fade and scale

### Interaction Animations
- **Hover:** Scale 1.05, glow intensifies, particles accelerate
- **Click:** Scale 0.95 for tactile feedback
- **Transitions:** Fade and slide with 300-600ms duration

## 🎨 Color System

| Purpose | Color | Hex |
|---------|-------|-----|
| Background | Dark Void | #050010 |
| Background (Light) | Dark Purple | #0D021F |
| Primary Accent | Neon Pink | #FF1493 |
| Secondary Accent | Neon Pink Light | #FF4DA6 |
| Glow | Purple | #A020F0 |
| Text | White | #FFFFFF |
| Text (Muted) | White 60% | rgba(255,255,255,0.6) |

## 🔧 Development

### Setup
```bash
cd /home/ubuntu/romance_story
pnpm install
pnpm dev
```

### Build
```bash
pnpm build
```

### Preview
```bash
pnpm preview
```

## 📝 Customization

### Change Target Date
Edit `Countdown.tsx`:
```typescript
const targetDate = new Date(2026, 5, 25, 12, 0, 0).getTime(); // June 25, 2026
```

### Add Real Images
1. Upload images to `/home/ubuntu/webdev-static-assets/`
2. Use `manus-upload-file --webdev` to get URLs
3. Replace placeholder divs with `<img src="..." />`

### Modify Colors
Edit `client/src/index.css`:
```css
--neon-pink: #FF1493;
--neon-pink-light: #FF4DA6;
--glow-purple: #A020F0;
```

### Adjust Animation Timing
Edit `client/src/lib/animations.ts` to modify Framer Motion variants and durations.

## ✨ Features Implemented

- ✅ Fully immersive fullscreen mobile experience
- ✅ No status bars, notches, or chrome
- ✅ Dark fantasy romance aesthetic with neon glow effects
- ✅ Glassmorphism cards with backdrop blur
- ✅ Live countdown with auto-update every second
- ✅ Interactive timeline with expandable cards
- ✅ Photo gallery with filtering and lightbox
- ✅ Smooth page navigation with animations
- ✅ Floating particles and twinkling stars
- ✅ Responsive mobile-first design
- ✅ Accessibility features (keyboard nav, color contrast)
- ✅ Performance optimized (GPU-accelerated transforms)

## 🎯 Next Steps

1. **Add Real Images:** Replace placeholder divs with actual photos
2. **Customize Content:** Update year descriptions and gallery categories
3. **Adjust Timing:** Modify countdown target date and animation durations
4. **Deploy:** Use Manus built-in hosting or export to custom domain

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## ⚡ Performance

- GPU-accelerated animations (transform, opacity only)
- Lazy-loaded background particles
- Optimized re-renders with React.memo
- CSS animations for simple effects
- Framer Motion for complex choreography

## 🔐 Accessibility

- Maintains color contrast (WCAG AA)
- Keyboard navigation support
- Respects `prefers-reduced-motion`
- Semantic HTML structure
- ARIA labels on interactive elements

## 📄 License

Private project. All rights reserved.

---

**Built with ❤️ for a 6-year love story**
