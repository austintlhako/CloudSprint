import { SubtopicId, DomainId, Topic } from '../types';

export interface DomainMeta {
  id: DomainId;
  name: string;
  weight: string;
}

export const DOMAINS: DomainMeta[] = [
  {
    id: 'cloud-concepts',
    name: 'Describe Cloud Concepts',
    weight: '25–30%',
  },
  {
    id: 'azure-architecture-services',
    name: 'Describe Azure Architecture and Services',
    weight: '35–40%',
  },
  {
    id: 'azure-management-governance',
    name: 'Describe Azure Management and Governance',
    weight: '30–35%',
  },
];

export const TOPICS: Topic[] = [
  // ──── Domain 1: Describe Cloud Concepts (25–30%) ────
  {
    id: 'cc-cloud-computing',
    domainId: 'cloud-concepts',
    domainName: 'Cloud Concepts',
    name: 'Cloud Computing Fundamentals & Shared Responsibility',
  },
  {
    id: 'cc-cloud-benefits',
    domainId: 'cloud-concepts',
    domainName: 'Cloud Concepts',
    name: 'Benefits of Cloud Services (HA, Scalability, Agility)',
  },
  {
    id: 'cc-cloud-service-types',
    domainId: 'cloud-concepts',
    domainName: 'Cloud Concepts',
    name: 'Cloud Service Types (IaaS, PaaS, SaaS)',
  },

  // ──── Domain 2: Describe Azure Architecture and Services (35–40%) ────
  {
    id: 'aas-core-architecture',
    domainId: 'azure-architecture-services',
    domainName: 'Azure Architecture & Services',
    name: 'Core Architecture (Regions, Zones, Subscriptions, Resource Groups)',
  },
  {
    id: 'aas-compute-networking',
    domainId: 'azure-architecture-services',
    domainName: 'Azure Architecture & Services',
    name: 'Compute & Networking (VMs, Containers, Virtual Networks, VPN)',
  },
  {
    id: 'aas-storage',
    domainId: 'azure-architecture-services',
    domainName: 'Azure Architecture & Services',
    name: 'Azure Storage Services (Blob, Disk, Files, Redundancy Tiers)',
  },
  {
    id: 'aas-identity-security',
    domainId: 'azure-architecture-services',
    domainName: 'Azure Architecture & Services',
    name: 'Identity, Access & Security (Microsoft Entra ID, RBAC, Zero Trust)',
  },

  // ──── Domain 3: Describe Azure Management and Governance (30–35%) ────
  {
    id: 'amg-cost-management',
    domainId: 'azure-management-governance',
    domainName: 'Azure Management & Governance',
    name: 'Cost Management & TCO (Pricing Calculator, Cost Analysis)',
  },
  {
    id: 'amg-governance-compliance',
    domainId: 'azure-management-governance',
    domainName: 'Azure Management & Governance',
    name: 'Governance & Compliance (Azure Policy, Blueprints, Purview)',
  },
  {
    id: 'amg-managing-deploying',
    domainId: 'azure-management-governance',
    domainName: 'Azure Management & Governance',
    name: 'Deployment & Management Tools (ARM Templates, Bicep, CLI, Portal)',
  },
  {
    id: 'amg-monitoring',
    domainId: 'azure-management-governance',
    domainName: 'Azure Management & Governance',
    name: 'Monitoring & Reporting (Azure Monitor, Log Analytics, Service Health)',
  },
];

/**
 * Returns a specific Topic by its SubtopicId
 */
export function getTopicById(id: SubtopicId): Topic | undefined {
  return TOPICS.find((topic) => topic.id === id);
}

/**
 * Returns all topics belonging to a specific DomainId
 */
export function getTopicsByDomain(domainId: DomainId): Topic[] {
  return TOPICS.filter((topic) => topic.domainId === domainId);
}

/**
 * Returns the human-readable domain name for a given DomainId
 */
export function getDomainName(domainId: DomainId): string {
  const domain = DOMAINS.find((d) => d.id === domainId);
  return domain ? domain.name : domainId;
}
