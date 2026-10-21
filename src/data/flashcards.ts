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
