import type { Flashcard } from '../types';

export const FLASHCARDS: Flashcard[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // DOMAIN 1: DESCRIBE CLOUD CONCEPTS (10 Cards)
  // ═══════════════════════════════════════════════════════════════════════════

  // --- Subtopic: cc-cloud-computing ---
  {
    id: 'fc-cc-001',
    topicId: 'cc-cloud-computing',
    front: 'What is Cloud Computing?',
    back: 'The on-demand delivery of computing services—including servers, storage, databases, networking, software, and analytics—over the internet ("the cloud") with pay-as-you-go pricing.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/strategy/cloud-migration-business-case',
  },
  {
    id: 'fc-cc-002',
    topicId: 'cc-cloud-computing',
    front: 'Shared Responsibility Model: Customer vs Provider Boundary',
    back: '• Customer ALWAYS responsible for: Information & Data, Devices/Endpoints, and Identity & Access Management.\n• Cloud Provider ALWAYS responsible for: Physical datacenter security, physical hosts, and physical network.\n• Shared/Varies by model: OS, Network controls, and Applications.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility',
  },
  {
    id: 'fc-cc-003',
    topicId: 'cc-cloud-computing',
    front: 'Private Cloud vs Public Cloud vs Hybrid Cloud',
    back: '• Public Cloud: Infrastructure owned by a third-party provider (e.g. Azure), multi-tenant hardware, accessible over internet.\n• Private Cloud: Infrastructure dedicated exclusively to one organization, hosted on-premises or by a third party.\n• Hybrid Cloud: Connects public cloud and private cloud/on-premises environments, allowing data and workload mobility.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/considerations/cloud-models',
  },

  // --- Subtopic: cc-cloud-benefits ---
  {
    id: 'fc-cc-004',
    topicId: 'cc-cloud-benefits',
    front: 'CapEx (Capital Expenditure) vs OpEx (Operational Expenditure)',
    back: '• CapEx: Upfront spending on physical infrastructure (servers, storage, building cooling) amortized over time with tax depreciation.\n• OpEx: Ongoing operational spending on services consumed with no upfront capital investment. Cloud operates primarily on OpEx.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/strategy/financial-model',
  },
  {
    id: 'fc-cc-005',
    topicId: 'cc-cloud-benefits',
    front: 'Elasticity vs Scalability',
    back: '• Scalability: The ability of a system to handle increased load by adding compute capacity (vertical or horizontal).\n• Elasticity: The ability to automatically and dynamically grow and shrink resources in real time based on demand spikes, scaling back down to save costs.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/architecture/framework/resiliency/overview',
  },
  {
    id: 'fc-cc-006',
    topicId: 'cc-cloud-benefits',
    front: 'Vertical Scaling (Scale Up) vs Horizontal Scaling (Scale Out)',
    back: '• Vertical Scaling (Scale Up/Down): Adding or removing resources (CPU, RAM, disk) to a single existing virtual machine.\n• Horizontal Scaling (Scale Out/In): Adding or removing multiple resource instances (e.g. adding 3 more VMs or web app containers).',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/architecture/guide/design-principles/scale-out',
  },
  {
    id: 'fc-cc-007',
    topicId: 'cc-cloud-benefits',
    front: 'Composite Service Level Agreement (SLA) Calculation',
    back: 'When combining services with independent SLAs in series, multiply their individual availability percentages.\n• Example: 99.9% Web App × 99.9% SQL DB = 99.8% composite SLA.\n• A composite SLA is always lower than individual service SLAs.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/architecture/framework/resiliency/business-metrics#composite-slas',
  },

  // --- Subtopic: cc-cloud-service-types ---
  {
    id: 'fc-cc-008',
    topicId: 'cc-cloud-service-types',
    front: 'Infrastructure as a Service (IaaS)',
    back: '• Maximum customer control and administrative flexibility.\n• Cloud provider manages hardware, virtualization, and physical network.\n• Customer manages OS installation, configuration, middleware, runtimes, and application code.\n• Examples: Azure Virtual Machines, Virtual Networks.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/virtual-machines/overview',
  },
  {
    id: 'fc-cc-009',
    topicId: 'cc-cloud-service-types',
    front: 'Platform as a Service (PaaS)',
    back: '• Cloud provider manages underlying hardware, OS patching, database engines, and runtime environments.\n• Customer focuses strictly on application code, logic, and database configuration.\n• Examples: Azure App Service, Azure SQL Database, Azure Functions.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/well-architected/service-guides/azure-app-service',
  },
  {
    id: 'fc-cc-010',
    topicId: 'cc-cloud-service-types',
    front: 'Software as a Service (SaaS)',
    back: '• End-user software hosted, managed, and patched completely by the vendor.\n• Users simply log in and access features via browser or client app.\n• Customer only manages data entry, settings, and user access.\n• Examples: Microsoft 365, Power BI, Dynamics 365.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/architecture/guide/technology-choices/compute-overview',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DOMAIN 2: DESCRIBE AZURE ARCHITECTURE AND SERVICES (11 Cards)
  // ═══════════════════════════════════════════════════════════════════════════

  // --- Subtopic: aas-core-architecture ---
  {
    id: 'fc-aas-001',
    topicId: 'aas-core-architecture',
    front: 'Azure Region vs Geography',
    back: '• Region: A geographical perimeter containing one or more datacenters connected via a dedicated, low-latency network (e.g. East US, West Europe).\n• Geography: A discrete market (usually containing two or more regions) that preserves data residency, privacy, and compliance boundaries (e.g. United States, Europe, Asia Pacific).',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/reliability/regions-overview',
  },
  {
    id: 'fc-aas-002',
    topicId: 'aas-core-architecture',
    front: 'What is an Availability Zone?',
    back: '• Physically separated locations within a single Azure Region.\n• Each zone consists of one or more datacenters equipped with independent power, cooling, and networking.\n• Designed to protect against whole-datacenter hardware failures without regional downtime.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/reliability/availability-zones-overview',
  },
  {
    id: 'fc-aas-003',
    topicId: 'aas-core-architecture',
    front: 'Azure Resource Hierarchy Levels',
    back: 'From highest to lowest scope:\n1. Management Groups (governance, policy across multiple subscriptions)\n2. Subscriptions (billing boundary & access container)\n3. Resource Groups (logical container for lifecycle-linked resources)\n4. Resources (individual services: VM, storage, database)',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/governance/management-groups/overview',
  },

  // --- Subtopic: aas-compute-networking ---
  {
    id: 'fc-aas-004',
    topicId: 'aas-compute-networking',
    front: 'Virtual Machine Scale Sets (VMSS)',
    back: '• An Azure compute resource that lets you create and manage a group of identical, load-balanced virtual machines.\n• Automatically increases or decreases the number of VM instances in response to demand or a scheduled schedule.\n• Provides built-in high availability across availability zones.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/virtual-machine-scale-sets/overview',
  },
  {
    id: 'fc-aas-005',
    topicId: 'aas-compute-networking',
    front: 'Azure Functions vs Azure Logic Apps',
    back: '• Azure Functions: Serverless code-first event-driven compute (write C#, TypeScript, Python) executing on demand.\n• Azure Logic Apps: Serverless low-code/no-code workflow automation designer with 400+ pre-built connectors.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/azure-functions/functions-compare-logic-apps-ms-flow-webjobs',
  },
  {
    id: 'fc-aas-006',
    topicId: 'aas-compute-networking',
    front: 'Azure Firewall vs Network Security Group (NSG)',
    back: '• NSG: Basic, free packet filtering tool working at layer 3 & 4 (IP, port, protocol) within a virtual network.\n• Azure Firewall: Fully stateful, managed cloud firewall service with built-in high availability, Layer 7 application inspection, FQDN filtering, and threat intelligence feeds.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/firewall/overview',
  },

  // --- Subtopic: aas-storage ---
  {
    id: 'fc-aas-007',
    topicId: 'aas-storage',
    front: 'Azure Blob Storage Access Tiers',
    back: '• Hot: Frequent access, highest storage cost, lowest access cost.\n• Cool: Infrequent access (stored >= 30 days), lower storage cost, higher access cost.\n• Cold: Infrequent access (stored >= 90 days), even lower storage cost.\n• Archive: Rare access (stored >= 180 days), lowest storage cost, high latency (hours to rehydrate).',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/storage/blobs/access-tiers-overview',
  },
  {
    id: 'fc-aas-008',
    topicId: 'aas-storage',
    front: 'Locally Redundant Storage (LRS) vs Zone-Redundant Storage (ZRS)',
    back: '• LRS: Replicates data 3 times synchronously within a single physical datacenter in the primary region (protects against disk/rack failure).\n• ZRS: Replicates data synchronously across 3 availability zones in the primary region (protects against datacenter-level disaster).',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy',
  },
  {
    id: 'fc-aas-009',
    topicId: 'aas-storage',
    front: 'What is Azure Files?',
    back: '• Fully managed cloud file shares accessible via industry-standard SMB and NFS protocols.\n• Can be mounted concurrently by cloud or on-premises deployments across Windows, Linux, and macOS.\n• Perfect for "lift-and-shift" migrations of legacy file servers.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/storage/files/storage-files-introduction',
  },

  // --- Subtopic: aas-identity-security ---
  {
    id: 'fc-aas-010',
    topicId: 'aas-identity-security',
    front: 'Microsoft Entra ID vs Azure RBAC',
    back: '• Microsoft Entra ID (formerly Azure AD): Identity and Access Management solution (authenticates users, manages single sign-on, MFA, and user directories).\n• Azure Role-Based Access Control (RBAC): Authorization system that assigns specific permissions to identities on Azure management plane resources.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/role-based-access-control/overview',
  },
  {
    id: 'fc-aas-011',
    topicId: 'aas-identity-security',
    front: 'Three Guiding Principles of Zero Trust Security',
    back: '1. Verify Explicitly: Always authenticate and authorize based on all available data points (identity, location, device, service).\n2. Use Least Privileged Access: Limit user access with Just-In-Time (JIT) and Just-Enough-Access (JEA).\n3. Assume Breach: Minimize blast radius, segment access, and inspect all traffic.',
    sourceUrl: 'https://learn.microsoft.com/en-us/security/zero-trust/zero-trust-overview',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DOMAIN 3: DESCRIBE AZURE MANAGEMENT AND GOVERNANCE (10 Cards)
  // ═══════════════════════════════════════════════════════════════════════════

  // --- Subtopic: amg-cost-management ---
  {
    id: 'fc-amg-001',
    topicId: 'amg-cost-management',
    front: 'Azure Pricing Calculator vs TCO Calculator',
    back: '• Pricing Calculator: Estimates monthly costs for prospective Azure services based on anticipated usage.\n• Total Cost of Ownership (TCO) Calculator: Compares the cost of running on-premises datacenter workloads against running those same workloads in Azure over 1–5 years.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/quick-acm-cost-analysis',
  },
  {
    id: 'fc-amg-002',
    topicId: 'amg-cost-management',
    front: 'Azure Cost Management Budgets and Alerts',
    back: '• Lets you set monthly spending limits at subscription, resource group, or management group levels.\n• Triggers automated alerts and action groups when spending reaches predefined thresholds (e.g. 50%, 80%, 100% of budget).\n• Alerts notify administrators without forcibly shutting down production VMs unless specifically automated.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-acm-create-budgets',
  },
  {
    id: 'fc-amg-003',
    topicId: 'amg-cost-management',
    front: 'Azure Reservations (Reserved Instances)',
    back: '• Significant discounts (up to 72% off pay-as-you-go) by committing to 1-year or 3-year consistent resource usage.\n• Applicable to Virtual Machines, SQL databases, and Cosmos DB.\n• Best for steady-state workloads with predictable, continuous demand.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/cost-management-billing/reservations/save-compute-costs-reservations',
  },

  // --- Subtopic: amg-governance-compliance ---
  {
    id: 'fc-amg-004',
    topicId: 'amg-governance-compliance',
    front: 'Azure Policy vs Azure RBAC',
    back: '• Azure Policy: Focuses on resource properties (e.g. "Only allow deployments in East US", "Require a CostCenter tag", "Block public IP addresses").\n• Azure RBAC: Focuses on user actions (e.g. "Can user X start/stop virtual machines in this resource group?").',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/governance/policy/overview',
  },
  {
    id: 'fc-amg-005',
    topicId: 'amg-governance-compliance',
    front: 'Resource Locks: CanNotDelete vs ReadOnly',
    back: '• CanNotDelete (Delete lock): Authorized users can read and modify a resource, but nobody can delete it until the lock is removed.\n• ReadOnly: Authorized users can only read a resource; they cannot modify or delete it (e.g. prevents restarting a VM or modifying disk settings).',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/lock-resources',
  },
  {
    id: 'fc-amg-006',
    topicId: 'amg-governance-compliance',
    front: 'What is Microsoft Purview?',
    back: '• Comprehensive data governance solution for discovering, mapping, and cataloging sensitive data assets.\n• Helps organizations manage sensitive data compliance across on-premises, multi-cloud, and Software as a Service (SaaS) environments.',
    sourceUrl: 'https://learn.microsoft.com/en-us/purview/purview',
  },

  // --- Subtopic: amg-managing-deploying ---
  {
    id: 'fc-amg-007',
    topicId: 'amg-managing-deploying',
    front: 'ARM Templates vs Azure Bicep',
    back: '• ARM Templates: Declarative Infrastructure as Code (IaC) written in complex, verbose JSON syntax.\n• Azure Bicep: Domain-Specific Language (DSL) that offers cleaner, more concise syntax, automatic dependency management, and modularity, compiling down directly to ARM JSON.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/overview',
  },
  {
    id: 'fc-amg-008',
    topicId: 'amg-managing-deploying',
    front: 'What is Azure Cloud Shell?',
    back: '• An interactive, authenticated, browser-accessible command-line terminal for managing Azure resources.\n• Provides choice between Bash and PowerShell with persistent $HOME storage (via Azure Files).\n• Comes pre-installed with Azure CLI, Git, Terraform, and Docker.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/cloud-shell/overview',
  },

  // --- Subtopic: amg-monitoring ---
  {
    id: 'fc-amg-009',
    topicId: 'amg-monitoring',
    front: 'Azure Advisor 5 Recommendation Pillars',
    back: 'Azure Advisor analyzes deployed configurations and provides personalized best-practice guidance across 5 pillars:\n1. Reliability (High Availability)\n2. Security\n3. Performance\n4. Cost\n5. Operational Excellence',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/advisor/advisor-overview',
  },
  {
    id: 'fc-amg-010',
    topicId: 'amg-monitoring',
    front: 'Azure Service Health vs Azure Monitor',
    back: '• Azure Service Health: Global platform notifications (informs you about Microsoft datacenter outages, planned maintenance, and advisory alerts affecting your subscriptions).\n• Azure Monitor: Telemetry and observability engine (collects metrics and logs from your deployed applications, VMs, and resources using Log Analytics and KQL).',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/service-health/overview',
  },
];

export default FLASHCARDS;
// ============================================================
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

export const flashcards: Flashcard[] = [
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
    subtopicId: 'cc-benefits',
    front: 'What is high availability in cloud computing?',
    back: 'The ability of a system to remain operational and accessible with minimum downtime, even during failures. Azure provides SLAs (Service Level Agreements) that guarantee specific uptime percentages (e.g., 99.9%).',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-benefits-use-cloud-services/2-high-availability-scalability-cloud',
  },
  {
    id: 'fc-cc-007',
    topicId: 'cloud-concepts',
    subtopicId: 'cc-benefits',
    front: 'Scaling up vs. scaling out — what is the difference?',
    back: 'Scaling up (vertical): Adding more power (CPU, RAM) to an existing resource. Scaling out (horizontal): Adding more instances of a resource (e.g., more VMs). Scaling out provides better fault tolerance.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-benefits-use-cloud-services/2-high-availability-scalability-cloud',
  },
  {
    id: 'fc-cc-008',
    topicId: 'cloud-concepts',
    subtopicId: 'cc-benefits',
    front: 'What is reliability in the context of cloud computing?',
    back: 'The ability of a system to recover from failures and continue to function. The cloud supports reliability through decentralized design — resources deployed in multiple regions ensure that even if one region has a catastrophic event, other regions are still operational.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-benefits-use-cloud-services/3-reliability-predictability-cloud',
  },
  {
    id: 'fc-cc-009',
    topicId: 'cloud-concepts',
    subtopicId: 'cc-service-types',
    front: 'What is IaaS (Infrastructure as a Service)?',
    back: 'The most flexible cloud service category. The provider manages physical hardware, network, and physical security. The customer manages OS, middleware, runtime, data, and applications. Example: Azure Virtual Machines.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-service-types/2-describe-infrastructure-service',
  },
  {
    id: 'fc-cc-010',
    topicId: 'cloud-concepts',
    subtopicId: 'cc-service-types',
    front: 'What is PaaS (Platform as a Service)?',
    back: 'A middle ground between IaaS and SaaS. The provider manages infrastructure and platform (OS, middleware, tools). The customer focuses on deploying applications and data. Example: Azure App Service.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-service-types/3-describe-platform-service',
  },
  {
    id: 'fc-cc-011',
    topicId: 'cloud-concepts',
    subtopicId: 'cc-service-types',
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
