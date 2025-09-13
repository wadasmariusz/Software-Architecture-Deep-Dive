# Google Analytics Implementation

This project now includes comprehensive Google Analytics tracking for user behavior analysis.

## Setup Instructions

1. **Create a Google Analytics 4 Property**:
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create a new property or use an existing one
   - Get your tracking ID (format: `G-XXXXXXXXXX`)

2. **Configure Environment Variable**:
   ```bash
   # Create a .env file in the project root
   PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX
   ```
   Replace `G-XXXXXXXXXX` with your actual Google Analytics tracking ID.

3. **Deploy and Verify**:
   - Build and deploy your application
   - Visit your site and check Google Analytics Real-Time reports
   - Verify that page views and events are being tracked

## Features Implemented

### Automatic Tracking
- **Page Views**: Automatically tracked when users visit any page
- **Session Data**: User sessions and engagement metrics

### Event Tracking
- **CTA Button Clicks**: Tracks clicks on "Zapisz się na kurs" buttons
- **Newsletter Signups**: Tracks form submission attempts (both main CTA and footer)
- **Scroll Depth**: Tracks user engagement at 25%, 50%, 75%, and 100% scroll depths
- **Section Views**: Tracks when users view different sections of the page
- **Pricing Interactions**: Tracks clicks on pricing options (individual vs company tickets)

### Event Categories
- `engagement`: User interaction events (CTA clicks, scroll depth, section views)
- `conversion`: Actions that lead to potential conversions (newsletter signups, pricing clicks)

## Privacy Considerations

- The implementation respects user privacy and follows GDPR guidelines
- Analytics only loads when a valid tracking ID is provided
- No personal data is collected without consent

## Technical Details

- **Implementation**: Integrated directly into `src/layouts/Layout.astro`
- **Framework**: Uses Google Analytics 4 (gtag.js)
- **Environment**: Configured via `PUBLIC_GA_TRACKING_ID` environment variable
- **Performance**: Minimal impact on site performance with async loading

## Troubleshooting

- **No data in GA**: Verify your tracking ID is correct and the site is live
- **Console errors**: Check that ad blockers aren't interfering with tracking
- **Development**: Tracking works in development mode when the environment variable is set