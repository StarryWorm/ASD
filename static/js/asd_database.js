// asd_database.js - Comprehensive ASD database organized by paper DOI

// This file contains the complete database of ASD literature examples
// organized by paper DOI with associated growth surfaces, non-growth surfaces, 
// grown materials, and inhibitors for each paper

const asdDatabase = {
  papers: {
    "10.1021/acs.jpcc.0c00357": {
      id: 1,
      title: "Area-Selective Atomic Layer Deposition of TiO2 on Silicon Oxide Patterns with Distinct Hydrophobicity",
      authors: "Lemaire et al.",
      year: 2020,
      growthSurfaces: [
        { element: "Si", compound: "SiO2", notes: "Demonstrates selectivity based on surface hydrophobicity differences" }
      ],
      nonGrowthSurfaces: [],
      grownMaterials: [
        { element: "Ti", compound: "TiO2", notes: "Demonstrates selectivity based on surface hydrophobicity differences" }
      ],
      inhibitors: [
        { 
          name: "Hexamethyldisilazane (HMDS)",
          type: "SMI",
          target_surface: "SiO2",
          blocked_material: "TiO2",
          notes: "Creates hydrophobic surface to prevent TiO2 deposition"
        }
      ],
      notes: "Demonstrates selectivity based on surface hydrophobicity differences"
    },
    "10.1021/acsnano.7b04701": {
      id: 2,
      title: "Area-Selective Atomic Layer Deposition of SiO2 Using Acetylacetone as a Chemoselective Inhibitor in an ABC-Type Cycle",
      authors: "Mameli et al.",
      year: 2017,
      growthSurfaces: [
        { element: "Si", compound: "Si-H", notes: "Selective deposition on H-terminated Si vs. Al2O3, TiO2, and HfO2" },
        { element: "Ge", compound: "GeO2", notes: "Uses chemoselective inhibitor molecules in a three-step ALD cycle" },
        { element: "W", compound: "WO3", notes: "Uses chemoselective inhibitor molecules in a three-step ALD cycle" }
      ],
      nonGrowthSurfaces: [
        { element: "Al", compound: "Al2O3", notes: "Uses chemoselective inhibitor molecules in a three-step ALD cycle" },
        { element: "Ti", compound: "TiO2", notes: "Uses chemoselective inhibitor molecules in a three-step ALD cycle" },
        { element: "Hf", compound: "HfO2", notes: "Uses chemoselective inhibitor molecules in a three-step ALD cycle" }
      ],
      grownMaterials: [
        { element: "Si", compound: "SiO2", notes: "Uses chemoselective inhibitor molecules in a three-step ALD cycle" }
      ],
      inhibitors: [
        {
          name: "Acetylacetone (acac)",
          type: "SMI",
          target_surface: "Al2O3, TiO2, HfO2",
          blocked_material: "SiO2",
          notes: "Chemoselective inhibitor in ABC-type ALD cycle"
        }
      ],
      notes: "Uses chemoselective inhibitor molecules in a three-step ALD cycle"
    },
    "10.1021/acs.chemmater.8b04454": {
      id: 3,
      title: "Area-Selective Atomic Layer Deposition of Metal Oxides on Noble Metals through Catalytic Oxygen Activation",
      authors: "Mameli et al.",
      year: 2019,
      growthSurfaces: [
        { element: "Pt", compound: "Pt", notes: "Demonstrates selective deposition of metal oxides on noble metals" },
        { element: "Pd", compound: "Pd", notes: "Demonstrates selective deposition of metal oxides on noble metals" },
        { element: "Ru", compound: "Ru", notes: "Demonstrates selective deposition of metal oxides on noble metals" },
        { element: "Co", compound: "Co", notes: "Demonstrates selective deposition of metal oxides on noble metals" }
      ],
      nonGrowthSurfaces: [],
      grownMaterials: [],
      inhibitors: [],
      notes: "Demonstrates selective deposition of metal oxides on noble metals"
    },
    "10.1021/acs.chemmater.8b02735": {
      id: 4,
      title: "Area-Selective Atomic Layer Deposition of Ru on Cu by Using an Inhibitor",
      authors: "Huang et al.",
      year: 2018,
      growthSurfaces: [
        { element: "Cu", compound: "Cu", notes: "Demonstrates selective Ru deposition on Cu using thiol SAMs" }
      ],
      nonGrowthSurfaces: [],
      grownMaterials: [
        { element: "Ru", compound: "Ru", notes: "Demonstrates selective Ru deposition on Cu using thiol SAMs" }
      ],
      inhibitors: [
        {
          name: "Octadecanethiol (ODT)",
          type: "SAM",
          target_surface: "Cu",
          blocked_material: "Ru",
          notes: "Thiol-based SAM that selectively blocks Ru deposition on Cu"
        }
      ],
      notes: "Demonstrates selective Ru deposition on Cu using thiol SAMs"
    },
    "10.1038/s41467-024-46293-w": {
      id: 5,
      title: "Area-selective atomic layer deposition on 2D monolayer lateral superlattices",
      authors: "Park et al.",
      year: 2024,
      growthSurfaces: [
        { element: "Mo", compound: "MoSe2", notes: "Achieves sub-10 nm half pitch size using 2D superlattice template" }
      ],
      nonGrowthSurfaces: [
        { element: "Mo", compound: "MoS2", notes: "Achieves sub-10 nm half pitch size using 2D superlattice template" }
      ],
      grownMaterials: [
        { element: "Ru", compound: "Ru", notes: "Achieves sub-10 nm half pitch size using 2D superlattice template" },
        { element: "Al", compound: "Al2O3", notes: "Achieves sub-10 nm half pitch size using 2D superlattice template" },
        { element: "Hf", compound: "HfO2", notes: "Achieves sub-10 nm half pitch size using 2D superlattice template" },
        { element: "Te", compound: "Te", notes: "Achieves sub-10 nm half pitch size using 2D superlattice template" },
        { element: "Sb", compound: "Sb2Se3", notes: "Achieves sub-10 nm half pitch size using 2D superlattice template" }
      ],
      inhibitors: [],
      notes: "Achieves sub-10 nm half pitch size using 2D superlattice template"
    },
    "10.1021/acs.chemmater.0c02588": {
      id: 6,
      title: "Area-Selective Deposition of Ruthenium by Area-Dependent Surface Diffusion",
      authors: "Vos et al.",
      year: 2021,
      growthSurfaces: [],
      nonGrowthSurfaces: [
        { element: "Si", compound: "SiO2", notes: "Demonstrates selective deposition based on surface diffusion mechanism" }
      ],
      grownMaterials: [],
      inhibitors: [],
      notes: "Demonstrates selective deposition based on surface diffusion mechanism"
    },
    "10.1021/am300140p": {
      id: 7,
      title: "Selective Atomic Layer Deposition with Electron-Beam Patterned Self-Assembled Monolayers",
      authors: "Färm et al.",
      year: 2012,
      growthSurfaces: [],
      nonGrowthSurfaces: [
        { element: "Cu", compound: "Cu", notes: "Uses SAMs to block deposition on Cu surfaces" },
        { element: "Au", compound: "Au", notes: "Uses SAMs to block deposition on Au surfaces" },
        { element: "Ag", compound: "Ag", notes: "Uses SAMs to block deposition on Ag surfaces" }
      ],
      grownMaterials: [],
      inhibitors: [
        {
          name: "Dodecanethiol",
          type: "SAM",
          target_surface: "Au, Ag, Cu",
          blocked_material: "Various oxides",
          notes: "Thiol-based SAM for blocking oxide deposition on noble metals"
        }
      ],
      notes: "Uses SAMs to block deposition on metal surfaces"
    },
    "10.1016/j.apsusc.2024.159936": {
      id: 8,
      title: "Blocking mechanisms in area-selective ALD by small molecule inhibitors of different sizes",
      authors: "Verkuijlen et al.",
      year: 2024,
      growthSurfaces: [],
      nonGrowthSurfaces: [
        { element: "Al", compound: "Al2O3", notes: "Explores inhibition of SiO2 ALD on Al2O3 surfaces comparing three SMIs of different sizes" }
      ],
      grownMaterials: [
        { element: "Si", compound: "SiO2", notes: "Explores inhibition of SiO2 ALD on Al2O3 surfaces comparing three SMIs of different sizes" }
      ],
      inhibitors: [
        {
          name: "Dimethylaminotrimethylsilane (DMATMS)",
          type: "SMI",
          target_surface: "Al2O3",
          blocked_material: "SiO2",
          notes: "Small molecule inhibitor for blocking SiO2 ALD"
        },
        {
          name: "Dimethylaminopentamethyldisiloxane (DMAPMDSO)",
          type: "SMI",
          target_surface: "Al2O3",
          blocked_material: "SiO2",
          notes: "Medium-sized molecule inhibitor for blocking SiO2 ALD"
        },
        {
          name: "Bis(dimethylamino)tetramethyldisiloxane (BDMATMDSO)",
          type: "SMI",
          target_surface: "Al2O3",
          blocked_material: "SiO2",
          notes: "Large molecule inhibitor for blocking SiO2 ALD"
        }
      ],
      notes: "Explores inhibition of SiO2 ALD on Al2O3 surfaces comparing three SMIs of different sizes"
    },
    "10.1021/acs.chemmater.7b04380": {
      id: 9,
      title: "Area-Selective Atomic Layer Deposition of Tungsten Oxide Thin Films",
      authors: "Stevens et al.",
      year: 2018,
      growthSurfaces: [],
      nonGrowthSurfaces: [],
      grownMaterials: [
        { element: "W", compound: "WO3", notes: "Selective deposition of tungsten oxide using surface functionalization" }
      ],
      inhibitors: [],
      notes: "Selective deposition of tungsten oxide using surface functionalization"
    },
    "10.1021/cm303424h": {
      id: 10,
      title: "Area-Selective Atomic Layer Deposition of ZnO by Area Activation",
      authors: "Mackus et al.",
      year: 2013,
      growthSurfaces: [],
      nonGrowthSurfaces: [],
      grownMaterials: [
        { element: "Zn", compound: "ZnO", notes: "Selective deposition using area activation approach" }
      ],
      inhibitors: [],
      notes: "Selective deposition using area activation approach"
    },
    "10.1021/acs.chemmater.0c01251": {
      id: 11,
      title: "Area-Selective Atomic Layer Deposition of Cobalt Oxide",
      authors: "Kerrigan et al.",
      year: 2020,
      growthSurfaces: [],
      nonGrowthSurfaces: [],
      grownMaterials: [
        { element: "Co", compound: "Co3O4", notes: "Selective deposition of cobalt oxide using surface functionalization" }
      ],
      inhibitors: [],
      notes: "Selective deposition of cobalt oxide using surface functionalization"
    }
  }
};

// Helper functions to query the database

// Get all elements used as growth surfaces
function getGrowthSurfaceElements() {
  const elements = new Set();
  Object.values(asdDatabase.papers).forEach(paper => {
    paper.growthSurfaces.forEach(surface => {
      elements.add(surface.element);
    });
  });
  return Array.from(elements);
}

// Get all elements used as non-growth surfaces
function getNonGrowthSurfaceElements() {
  const elements = new Set();
  Object.values(asdDatabase.papers).forEach(paper => {
    paper.nonGrowthSurfaces.forEach(surface => {
      elements.add(surface.element);
    });
  });
  return Array.from(elements);
}

// Get all elements used as grown materials
function getGrownMaterialElements() {
  const elements = new Set();
  Object.values(asdDatabase.papers).forEach(paper => {
    paper.grownMaterials.forEach(material => {
      elements.add(material.element);
    });
  });
  return Array.from(elements);
}

// Get papers where an element is used as a specific role
function getPapersForElementRole(element, role) {
  return Object.entries(asdDatabase.papers)
    .filter(([doi, paper]) => {
      if (role === 'growthSurface') {
        return paper.growthSurfaces.some(surface => surface.element === element);
      } else if (role === 'nonGrowthSurface') {
        return paper.nonGrowthSurfaces.some(surface => surface.element === element);
      } else if (role === 'grownMaterial') {
        return paper.grownMaterials.some(material => material.element === element);
      }
      return false;
    })
    .map(([doi, paper]) => ({ doi, ...paper }));
}

// Get all inhibitors related to an element
function getInhibitorsForElement(element) {
  const inhibitors = [];
  Object.values(asdDatabase.papers).forEach(paper => {
    if (paper.inhibitors && paper.inhibitors.length > 0) {
      paper.inhibitors.forEach(inhibitor => {
        if (
          inhibitor.target_surface.includes(element) || 
          inhibitor.blocked_material.includes(element)
        ) {
          inhibitors.push(inhibitor);
        }
      });
    }
  });
  return inhibitors;
}

// Export the database and helper functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    asdDatabase,
    getGrowthSurfaceElements,
    getNonGrowthSurfaceElements,
    getGrownMaterialElements,
    getPapersForElementRole,
    getInhibitorsForElement
  };
}
