# Spotify Website Clone

A pixel-perfect recreation of the Spotify web interface built with HTML, CSS, and JavaScript.

## Features

- **Authentic Spotify Design**: Matches the exact look and feel of Spotify's web interface
- **Responsive Layout**: Clean, modern design that works across different screen sizes
- **Music Player**: Fully functional audio player with play/pause, next/previous controls
- **Progress Bar**: Interactive progress bar with time display
- **Volume Control**: Adjustable volume slider
- **Song Library**: Browse and play songs from your local collection
- **Playlist Cards**: Interactive playlist cards with hover effects
- **Smooth Animations**: CSS transitions and hover effects for a polished experience

## File Structure

```
├── index.html          # Main HTML file
├── style.css           # Main stylesheet
├── utility.css         # Utility classes
├── script.js           # JavaScript functionality
├── start-server.bat    # Windows batch file to start local server
├── Images/
│   └── svg format/     # SVG icons (home, search, play, etc.)
└── Songs/              # Your MP3 files go here
```

## How to Run

### Option 1: Using Python (Recommended)
1. Make sure Python is installed on your system
2. Double-click `start-server.bat` (Windows) or run:
   ```bash
   python -m http.server 8000
   ```
3. Open your browser and go to: `http://localhost:8000`

### Option 2: Using VS Code Live Server
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html` and select "Open with Live Server"

### Option 3: Using Node.js
1. Install a simple HTTP server:
   ```bash
   npm install -g http-server
   ```
2. Run in the project directory:
   ```bash
   http-server
   ```

## Adding Your Music

1. Place your MP3 files in the `Songs/` folder
2. The app will automatically detect and list them in the sidebar
3. Click on any song to play it

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

**Note**: Some browsers may require user interaction before playing audio due to autoplay policies.

## Technical Details

- **HTML5 Audio API**: For music playback
- **CSS Grid & Flexbox**: For responsive layouts
- **ES6+ JavaScript**: Modern JavaScript features
- **CSS Custom Properties**: For consistent theming
- **SVG Icons**: Scalable vector graphics for crisp icons

## Customization

You can easily customize the appearance by modifying:
- `style.css`: Main styles and layout
- `utility.css`: Utility classes for common styling
- Colors, fonts, and spacing can be adjusted in the CSS variables

## Known Issues

- Songs must be manually added to the `Songs/` folder
- Album artwork uses placeholder images
- Some advanced Spotify features are not implemented (search, user accounts, etc.)

## Future Enhancements

- Add search functionality
- Implement playlist creation
- Add shuffle and repeat modes
- Include album artwork support
- Add keyboard shortcuts
- Implement user authentication

## Contributing

Feel free to fork this project and submit pull requests for any improvements!

## License

This project is for educational purposes only. Spotify and its interface design are trademarks of Spotify AB.
 Tried to clone the Spotify Website
