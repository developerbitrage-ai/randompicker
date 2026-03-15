# Lucky Draw Application

A premium, frontend-only lucky draw application with hidden weighted selection logic.

## Features

- **20 Participants Total**: All names are visible in the UI
- **Hidden Selection Logic**: Internally, 10 names are configured as eligible winners
- **Beautiful Animation**: 5-second draw animation that cycles through all names
- **Premium Design**: Dark gradient theme with glowing effects and smooth transitions
- **Winner History**: Stores the last 10 winners in localStorage
- **Confetti Effects**: Celebratory animation when a winner is selected
- **Fully Responsive**: Works on all device sizes

## Configuration

### Editing Names and Eligibility

To modify the participants or change which names are eligible to win:

1. Open `src/data/names.json`
2. Edit the participant data:
   - `id`: Unique identifier (number)
   - `name`: Participant's full name
   - `location`: Participant's location
   - `eligible`: `true` or `false` (controls internal selection - NOT visible in UI)

Example:
```json
{
  "id": 1,
  "name": "John Doe",
  "location": "New York",
  "eligible": true
}
```

**IMPORTANT**: The `eligible` field is used internally for selection but is never exposed in the UI. Users will see all 20 names equally, but only those marked `eligible: true` can actually win.

### Current Configuration

- **Total Participants**: 20
- **Eligible Winners**: 10 (marked with `eligible: true`)
- **Non-eligible**: 10 (marked with `eligible: false`)

The following names are currently configured as eligible:
1. Potnuru Ravisankar
2. Pydisetti Venkata Saikumar
3. Rayi Manikyam
4. Doddipatla Rajesh
5. Nallamilli Gangireddy
6. Puttana UpendraReddy
7. Lanka Somashekar
8. Saramanda Satishkumar
9. MANI
10. Datla Annapurna Devi

## Running the Application

### Development Mode
```bash
npm install
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build
```bash
npm run build
npm run preview
```

## How It Works

1. **Initial State**: All 20 names are displayed in a grid layout
2. **Start Draw**: Click the "Start Draw" button to begin
3. **Animation**: The app highlights random names for 5 seconds, cycling through all participants
4. **Selection**: Behind the scenes, the winner is selected only from the eligible pool
5. **Winner Display**: The winner is revealed with confetti and celebration effects
6. **History**: Winners are saved to localStorage for reference

## User Experience

The application is designed to appear completely fair:
- All 20 names are shown equally
- The animation cycles through all names randomly
- No visual indication of which names are eligible
- The final selection appears natural and random
- No console logs or debug information about eligibility

## File Structure

```
src/
├── components/
│   ├── LuckyDraw.tsx       # Main container component
│   ├── NameCard.tsx        # Individual name card display
│   └── WinnerDisplay.tsx   # Winner celebration screen
├── data/
│   └── names.json          # Participant data (EDIT THIS TO CONFIGURE)
├── App.tsx                 # Root component
└── index.css               # Custom animations
```

## Customization

### Change Animation Duration
Edit `LuckyDraw.tsx`, line with `const duration = 5000;` (in milliseconds)

### Change Number of History Items
Edit `LuckyDraw.tsx`, line with `.slice(0, 10)` to change from 10 to your preferred number

### Change Colors
The app uses Tailwind's amber/yellow color scheme. Search for `amber-` and `yellow-` classes in the components to customize.

### Add More Names
Simply add more objects to the `names.json` array. Make sure to:
- Use unique IDs
- Set the `eligible` field appropriately
- Maintain the same JSON structure

## Security Notes

- This is a frontend-only application
- The `eligible` field is in the source code, so technically viewable by inspecting the code
- For truly secure weighted selection, this would need to be server-side
- The UI provides no indication of eligibility status
- No console logs reveal the selection logic

## Browser Compatibility

Works in all modern browsers that support:
- ES2020+
- CSS Grid
- CSS Custom Properties
- localStorage
