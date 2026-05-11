# Paste from Clipboard Feature - Calcolo Statistics

## Overview
The Frequency Distribution Table now includes a **"Paste Data"** button that allows users to quickly load pre-formatted frequency data directly from their clipboard. This is a powerful Data ETL feature that mirrors professional analytics tools like Tableau and Power BI.

## Format Specification

### Input Format
```
From,To,Freq|From,To,Freq|From,To,Freq
```

### Examples

**Example 1: Simple Age Distribution**
```
0,10,5|10,20,12|20,30,18|30,40,15|40,50,10
```
This represents:
- Ages 0-10: 5 people
- Ages 10-20: 12 people
- Ages 20-30: 18 people
- Ages 30-40: 15 people
- Ages 40-50: 10 people
- **Total Frequency: 60**

**Example 2: Income Brackets**
```
30000,40000,8|40000,50000,15|50000,60000,22|60000,70000,18|70000,80000,7
```

**Example 3: Test Scores**
```
50,60,3|60,70,8|70,80,14|80,90,19|90,100,6
```

## How to Use

### Step 1: Prepare Your Data
Format your data as `From,To,Frequency` separated by pipes `|`

### Step 2: Copy to Clipboard
- Manually type or copy your formatted data
- Example: `10,20,5|20,30,8|30,40,12`

### Step 3: Click "Paste Data"
- In the Frequency Table section, click the **"Paste Data"** button
- The component will:
  1. Read from your clipboard
  2. Parse the format
  3. Validate all values
  4. Load into the table

### Step 4: Automatic Sync
Once pasted, the system automatically:
- Updates the Summary tile with total frequency
- Recalculates all four statistics (Mean, Median, Mode, SD)
- Updates all Bento visualizations (Fulcrum, Glow, Pills, Bars)

## Validation & Error Handling

### Valid Formats ✅
```
10,20,5|20,30,8|30,40,12
```

### Invalid Formats ❌
```
10|20|5 (Wrong separator)
10,20 (Missing frequency)
10,20,abc (Non-numeric value)
30,20,5 (From >= To)
```

### Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| `Invalid format. Expected: From,To,Freq\|From,To,Freq` | Incorrect row structure | Use pipe `\|` to separate rows, comma `,` within rows |
| `Invalid format. All values must be numbers.` | Non-numeric values detected | Ensure all From, To, and Freq are numbers |
| `Invalid format. "From" must be less than "To".` | Invalid interval range | Check that From < To for each row |
| `Clipboard is empty. Please copy data first.` | Nothing in clipboard | Copy formatted data before clicking Paste |
| `Unable to access clipboard. Please paste manually.` | Browser permissions | Check browser clipboard access permissions |

## Integration with Raw Data Mode

### Workflow: Raw → FDT
1. Enter raw data in **"Raw Data"** mode (comma-separated values)
2. Observe the Mean, Median, Mode, SD visualizations
3. Copy the displayed Frequency Table data
4. Switch to **"Frequency Table"** mode
5. Click **"Paste Data"** to load it

This mirrors the ETL (Extract, Transform, Load) process:
- **Extract**: Raw data entry
- **Transform**: Conversion to frequency distribution (via statistics engine)
- **Load**: Paste into FDT for deep analysis

## Technical Details

### State Management
- Intervals: `[['10', '20'], ['20', '30'], ...]` (stored as strings for input flexibility)
- Frequencies: `['5', '8', '12', ...]` (stored as strings for consistent input)
- Automatic conversion to numbers during statistics calculation

### Toast Notifications
- **Success** (green): Data loaded successfully
- **Error** (red): Validation or parsing failure
- Auto-dismisses after 3 seconds

### Real-Time Sync
The `setIntervals` and `setFrequencies` hooks automatically trigger:
1. `ResultsGrid` recalculation (via `useMemo`)
2. All four visualizations update instantly
3. Summary tile reflects new total frequency

## Copy Button (Potential Future Feature)

While not yet implemented, a "Copy Data" button could export the current FDT back to clipboard in the same format, enabling bi-directional data transfer.

Example implementation:
```javascript
const handleCopyToClipboard = () => {
  const dataStr = intervals
    .map((interval, idx) => 
      `${interval[0]},${interval[1]},${frequencies[idx]}`
    )
    .join('|');
  navigator.clipboard.writeText(dataStr);
  showToast('Data copied to clipboard', 'success');
};
```

## Use Cases

### Academic
- Load pre-made datasets for statistical analysis
- Compare multiple frequency distributions
- Practice calculations without manual entry

### Professional
- Quick data migration between tools
- Multi-source data consolidation
- Template-based analysis workflows

### Analytics
- A/B testing result consolidation
- Survey response aggregation
- Performance metric compilation

## Browser Compatibility

✅ Works with:
- Chrome 63+
- Firefox 63+
- Safari 13.1+
- Edge 79+

❌ May not work with:
- Very old browsers
- Certain privacy modes (requires user permission)
- Sandboxed environments

## Tips & Tricks

### Bulk Data Entry
Instead of clicking "Add Row" many times:
1. Format your data: `10,20,5|20,30,8|30,40,12`
2. Click "Paste Data"
3. All rows load instantly ⚡

### Data Validation
The parser checks:
- Row structure (From, To, Freq)
- Numeric validity
- Interval logic (From < To)
- No negative frequencies

### Performance
- Handles up to 100+ intervals efficiently
- Automatic filtering of invalid rows
- Real-time visualization updates
