import type { Topic } from '../types';

/**
 * AZ-900 Topic Taxonomy
 *
 * Source: Microsoft AZ-900 Study Guide — Skills measured as of July 20, 2026
 * https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900
 */
export const topics: Topic[] = [
  {
    id: 'cloud-concepts',
    name: 'Describe Cloud Concepts',
    weight: '25–30%',
    color: '#0078D4',   // Azure blue
    icon: '☁️',
    subtopics: [
      { id: 'cc-cloud-computing', name: 'Describe cloud computing', parentTopicId: 'cloud-concepts' },
      { id: 'cc-benefits', name: 'Describe the benefits of using cloud services', parentTopicId: 'cloud-concepts' },
      { id: 'cc-service-types', name: 'Describe cloud service types', parentTopicId: 'cloud-concepts' },
    ],
  },
  {
    id: 'azure-architecture-services',
    name: 'Describe Azure Architecture and Services',
    weight: '35–40%',
    color: '#00B4D8',   // Teal
    icon: '🏗️',
    subtopics: [
      { id: 'aas-core-architecture', name: 'Describe the core architectural components of Azure', parentTopicId: 'azure-architecture-services' },
      { id: 'aas-compute-networking', name: 'Describe Azure compute and networking services', parentTopicId: 'azure-architecture-services' },
      { id: 'aas-storage', name: 'Describe Azure storage services', parentTopicId: 'azure-architecture-services' },
      { id: 'aas-identity-security', name: 'Describe Azure identity, access, and security', parentTopicId: 'azure-architecture-services' },
    ],
  },
  {
    id: 'azure-management-governance',
    name: 'Describe Azure Management and Governance',
    weight: '30–35%',
    color: '#7C3AED',   // Purple
    icon: '⚙️',
    subtopics: [
      { id: 'amg-cost-management', name: 'Describe cost management in Azure', parentTopicId: 'azure-management-governance' },
      { id: 'amg-governance-compliance', name: 'Describe features and tools in Azure for governance and compliance', parentTopicId: 'azure-management-governance' },
      { id: 'amg-managing-deploying', name: 'Describe features and tools for managing and deploying Azure resources', parentTopicId: 'azure-management-governance' },
      { id: 'amg-monitoring', name: 'Describe monitoring tools in Azure', parentTopicId: 'azure-management-governance' },
    ],
  },
];

/**
 * Helper: get a topic by its ID
 */
export function getTopicById(id: string): Topic | undefined {
  return topics.find((t) => t.id === id);
}

/**
 * Helper: get all subtopics for a topic
 */
export function getSubtopicsByTopicId(topicId: string) {
  const topic = topics.find((t) => t.id === topicId);
  return topic?.subtopics ?? [];
}

/**
 * Helper: flat list of all subtopics
 */
export function getAllSubtopics() {
  return topics.flatMap((t) => t.subtopics);
}
