# Dashboard Analytics Visualization Guide

## Overview

The `/analytics/dashboard` endpoint provides comprehensive protein data analytics optimized for dashboard visualizations. This guide details the recommended chart types and best practices for displaying each metric.

## Endpoint

**GET** `/analytics/dashboard`

Returns comprehensive analytics including distributions, statistics, and visualization recommendations.

---

## Data Categories & Recommended Visualizations

### 1. Organism Distribution 🧬

**Data Type**: Categorical distribution
**Recommended Chart**: **Pie Chart** or **Donut Chart**

**Why This Works**:
- Shows clear proportions of organisms in the dataset
- Easy to understand at a glance
- Professional and commonly used in scientific dashboards

**Design Recommendations**:
- Use distinct colors for each organism (max 8-10 slices)
- Show percentage labels on hover
- Consider grouping smaller organisms into "Others" category if >10 organisms
- Add legend with organism names and counts

**Alternative**: Horizontal bar chart if you have many organisms (>10)

**Color Palette Suggestion**:
```javascript
// Professional scientific palette
['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316']
```

---

### 2. Subcellular Localization Distribution 📍

**Data Type**: Categorical distribution (multi-label possible)
**Recommended Chart**: **Horizontal Bar Chart**

**Why This Works**:
- Better for longer text labels (e.g., "Endoplasmic reticulum", "Mitochondrial matrix")
- Easy to compare counts across categories
- Scales well with many categories

**Design Recommendations**:
- Sort bars by count (descending) for better readability
- Use gradient colors (light to dark) to show magnitude
- Display both count and percentage
- Consider truncating very long labels with tooltips for full text
- Add a search/filter if you have >15 localizations

**Color Gradient**: Use a single color with varying intensity
```javascript
// Example: Blue gradient
['#DBEAFE', '#BFDBFE', '#93C5FD', '#60A5FA', '#3B82F6', '#2563EB', '#1D4ED8']
```

---

### 3. Stability Distribution ⚖️

**Data Type**: Binary/Ternary categorical (Stable/Unstable/Unknown)
**Recommended Chart**: **Donut Chart** with center metric

**Why This Works**:
- Clean, modern look for simple categorical data
- Center can display total count or key metric
- Color coding makes status immediately recognizable

**Design Recommendations**:
- Use semantic colors:
  - Green/Success: Stable proteins
  - Red/Warning: Unstable proteins
  - Gray: Unknown
- Display percentage in large font in center
- Add tooltip with detailed counts
- Consider adding a trend indicator if you track this over time

**Recommended Colors**:
```javascript
{
  "Stable": "#10B981",    // Green
  "Unstable": "#EF4444",  // Red
  "Unknown": "#9CA3AF"    // Gray
}
```

---

### 4. Gene Type Distribution 🧬

**Data Type**: Categorical distribution
**Recommended Chart**: **Pie Chart**

**Why This Works**:
- Usually limited number of gene types (protein_coding, intergenic, etc.)
- Shows composition at a glance
- Standard for this type of biological data

**Design Recommendations**:
- Use professional scientific colors
- Show legend with full descriptions
- Display percentage and count on hover
- Consider adding a summary card showing most common gene type

**Color Scheme**:
```javascript
{
  "protein_coding": "#3B82F6",
  "intergenic": "#10B981",
  "lncRNA": "#F59E0B",
  "pseudogene": "#EF4444",
  "other": "#9CA3AF"
}
```

---

### 5. Protein Length Distribution 📏

**Data Type**: Continuous numeric data binned into ranges
**Recommended Chart**: **Histogram** or **Column Chart**

**Why This Works**:
- Perfect for showing distribution across ranges
- Easy to identify common protein sizes
- Shows data concentration patterns

**Design Recommendations**:
- Use consistent bin widths when possible
- Color bars by frequency (gradient) or use single color
- Add average/median line overlay
- Include x-axis labels for each range
- Consider log scale if data is heavily skewed

**Enhanced Version**: Add a **Box Plot** overlay to show quartiles

**Color**: Use a gradient from light to dark based on frequency
```javascript
// Single color with varying opacity based on count
fill: `rgba(59, 130, 246, ${count / maxCount})`
```

---

### 6. Physicochemical Properties 🔬

#### 6.1 Molecular Weight

**Recommended Chart**: **Box Plot** or **Violin Plot**

**Why This Works**:
- Shows distribution, median, quartiles, and outliers
- Great for identifying unusual proteins
- Standard in scientific publications

**Design Recommendations**:
- Display quartiles clearly
- Mark outliers distinctly
- Show mean and median lines
- Add hover for min/max/mean values
- Consider horizontal orientation for better label reading

**Alternative**: **Histogram with KDE overlay** for detailed distribution

---

#### 6.2 Theoretical pI (Isoelectric Point)

**Recommended Chart**: **Violin Plot** or **Distribution Curve**

**Why This Works**:
- Shows the shape of distribution
- pI typically has bimodal distribution (acidic/basic proteins)
- Violin plot reveals multiple peaks effectively

**Design Recommendations**:
- Mark common pI ranges (acidic <7, neutral 7, basic >7)
- Use color zones for pH ranges
- Display median and quartiles
- Add reference lines at pH 7

**Color Zones**:
```javascript
{
  "Acidic (< 7)": "#EF4444",
  "Neutral (7)": "#9CA3AF",
  "Basic (> 7)": "#3B82F6"
}
```

---

#### 6.3 GRAVY (Grand Average of Hydropathy)

**Recommended Chart**: **Distribution Curve** with shaded regions

**Why This Works**:
- GRAVY ranges from negative (hydrophilic) to positive (hydrophobic)
- Distribution curve shows concentration
- Color zones show biological significance

**Design Recommendations**:
- Shade regions: negative = hydrophilic, positive = hydrophobic
- Add vertical line at 0
- Show mean and standard deviation
- Use gradient from blue (hydrophilic) to orange (hydrophobic)

**Color Gradient**:
```javascript
// Hydrophilic → Hydrophobic
['#3B82F6', '#9CA3AF', '#F59E0B']
```

---

#### 6.4 Aliphatic Index

**Recommended Chart**: **Box Plot** or **Range Chart**

**Why This Works**:
- Shows thermostability indicator
- Box plot reveals central tendency and spread
- Easy to compare against reference ranges

**Design Recommendations**:
- Mark typical ranges for thermostable proteins
- Color code by stability zones
- Display quartiles and outliers clearly
- Add reference value annotations

---

#### 6.5 Instability Index

**Recommended Chart**: **Scatter Plot with Threshold Line** or **Binary Bar Chart**

**Why This Works**:
- Threshold at 40 separates stable from unstable
- Scatter plot shows individual proteins
- Can color code by stability status

**Design Recommendations**:
- Draw horizontal line at index = 40 (stability threshold)
- Color proteins: green (<40 stable), red (>40 unstable)
- Add count badges for each zone
- Consider jitter for overlapping points
- Show distribution histogram on margins

**Alternative**: **Bee Swarm Plot** for better point visibility

---

## Dashboard Layout Recommendations

### Landing Page Layout

```
┌─────────────────────────────────────────────────────────┐
│  Summary Cards (4 cards)                                │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │  Total   │ │ Proteins │ │ Peptides │ │ Organisms│  │
│  │ Entities │ │          │ │          │ │          │  │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │
└─────────────────────────────────────────────────────────┘

┌────────────────────────┬────────────────────────────────┐
│                        │                                │
│  Organism Distribution │  Stability Distribution        │
│  (Pie Chart)           │  (Donut Chart)                 │
│                        │                                │
└────────────────────────┴────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  Subcellular Localization (Horizontal Bar Chart)         │
│                                                          │
└──────────────────────────────────────────────────────────┘

┌────────────────────────┬────────────────────────────────┐
│                        │                                │
│  Protein Length        │  Gene Type Distribution        │
│  (Histogram)           │  (Pie Chart)                   │
│                        │                                │
└────────────────────────┴────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│  Physicochemical Properties (Box Plots Grid)             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │
│  │ Mol. Weight │ │ Theor. pI   │ │   GRAVY     │       │
│  └─────────────┘ └─────────────┘ └─────────────┘       │
└──────────────────────────────────────────────────────────┘
```

---

## Chart Library Recommendations

### For Modern Web Dashboards

1. **Recharts** (React)
   - Excellent for pie, bar, and line charts
   - Clean API and responsive
   - Good for most categorical data

2. **Chart.js** (Vanilla JS/React)
   - Versatile and performant
   - Great documentation
   - Works well with all recommended charts

3. **D3.js** (Advanced)
   - Maximum customization
   - Perfect for violin plots and complex distributions
   - Steeper learning curve

4. **Plotly.js**
   - Excellent for scientific visualizations
   - Built-in box plots, violin plots
   - Interactive by default

5. **Apache ECharts**
   - Professional and feature-rich
   - Great for complex dashboards
   - Excellent mobile support

---

## Color Palette Guide

### Professional Scientific Dashboard Palette

**Primary Colors**:
```javascript
const palette = {
  primary: '#3B82F6',      // Blue
  success: '#10B981',      // Green
  warning: '#F59E0B',      // Amber
  danger: '#EF4444',       // Red
  purple: '#8B5CF6',       // Purple
  pink: '#EC4899',         // Pink
  teal: '#14B8A6',         // Teal
  orange: '#F97316',       // Orange
  neutral: '#9CA3AF',      // Gray
};
```

**Gradient Sets**:
```javascript
// Blue gradient (for sequential data)
const blueGradient = ['#EFF6FF', '#DBEAFE', '#BFDBFE', '#93C5FD', '#60A5FA', '#3B82F6'];

// Diverging gradient (for properties like GRAVY)
const diverging = ['#3B82F6', '#93C5FD', '#F3F4F6', '#FCA5A5', '#EF4444'];
```

---

## Accessibility Recommendations

1. **Color Blindness**:
   - Use patterns/textures in addition to colors
   - Avoid red-green combinations
   - Use tools like ColorBrewer for safe palettes

2. **Labels**:
   - Always include text labels or tooltips
   - Use sufficient contrast ratios (WCAG AA: 4.5:1)
   - Provide alternative text for screen readers

3. **Interactivity**:
   - Ensure keyboard navigation works
   - Provide data tables as alternative views
   - Include export functionality

---

## Performance Considerations

- **Large Datasets**: Use data virtualization for >1000 items
- **Real-time Updates**: Implement WebSocket for live data
- **Lazy Loading**: Load complex charts on viewport enter
- **Caching**: Cache analytics data with appropriate TTL
- **Responsiveness**: Use responsive chart libraries

---

## Example API Response

```json
{
  "total_proteins": 3250,
  "total_peptides": 52,
  "total_entities": 3302,
  "organism_distribution": [
    {"label": "Homo sapiens", "count": 2800, "percentage": 84.79},
    {"label": "Ecoli", "count": 52, "percentage": 1.57},
    {"label": "Others", "count": 450, "percentage": 13.64}
  ],
  "stability_distribution": [
    {"label": "Stable", "count": 2100, "percentage": 63.6},
    {"label": "Unstable", "count": 850, "percentage": 25.74},
    {"label": "Unknown", "count": 352, "percentage": 10.66}
  ],
  "physicochemical": {
    "molecular_weight": {
      "mean": 45230.5,
      "median": 42100.0,
      "min": 3488.09,
      "max": 125000.0,
      "std_dev": 15432.2
    }
  },
  "visualization_recommendations": {
    "organism_distribution": "pie_chart",
    "stability_distribution": "donut_chart",
    "molecular_weight": "box_plot"
  }
}
```

---

## Frontend Implementation Example (React + Recharts)

```jsx
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

function OrganismDistributionChart({ data }) {
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="card">
      <h3>Organism Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="label"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ percentage }) => `${percentage.toFixed(1)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
```

---

## Summary

| Metric | Chart Type | Primary Color | Best For |
|--------|-----------|---------------|----------|
| Organism | Pie Chart | Multi-color | Showing proportions |
| Localization | H-Bar Chart | Blue gradient | Many categories |
| Stability | Donut Chart | Green/Red | Status overview |
| Gene Type | Pie Chart | Multi-color | Type composition |
| Protein Length | Histogram | Blue | Distribution patterns |
| Mol. Weight | Box Plot | Blue | Statistical spread |
| Theoretical pI | Violin Plot | Blue/Red zones | Distribution shape |
| GRAVY | Distribution | Blue-Orange | Hydropathy range |
| Aliphatic Index | Box Plot | Purple | Stability indicator |
| Instability Index | Scatter + Threshold | Green/Red | Stability classification |

---

## Support & Feedback

For questions about the analytics endpoint or visualization recommendations, please refer to the API documentation or contact the development team.
