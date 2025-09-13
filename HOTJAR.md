# Hotjar Integration

This project includes Hotjar integration for user behavior analysis.

## Setup

1. Create a `.env` file in the project root (copy from `.env.example`)
2. Get your Hotjar Site ID from https://insights.hotjar.com/
3. Set the `HOTJAR_SITE_ID` environment variable with your Site ID
4. The Hotjar tracking script will automatically be included on all pages

## Environment Variables

- `HOTJAR_SITE_ID`: Your Hotjar Site ID (required for tracking to work)

## How it Works

The Hotjar tracking script is conditionally loaded in `src/layouts/Layout.astro`:
- Only loads when `HOTJAR_SITE_ID` environment variable is set
- Uses Astro's `is:inline` directive to ensure the script runs immediately
- Follows Hotjar's official implementation guidelines

## Privacy Considerations

- Hotjar tracks user interactions including clicks, scrolls, and mouse movements
- Ensure compliance with GDPR and other privacy regulations
- Consider adding privacy notices and cookie consent if required