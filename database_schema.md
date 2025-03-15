# Area-Selective Deposition (ASD) Database Schema

## Overview
This document outlines the database schema for the ASD website, which will organize literature examples by elements and provide a periodic table interface for navigation.

## Database Tables

### 1. Elements
```
CREATE TABLE elements (
    element_id INTEGER PRIMARY KEY,
    symbol TEXT NOT NULL,
    name TEXT NOT NULL,
    atomic_number INTEGER NOT NULL,
    is_growth_surface BOOLEAN DEFAULT FALSE,
    is_non_growth_surface BOOLEAN DEFAULT FALSE,
    is_grown_material BOOLEAN DEFAULT FALSE
);
```

### 2. Papers
```
CREATE TABLE papers (
    paper_id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    authors TEXT NOT NULL,
    publication_year INTEGER NOT NULL,
    doi TEXT NOT NULL,
    journal TEXT,
    abstract TEXT,
    has_full_text BOOLEAN DEFAULT TRUE
);
```

### 3. Growth_Surfaces
```
CREATE TABLE growth_surfaces (
    growth_surface_id INTEGER PRIMARY KEY,
    element_id INTEGER NOT NULL,
    compound_name TEXT NOT NULL,
    surface_termination TEXT,
    paper_id INTEGER NOT NULL,
    notes TEXT,
    FOREIGN KEY (element_id) REFERENCES elements(element_id),
    FOREIGN KEY (paper_id) REFERENCES papers(paper_id)
);
```

### 4. Non_Growth_Surfaces
```
CREATE TABLE non_growth_surfaces (
    non_growth_surface_id INTEGER PRIMARY KEY,
    element_id INTEGER NOT NULL,
    compound_name TEXT NOT NULL,
    surface_termination TEXT,
    paper_id INTEGER NOT NULL,
    notes TEXT,
    FOREIGN KEY (element_id) REFERENCES elements(element_id),
    FOREIGN KEY (paper_id) REFERENCES papers(paper_id)
);
```

### 5. Grown_Materials
```
CREATE TABLE grown_materials (
    grown_material_id INTEGER PRIMARY KEY,
    element_id INTEGER NOT NULL,
    compound_name TEXT NOT NULL,
    paper_id INTEGER NOT NULL,
    notes TEXT,
    FOREIGN KEY (element_id) REFERENCES elements(element_id),
    FOREIGN KEY (paper_id) REFERENCES papers(paper_id)
);
```

### 6. Inhibitors
```
CREATE TABLE inhibitors (
    inhibitor_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- 'SAM' or 'SMI'
    chemical_formula TEXT,
    description TEXT
);
```

### 7. ASD_Processes
```
CREATE TABLE asd_processes (
    process_id INTEGER PRIMARY KEY,
    paper_id INTEGER NOT NULL,
    growth_surface_id INTEGER NOT NULL,
    non_growth_surface_id INTEGER NOT NULL,
    grown_material_id INTEGER NOT NULL,
    inhibitor_id INTEGER,
    process_type TEXT,
    temperature REAL,
    pressure REAL,
    precursor TEXT,
    reactant TEXT,
    selectivity_mechanism TEXT,
    notes TEXT,
    FOREIGN KEY (paper_id) REFERENCES papers(paper_id),
    FOREIGN KEY (growth_surface_id) REFERENCES growth_surfaces(growth_surface_id),
    FOREIGN KEY (non_growth_surface_id) REFERENCES non_growth_surfaces(non_growth_surface_id),
    FOREIGN KEY (grown_material_id) REFERENCES grown_materials(grown_material_id),
    FOREIGN KEY (inhibitor_id) REFERENCES inhibitors(inhibitor_id)
);
```

## API Endpoints

### Element Data
- `GET /api/elements` - Get all elements with their properties
- `GET /api/elements/{symbol}` - Get specific element data
- `GET /api/elements/{symbol}/growth-surfaces` - Get papers where element is a growth surface
- `GET /api/elements/{symbol}/non-growth-surfaces` - Get papers where element is a non-growth surface
- `GET /api/elements/{symbol}/grown-materials` - Get papers where element is a grown material

### Paper Data
- `GET /api/papers` - Get all papers
- `GET /api/papers/{id}` - Get specific paper details
- `GET /api/papers/search?query={query}` - Search papers by title, author, etc.

### Process Data
- `GET /api/processes` - Get all ASD processes
- `GET /api/processes/{id}` - Get specific process details
- `GET /api/processes/search?parameter={value}` - Search processes by parameters

## Data Population Strategy

1. Parse the collected literature data from Markdown files
2. Populate the Elements table with all elements from the periodic table
3. Update element properties (is_growth_surface, is_non_growth_surface, is_grown_material) based on literature data
4. Add all papers to the Papers table
5. Extract growth surfaces, non-growth surfaces, and grown materials from each paper
6. Create entries in respective tables linking elements to papers
7. Add inhibitor information where applicable
8. Create comprehensive ASD process entries linking all components

## Website Structure

### Home Page
- Interactive periodic table
- Color-coded elements based on their role in ASD processes
- Legend explaining color coding
- Search functionality

### Element Detail Page
- Basic element information
- Three tabs:
  1. Growth Surface tab - List of papers where element is a growth surface
  2. Non-Growth Surface tab - List of papers where element is a non-growth surface
  3. Grown Material tab - List of papers where element is a grown material
- Papers grouped by compound for each element

### Paper Detail Page
- Complete paper information
- DOI link to original research
- List of ASD processes described in the paper
- Growth surfaces, non-growth surfaces, and grown materials used

### Search Page
- Advanced search functionality
- Filter by elements, compounds, process types, etc.
- Sort results by various parameters

## Next Steps
1. Implement database using SQLite or PostgreSQL
2. Create data import scripts to populate database from collected literature
3. Develop API endpoints for data access
4. Build frontend with interactive periodic table interface
