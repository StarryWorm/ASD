// inhibitors.js - Functions for handling inhibitor data in ASD Database

// Add inhibitors tab to element details
function addInhibitorsTab() {
  const tabsContainer = document.querySelector('.tabs');
  const tabsContent = document.getElementById('element-details');
  
  // Add inhibitors tab
  const inhibitorsTab = document.createElement('div');
  inhibitorsTab.className = 'tab';
  inhibitorsTab.dataset.tab = 'inhibitors';
  inhibitorsTab.textContent = 'Inhibitors';
  tabsContainer.appendChild(inhibitorsTab);
  
  // Add inhibitors content
  const inhibitorsContent = document.createElement('div');
  inhibitorsContent.className = 'tab-content';
  inhibitorsContent.id = 'inhibitors-content';
  inhibitorsContent.innerHTML = '<div id="inhibitors-data"></div>';
  tabsContent.appendChild(inhibitorsContent);
  
  // Update tab click event to include new tab
  inhibitorsTab.addEventListener('click', () => {
    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    // Add active class to clicked tab
    inhibitorsTab.classList.add('active');
    
    // Hide all tab content
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('active');
    });
    
    // Show inhibitors tab content
    document.getElementById('inhibitors-content').classList.add('active');
    
    // Get current element symbol
    const symbol = document.getElementById('detail-symbol').textContent;
    updateInhibitorsContent(symbol);
  });
}

// Update inhibitors tab content
function updateInhibitorsContent(symbol) {
  const inhibitorsDataElement = document.getElementById('inhibitors-data');
  
  // Find inhibitors relevant to this element
  const relevantInhibitors = findRelevantInhibitors(symbol);
  
  if (relevantInhibitors.length === 0) {
    inhibitorsDataElement.innerHTML = `<p>No inhibitor data available for ${symbol}.</p>`;
    return;
  }
  
  // Group inhibitors by type (SAM or SMI)
  const inhibitorsByType = {
    'SAM': [],
    'SMI': []
  };
  
  relevantInhibitors.forEach(inhibitor => {
    if (inhibitor.type in inhibitorsByType) {
      inhibitorsByType[inhibitor.type].push(inhibitor);
    }
  });
  
  // Generate HTML for inhibitors grouped by type
  let html = '';
  
  // SAM inhibitors
  if (inhibitorsByType['SAM'].length > 0) {
    html += `<div class="inhibitor-group">`;
    html += `<h3>Self-Assembled Monolayers (SAM)</h3>`;
    html += `<ul class="inhibitor-list">`;
    
    inhibitorsByType['SAM'].forEach(inhibitor => {
      html += `
        <li class="inhibitor-item">
          <div class="inhibitor-name">${inhibitor.name}</div>
          <div class="inhibitor-target">Target Surface: ${inhibitor.target_surface}</div>
          <div class="inhibitor-blocked">Blocked Material: ${inhibitor.blocked_material}</div>
          <div class="inhibitor-doi">DOI: <a href="https://doi.org/${inhibitor.doi}" target="_blank">${inhibitor.doi}</a></div>
          <div class="inhibitor-notes">${inhibitor.notes}</div>
        </li>
      `;
    });
    
    html += `</ul></div>`;
  }
  
  // SMI inhibitors
  if (inhibitorsByType['SMI'].length > 0) {
    html += `<div class="inhibitor-group">`;
    html += `<h3>Small Molecule Inhibitors (SMI)</h3>`;
    html += `<ul class="inhibitor-list">`;
    
    inhibitorsByType['SMI'].forEach(inhibitor => {
      html += `
        <li class="inhibitor-item">
          <div class="inhibitor-name">${inhibitor.name}</div>
          <div class="inhibitor-target">Target Surface: ${inhibitor.target_surface}</div>
          <div class="inhibitor-blocked">Blocked Material: ${inhibitor.blocked_material}</div>
          <div class="inhibitor-doi">DOI: <a href="https://doi.org/${inhibitor.doi}" target="_blank">${inhibitor.doi}</a></div>
          <div class="inhibitor-notes">${inhibitor.notes}</div>
        </li>
      `;
    });
    
    html += `</ul></div>`;
  }
  
  inhibitorsDataElement.innerHTML = html;
}

// Find inhibitors relevant to the selected element
function findRelevantInhibitors(symbol) {
  const element = elementsData.find(el => el.symbol === symbol);
  if (!element) return [];
  
  const relevantInhibitors = [];
  
  // Search through all papers for inhibitors related to this element
  Object.entries(asdData.papers).forEach(([doi, paper]) => {
    if (paper.inhibitors && paper.inhibitors.length > 0) {
      paper.inhibitors.forEach(inhibitor => {
        // Check if the element is mentioned in target surface or blocked material
        if (
          inhibitor.target_surface.includes(symbol) || 
          inhibitor.blocked_material.includes(symbol) ||
          inhibitor.target_surface.includes(element.name) ||
          inhibitor.blocked_material.includes(element.name)
        ) {
          // Add DOI to the inhibitor object for reference
          relevantInhibitors.push({
            ...inhibitor,
            doi: doi
          });
        }
      });
    }
  });
  
  return relevantInhibitors;
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    addInhibitorsTab,
    updateInhibitorsContent,
    findRelevantInhibitors
  };
}