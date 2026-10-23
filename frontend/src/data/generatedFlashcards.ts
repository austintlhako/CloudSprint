import type { Flashcard, SubtopicId } from '../types';

const SOURCE_URL =
  'https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/';

type CardFact = {
  term: string;
  definition: string;
  application: string;
};

const UNIT_FACTS: Record<SubtopicId, CardFact[]> = {
  'cc-cloud-computing': [
    { term: 'Cloud computing', definition: 'The delivery of computing services over the internet on demand.', application: 'Use it when an organization wants flexible access to compute, storage, networking, and software services.' },
    { term: 'Shared responsibility', definition: 'A model that divides security and operational responsibilities between a cloud provider and customer.', application: 'The customer remains responsible for data, identities, access, and endpoints.' },
    { term: 'Public cloud', definition: 'Cloud resources provided by a provider through a shared service platform.', application: 'Use it when you want provider-operated infrastructure with usage-based access.' },
    { term: 'Private cloud', definition: 'Cloud resources dedicated to one organization.', application: 'Use it when dedicated control or specific compliance requirements are important.' },
    { term: 'Hybrid cloud', definition: 'An environment that combines private or on-premises resources with public cloud resources.', application: 'Use it when workloads or data must operate across connected environments.' },
  ],
  'cc-cloud-benefits': [
    { term: 'Elasticity', definition: 'The ability to add or remove resources as demand changes.', application: 'Use it for workloads with changing or unpredictable demand.' },
    { term: 'High availability', definition: 'Designing a service to remain accessible through redundancy and resilience.', application: 'Use redundant components and healthy deployment patterns to reduce downtime.' },
    { term: 'Scalability', definition: 'The ability to increase or decrease capacity to meet workload needs.', application: 'Scale resources when traffic, data, or processing requirements change.' },
    { term: 'Operational expenditure', definition: 'A spending model based on consuming services instead of purchasing infrastructure up front.', application: 'Use consumption-based services to align cost with actual usage.' },
    { term: 'Agility', definition: 'The ability to provision and change technology resources quickly.', application: 'Use cloud automation and managed services to shorten delivery cycles.' },
  ],
  'cc-cloud-service-types': [
    { term: 'Infrastructure as a service', definition: 'Virtualized compute, networking, and storage where the customer manages the operating system.', application: 'Choose it when you need substantial control over the guest operating system and software.' },
    { term: 'Platform as a service', definition: 'A managed application platform where the provider operates much of the underlying infrastructure.', application: 'Choose it so developers can focus on application code rather than server maintenance.' },
    { term: 'Software as a service', definition: 'A complete application delivered and managed by a provider.', application: 'Choose it when users need application capabilities without managing the platform.' },
    { term: 'Serverless computing', definition: 'Running code without managing the underlying server infrastructure.', application: 'Choose it for event-driven workloads where infrastructure management should be minimized.' },
    { term: 'Consumption-based model', definition: 'A pricing model that charges according to resources and services consumed.', application: 'Use it when demand varies and you want costs to follow usage.' },
  ],
  'aas-core-architecture': [
    { term: 'Azure region', definition: 'A geographic area containing one or more Azure datacenters.', application: 'Choose a region based on latency, service availability, data residency, and resilience needs.' },
    { term: 'Availability zone', definition: 'A physically separate datacenter location within an Azure region.', application: 'Use zones to protect workloads from a failure in one datacenter location.' },
    { term: 'Resource group', definition: 'A logical container for resources that share a lifecycle.', application: 'Place related resources together so they can be managed, secured, and deleted consistently.' },
    { term: 'Azure subscription', definition: 'A boundary for Azure billing, access, and resource organization.', application: 'Use subscriptions to separate costs, environments, or administrative boundaries.' },
    { term: 'Azure Resource Manager', definition: 'The consistent management layer for deploying and organizing Azure resources.', application: 'Use it for templates, role assignments, tags, locks, and resource lifecycle operations.' },
  ],
  'aas-compute-networking': [
    { term: 'Azure virtual machine', definition: 'Configurable compute that provides customer control over a guest operating system.', application: 'Choose it when you need operating-system or application-level control.' },
    { term: 'Azure App Service', definition: 'A managed platform for hosting web applications and APIs.', application: 'Use it to deploy web workloads without managing the underlying servers.' },
    { term: 'Azure Functions', definition: 'An event-driven compute service for running code without server management.', application: 'Use it for short-running reactions to events, timers, or HTTP requests.' },
    { term: 'Azure virtual network', definition: 'A private network boundary for Azure resources and connected environments.', application: 'Use subnets, routes, and connectivity controls to organize network traffic.' },
    { term: 'Network security group', definition: 'A set of rules that filters inbound and outbound network traffic.', application: 'Use it to allow or deny traffic at supported network interfaces or subnets.' },
  ],
  'aas-storage': [
    { term: 'Azure Blob Storage', definition: 'Object storage for large amounts of unstructured data.', application: 'Use it for documents, media, backups, logs, and other object data.' },
    { term: 'Azure Files', definition: 'Managed file shares accessible through standard file protocols.', application: 'Use it when multiple systems need shared file-based access.' },
    { term: 'Managed disk', definition: 'Persistent block storage for Azure virtual machines.', application: 'Attach it when a VM needs durable operating-system or data storage.' },
    { term: 'Storage redundancy', definition: 'Keeping copies of data to improve durability and availability.', application: 'Choose redundancy based on the failure scope and recovery requirements.' },
    { term: 'Hot access tier', definition: 'A storage tier intended for data accessed frequently.', application: 'Choose it when read frequency is high and access latency matters.' },
  ],
  'aas-identity-security': [
    { term: 'Microsoft Entra ID', definition: 'A cloud identity and access management service.', application: 'Use it for authentication, identities, groups, applications, and access policies.' },
    { term: 'Multifactor authentication', definition: 'Sign-in verification using more than one type of evidence.', application: 'Use it to reduce risk when a password is compromised.' },
    { term: 'Azure RBAC', definition: 'A permission system that assigns roles at defined scopes.', application: 'Grant only the access needed for a user, group, service, or workload.' },
    { term: 'Zero Trust', definition: 'A security approach that verifies explicitly, uses least privilege, and assumes breach.', application: 'Apply continuous verification rather than trusting a request based only on network location.' },
    { term: 'Azure Key Vault', definition: 'A service for protecting and managing secrets, keys, and certificates.', application: 'Use it to avoid embedding sensitive values directly in application code.' },
  ],
  'amg-cost-management': [
    { term: 'Azure pricing calculator', definition: 'A tool for estimating costs for selected Azure services and configurations.', application: 'Use it before deployment to model expected service costs.' },
    { term: 'Azure Cost Management', definition: 'Tools for analyzing, monitoring, and controlling cloud spending.', application: 'Use it to review cost trends, budgets, alerts, and optimization opportunities.' },
    { term: 'Budget', definition: 'A spending threshold that can trigger notifications.', application: 'Use it to detect spending trends early; it is not a hard spending lock.' },
    { term: 'Resource tag', definition: 'Metadata attached to a resource for organization and reporting.', application: 'Use consistent tags to group costs by owner, project, or environment.' },
    { term: 'Service-level agreement', definition: 'A documented provider commitment for service availability or performance.', application: 'Use it when evaluating reliability expectations and service commitments.' },
  ],
  'amg-governance-compliance': [
    { term: 'Azure Policy', definition: 'A service for enforcing organizational rules and evaluating compliance.', application: 'Use it to restrict locations, SKUs, configurations, or required metadata.' },
    { term: 'Resource lock', definition: 'A control that helps prevent accidental deletion or modification.', application: 'Use delete or read-only locks for resources requiring extra protection.' },
    { term: 'Microsoft Purview', definition: 'A service for discovering, governing, and managing data across sources.', application: 'Use it to understand data assets, classification, and governance posture.' },
    { term: 'Governance artifact', definition: 'A reusable policy, role, template, or control used to standardize environments.', application: 'Use artifacts to make governance consistent across subscriptions and workloads.' },
    { term: 'Defense in depth', definition: 'A security strategy using multiple independent protection layers.', application: 'Use layered controls so one failed safeguard does not expose the whole workload.' },
  ],
  'amg-managing-deploying': [
    { term: 'ARM template', definition: 'A declarative description of Azure infrastructure for repeatable deployment.', application: 'Use it to deploy consistent resource configurations through automation.' },
    { term: 'Bicep', definition: 'A concise language for declarative Azure resource deployment.', application: 'Use it to author readable infrastructure-as-code files that compile to ARM templates.' },
    { term: 'Azure portal', definition: 'A browser-based graphical interface for managing Azure.', application: 'Use it for interactive resource creation, configuration, and monitoring.' },
    { term: 'Azure CLI', definition: 'A command-line tool for managing Azure resources.', application: 'Use it for repeatable commands and automation in scripts or pipelines.' },
    { term: 'Azure Cloud Shell', definition: 'A browser-accessible shell with Azure management tools available.', application: 'Use it to run Azure CLI or PowerShell without installing local tooling.' },
  ],
  'amg-monitoring': [
    { term: 'Azure Monitor', definition: 'A platform for collecting and analyzing metrics and logs from resources and applications.', application: 'Use it to observe health, performance, activity, and alerts.' },
    { term: 'Log Analytics', definition: 'A workspace and query experience for collected log data.', application: 'Use it to investigate events and identify patterns across resources.' },
    { term: 'Kusto Query Language', definition: 'A query language for analyzing Azure Monitor log data.', application: 'Use it to filter, aggregate, and correlate telemetry in Log Analytics.' },
    { term: 'Azure Service Health', definition: 'Personalized information about Azure service issues and maintenance.', application: 'Use it to understand incidents and planned changes relevant to your subscriptions.' },
    { term: 'Azure Advisor', definition: 'A recommendation service for reliability, security, performance, and cost.', application: 'Use recommendations to improve deployed workloads.' },
  ],
};

const patterns = [
  (term: string) => `What is ${term}?`,
  (term: string) => `What is the primary purpose of ${term}?`,
  (term: string) => `When should you choose ${term}?`,
  (term: string) => `Which AZ-900 concept is represented by this definition: ${term}?`,
  (term: string) => `How does ${term} help an Azure solution?`,
  (term: string) => `Which scenario is a good fit for ${term}?`,
  (term: string) => `What should an administrator remember about ${term}?`,
  (term: string) => `Which capability is associated with ${term}?`,
  (term: string) => `How would you explain ${term} to a new Azure learner?`,
  (term: string) => `Which statement correctly identifies ${term}?`,
];

export function createGeneratedFlashcards(): Flashcard[] {
  return (Object.entries(UNIT_FACTS) as [SubtopicId, CardFact[]][]).flatMap(([topicId, facts]) =>
    Array.from({ length: 100 }, (_, index) => {
      const fact = facts[index % facts.length];
      const pattern = patterns[Math.floor(index / facts.length) % patterns.length];
      const back = index % 2 === 0
        ? fact.definition
        : `${fact.definition} ${fact.application}`;
      return {
        id: `generated-${topicId}-${String(index + 1).padStart(3, '0')}`,
        topicId,
        front: `${pattern(fact.term)} (Practice ${index + 1})`,
        back: `${back} This is an original, unofficial CloudSprint study card based on the public AZ-900 skills scope.`,
        sourceUrl: SOURCE_URL,
      };
    })
  );
}
