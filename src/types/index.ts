// User types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: "google" | "enterprise" | "email";
}

// Auth types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Login form types
export interface LoginFormData {
  email: string;
  password: string;
}

// API response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// Analytics types
export interface DistributionItem {
  label: string;
  count: number;
  percentage: number;
}

export interface ProteinLengthBin extends DistributionItem {
  min: number | null;
  max: number | null;
}

export interface PhysicochemicalStats {
  mean: number;
  median: number;
  min: number;
  max: number;
  std_dev: number;
}

export interface AnalyticsData {
  total_proteins: number;
  total_peptides: number;
  total_entities: number;
  organism_distribution: DistributionItem[];
  localization_distribution: DistributionItem[];
  stability_distribution: DistributionItem[];
  gene_type_distribution: DistributionItem[];
  protein_length_distribution: ProteinLengthBin[];
  physicochemical: {
    molecular_weight: PhysicochemicalStats;
    theoretical_pi: PhysicochemicalStats;
    gravy: PhysicochemicalStats;
    aliphatic_index: PhysicochemicalStats;
    instability_index: PhysicochemicalStats;
  };
  visualization_recommendations: Record<string, string>;
}

// Chat types
export interface Citation {
  source: string;
  url: string | null;
  evidence_id: string;
  snippet: string;
}

export interface CardField {
  label: string;
  value: string;
  type: "text" | "link" | "badge" | "badge_list" | "status" | "metric" | "percentage";
  url?: string;
  color?: string;
  badges?: string[];
  threshold?: number;
  status?: string;
  description?: string;
  pdb_id?: string;
  genome_build?: string;
}

export interface PDBStructureField {
  pdb_id: string;
  title: string;
  resolution: string;
  method: string;
  release_date: string;
  url: string;
}

export interface SimilarProteinField {
  protein_id: string;
  gene_symbol: string;
  accession: string;
  similarity_score: number;
  description: string;
  method: string;
}

export interface DrugInteractionField {
  compound_name: string;
  chembl_id: string;
  activity: string;
  phase: string;
  target_activity: string;
  url: string;
}

export interface UICard {
  type: "protein_summary" | "physicochemical_properties" | "structure_summary" | "pdb_structures" | "similar_proteins" | "drug_interactions" | "genomic_location" | "sequence" | "local_structure" | string;
  title: string;
  source_badges: string[];
  fields: (CardField | PDBStructureField | SimilarProteinField | DrugInteractionField)[];
}

export interface UIAction {
  type: "view_3d_structure" | "compare_structures" | "explore_similar" | "export_data" | "external_link" | "search_mutations" | "download_local_pdb" | "view_local_structure";
  label: string;
  payload: Record<string, unknown>;
}

export interface LocalAssets {
  protein_id: string;
  pdb_url: string;
  image_url: string;
  source: string;
  description: string;
}

export interface RefusalInfo {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface AgentTrace {
  name: string;
  role: string;
  duration_ms: number;
  status: string;
  decision?: string;
  reasoning?: string;
  plan?: string[];
  steps_planned?: number;
  tools_used?: number;
  results_found?: number;
  cards_created?: number;
  citations_added?: number;
  actions_suggested?: number;
}

export interface ToolTrace {
  name: string;
  server: string;
  duration_ms: number;
  status: string;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
}

export interface WorkflowTrace {
  request_id: string;
  workflow_id: string;
  duration_ms: number;
  agents: AgentTrace[];
  tools: ToolTrace[];
}

export interface ChatResponse {
  assistant_text: string;
  entity_label?: string | null; // e.g., "[DARK GENOME]" or "[WELL-KNOWN]"
  entity_category?: string | null; // "dark_genome" or "well_known"
  refusal: RefusalInfo | null;
  citations: Citation[];
  cards: UICard[];
  actions: UIAction[];
  trace: WorkflowTrace;
  session_id: string;
  local_assets?: LocalAssets | null; // Local structure files when external sources unavailable
}
