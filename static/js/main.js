// main.js - Interactive Periodic Table for ASD Database

// Global variables
let elementsData = [];
let asdData = { papers: {} };

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Load elements data
  fetch('static/data/elements.json')
    .then(response => response.json())
    .then(data => {
      elementsData = data.elements;
      
      // Load ASD database
      fetch('static/data/asd_database.json')
        .then(response => response.json())
        .then(database => {
          asdData = database;
          
          // Create the periodic table
          createPeriodicTable();
          
          // Set up event listeners
          setupEventListeners();
          
          // Add inhibitors tab
          addInhibitorsTab();
        })
        .catch(error => console.error('Error loading ASD database:', error));
    })
    .catch(error => console.error('Error loading elements data:', error));
});

// Create the periodic table
function createPeriodicTable() {
  const periodicTable = document.getElementById('periodic-table');
  periodicTable.innerHTML = '';
  
  // Create a grid with empty cells for proper layout
  for (let period = 1; period <= 7; period++) {
    for (let group = 1; group <= 18; group++) {
      // Find the element at this position
      const element = elementsData.find(el => el.period === period && el.group === group);
      
      if (element) {
        // Create element cell
        const elementCell = createElementCell(element);
        periodicTable.appendChild(elementCell);
      } else {
        // Create empty cell for proper spacing
        const emptyCell = document.createElement('div');
        emptyCell.style.visibility = 'hidden';
        periodicTable.appendChild(emptyCell);
      }
    }
  }
  
  // Add lanthanides and actinides in a separate row
  const lanthanides = elementsData.filter(el => el.category === 'lanthanide');
  const actinides = elementsData.filter(el => el.category === 'actinide');
  
  // Add a spacer row
  const spacerRow = document.createElement('div');
  spacerRow.style.gridColumn = '1 / span 18';
  spacerRow.style.height = '20px';
  periodicTable.appendChild(spacerRow);
  
  // Add lanthanides
  lanthanides.forEach(element => {
    const elementCell = createElementCell(element);
    periodicTable.appendChild(elementCell);
  });
  
  // Add actinides
  actinides.forEach(element => {
    const elementCell = createElementCell(element);
    periodicTable.appendChild(elementCell);
  });
}

// Create an element cell for the periodic table
function createElementCell(element) {
  const elementCell = document.createElement('div');
  elementCell.className = 'element';
  elementCell.dataset.symbol = element.symbol;
  
  // Determine element roles in ASD processes - check across all papers
  const isGrowthSurface = Object.values(asdData.papers).some(paper => 
    paper.growthSurfaces && paper.growthSurfaces.some(surface => surface.element === element.symbol)
  );
  
  const isNonGrowthSurface = Object.values(asdData.papers).some(paper => 
    paper.nonGrowthSurfaces && paper.nonGrowthSurfaces.some(surface => surface.element === element.symbol)
  );
  
  const isGrownMaterial = Object.values(asdData.papers).some(paper => 
    paper.grownMaterials && paper.grownMaterials.some(material => material.element === element.symbol)
  );
  
  // Add role indicators container to all elements
  const indicatorsContainer = document.createElement('div');
  indicatorsContainer.className = 'role-indicators';
  
  // Create placeholders for all three indicators with fixed positions
  const growthIndicator = document.createElement('div');
  growthIndicator.className = 'role-indicator growth-position';
  if (isGrowthSurface) {
    growthIndicator.classList.add('growth-indicator');
  } else {
    growthIndicator.style.visibility = 'hidden';
  }
  
  const nonGrowthIndicator = document.createElement('div');
  nonGrowthIndicator.className = 'role-indicator non-growth-position';
  if (isNonGrowthSurface) {
    nonGrowthIndicator.classList.add('non-growth-indicator');
  } else {
    nonGrowthIndicator.style.visibility = 'hidden';
  }
  
  const grownIndicator = document.createElement('div');
  grownIndicator.className = 'role-indicator grown-position';
  if (isGrownMaterial) {
    grownIndicator.classList.add('grown-indicator');
  } else {
    grownIndicator.style.visibility = 'hidden';
  }
  
  // Add indicators in fixed order
  indicatorsContainer.appendChild(growthIndicator);
  indicatorsContainer.appendChild(nonGrowthIndicator);
  indicatorsContainer.appendChild(grownIndicator);
  
  elementCell.appendChild(indicatorsContainer);
  
  // Add element information
  const atomicNumberDiv = document.createElement('div');
  atomicNumberDiv.className = 'atomic-number';
  atomicNumberDiv.textContent = element.atomic_number;
  
  const symbolDiv = document.createElement('div');
  symbolDiv.className = 'symbol';
  symbolDiv.textContent = element.symbol;
  
  const nameDiv = document.createElement('div');
  nameDiv.className = 'name';
  nameDiv.textContent = element.name;
  
  elementCell.appendChild(atomicNumberDiv);
  elementCell.appendChild(symbolDiv);
  elementCell.appendChild(nameDiv);
  
  return elementCell;
}

// Set up event listeners
function setupEventListeners() {
  // Element click event
  document.querySelectorAll('.element').forEach(element => {
    element.addEventListener('click', () => {
      const symbol = element.dataset.symbol;
      showElementDetails(symbol);
    });
  });
  
  // Tab click event
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      tab.classList.add('active');
      
      // Hide all tab content
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      
      // Show selected tab content
      const tabId = tab.dataset.tab + '-content';
      document.getElementById(tabId).classList.add('active');
    });
  });
  
  // Search input event
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    
    // Filter elements based on search term
    document.querySelectorAll('.element').forEach(element => {
      const symbol = element.dataset.symbol.toLowerCase();
      const name = element.querySelector('.name').textContent.toLowerCase();
      
      if (symbol.includes(searchTerm) || name.includes(searchTerm)) {
        element.style.opacity = '1';
      } else {
        element.style.opacity = '0.3';
      }
    });
  });
}

// Show element details
function showElementDetails(symbol) {
  const element = elementsData.find(el => el.symbol === symbol);
  if (!element) return;
  
  // Update element details header
  document.getElementById('detail-symbol').textContent = element.symbol;
  document.getElementById('detail-symbol').style.backgroundColor = getElementColor(symbol);
  document.getElementById('detail-name').textContent = element.name;
  document.getElementById('detail-atomic-number').textContent = `Atomic Number: ${element.atomic_number}`;
  
  // Update tab content
  updateTabContent('growth-surface', symbol);
  updateTabContent('non-growth-surface', symbol);
  updateTabContent('grown-material', symbol);
  
  // Show element details section
  document.getElementById('element-details').classList.add('active');
  
  // Scroll to element details
  document.getElementById('element-details').scrollIntoView({ behavior: 'smooth' });
}

// Update tab content with papers
function updateTabContent(tabType, symbol) {
  const contentElement = document.getElementById(`${tabType}-content`);
  const papersElement = document.getElementById(`${tabType}-papers`);
  
  // Get papers for this element and tab type using the new DB structure
  let relevantPapers = [];
  
  if (tabType === 'growth-surface') {
    relevantPapers = Object.entries(asdData.papers)
      .filter(([doi, paper]) => 
        paper.growthSurfaces && paper.growthSurfaces.some(surface => surface.element === symbol)
      )
      .map(([doi, paper]) => {
        const surface = paper.growthSurfaces.find(surface => surface.element === symbol);
        return {
          doi,
          title: paper.title,
          authors: paper.authors,
          year: paper.year,
          compound: surface.compound,
          notes: surface.notes || paper.notes
        };
      });
  } else if (tabType === 'non-growth-surface') {
    relevantPapers = Object.entries(asdData.papers)
      .filter(([doi, paper]) => 
        paper.nonGrowthSurfaces && paper.nonGrowthSurfaces.some(surface => surface.element === symbol)
      )
      .map(([doi, paper]) => {
        const surface = paper.nonGrowthSurfaces.find(surface => surface.element === symbol);
        return {
          doi,
          title: paper.title,
          authors: paper.authors,
          year: paper.year,
          compound: surface.compound,
          notes: surface.notes || paper.notes
        };
      });
  } else if (tabType === 'grown-material') {
    relevantPapers = Object.entries(asdData.papers)
      .filter(([doi, paper]) => 
        paper.grownMaterials && paper.grownMaterials.some(material => material.element === symbol)
      )
      .map(([doi, paper]) => {
        const material = paper.grownMaterials.find(material => material.element === symbol);
        return {
          doi,
          title: paper.title,
          authors: paper.authors,
          year: paper.year,
          compound: material.compound,
          notes: material.notes || paper.notes
        };
      });
  }
  
  if (relevantPapers.length === 0) {
    papersElement.innerHTML = `<p>No ${tabType.replace('-', ' ')} data available for ${symbol}.</p>`;
    return;
  }
  
  // Group papers by compound
  const papersByCompound = {};
  relevantPapers.forEach(paper => {
    if (!papersByCompound[paper.compound]) {
      papersByCompound[paper.compound] = [];
    }
    papersByCompound[paper.compound].push(paper);
  });
  
  // Generate HTML for papers grouped by compound
  let html = '';
  for (const compound in papersByCompound) {
    html += `<div class="compound-group">`;
    html += `<h3>${compound}</h3>`;
    html += `<ul class="paper-list">`;
    
    papersByCompound[compound].forEach(paper => {
      html += `
        <li class="paper-item">
          <div class="paper-title">${paper.title}</div>
          <div class="paper-authors">${paper.authors} (${paper.year})</div>
          <div class="paper-doi">DOI: <a href="https://doi.org/${paper.doi}" target="_blank">${paper.doi}</a></div>
          <div class="paper-notes">${paper.notes}</div>
        </li>
      `;
    });
    
    html += `</ul></div>`;
  }
  
  papersElement.innerHTML = html;
}

// Get element color based on its role in ASD processes
function getElementColor(symbol) {
  const isGrowthSurface = Object.values(asdData.papers).some(paper => 
    paper.growthSurfaces && paper.growthSurfaces.some(surface => surface.element === symbol)
  );
  
  const isNonGrowthSurface = Object.values(asdData.papers).some(paper => 
    paper.nonGrowthSurfaces && paper.nonGrowthSurfaces.some(surface => surface.element === symbol)
  );
  
  const isGrownMaterial = Object.values(asdData.papers).some(paper => 
    paper.grownMaterials && paper.grownMaterials.some(material => material.element === symbol)
  );
  
  if (isGrowthSurface && isNonGrowthSurface && isGrownMaterial) {
    return 'var(--all-three-color)';
  } else if (isGrowthSurface && isNonGrowthSurface) {
    return 'var(--both-growth-non-growth-color)';
  } else if (isGrowthSurface && isGrownMaterial) {
    return 'var(--both-growth-grown-color)';
  } else if (isNonGrowthSurface && isGrownMaterial) {
    return 'var(--both-non-growth-grown-color)';
  } else if (isGrowthSurface) {
    return 'var(--growth-surface-color)';
  } else if (isNonGrowthSurface) {
    return 'var(--non-growth-surface-color)';
  } else if (isGrownMaterial) {
    return 'var(--grown-material-color)';
  } else {
    return '#888';
  }
}