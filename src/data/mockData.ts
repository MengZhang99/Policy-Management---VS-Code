export interface Policy {
  id: string;
  title: string;
  version: string;
  status: 'draft' | 'in-review' | 'approved' | 'published';
  owner: string;
  lastModified: string;
  dueDate: string;
  category: string;
  riskLevel: 'low' | 'medium' | 'high';
  reviewers: string[];
  approvedBy?: string;
}

export interface Suggestion {
  id: string;
  section: string;
  type: 'add' | 'modify' | 'remove';
  regulation: string;
  source: string;
  priority: 'low' | 'medium' | 'high';
  original?: string;
  suggested: string;
  rationale: string;
  accepted?: boolean;
}

export interface ChangeRecord {
  id: string;
  policyId: string;
  date: string;
  author: string;
  version: string;
  type: 'created' | 'edited' | 'reviewed' | 'approved' | 'published';
  summary: string;
  diff?: { before: string; after: string };
}

export interface Reviewer {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  status: 'pending' | 'approved' | 'changes-requested';
  comment?: string;
  reviewedAt?: string;
}

// ─── Policies ────────────────────────────────────────────────────────────────
export const mockPolicies: Policy[] = [
  {
    id: 'pol-001',
    title: 'Code of Business Conduct & Ethics',
    version: '3.2',
    status: 'in-review',
    owner: 'Sarah Chen',
    lastModified: 'Mar 20, 2026',
    dueDate: 'Apr 10, 2026',
    category: 'Ethics & Compliance',
    riskLevel: 'high',
    reviewers: ['Michael Torres', 'Priya Patel', 'James Liu'],
  },
  {
    id: 'pol-002',
    title: 'Anti-Bribery & Anti-Corruption Policy',
    version: '2.0',
    status: 'draft',
    owner: 'Marcus Obi',
    lastModified: 'Mar 22, 2026',
    dueDate: 'Apr 15, 2026',
    category: 'Ethics & Compliance',
    riskLevel: 'high',
    reviewers: ['Sarah Chen', 'Legal Team'],
  },
  {
    id: 'pol-003',
    title: 'Data Privacy & Protection Policy',
    version: '4.1',
    status: 'approved',
    owner: 'Priya Patel',
    lastModified: 'Mar 10, 2026',
    dueDate: 'Mar 30, 2026',
    category: 'Data & Privacy',
    riskLevel: 'high',
    reviewers: ['Sarah Chen', 'CTO Office'],
    approvedBy: 'CEO Office',
  },
  {
    id: 'pol-004',
    title: 'Insider Trading Prevention Policy',
    version: '1.5',
    status: 'published',
    owner: 'James Liu',
    lastModified: 'Feb 28, 2026',
    dueDate: 'Ongoing',
    category: 'Financial',
    riskLevel: 'high',
    reviewers: ['Legal Team', 'CFO Office'],
    approvedBy: 'Board of Directors',
  },
  {
    id: 'pol-005',
    title: 'Workplace Health & Safety Policy',
    version: '2.3',
    status: 'published',
    owner: 'Rosa Martinez',
    lastModified: 'Jan 15, 2026',
    dueDate: 'Ongoing',
    category: 'HR & Workplace',
    riskLevel: 'medium',
    reviewers: ['HR Director', 'Safety Officer'],
    approvedBy: 'COO Office',
  },
  {
    id: 'pol-006',
    title: 'Conflicts of Interest Policy',
    version: '1.8',
    status: 'draft',
    owner: 'Michael Torres',
    lastModified: 'Mar 24, 2026',
    dueDate: 'Apr 20, 2026',
    category: 'Ethics & Compliance',
    riskLevel: 'medium',
    reviewers: ['Sarah Chen', 'Legal Team'],
  },
];

// ─── AI Suggestions ───────────────────────────────────────────────────────────
export const mockSuggestions: Suggestion[] = [
  {
    id: 'sug-001',
    section: 'Section 3.2 – Gifts & Entertainment',
    type: 'modify',
    regulation: 'UK Bribery Act 2010 – Section 7',
    source: 'legislation.gov.uk',
    priority: 'high',
    original:
      'Employees may accept gifts up to a value of $150 without prior approval.',
    suggested:
      'Employees may accept gifts up to a value of $75 without prior approval. Gifts above $75 and up to $200 require manager approval. Gifts above $200 are prohibited. All accepted gifts must be logged in the Gift Register within 5 business days.',
    rationale:
      'UK Bribery Act 2010 and updated FCPA guidance recommend lower thresholds and mandatory gift registers to demonstrate adequate procedures. LRN best-practice benchmarks show $75 as the market-standard threshold.',
    accepted: undefined,
  },
  {
    id: 'sug-002',
    section: 'Section 5 – Reporting Obligations',
    type: 'add',
    regulation: 'EU Whistleblower Protection Directive 2019/1937',
    source: 'eur-lex.europa.eu',
    priority: 'high',
    suggested:
      'Add a new subsection 5.4: "Anonymous Reporting Channel. Employees in EU member states shall have access to an anonymous, secure digital reporting channel for potential policy violations. Reports will be acknowledged within 7 days and investigated within 3 months. Retaliation against good-faith reporters is strictly prohibited."',
    rationale:
      'EU Directive 2019/1937 mandates anonymous reporting channels for organizations with 50+ employees operating in EU member states. Non-compliance risks fines up to 4% of global annual turnover.',
    accepted: undefined,
  },
  {
    id: 'sug-003',
    section: 'Section 4.1 – Third-Party Due Diligence',
    type: 'modify',
    regulation: 'FCPA Resource Guide (2023 Update) – DOJ/SEC',
    source: 'justice.gov',
    priority: 'medium',
    original:
      'Third-party partners should be screened prior to engagement.',
    suggested:
      'All third-party partners representing the company in interactions with government officials must undergo a documented due diligence process including: (a) sanctions screening against OFAC, UN, and EU lists; (b) PEP (Politically Exposed Person) checks; (c) adverse media review; and (d) annual re-screening. Due diligence records must be retained for 7 years.',
    rationale:
      'Updated DOJ/SEC FCPA guidance (2023) emphasizes third-party due diligence as a primary indicator of an effective compliance program. LRN risk assessments show third-party risk as the #1 FCPA violation vector.',
    accepted: undefined,
  },
  {
    id: 'sug-004',
    section: 'Section 2 – Scope & Applicability',
    type: 'modify',
    regulation: 'ISO 37001:2016 – Anti-Bribery Management Systems',
    source: 'iso.org',
    priority: 'medium',
    original: 'This policy applies to all full-time employees.',
    suggested:
      'This policy applies to all full-time employees, part-time employees, contractors, consultants, joint venture partners, and any other persons acting on behalf of the organization, regardless of their location or employment type.',
    rationale:
      'ISO 37001:2016 §5.1 requires the anti-bribery policy to apply to the entire organization and business associates. Limiting scope to full-time employees creates significant compliance gaps.',
    accepted: undefined,
  },
  {
    id: 'sug-005',
    section: 'Section 7 – Training Requirements',
    type: 'modify',
    regulation: 'LRN Ethics & Compliance Program Benchmark Report 2025',
    source: 'LRN Internal Expertise',
    priority: 'low',
    original: 'Annual training is required for all covered employees.',
    suggested:
      'Annual foundational training is required for all employees. High-risk roles (sales, procurement, finance, government affairs) must complete role-specific advanced training every 6 months. New employees must complete onboarding compliance training within 30 days of hire. Training completion must be tracked and reported to the Board annually.',
    rationale:
      "LRN's 2025 E&C Program Benchmark Report shows organizations with role-based, risk-tiered training achieve 63% higher policy comprehension scores and 41% fewer compliance incidents.",
    accepted: undefined,
  },
];

// ─── Change History ───────────────────────────────────────────────────────────
export const mockChanges: ChangeRecord[] = [
  {
    id: 'chg-001',
    policyId: 'pol-001',
    date: 'Mar 25, 2026 · 9:14 AM',
    author: 'AI Review Engine',
    version: '3.2-draft',
    type: 'edited',
    summary: '5 AI-generated suggestions applied to draft',
    diff: {
      before: 'Employees may accept gifts up to a value of $150 without prior approval.',
      after:  'Employees may accept gifts up to a value of $75 without prior approval. Gifts $75–$200 require manager approval. All gifts must be logged.',
    },
  },
  {
    id: 'chg-002',
    policyId: 'pol-001',
    date: 'Mar 22, 2026 · 2:30 PM',
    author: 'Sarah Chen',
    version: '3.1',
    type: 'edited',
    summary: 'Updated Section 4 third-party due diligence requirements',
  },
  {
    id: 'chg-003',
    policyId: 'pol-001',
    date: 'Mar 18, 2026 · 11:00 AM',
    author: 'Sarah Chen',
    version: '3.1',
    type: 'created',
    summary: 'Uploaded policy document for annual review cycle',
  },
  {
    id: 'chg-004',
    policyId: 'pol-001',
    date: 'Feb 14, 2026 · 9:00 AM',
    author: 'James Liu',
    version: '3.0',
    type: 'approved',
    summary: 'Approved by Legal & Compliance Committee',
  },
  {
    id: 'chg-005',
    policyId: 'pol-001',
    date: 'Jan 30, 2026 · 10:20 AM',
    author: 'Michael Torres',
    version: '3.0',
    type: 'reviewed',
    summary: 'Reviewed – requested clarification on gift register process',
  },
  {
    id: 'chg-006',
    policyId: 'pol-001',
    date: 'Jan 10, 2026 · 3:45 PM',
    author: 'Sarah Chen',
    version: '3.0',
    type: 'created',
    summary: 'Version 3.0 created for FY2026 policy cycle',
  },
];

// ─── Reviewers ────────────────────────────────────────────────────────────────
export const mockReviewers: Reviewer[] = [
  {
    id: 'rev-001',
    name: 'Michael Torres',
    role: 'Chief Legal Officer',
    email: 'm.torres@company.com',
    avatar: 'MT',
    status: 'approved',
    comment: 'Policy is comprehensive and aligns with current legal requirements. Approved.',
    reviewedAt: 'Mar 24, 2026',
  },
  {
    id: 'rev-002',
    name: 'Priya Patel',
    role: 'VP Compliance',
    email: 'p.patel@company.com',
    avatar: 'PP',
    status: 'changes-requested',
    comment:
      'Section 3.2 gift threshold is now compliant, but Section 5.4 (anonymous reporting) needs a specific system named – recommend referencing the "EthicsPoint" hotline.',
    reviewedAt: 'Mar 24, 2026',
  },
  {
    id: 'rev-003',
    name: 'James Liu',
    role: 'CHRO',
    email: 'j.liu@company.com',
    avatar: 'JL',
    status: 'pending',
  },
  {
    id: 'rev-004',
    name: 'Rosa Martinez',
    role: 'Regional Director, EMEA',
    email: 'r.martinez@company.com',
    avatar: 'RM',
    status: 'pending',
  },
];

export const stats = {
  total: 24,
  inReview: 6,
  pendingApproval: 3,
  published: 15,
  dueThisMonth: 8,
};
