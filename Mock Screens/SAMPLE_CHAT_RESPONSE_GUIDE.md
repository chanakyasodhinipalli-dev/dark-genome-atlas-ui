# Chat API Response Guide

## Overview

This guide explains the comprehensive Chat API response structure used in the Dark Genome Atlas backend. The sample response demonstrates all available features, tools, and data types.

**Sample File**: [sample_chat_response.json](sample_chat_response.json)

---

## Response Structure

### Top-Level Fields

```json
{
  "assistant_text": "...",      // Main response text (markdown formatted)
  "refusal": null,               // Refusal info if query was blocked
  "citations": [...],            // Source citations
  "cards": [...],                // Structured UI cards for rich display
  "actions": [...],              // User actions (buttons, links)
  "trace": {...},                // Execution trace for debugging
  "session_id": "..."            // Session identifier
}
```

---

## 1. Assistant Text

**Type**: `string`
**Format**: Markdown-formatted text

**Purpose**: Primary response text displayed to the user

**Features**:
- Markdown formatting (bold, lists, headers)
- Summary of findings
- Key insights and recommendations
- References to detailed cards below

**Example**:
```markdown
I found comprehensive information about the TP53 protein...

**Key Findings:**

1. **Protein Information:**
   - Gene: TP53 (Homo sapiens)
   - UniProt ID: P04637
   ...
```

---

## 2. Refusal

**Type**: `RefusalInfo | null`
**When Used**: Query blocked by gatekeeper agent

**Structure**:
```json
{
  "code": "HARMFUL_QUERY",
  "message": "This query was blocked as it may involve harmful content",
  "details": {
    "category": "biological_weapon",
    "severity": "high"
  }
}
```

**Refusal Codes**:
- `HARMFUL_QUERY` - Potentially harmful or dangerous query
- `RATE_LIMIT` - Rate limit exceeded
- `INVALID_INPUT` - Malformed or invalid input
- `INSUFFICIENT_PERMISSIONS` - User lacks required permissions

**In Sample**: `null` (query was approved)

---

## 3. Citations

**Type**: `list[Citation]`
**Purpose**: Source attribution and evidence tracking

### Citation Structure

```json
{
  "source": "UniProt",           // Source type
  "url": "https://...",          // Link to source (if available)
  "evidence_id": "P04637",       // Specific identifier
  "snippet": "..."               // Relevant text excerpt
}
```

### Source Types

| Source | Description | Example Use |
|--------|-------------|-------------|
| `UniProt` | UniProt protein database | Protein annotations, functions |
| `AlphaFold DB` | AlphaFold structure predictions | Predicted 3D structures |
| `PDB` | Protein Data Bank | Experimental structures |
| `ChEMBL` | Chemical bioactivity database | Drug interactions, compounds |
| `Local` | Local protein database | Dark genome proteins |
| `RAG` | Vector similarity search | Related proteins, neighbors |

### Example Citations in Sample

1. **UniProt Citation**: Protein function and annotations
2. **AlphaFold Citation**: Structure prediction with confidence scores
3. **PDB Citations**: Multiple experimental structures (6GGA, 4HJE)
4. **ChEMBL Citation**: Drug compounds and bioactivity
5. **Local Citation**: Dark genome database entry
6. **RAG Citation**: Similar proteins from vector search

---

## 4. Cards

**Type**: `list[UICard]`
**Purpose**: Structured data for rich UI display

### Card Structure

```json
{
  "type": "protein_summary",     // Card type
  "title": "...",                // Display title
  "source_badges": [...],        // Data source badges
  "fields": [...]                // Card content fields
}
```

### Card Types

#### 4.1 Protein Summary Card

**Type**: `protein_summary`
**Purpose**: Main protein information

**Fields**:
- Gene symbol, UniProt ID, Organism
- Length, Molecular weight
- Subcellular location (badges)
- Function description
- Gene type

**Example**:
```json
{
  "type": "protein_summary",
  "title": "TP53 - Tumor Protein P53",
  "source_badges": ["UniProt", "Local DB"],
  "fields": [
    {"label": "Gene Symbol", "value": "TP53", "type": "text"},
    {"label": "UniProt ID", "value": "P04637", "type": "link", "url": "..."},
    {"label": "Length", "value": "393 aa", "type": "text"}
  ]
}
```

#### 4.2 Physicochemical Properties Card

**Type**: `physicochemical_properties`
**Purpose**: Computed protein properties

**Fields**:
- Theoretical pI
- Instability Index (with threshold and status)
- Aliphatic Index
- GRAVY (hydropathy)
- Stability classification

**Visual Elements**:
- Colored badges (stable=green, unstable=red)
- Threshold indicators
- Metric descriptions

#### 4.3 Structure Summary Card

**Type**: `structure_summary`
**Purpose**: 3D structure availability

**Fields**:
- AlphaFold prediction availability
- Average pLDDT (confidence score)
- High confidence region percentage
- Number of experimental structures
- Best resolution
- Key protein domains

#### 4.4 PDB Structures Card

**Type**: `pdb_structures`
**Purpose**: Experimental structure details

**Fields** (array of structures):
- PDB ID
- Structure title
- Resolution
- Method (X-ray, Cryo-EM, NMR)
- Release date
- Direct PDB link

**Example**:
```json
{
  "pdb_id": "6GGA",
  "title": "DNA-binding domain bound to DNA",
  "resolution": "1.8 Å",
  "method": "X-ray diffraction",
  "release_date": "2018-03-14",
  "url": "https://www.rcsb.org/structure/6GGA"
}
```

#### 4.5 Similar Proteins Card

**Type**: `similar_proteins`
**Purpose**: Related protein discoveries

**Fields** (array of neighbors):
- Protein ID, Gene symbol, Accession
- Similarity score (0-1)
- Description
- Similarity method

**Methods**:
- `sequence_similarity` - Sequence-based
- `structural_similarity` - Structure-based
- `functional_similarity` - Function-based

#### 4.6 Drug Interactions Card

**Type**: `drug_interactions`
**Purpose**: Bioactive compounds and drugs

**Fields** (array of compounds):
- Compound name
- ChEMBL ID
- Activity description
- Clinical phase
- Target activity (IC50, EC50, Ki)
- ChEMBL link

**Example**:
```json
{
  "compound_name": "APR-246 (Eprenetapopt)",
  "chembl_id": "CHEMBL4297238",
  "activity": "Reactivates mutant p53",
  "phase": "Phase 3 Clinical Trial",
  "target_activity": "EC50: 1.2 μM",
  "url": "https://..."
}
```

#### 4.7 Genomic Location Card

**Type**: `genomic_location`
**Purpose**: Chromosomal location

**Fields**:
- Chromosome
- Cytogenetic location
- Genomic coordinates
- Strand orientation
- Number of exons

---

## 5. Actions

**Type**: `list[UIAction]`
**Purpose**: Interactive user actions (buttons, links)

### Action Structure

```json
{
  "type": "view_3d_structure",   // Action type
  "label": "View Structure",     // Button label
  "payload": {...}               // Action-specific data
}
```

### Action Types

#### 5.1 View 3D Structure

**Type**: `view_3d_structure`
**Purpose**: Load 3D structure viewer

**Payload**:
```json
{
  "source": "alphafold",         // or "pdb"
  "protein_id": "HUMAN_TP53",
  "accession": "P04637",
  "structure_url": "https://...",
  "confidence_url": "..."        // AlphaFold only
}
```

#### 5.2 Compare Structures

**Type**: `compare_structures`
**Purpose**: Side-by-side structure comparison

**Payload**:
```json
{
  "protein_id": "HUMAN_TP53",
  "structures": [
    {"pdb_id": "6GGA", "label": "Wild-type"},
    {"pdb_id": "4HJE", "label": "R273H Mutant"}
  ]
}
```

#### 5.3 Explore Similar

**Type**: `explore_similar`
**Purpose**: Find more related proteins

**Payload**:
```json
{
  "protein_id": "HUMAN_TP53",
  "method": "sequence_similarity",
  "top_k": 20
}
```

#### 5.4 Export Data

**Type**: `export_data`
**Purpose**: Download complete data

**Payload**:
```json
{
  "protein_id": "HUMAN_TP53",
  "format": "json",              // or "csv", "fasta", "pdb"
  "include": ["sequence", "structure", "annotations"]
}
```

#### 5.5 External Link

**Type**: `external_link`
**Purpose**: Navigate to external database

**Payload**:
```json
{
  "url": "https://www.uniprot.org/uniprotkb/P04637"
}
```

#### 5.6 Search Mutations

**Type**: `search_mutations`
**Purpose**: Query mutation databases

**Payload**:
```json
{
  "gene": "TP53",
  "database": "COSMIC"           // or "ClinVar", "gnomAD"
}
```

---

## 6. Trace

**Type**: `WorkflowTrace`
**Purpose**: Execution debugging and transparency

### Trace Structure

```json
{
  "request_id": "req_...",       // Unique request ID
  "workflow_id": "wf_...",       // Workflow type
  "duration_ms": 2847,           // Total duration
  "agents": [...],               // Agent executions
  "tools": [...]                 // Tool calls
}
```

### 6.1 Agents

**Purpose**: Track multi-agent workflow

**Agent Types**:

1. **Gatekeeper**
   - Validates and routes queries
   - Security checks
   - Decision: approved/rejected

2. **Planner**
   - Creates multi-step execution plan
   - Determines which tools to use
   - Optimizes query strategy

3. **Structure Search**
   - Retrieves structure data
   - Coordinates PDB, AlphaFold queries
   - Analyzes structural information

4. **Synthesizer**
   - Formats final response
   - Creates UI cards
   - Generates actions

**Agent Example**:
```json
{
  "name": "planner",
  "role": "Multi-step query planning",
  "duration_ms": 123,
  "status": "success",
  "plan": [
    "Search local database for TP53",
    "Fetch UniProt data for P04637",
    ...
  ],
  "steps_planned": 7
}
```

### 6.2 Tools

**Purpose**: Track MCP tool invocations

**Available Tools**:

| Tool | Server | Purpose |
|------|--------|---------|
| `local_search` | vectorstore | Search local protein DB |
| `get_protein_info` | uniprot | Fetch UniProt data |
| `get_structure` | alphafold | Get AlphaFold predictions |
| `search_structures` | pdb | Search PDB database |
| `get_pdb_details` | pdb | Get specific PDB entry |
| `find_neighbors` | neighbors | Find similar proteins |
| `search_compounds` | chembl | Search bioactive compounds |
| `get_compound_details` | chembl | Get compound details |

**Tool Example**:
```json
{
  "name": "get_protein_info",
  "server": "uniprot",
  "duration_ms": 345,
  "status": "success",
  "input": {
    "accession": "P04637"
  },
  "output": {
    "gene_name": "TP53",
    "length": 393,
    "organism": "Homo sapiens"
  }
}
```

---

## Field Types Reference

### Text Field Types

| Type | Description | Example |
|------|-------------|---------|
| `text` | Plain text | "393 aa" |
| `link` | Hyperlink | URL + display text |
| `badge` | Colored label | "Stable" (green) |
| `badge_list` | Multiple badges | ["Nucleus", "Cytoplasm"] |
| `status` | Status indicator | success/warning/error |
| `metric` | Numeric with context | "48.2" with threshold |
| `percentage` | Percentage value | "92.5%" |

---

## Usage Examples

### Frontend Integration (React)

```jsx
import React from 'react';

function ChatResponse({ response }) {
  return (
    <div className="chat-response">
      {/* Assistant Text */}
      <div className="assistant-message">
        <ReactMarkdown>{response.assistant_text}</ReactMarkdown>
      </div>

      {/* Cards */}
      <div className="cards-grid">
        {response.cards.map((card, idx) => (
          <Card key={idx} type={card.type} data={card} />
        ))}
      </div>

      {/* Actions */}
      <div className="actions">
        {response.actions.map((action, idx) => (
          <ActionButton key={idx} action={action} />
        ))}
      </div>

      {/* Citations */}
      <div className="citations">
        <h4>Sources:</h4>
        {response.citations.map((citation, idx) => (
          <Citation key={idx} data={citation} />
        ))}
      </div>
    </div>
  );
}
```

### Handling Different Card Types

```jsx
function Card({ type, data }) {
  switch(type) {
    case 'protein_summary':
      return <ProteinSummaryCard data={data} />;
    case 'physicochemical_properties':
      return <PhysicochemicalCard data={data} />;
    case 'structure_summary':
      return <StructureSummaryCard data={data} />;
    case 'pdb_structures':
      return <PDBStructuresCard data={data} />;
    case 'similar_proteins':
      return <SimilarProteinsCard data={data} />;
    case 'drug_interactions':
      return <DrugInteractionsCard data={data} />;
    default:
      return <GenericCard data={data} />;
  }
}
```

### Handling Actions

```jsx
function ActionButton({ action }) {
  const handleClick = () => {
    switch(action.type) {
      case 'view_3d_structure':
        openStructureViewer(action.payload);
        break;
      case 'compare_structures':
        openComparisonView(action.payload);
        break;
      case 'explore_similar':
        searchSimilarProteins(action.payload);
        break;
      case 'export_data':
        downloadData(action.payload);
        break;
      case 'external_link':
        window.open(action.payload.url, '_blank');
        break;
    }
  };

  return (
    <button onClick={handleClick} className="action-button">
      {action.label}
    </button>
  );
}
```

---

## API Request/Response Flow

### Request
```bash
POST /chat
Content-Type: application/json

{
  "message": "Tell me about TP53",
  "session_id": "sess_a1b2c3d4e5f6g7h8i9j0",
  "client_context": {
    "ui_version": "2.0.0",
    "preferences": {
      "show_3d_viewer": true
    }
  }
}
```

### Response Processing

1. **Gatekeeper** validates query → approved
2. **Planner** creates 7-step plan
3. **Tools** execute in sequence:
   - Local search finds TP53
   - UniProt fetches P04637 data
   - AlphaFold gets structure prediction
   - PDB searches experimental structures
   - Neighbors finds similar proteins
   - ChEMBL queries drug compounds
4. **Synthesizer** creates response with:
   - Formatted assistant text
   - 7 UI cards
   - 8 action buttons
   - 7 citations
5. **Response** returned to client

**Total Duration**: 2,847 ms

---

## Best Practices

### 1. Error Handling

Always check `refusal` field first:
```javascript
if (response.refusal) {
  showError(response.refusal.message);
  return;
}
```

### 2. Progressive Loading

Load cards progressively for better UX:
```javascript
// Load critical cards first
const criticalCards = ['protein_summary', 'structure_summary'];
const deferredCards = ['drug_interactions', 'similar_proteins'];
```

### 3. Citation Display

Always show citations for transparency:
```javascript
<div className="citations">
  {response.citations.map(citation => (
    <a href={citation.url} target="_blank">
      {citation.source}: {citation.evidence_id}
    </a>
  ))}
</div>
```

### 4. Trace Debugging

Use trace data for performance monitoring:
```javascript
console.log(`Query processed in ${response.trace.duration_ms}ms`);
console.log(`Tools used: ${response.trace.tools.length}`);
```

---

## Summary

The Chat API response provides:

✅ **Rich Text**: Markdown-formatted summary
✅ **Structured Data**: 7 card types for different data
✅ **Citations**: Full source attribution
✅ **Actions**: 8+ interactive action types
✅ **Transparency**: Complete execution trace
✅ **Extensibility**: Easy to add new card/action types

**Sample File**: [sample_chat_response.json](sample_chat_response.json)

For implementation details, see:
- [app/models/api_models.py](app/models/api_models.py) - Response models
- [app/models/domain_models.py](app/models/domain_models.py) - Domain models
- API documentation at `/docs` when server is running
