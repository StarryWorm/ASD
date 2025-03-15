// asd_database.js - Functions for handling ASD database data

// Global variable to store the loaded database
let asdDatabase = null;

// Function to load the ASD database
async function loadAsdDatabase() {
  try {
    const response = await fetch('static/data/asd_database.json');
    if (!response.ok) {
      throw new Error(`Failed to load database: ${response.statusText}`);
    }
    asdDatabase = await response.json();
    console.log('ASD database loaded successfully');
    return asdDatabase;
  } catch (error) {
    console.error('Error loading ASD database:', error);
    throw error;
  }
}

// Get all elements used as growth surfaces
function getGrowthSurfaceElements() {
  if (!asdDatabase) {
    console.error('ASD database not loaded');
    return [];
  }
  
  const elements = new Set();
  Object.values(asdDatabase.papers).forEach(paper => {
    if (paper.growthSurfaces) {
      paper.growthSurfaces.forEach(surface => {
        elements.add(surface.element);
      });
    }
  });
  return Array.from(elements);
}

// Get all elements used as non-growth surfaces
function getNonGrowthSurfaceElements() {
  if (!asdDatabase) {
    console.error('ASD database not loaded');
    return [];
  }
  
  const elements = new Set();
  Object.values(asdDatabase.papers).forEach(paper => {
    if (paper.nonGrowthSurfaces) {
      paper.nonGrowthSurfaces.forEach(surface => {
        elements.add(surface.element);
      });
    }
  });
  return Array.from(elements);
}

// Get all elements used as grown materials
function getGrownMaterialElements() {
  if (!asdDatabase) {
    console.error('ASD database not loaded');
    return [];
  }
  
  const elements = new Set();
  Object.values(asdDatabase.papers).forEach(paper => {
    if (paper.grownMaterials) {
      paper.grownMaterials.forEach(material => {
        elements.add(material.element);
      });
    }
  });
  return Array.from(elements);
}

// Get papers where an element is used as a specific role
function getPapersForElementRole(element, role) {
  if (!asdDatabase) {
    console.error('ASD database not loaded');
    return [];
  }
  
  return Object.entries(asdDatabase.papers)
    .filter(([doi, paper]) => {
      if (role === 'growthSurface') {
        return paper.growthSurfaces && paper.growthSurfaces.some(surface => surface.element === element);
      } else if (role === 'nonGrowthSurface') {
        return paper.nonGrowthSurfaces && paper.nonGrowthSurfaces.some(surface => surface.element === element);
      } else if (role === 'grownMaterial') {
        return paper.grownMaterials && paper.grownMaterials.some(material => material.element === element);
      }
      return false;
    })
    .map(([doi, paper]) => ({ doi, ...paper }));
}

// Get all inhibitors related to an element
function getInhibitorsForElement(element) {
  if (!asdDatabase) {
    console.error('ASD database not loaded');
    return [];
  }
  
  const inhibitors = [];
  Object.entries(asdDatabase.papers).forEach(([doi, paper]) => {
    if (paper.inhibitors && paper.inhibitors.length > 0) {
      paper.inhibitors.forEach(inhibitor => {
        if (
          inhibitor.target_surface.includes(element) || 
          inhibitor.blocked_material.includes(element)
        ) {
          inhibitors.push({
            ...inhibitor,
            doi: doi
          });
        }
      });
    }
  });
  return inhibitors;
}

// Make these functions available globally
window.loadAsdDatabase = loadAsdDatabase;
window.getGrowthSurfaceElements = getGrowthSurfaceElements;
window.getNonGrowthSurfaceElements = getNonGrowthSurfaceElements;
window.getGrownMaterialElements = getGrownMaterialElements;
window.getPapersForElementRole = getPapersForElementRole;
window.getInhibitorsForElement = getInhibitorsForElement;