// main.js - Interactive Periodic Table for ASD Database

// Global variables
let elementsData = [];
let asdData = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Load ASD database
    asdData = await loadAsdDatabase();
    
    // Load elements data
    const elementsResponse = await fetch('static/data/elements.json');
    if (!elementsResponse.ok) {
      throw new Error(`Failed to load elements data: ${elementsResponse.statusText}`);
    }
    
    const elementsJson = await elementsResponse.json();
    elementsData = elementsJson.elements;
    
    // Create the periodic table
    createPeriodicTable();
    
    // Set up event listeners
    setupEventListeners();
    
    // Add inhibitors tab if the function exists
    if (typeof addInhibitorsTab === 'function') {
      addInhibitorsTab();
    }
  } catch (error) {
    console.error('Error initializing application:', error);
    document.getElementById('periodic-table').innerHTML = 
      `<div class="error-message">Error loading data: ${error.message}. Please check the console for details.</div>`;
  }
});

// Create the periodic table
function createPeriodicTable() {
  const periodicTable = document.getElementById('periodic-table');
  periodicTable.innerHTML = '';
  
  // Define the layout of the periodic table
  const layout = [
    // Period 1
    { period: 1, group: 1 }, { period: 1, group: 18 },
    // Period 2
    { period: 2, group: 1 }, { period: 2, group: 2 }, 
    { period: 2, group: 13 }, { period: 2, group: 14 }, { period: 2, group: 15 }, 
    { period: 2, group: 16 }, { period: 2, group: 17 }, { period: 2, group: 18 },
    // Period 3
    { period: 3, group: 1 }, { period: 3, group: 2 }, 
    { period: 3, group: 13 }, { period: 3, group: 14 }, { period: 3, group: 15 }, 
    { period: 3, group: 16 }, { period: 3, group: 17 }, { period: 3, group: 18 },
    // Period 4
    { period: 4, group: 1 }, { period: 4, group: 2 }, 
    { period: 4, group: 3 }, { period: 4, group: 4 }, { period: 4, group: 5 }, 
    { period: 4, group: 6 }, { period: 4, group: 7 }, { period: 4, group: 8 },
    { period: 4, group: 9 }, { period: 4, group: 10 }, { period: 4, group: 11 }, 
    { period: 4, group: 12 }, { period: 4, group: 13 }, { period: 4, group: 14 }, 
    { period: 4, group: 15 }, { period: 4, group: 16 }, { period: 4, group: 17 }, { period: 4, group: 18 },
    // Period 5
    { period: 5, group: 1 }, { period: 5, group: 2 }, 
    { period: 5, group: 3 }, { period: 5, group: 4 }, { period: 5, group: 5 }, 
    { period: 5, group: 6 }, { period: 5, group: 7 }, { period: 5, group: 8 },
    { period: 5, group: 9 }, { period: 5, group: 10 }, { period: 5, group: 11 }, 
    { period: 5, group: 12 }, { period: 5, group: 13 }, { period: 5, group: 14 }, 
    { period: 5, group: 15 }, { period: 5, group: 16 }, { period: 5, group: 17 }, { period: 5, group: 18 },
    // Period 6
    { period: 6, group: 1 }, { period: 6, group: 2 }, 
    { period: 6, group: 3 }, { period: 6, group: 4 }, { period: 6, group: 5 }, 
    { period: 6, group: 6 }, { period: 6, group: 7 }, { period: 6, group: 8 },
    { period: 6, group: 9 }, { period: 6, group: 10 }, { period: 6, group: 11 }, 
    { period: 6, group: 12 }, { period: 6, group: 13 }, { period: 6, group: 14 }, 
    { period: 6, group: 15 }, { period: 6, group: 16 }, { period: 6, group: 17 }, { period: 6, group: 18 },
    // Period 7
    { period: 7, group: 1 }, { period: 7, group: 2 }, 
    { period: 7, group: 3 }, { period: 7, group: 4 }, { period: 7, group: 5 }, 
    { period: 7, group: 6 }, { period: 7, group: 7 }, { period: 7, group: 8 },
    { period: 7, group: 9 }, { period: 7, group: 10 }, { period: 7, group: 11 }, 
    { period: 7, group: 12 }, { period: 7, group: 13 }, { period: 7, group: 14 }, 
    { period: 7, group: 15 }, { period: 7, group: 16 }, { period: 7, group: 17 }, { period: 7, group: 18 }
  ];
  
  // Insert placeholders for the grid layout
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 18; j++) {
      const cell = document.createElement('div');
      cell.className = 'element empty';
      cell.style.gridRow = i + 1;
      cell.style.gridColumn = j + 1;
      periodicTable.appendChild(cell);
    }
  }
  
  // Create element cells based on layout
  layout.forEach(position => {
    const element = elementsData.find(el => el.period === position.period && el.group === position.group);
    
    if (element) {
      const elementCell = createElementCell(element);
      elementCell.style.gridRow = position.period;
      elementCell.style.gridColumn = position.group;
      periodicTable.appendChild(elementCell);
    }
  });
  
  // Add spacer for lanthanides and actinides
  const spacer = document.createElement('div');
  spacer.className = 'f-block-spacer';
  periodicTable.appendChild(spacer);
  
  // Add lanthanides and actinides labels
  const lanthanideLabel = document.createElement('div');
  lanthanideLabel.className = 'f-block-label';
  lanthanideLabel.textContent = 'Lanthanoids';
  lanthanideLabel.style.gridColumn = '1 / span 2';
  periodicTable.appendChild(lanthanideLabel);
  
  // Add lanthanides row
  const lanthanides = elementsData.filter(el => el.category === 'lanthanide');
  lanthanides.forEach((element, index) => {
    const elementCell = createElementCell(element);
    elementCell.style.gridColumn = index + 3;
    periodicTable.appendChild(elementCell);
  });
  
  // Add another spacer
  const spacer2 = document.createElement('div');
  spacer2.className = 'f-block-spacer';
  spacer2.style.height = '5px';
  periodicTable.appendChild(spacer2);
  
  // Add actinides label
  const actinideLabel = document.createElement('div');
  actinideLabel.className = 'f-block-label';
  actinideLabel.textContent = 'Actinoids';
  actinideLabel.style.gridColumn = '1 / span 2';
  periodicTable.appendChild(actinideLabel);
  
  // Add actinides row
  const actinides = elementsData.filter(el => el.category === 'actinide');
  actinides.forEach((element, index) => {
    const elementCell = createElementCell(element);
    elementCell.style.gridColumn = index + 3; 
    periodicTable.appendChild(elementCell);
  });
}

// Create an element cell for the periodic table
function createElementCell(element) {
  const elementCell = document.createElement('div');
  elementCell.className = `element ${element.category.replace(/ /g, '-')}`;
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
  
  // Add role indicators container
  const indicatorsContainer = document.createElement('div');
  indicatorsContainer.className = 'role-indicators';
  
  // Always create all three indicators in fixed positions
  // Growth indicator (green) - always on top
  const growthIndicator = document.createElement('div');
  growthIndicator.className = 'role-indicator';
  if (isGrowthSurface) {
    growthIndicator.classList.add('growth-indicator');
  } else {
    growthIndicator.style.visibility = 'hidden';
  }
  indicatorsContainer.appendChild(growthIndicator);
  
  // Non-growth indicator (orange) - always in middle
  const nonGrowthIndicator = document.createElement('div');
  nonGrowthIndicator.className = 'role-indicator';
  if (isNonGrowthSurface) {
    nonGrowthIndicator.classList.add('non-growth-indicator');
  } else {
    nonGrowthIndicator.style.visibility = 'hidden';
  }
  indicatorsContainer.appendChild(nonGrowthIndicator);
  
  // Grown material indicator (blue) - always at bottom
  const grownIndicator = document.createElement('div');
  grownIndicator.className = 'role-indicator';
  if (isGrownMaterial) {
    grownIndicator.classList.add('grown-indicator');
  } else {
    grownIndicator.style.visibility = 'hidden';
  }
  indicatorsContainer.appendChild(grownIndicator);
  
  elementCell.appendChild(indicatorsContainer);
  
  // Add atomic number
  const atomicNumberDiv = document.createElement('div');
  atomicNumberDiv.className = 'atomic-number';
  atomicNumberDiv.textContent = element.atomic_number;
  elementCell.appendChild(atomicNumberDiv);
  
  // Add element symbol
  const symbolDiv = document.createElement('div');
  symbolDiv.className = 'symbol';
  symbolDiv.textContent = element.symbol;
  elementCell.appendChild(symbolDiv);
  
  // Add element name
  const nameDiv = document.createElement('div');
  nameDiv.className = 'name';
  nameDiv.textContent = element.name;
  elementCell.appendChild(nameDiv);
  
  return elementCell;
}

// Set up event listeners
function setupEventListeners() {
  // Element click event
  document.addEventListener('click', (event) => {
    const element = event.target.closest('.element:not(.empty)');
    if (element) {
      const symbol = element.dataset.symbol;
      showElementDetails(symbol);
    }
  });
  
  // Close button event - not needed when it's at the bottom of the page
  /*
  document.getElementById('close-details').addEventListener('click', () => {
    document.getElementById('element-details').classList.remove('active');
  });
  */
  
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
    document.querySelectorAll('.element:not(.empty)').forEach(element => {
      const symbol = element.dataset.symbol.toLowerCase();
      const name = element.querySelector('.name').textContent.toLowerCase();
      
      // Check if element matches by symbol or name
      let isMatch = symbol.includes(searchTerm) || name.includes(searchTerm);
      
      // If no direct match, check papers for author match
      if (!isMatch && asdData && asdData.papers) {
        // Check if any papers related to this element have the author
        const elementSymbol = element.dataset.symbol;
        
        // Check growth surfaces
        isMatch = isMatch || Object.values(asdData.papers).some(paper => 
          paper.growthSurfaces && 
          paper.growthSurfaces.some(surface => surface.element === elementSymbol) &&
          paper.authors.toLowerCase().includes(searchTerm)
        );
        
        // Check non-growth surfaces
        isMatch = isMatch || Object.values(asdData.papers).some(paper => 
          paper.nonGrowthSurfaces && 
          paper.nonGrowthSurfaces.some(surface => surface.element === elementSymbol) &&
          paper.authors.toLowerCase().includes(searchTerm)
        );
        
        // Check grown materials
        isMatch = isMatch || Object.values(asdData.papers).some(paper => 
          paper.grownMaterials && 
          paper.grownMaterials.some(material => material.element === elementSymbol) &&
          paper.authors.toLowerCase().includes(searchTerm)
        );
      }
      
      // Set opacity based on match result
      element.style.opacity = isMatch ? '1' : '0.3';
    });
  });
  
  // ESC key to close element details - no longer needed when at bottom of page
  /*
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      document.getElementById('element-details').classList.remove('active');
    }
  });
  */
}

// Show element details
function showElementDetails(symbol) {
  const element = elementsData.find(el => el.symbol === symbol);
  if (!element) return;
  
  // Update element details header
  document.getElementById('detail-symbol').textContent = element.symbol;
  document.getElementById('detail-symbol').className = `element-symbol ${element.category.replace(/ /g, '-')}`;
  document.getElementById('detail-name').textContent = element.name;
  document.getElementById('detail-atomic-number').textContent = `Atomic Number: ${element.atomic_number}`;
  
  // Update tab content
  updateTabContent('growth-surface', symbol);
  updateTabContent('non-growth-surface', symbol);
  updateTabContent('grown-material', symbol);
  
  // Show element details section
  document.getElementById('element-details').classList.add('active');
}

// Update tab content with papers
function updateTabContent(tabType, symbol) {
  const contentElement = document.getElementById(`${tabType}-content`);
  const papersElement = document.getElementById(`${tabType}-papers`);
  
  // Get papers for this element and tab type
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
          ${paper.notes ? `<div class="paper-notes">${paper.notes}</div>` : ''}
        </li>
      `;
    });
    
    html += `</ul></div>`;
  }
  
  papersElement.innerHTML = html;
}

// Function to load ASD database
async function loadAsdDatabase() {
  try {
    const response = await fetch('static/data/asd_database.json');
    if (!response.ok) {
      throw new Error(`Failed to load database: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading ASD database:', error);
    throw error;
  }
}