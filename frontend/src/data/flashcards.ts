// CloudSprint — AZ-900 Flashcard Bank
//
// Original flashcards aligned to the official AZ-900 study guide
// (skills measured as of July 20, 2026).
//
// DISCLAIMER: These are original flashcards created for
// educational purposes. They do not guarantee exam readiness.
//
// Source: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900
// ============================================================

import type { Flashcard } from '../types';
import { createGeneratedFlashcards } from './generatedFlashcards';

const LEGACY_FLASHCARDS: Flashcard[] = [
  // ────────────────────────────────────────────────
  // Domain 1: Describe Cloud Concepts
  // ────────────────────────────────────────────────
  {
    id: 'fc-cc-001',
    topicId: 'cloud-concepts',
    subtopicId: 'cc-cloud-computing',
    front: 'What is cloud computing?',
    back: 'The delivery of computing services—including servers, storage, databases, networking, software, analytics, and intelligence—over the internet to offer faster innovation, flexible resources, and economies of scale.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-compute/',
  },
  {
    id: 'fc-cc-002',
    topicId: 'cloud-concepts',
    subtopicId: 'cc-cloud-computing',
    front: 'What is the shared responsibility model?',
    back: 'A framework that defines which security responsibilities are handled by the cloud provider and which are handled by the customer. The split depends on the service type (IaaS, PaaS, SaaS). The customer always retains responsibility for data, endpoints, accounts, and access management.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-compute/4-describe-shared-responsibility-model',
  },
  {
    id: 'fc-cc-003',
    topicId: 'cloud-concepts',
    subtopicId: 'cc-cloud-computing',
    front: 'Name the three cloud deployment models.',
    back: 'Public cloud (owned by a cloud provider, accessible to anyone who wants to purchase services), Private cloud (used exclusively by a single organization, offering greater control), and Hybrid cloud (combines public and private clouds, allowing data and apps to be shared between them).',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-compute/5-define-cloud-models',
  },
  {
    id: 'fc-cc-004',
    topicId: 'cloud-concepts',
    subtopicId: 'cc-cloud-computing',
    front: 'What is the consumption-based model?',
    back: 'A cloud pricing model where you only pay for the resources you actually use, converting capital expenditure (CapEx) to operational expenditure (OpEx). No upfront costs, no wasted resources.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-compute/6-describe-consumption-based-model',
  },
  {
    id: 'fc-cc-005',
    topicId: 'cloud-concepts',
    subtopicId: 'cc-cloud-computing',
    front: 'What is serverless computing?',
    back: 'A cloud execution model where the cloud provider dynamically manages the allocation of machine resources. The provider handles all infrastructure; you only write and deploy code. You pay only for the compute time consumed (e.g., Azure Functions).',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-compute/',
  },
  {
    id: 'fc-cc-006',
    topicId: 'cloud-concepts',
    subtopicId: 'cc-cloud-benefits',
    front: 'What is high availability in cloud computing?',
    back: 'The ability of a system to remain operational and accessible with minimum downtime, even during failures. Azure provides SLAs (Service Level Agreements) that guarantee specific uptime percentages (e.g., 99.9%).',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-benefits-use-cloud-services/2-high-availability-scalability-cloud',
  },
  {
    id: 'fc-cc-007',
    topicId: 'cloud-concepts',
    subtopicId: 'cc-cloud-benefits',
    front: 'Scaling up vs. scaling out — what is the difference?',
    back: 'Scaling up (vertical): Adding more power (CPU, RAM) to an existing resource. Scaling out (horizontal): Adding more instances of a resource (e.g., more VMs). Scaling out provides better fault tolerance.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-benefits-use-cloud-services/2-high-availability-scalability-cloud',
  },
  {
    id: 'fc-cc-008',
    topicId: 'cloud-concepts',
    subtopicId: 'cc-cloud-benefits',
    front: 'What is reliability in the context of cloud computing?',
    back: 'The ability of a system to recover from failures and continue to function. The cloud supports reliability through decentralized design — resources deployed in multiple regions ensure that even if one region has a catastrophic event, other regions are still operational.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-benefits-use-cloud-services/3-reliability-predictability-cloud',
  },
  {
    id: 'fc-cc-009',
    topicId: 'cloud-concepts',
    subtopicId: 'cc-cloud-service-types',
    front: 'What is IaaS (Infrastructure as a Service)?',
    back: 'The most flexible cloud service category. The provider manages physical hardware, network, and physical security. The customer manages OS, middleware, runtime, data, and applications. Example: Azure Virtual Machines.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-service-types/2-describe-infrastructure-service',
  },
  {
    id: 'fc-cc-010',
    topicId: 'cloud-concepts',
    subtopicId: 'cc-cloud-service-types',
    front: 'What is PaaS (Platform as a Service)?',
    back: 'A middle ground between IaaS and SaaS. The provider manages infrastructure and platform (OS, middleware, tools). The customer focuses on deploying applications and data. Example: Azure App Service.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-service-types/3-describe-platform-service',
  },
  {
    id: 'fc-cc-011',
    topicId: 'cloud-concepts',
    subtopicId: 'cc-cloud-service-types',
    front: 'What is SaaS (Software as a Service)?',
    back: 'The most complete cloud service. Users access fully functional applications over the internet. The provider manages everything (infrastructure, platform, and application). Examples: Microsoft 365, Salesforce.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-service-types/4-describe-software-service',
  },

  // ────────────────────────────────────────────────
  // Domain 2: Azure Architecture and Services
  // ────────────────────────────────────────────────
  {
    id: 'fc-aas-001',
    topicId: 'azure-architecture-services',
    subtopicId: 'aas-core-architecture',
    front: 'What is an Azure region?',
    back: 'A set of datacenters deployed within a latency-defined perimeter and connected through a dedicated regional low-latency network. Azure has 60+ regions worldwide.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-core-architectural-components-of-azure/5-describe-azure-physical-infrastructure',
  },
  {
    id: 'fc-aas-002',
    topicId: 'azure-architecture-services',
    subtopicId: 'aas-core-architecture',
    front: 'What are Azure availability zones?',
    back: 'Physically separate locations within an Azure region. Each zone has independent power, cooling, and networking. They protect against datacenter-level failures. A minimum of 3 separate zones exist in enabled regions.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-core-architectural-components-of-azure/5-describe-azure-physical-infrastructure',
  },
  {
    id: 'fc-aas-003',
    topicId: 'azure-architecture-services',
    subtopicId: 'aas-core-architecture',
    front: 'What is the Azure resource hierarchy?',
    back: 'Management groups → Subscriptions → Resource groups → Resources. Management groups help manage access, policy, and compliance across multiple subscriptions.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-core-architectural-components-of-azure/6-describe-azure-management-infrastructure',
  },
  {
    id: 'fc-aas-004',
    topicId: 'azure-architecture-services',
    subtopicId: 'aas-core-architecture',
    front: 'What is an Azure resource group?',
    back: 'A logical container for Azure resources. Every resource must belong to exactly one resource group. Resource groups cannot be nested. Deleting a resource group deletes all resources within it.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-core-architectural-components-of-azure/6-describe-azure-management-infrastructure',
  },
  {
    id: 'fc-aas-005',
    topicId: 'azure-architecture-services',
    subtopicId: 'aas-compute-networking',
    front: 'Name three Azure compute options.',
    back: 'Virtual Machines (IaaS — full OS control), App Service (PaaS — managed web hosting), and Azure Functions (serverless — event-driven code execution). Containers (ACI, AKS) are also compute options.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-azure-compute-networking-services/',
  },
  {
    id: 'fc-aas-006',
    topicId: 'azure-architecture-services',
    subtopicId: 'aas-compute-networking',
    front: 'What is Azure Virtual Network (VNet)?',
    back: 'An Azure networking service that enables Azure resources to communicate with each other, the internet, and on-premises networks. VNets support subnets, peering, VPN connections, and network security groups.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-azure-compute-networking-services/',
  },
  {
    id: 'fc-aas-007',
    topicId: 'azure-architecture-services',
    subtopicId: 'aas-compute-networking',
    front: 'What is Azure ExpressRoute?',
    back: 'A service that provides a private, dedicated connection between your on-premises networks and Microsoft cloud services. The connection does NOT go over the public internet, offering higher reliability, faster speeds, and lower latencies.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-azure-compute-networking-services/',
  },
  {
    id: 'fc-aas-008',
    topicId: 'azure-architecture-services',
    subtopicId: 'aas-storage',
    front: 'Name the four Azure Storage redundancy options.',
    back: 'LRS (Locally Redundant Storage — 3 copies in one datacenter), ZRS (Zone-Redundant — across 3 availability zones), GRS (Geo-Redundant — across two regions), RA-GRS (Read-Access Geo-Redundant — GRS with read access to the secondary region).',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-azure-storage-services/',
  },
  {
    id: 'fc-aas-009',
    topicId: 'azure-architecture-services',
    subtopicId: 'aas-storage',
    front: 'What are the Azure Blob Storage access tiers?',
    back: 'Hot (frequent access, highest storage cost, lowest access cost), Cool (infrequent access, 30-day minimum), Cold (rarely accessed, 90-day minimum), Archive (offline, lowest storage cost, highest access cost, 180-day minimum).',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-azure-storage-services/',
  },
  {
    id: 'fc-aas-010',
    topicId: 'azure-architecture-services',
    subtopicId: 'aas-identity-security',
    front: 'What is Microsoft Entra ID?',
    back: 'Microsoft\'s cloud-based identity and access management service (formerly Azure Active Directory). It handles authentication, single sign-on (SSO), multi-factor authentication (MFA), and conditional access for users and applications.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-azure-identity-access-security/',
  },
  {
    id: 'fc-aas-011',
    topicId: 'azure-architecture-services',
    subtopicId: 'aas-identity-security',
    front: 'What are the three principles of Zero Trust?',
    back: '1. Verify explicitly — always authenticate and authorize based on all available data points. 2. Use least privilege access — limit user access with just-in-time and just-enough access. 3. Assume breach — minimize blast radius and segment access.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-azure-identity-access-security/',
  },
  {
    id: 'fc-aas-012',
    topicId: 'azure-architecture-services',
    subtopicId: 'aas-identity-security',
    front: 'What is defense in depth?',
    back: 'A security strategy using multiple layers of protection: Physical security → Identity & access → Perimeter → Network → Compute → Application → Data. If one layer is breached, subsequent layers prevent further exposure.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-azure-identity-access-security/',
  },

  // ────────────────────────────────────────────────
  // Domain 3: Azure Management and Governance
  // ────────────────────────────────────────────────
  {
    id: 'fc-amg-001',
    topicId: 'azure-management-governance',
    subtopicId: 'amg-cost-management',
    front: 'What factors affect Azure costs?',
    back: 'Resource type, resource usage (consumption), Azure region, outbound data transfer, licensing model (pay-as-you-go vs. reserved), and marketplace offerings.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-cost-management-azure/',
  },
  {
    id: 'fc-amg-002',
    topicId: 'azure-management-governance',
    subtopicId: 'amg-cost-management',
    front: 'What is the Azure Pricing Calculator?',
    back: 'A free online tool that lets you estimate the cost of Azure services BEFORE you deploy them. You configure resources and see projected monthly costs.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-cost-management-azure/',
  },
  {
    id: 'fc-amg-003',
    topicId: 'azure-management-governance',
    subtopicId: 'amg-cost-management',
    front: 'What are Azure tags?',
    back: 'Name-value pairs you apply to Azure resources for organization, cost tracking, and governance. Tags are not inherited by default. You can create policies requiring tags on resources.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-cost-management-azure/',
  },
  {
    id: 'fc-amg-004',
    topicId: 'azure-management-governance',
    subtopicId: 'amg-governance-compliance',
    front: 'What is Azure Policy?',
    back: 'A service for creating, assigning, and managing policies that enforce rules on Azure resources. It evaluates resources for non-compliance and can prevent non-compliant resources from being created. Policies can be grouped into initiatives.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-features-tools-azure-for-governance-compliance/',
  },
  {
    id: 'fc-amg-005',
    topicId: 'azure-management-governance',
    subtopicId: 'amg-governance-compliance',
    front: 'What are Azure resource locks?',
    back: 'Mechanisms that prevent accidental deletion or modification. Two types: CanNotDelete (allows read and modify, prevents delete) and ReadOnly (allows read only, prevents modify and delete). Locks override RBAC permissions.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-features-tools-azure-for-governance-compliance/',
  },
  {
    id: 'fc-amg-006',
    topicId: 'azure-management-governance',
    subtopicId: 'amg-managing-deploying',
    front: 'What is the Azure portal?',
    back: 'A web-based, unified console for managing Azure resources through a graphical user interface. It provides dashboards, resource creation, monitoring, and access to all Azure services.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-features-tools-manage-deploy-azure-resources/',
  },
  {
    id: 'fc-amg-007',
    topicId: 'azure-management-governance',
    subtopicId: 'amg-managing-deploying',
    front: 'What is Azure Arc?',
    back: 'A service that extends Azure management and governance to non-Azure environments. It lets you manage on-premises servers, Kubernetes clusters, and data services as if they were Azure resources, using the same tools and practices.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-features-tools-manage-deploy-azure-resources/',
  },
  {
    id: 'fc-amg-008',
    topicId: 'azure-management-governance',
    subtopicId: 'amg-managing-deploying',
    front: 'What are ARM templates?',
    back: 'JSON files that define Azure infrastructure using declarative syntax (Infrastructure as Code). They enable repeatable, consistent deployments. You describe the desired end state, and ARM handles the deployment order and parallelism.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-features-tools-manage-deploy-azure-resources/',
  },
  {
    id: 'fc-amg-009',
    topicId: 'azure-management-governance',
    subtopicId: 'amg-monitoring',
    front: 'What is Azure Advisor?',
    back: 'A personalized cloud consultant that recommends best practices across 5 categories: Reliability, Security, Performance, Cost, and Operational Excellence. It analyzes your resource configuration and usage patterns.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-monitoring-tools-azure/',
  },
  {
    id: 'fc-amg-010',
    topicId: 'azure-management-governance',
    subtopicId: 'amg-monitoring',
    front: 'What is Azure Service Health?',
    back: 'A collection of services that provide personalized guidance when Azure service issues affect you. It includes Azure Status (global view), Service Health (services/regions you use), and Resource Health (individual resource status).',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-monitoring-tools-azure/',
  },
  {
    id: 'fc-amg-011',
    topicId: 'azure-management-governance',
    subtopicId: 'amg-monitoring',
    front: 'What is Azure Monitor?',
    back: 'A comprehensive monitoring platform that collects, analyzes, and acts on telemetry from Azure and on-premises environments. Key features: Metrics, Logs, Log Analytics (KQL queries), Alerts, and Application Insights (APM for web apps).',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-monitoring-tools-azure/',
  },
];

void LEGACY_FLASHCARDS;

export const FLASHCARDS: Flashcard[] = createGeneratedFlashcards();
export const flashcards = FLASHCARDS;
