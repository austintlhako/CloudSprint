import type { QuizQuestion } from '../types';

export const QUESTIONS: QuizQuestion[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // DOMAIN 1: DESCRIBE CLOUD CONCEPTS (11 Questions)
  // ═══════════════════════════════════════════════════════════════════════════

  // --- Subtopic: cc-cloud-computing (Fundamentals & Shared Responsibility) ---
  {
    id: 'q-cc-001',
    topicId: 'cc-cloud-computing',
    question: 'Under the cloud Shared Responsibility Model, which responsibility is ALWAYS retained by the customer regardless of the cloud deployment model (IaaS, PaaS, or SaaS)?',
    options: [
      'Physical datacenter security and hardware maintenance',
      'Operating system installation and patching',
      'Information and data classification, access management, and endpoints',
      'Network infrastructure configuration and router maintenance',
    ],
    correctIndex: 2,
    explanation: 'In the Shared Responsibility Model, the customer is always responsible for the security of their data, information classification, identity and access management, and mobile/desktop endpoints across all cloud models (IaaS, PaaS, and SaaS).',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility',
// ============================================================
// CloudSprint — AZ-900 Question Bank
//
// Original questions aligned to the official AZ-900 study guide
// (skills measured as of July 20, 2026).
//
// DISCLAIMER: These are original practice questions created for
// educational purposes. They are NOT official Microsoft exam
// questions and do not guarantee exam readiness.
//
// Source: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900
// ============================================================

import type { Question } from '../types';

export const questions: Question[] = [
  // ────────────────────────────────────────────────
  // Domain 1: Describe Cloud Concepts (25–30%)
  // ────────────────────────────────────────────────

  // Subtopic: Describe cloud computing
  {
    id: 'q-cc-001',
    topicId: 'cloud-concepts',
    subtopicId: 'cc-cloud-computing',
    question: 'Which of the following best defines cloud computing?',
    options: [
      'Running applications on a local server in your office',
      'The delivery of computing services over the internet, including servers, storage, databases, networking, software, and analytics',
      'Purchasing dedicated hardware for your data center',
      'Using USB drives to transfer data between computers',
    ],
    correctIndex: 1,
    explanation:
      'Cloud computing is the delivery of computing services—including servers, storage, databases, networking, software, analytics, and intelligence—over the internet ("the cloud") to offer faster innovation, flexible resources, and economies of scale.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-compute/',
    difficulty: 'beginner',
  },
  {
    id: 'q-cc-002',
    topicId: 'cc-cloud-computing',
    question: 'A company needs to connect their on-premises datacenter to Microsoft Azure to securely burst compute workloads during seasonal peak traffic. What cloud deployment model is the company using?',
    options: [
      'Public cloud',
      'Private cloud',
      'Hybrid cloud',
      'Multi-tenant community cloud',
    ],
    correctIndex: 2,
    explanation: 'A hybrid cloud connects an on-premises private cloud/datacenter with a public cloud environment like Azure, enabling secure data and application sharing as well as cloud bursting during peak traffic.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/get-started/hybrid',
    topicId: 'cloud-concepts',
    subtopicId: 'cc-cloud-computing',
    question: 'In the shared responsibility model, which responsibility always remains with the customer regardless of the cloud service type?',
    options: [
      'Physical host security',
      'Network controls',
      'Data and access management',
      'Operating system patching',
    ],
    correctIndex: 2,
    explanation:
      'In the shared responsibility model, the customer is always responsible for their data, the devices that connect to the cloud, and the accounts and identities of people, services, and devices within their organization.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-compute/4-describe-shared-responsibility-model',
    difficulty: 'beginner',
  },
  {
    id: 'q-cc-003',
    topicId: 'cc-cloud-computing',
    question: 'An enterprise is legally mandated to maintain exclusive, dedicated physical infrastructure with zero multi-tenancy. Which cloud deployment model satisfies this requirement?',
    topicId: 'cloud-concepts',
    subtopicId: 'cc-cloud-computing',
    question: 'Which cloud model combines on-premises infrastructure with cloud resources, allowing data and applications to be shared between them?',
    options: [
      'Public cloud',
      'Private cloud',
      'Hybrid cloud',
      'Software as a Service (SaaS)',
    ],
    correctIndex: 1,
    explanation: 'A private cloud consists of computing resources dedicated exclusively to one business or organization. It can be physically located at an on-premises datacenter or hosted by a third-party service provider on isolated hardware.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/considerations/cloud-models',
    difficulty: 'beginner',
  },

  // --- Subtopic: cc-cloud-benefits (Cloud Benefits: HA, Scalability, Elasticity, CapEx/OpEx) ---
  {
    id: 'q-cc-004',
    topicId: 'cc-cloud-benefits',
    question: 'An e-commerce website experiences sudden, unpredictable surges in traffic during flash sales and wants the infrastructure to automatically allocate and deallocate resources dynamically. Which cloud characteristic is this?',
    options: [
      'High Availability',
      'Fault Tolerance',
      'Elasticity',
      'Predictability',
    ],
    correctIndex: 2,
    explanation: 'Elasticity is the ability of cloud computing to dynamically provision and deprovision compute, memory, and storage resources in response to changing demand spikes in real time.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/architecture/framework/resiliency/overview',
    difficulty: 'beginner',
  },
  {
    id: 'q-cc-005',
    topicId: 'cc-cloud-benefits',
    question: 'How does migrating on-premises servers to Azure change an organization’s financial accounting model for IT expenditure?',
    options: [
      'Transitions from Capital Expenditure (CapEx) to Operational Expenditure (OpEx)',
      'Transitions from Operational Expenditure (OpEx) to Capital Expenditure (CapEx)',
      'Eliminates all operational expenses entirely',
      'Guarantees zero ongoing monthly charges',
    ],
    correctIndex: 0,
    explanation: 'Cloud computing operates predominantly on an Operational Expenditure (OpEx) model, where organizations pay for consumed services without the large upfront capital expenditure (CapEx) required for physical hardware, servers, and datacenter cooling.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/strategy/financial-model',
      'Community cloud',
    ],
    correctIndex: 2,
    explanation:
      'A hybrid cloud is a computing environment that combines a public cloud and a private cloud by allowing data and applications to be shared between them, providing greater flexibility and more deployment options.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-compute/5-define-cloud-models',
    difficulty: 'beginner',
  },
  {
    id: 'q-cc-004',
    topicId: 'cloud-concepts',
    subtopicId: 'cc-cloud-computing',
    question: 'A company needs full control over security and compliance but wants to leverage some cloud benefits. Which cloud model is most appropriate?',
    options: [
      'Public cloud',
      'Private cloud',
      'Hybrid cloud',
      'Multi-cloud',
    ],
    correctIndex: 1,
    explanation:
      'A private cloud provides a cloud environment dedicated to a single organization. It offers more control over resources and security, making it suitable for organizations with strict compliance requirements.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-compute/5-define-cloud-models',
    difficulty: 'intermediate',
  },
  {
    id: 'q-cc-005',
    topicId: 'cloud-concepts',
    subtopicId: 'cc-cloud-computing',
    question: 'What is the consumption-based model in cloud computing?',
    options: [
      'Paying a fixed monthly fee regardless of usage',
      'Paying only for the resources you actually use',
      'Buying hardware upfront and using it until it is outdated',
      'Getting free cloud resources for the first year',
    ],
    correctIndex: 1,
    explanation:
      'The consumption-based model means you only pay for the cloud resources you use. This helps you plan and manage your operating costs, run your infrastructure more efficiently, and scale as your business needs change.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-compute/6-describe-consumption-based-model',
    difficulty: 'beginner',
  },
  {
    id: 'q-cc-006',
    topicId: 'cc-cloud-benefits',
    question: 'A company requires that an application continue operating with minimal downtime even if an entire hardware rack or power supply fails in a datacenter. Which architectural benefit does this address?',
    options: [
      'Agility',
      'High Availability (HA)',
      'Disaster Recovery (DR)',
      'Total Cost of Ownership (TCO)',
    ],
    correctIndex: 1,
    explanation: 'High Availability focuses on ensuring maximum continuous uptime with redundant components and minimal downtime during component or transient infrastructure failures.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/architecture/framework/resiliency/principles',
    difficulty: 'intermediate',
  },
  {
    id: 'q-cc-007',
    topicId: 'cc-cloud-benefits',
    question: 'What is the primary difference between horizontal scaling (scaling out) and vertical scaling (scaling up)?',
    options: [
      'Horizontal scaling adds more instances of a resource, whereas vertical scaling adds CPU or RAM to an existing instance.',
      'Vertical scaling adds more virtual machines, whereas horizontal scaling increases disk capacity.',
      'Horizontal scaling is only available for database services, whereas vertical scaling is for compute.',
      'Vertical scaling requires zero reboot or interruption, whereas horizontal scaling requires full downtime.',
    ],
    correctIndex: 0,
    explanation: 'Horizontal scaling (scaling out/in) adds or removes resource instances (like VMs or app containers). Vertical scaling (scaling up/down) upgrades or downgrades the compute capacity (such as adding more vCPUs or RAM) of an individual existing instance.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/architecture/guide/design-principles/scale-out',
    difficulty: 'intermediate',
  },

  // --- Subtopic: cc-cloud-service-types (IaaS, PaaS, SaaS) ---
  {
    id: 'q-cc-008',
    topicId: 'cc-cloud-service-types',
    question: 'Your development team wants to deploy a web application without managing operating system patches, runtime runtimes, or virtual machine configuration. Which cloud service category should they choose?',
    options: [
      'Infrastructure as a Service (IaaS)',
      'Platform as a Service (PaaS)',
      'Software as a Service (SaaS)',
      'Bare-metal Colocation',
    ],
    correctIndex: 1,
    explanation: 'Platform as a Service (PaaS) provides an environment for building, testing, and deploying software applications without the burden of provisioning or managing servers, operating systems, or runtime runtimes (e.g. Azure App Service).',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/well-architected/service-guides/azure-app-service',
    topicId: 'cloud-concepts',
    subtopicId: 'cc-cloud-computing',
    question: 'What is a key characteristic of serverless computing?',
    options: [
      'You manage the underlying server infrastructure',
      'The cloud provider automatically manages the infrastructure, and you only pay for the actual resources consumed by your code',
      'You must pre-provision servers before deploying code',
      'It only works with containers',
    ],
    correctIndex: 1,
    explanation:
      'Serverless computing enables developers to build applications faster by eliminating the need for them to manage infrastructure. With serverless applications, the cloud service provider automatically provisions, scales, and manages the infrastructure required to run the code.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-compute/',
    difficulty: 'beginner',
  },
  {
    id: 'q-cc-007',
    topicId: 'cloud-concepts',
    subtopicId: 'cc-cloud-computing',
    question: 'Which pricing model requires the highest upfront investment?',
    options: [
      'Consumption-based (pay-as-you-go)',
      'Capital expenditure (CapEx)',
      'Operational expenditure (OpEx)',
      'Reserved instances',
    ],
    correctIndex: 1,
    explanation:
      'Capital expenditure (CapEx) involves upfront spending on physical infrastructure, which is then deducted over time. Cloud computing typically shifts costs to an operational expenditure (OpEx) model where you pay for services as you use them.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-compute/6-describe-consumption-based-model',
    difficulty: 'intermediate',
  },

  // Subtopic: Describe the benefits of using cloud services
  {
    id: 'q-cc-008',
    topicId: 'cloud-concepts',
    subtopicId: 'cc-benefits',
    question: 'What does high availability in cloud computing refer to?',
    options: [
      'The ability to quickly increase computing resources',
      'Ensuring maximum uptime and service continuity regardless of disruptions or events',
      'The ability to recover data after a disaster',
      'Making applications accessible from any device',
    ],
    correctIndex: 1,
    explanation:
      'High availability focuses on ensuring maximum uptime regardless of disruptions. Azure SLAs define uptime guarantees, and architectures are designed to maintain service even when failures occur.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-benefits-use-cloud-services/2-high-availability-scalability-cloud',
    difficulty: 'beginner',
  },
  {
    id: 'q-cc-009',
    topicId: 'cc-cloud-service-types',
    question: 'An enterprise subscribes to Microsoft 365 for email, word processing, and collaboration. Users access the applications via a web browser. Which cloud service model does this represent?',
    options: [
      'Software as a Service (SaaS)',
      'Platform as a Service (PaaS)',
      'Infrastructure as a Service (IaaS)',
      'Functions as a Service (FaaS)',
    ],
    correctIndex: 0,
    explanation: 'Software as a Service (SaaS) delivers fully managed, ready-to-use software applications hosted centrally over the internet. Examples include Microsoft 365, Microsoft Dynamics 365, and Power BI.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/architecture/guide/technology-choices/compute-overview',
    difficulty: 'beginner',
  },
  {
    id: 'q-cc-010',
    topicId: 'cc-cloud-service-types',
    question: 'Which cloud service type provides the customer with the highest degree of administrative control and customization over operating systems and network settings?',
    options: [
      'Platform as a Service (PaaS)',
      'Software as a Service (SaaS)',
      'Infrastructure as a Service (IaaS)',
      'Serverless computing',
    ],
    correctIndex: 2,
    explanation: 'Infrastructure as a Service (IaaS) provides virtualized computing resources (VMs, storage, networking) giving administrators complete control over OS configuration, middleware, and network topology.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/virtual-machines/overview',
    difficulty: 'beginner',
  },
  {
    id: 'q-cc-011',
    topicId: 'cc-cloud-service-types',
    question: 'What is a core benefit of Serverless computing (such as Azure Functions)?',
    options: [
      'The developer retains direct root/administrative access to the underlying hypervisor.',
      'Pricing is strictly based on code execution time and resources consumed rather than idle server uptime.',
      'Applications do not require any network security policies.',
      'Code runs continuously 24/7 on dedicated physical hardware without concurrency limits.',
    ],
    correctIndex: 1,
    explanation: 'Serverless computing abstracts infrastructure management completely and charges only for the exact compute execution duration and events processed, scaling automatically to zero when there is no traffic.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview',
    difficulty: 'intermediate',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DOMAIN 2: DESCRIBE AZURE ARCHITECTURE AND SERVICES (11 Questions)
  // ═══════════════════════════════════════════════════════════════════════════

  // --- Subtopic: aas-core-architecture (Regions, Availability Zones, Hierarchy) ---
  {
    id: 'q-aas-001',
    topicId: 'aas-core-architecture',
    question: 'What constitutes an Azure Availability Zone?',
    options: [
      'A collection of multiple Azure Regions located within the same continent',
      'One or more physically separate datacenters within an Azure Region, equipped with independent power, cooling, and networking',
      'A virtual perimeter network isolating subnets from the public internet',
      'A group of Azure subscriptions managed by a single billing administrator',
    ],
    correctIndex: 1,
    explanation: 'Azure Availability Zones are physically separate locations within an Azure region. Each zone is made up of one or more datacenters equipped with independent power, cooling, and networking infrastructure to protect against datacenter failures.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/reliability/availability-zones-overview',
    topicId: 'cloud-concepts',
    subtopicId: 'cc-benefits',
    question: 'What is the difference between vertical scaling and horizontal scaling?',
    options: [
      'Vertical scaling adds more VMs; horizontal scaling adds more CPU/RAM to one VM',
      'Vertical scaling increases CPU/RAM on an existing resource; horizontal scaling adds more instances of a resource',
      'They are the same thing',
      'Vertical scaling is for storage; horizontal scaling is for compute',
    ],
    correctIndex: 1,
    explanation:
      'Vertical scaling (scaling up) means increasing the capabilities of a resource (e.g., more CPU or RAM). Horizontal scaling (scaling out) means adding more instances of a resource, such as adding additional VMs or containers.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-benefits-use-cloud-services/2-high-availability-scalability-cloud',
    difficulty: 'intermediate',
  },
  {
    id: 'q-cc-010',
    topicId: 'cloud-concepts',
    subtopicId: 'cc-benefits',
    question: 'Which cloud benefit allows you to deploy resources globally and have them automatically route users to the nearest datacenter?',
    options: [
      'Scalability',
      'Predictability',
      'Reliability',
      'Governance',
    ],
    correctIndex: 2,
    explanation:
      'Reliability is the ability of a system to recover from failures and continue to function. The cloud supports reliability by having a decentralized design with resources deployed in regions around the world.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-benefits-use-cloud-services/3-reliability-predictability-cloud',
    difficulty: 'intermediate',
  },
  {
    id: 'q-cc-011',
    topicId: 'cloud-concepts',
    subtopicId: 'cc-benefits',
    question: 'How does cloud computing enhance governance?',
    options: [
      'By eliminating the need for security policies',
      'By providing templates and tools that help ensure deployed resources meet corporate standards and regulatory requirements',
      'By preventing users from accessing any resources',
      'By removing all administrative responsibilities',
    ],
    correctIndex: 1,
    explanation:
      'Cloud features support governance by providing templates that help ensure all deployed resources meet corporate standards and government regulatory requirements. Cloud-based auditing helps flag any resource that is out of compliance.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-benefits-use-cloud-services/4-security-governance-cloud',
    difficulty: 'intermediate',
  },
  {
    id: 'q-cc-012',
    topicId: 'cloud-concepts',
    subtopicId: 'cc-benefits',
    question: 'Which cloud benefit refers to the ability to predict both future costs and future performance?',
    options: [
      'Reliability',
      'Manageability',
      'Predictability',
      'Scalability',
    ],
    correctIndex: 2,
    explanation:
      'Predictability in the cloud can focus on cost predictability or performance predictability. Cost predictability lets you track and forecast your cloud spend. Performance predictability focuses on predicting the resources needed for a positive customer experience.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-benefits-use-cloud-services/3-reliability-predictability-cloud',
    difficulty: 'beginner',
  },

  // Subtopic: Describe cloud service types
  {
    id: 'q-cc-013',
    topicId: 'cloud-concepts',
    subtopicId: 'cc-service-types',
    question: 'Which cloud service type provides the most control over the underlying infrastructure?',
    options: [
      'Software as a Service (SaaS)',
      'Platform as a Service (PaaS)',
      'Infrastructure as a Service (IaaS)',
      'Function as a Service (FaaS)',
    ],
    correctIndex: 2,
    explanation:
      'IaaS provides the most control to the customer. The cloud provider manages the physical hardware, network, and physical security, while the customer manages the operating system, network configuration, applications, and data.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-service-types/',
    difficulty: 'beginner',
  },
  {
    id: 'q-cc-014',
    topicId: 'cloud-concepts',
    subtopicId: 'cc-service-types',
    question: 'A development team wants to build and deploy applications without managing the underlying operating system. Which cloud service type should they use?',
    options: [
      'IaaS',
      'PaaS',
      'SaaS',
      'On-premises',
    ],
    correctIndex: 1,
    explanation:
      'PaaS provides a ready-made development and deployment environment. The cloud provider manages the infrastructure (VMs, networking) and the platform (OS, middleware, tools), while the developer focuses on building and deploying the application.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-service-types/3-describe-platform-service',
    difficulty: 'beginner',
  },
  {
    id: 'q-cc-015',
    topicId: 'cloud-concepts',
    subtopicId: 'cc-service-types',
    question: 'Microsoft 365 and Salesforce are examples of which cloud service type?',
    options: [
      'IaaS',
      'PaaS',
      'SaaS',
      'Hybrid cloud',
    ],
    correctIndex: 2,
    explanation:
      'SaaS provides a complete software solution that you purchase on a pay-as-you-go basis. Users connect to and use cloud-based applications over the internet. Microsoft 365 and Salesforce are common SaaS examples.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-service-types/4-describe-software-service',
    difficulty: 'beginner',
  },
  {
    id: 'q-cc-016',
    topicId: 'cloud-concepts',
    subtopicId: 'cc-service-types',
    question: 'A company wants to host virtual machines in the cloud and manage the operating system and applications themselves. Which service model is this?',
    options: [
      'SaaS',
      'PaaS',
      'IaaS',
      'Serverless',
    ],
    correctIndex: 2,
    explanation:
      'IaaS is the closest to managing physical servers. The cloud provider manages the hardware while you manage the operating system, middleware, and applications. Hosting VMs where you manage the OS is a classic IaaS scenario.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-cloud-service-types/2-describe-infrastructure-service',
    difficulty: 'beginner',
  },

  // ────────────────────────────────────────────────
  // Domain 2: Describe Azure Architecture and Services (35–40%)
  // ────────────────────────────────────────────────

  // Subtopic: Core architectural components
  {
    id: 'q-aas-001',
    topicId: 'azure-architecture-services',
    subtopicId: 'aas-core-architecture',
    question: 'What is an Azure region?',
    options: [
      'A political boundary in which Azure operates',
      'A set of datacenters deployed within a latency-defined perimeter and connected through a dedicated regional low-latency network',
      'A single datacenter building',
      'A subscription type',
    ],
    correctIndex: 1,
    explanation:
      'An Azure region is a set of datacenters deployed within a latency-defined perimeter and connected through a dedicated regional low-latency network. Azure has more global regions than any other cloud provider.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-core-architectural-components-of-azure/5-describe-azure-physical-infrastructure',
    difficulty: 'beginner',
  },
  {
    id: 'q-aas-002',
    topicId: 'aas-core-architecture',
    question: 'In the Azure resource hierarchy, what construct allows an organization to manage governance, access, and compliance policies across multiple Azure subscriptions simultaneously?',
    options: [
      'Resource Groups',
      'Management Groups',
      'Availability Sets',
      'Service Principals',
    ],
    correctIndex: 1,
    explanation: 'Management Groups sit above subscriptions in the Azure governance hierarchy. Policies and role-based access control assigned at a Management Group level are inherited by all subscriptions and resources underneath.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/governance/management-groups/overview',
    difficulty: 'intermediate',
  },
  {
    id: 'q-aas-003',
    topicId: 'aas-core-architecture',
    question: 'What is the minimum geographic distance Microsoft targets between Azure Region Pairs to protect against regional disasters?',
    options: [
      'At least 10 miles',
      'At least 300 miles',
      'At least 1,000 miles',
      'There is no minimum distance requirement',
    ],
    correctIndex: 1,
    explanation: 'An Azure Region Pair consists of two regions within the same geography situated at least 300 miles apart where possible. This physical separation prevents simultaneous impact from widespread regional natural disasters or civil disruptions.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/reliability/cross-region-replication-azure',
    difficulty: 'advanced',
  },

  // --- Subtopic: aas-compute-networking (Compute & Networking) ---
  {
    id: 'q-aas-004',
    topicId: 'aas-compute-networking',
    question: 'Which Azure compute service is best suited for automatically managing, orchestrating, and scaling clusters of containerized microservices?',
    options: [
      'Azure Virtual Machines',
      'Azure Container Instances (ACI)',
      'Azure Kubernetes Service (AKS)',
      'Azure Batch',
    ],
    correctIndex: 2,
    explanation: 'Azure Kubernetes Service (AKS) is a managed container orchestration service based on open-source Kubernetes, designed for enterprise-grade management, deployment, and autoscaling of container clusters.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/aks/intro-kubernetes',
    topicId: 'azure-architecture-services',
    subtopicId: 'aas-core-architecture',
    question: 'What is the purpose of Azure availability zones?',
    options: [
      'To provide backup internet connectivity',
      'To provide physically separate locations within an Azure region, each with independent power, cooling, and networking',
      'To route traffic between different Azure subscriptions',
      'To replicate data across different countries',
    ],
    correctIndex: 1,
    explanation:
      'Availability zones are physically separate locations within each Azure region. Each zone has independent power, cooling, and networking and is designed to protect against datacenter-level failures.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-core-architectural-components-of-azure/5-describe-azure-physical-infrastructure',
    difficulty: 'beginner',
  },
  {
    id: 'q-aas-003',
    topicId: 'azure-architecture-services',
    subtopicId: 'aas-core-architecture',
    question: 'What is the correct hierarchy of Azure organizational structure from top to bottom?',
    options: [
      'Resource groups → Subscriptions → Management groups → Resources',
      'Management groups → Subscriptions → Resource groups → Resources',
      'Subscriptions → Management groups → Resources → Resource groups',
      'Resources → Resource groups → Management groups → Subscriptions',
    ],
    correctIndex: 1,
    explanation:
      'The hierarchy is: Management groups → Subscriptions → Resource groups → Resources. Management groups help you manage access, policy, and compliance for multiple subscriptions.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-core-architectural-components-of-azure/6-describe-azure-management-infrastructure',
    difficulty: 'intermediate',
  },
  {
    id: 'q-aas-004',
    topicId: 'azure-architecture-services',
    subtopicId: 'aas-core-architecture',
    question: 'Which statement about Azure resource groups is correct?',
    options: [
      'A resource can belong to multiple resource groups simultaneously',
      'A resource group can be nested inside another resource group',
      'Each resource must be in exactly one resource group, and resource groups cannot be nested',
      'Resource groups are optional for Azure resources',
    ],
    correctIndex: 2,
    explanation:
      'Every Azure resource must belong to exactly one resource group. Resource groups cannot be nested. When you delete a resource group, all resources within it are also deleted.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-core-architectural-components-of-azure/6-describe-azure-management-infrastructure',
    difficulty: 'intermediate',
  },
  {
    id: 'q-aas-005',
    topicId: 'aas-compute-networking',
    question: 'A company needs a dedicated, private, high-speed connection between their corporate on-premises network and Azure that does NOT travel over the public internet. Which service should they implement?',
    options: [
      'Azure Point-to-Site VPN',
      'Azure Site-to-Site VPN Gateway',
      'Azure ExpressRoute',
      'Azure Bastion',
    ],
    correctIndex: 2,
    explanation: 'Azure ExpressRoute lets organizations extend their on-premises networks into the Microsoft cloud over a private connection facilitated by a connectivity provider. ExpressRoute connections do not traverse the public internet.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/expressroute/expressroute-introduction',
    difficulty: 'intermediate',
  },
  {
    id: 'q-aas-006',
    topicId: 'aas-compute-networking',
    question: 'What is the function of a Network Security Group (NSG) in Azure?',
    options: [
      'To provide automated SSL termination and round-robin HTTP load balancing',
      'To filter network traffic to and from Azure resources in an Azure Virtual Network based on 5-tuple security rules',
      'To monitor CPU and memory utilization thresholds across virtual machines',
      'To translate domain names into public IP addresses',
    ],
    correctIndex: 1,
    explanation: 'A Network Security Group (NSG) contains security rules that allow or deny inbound network traffic to, or outbound network traffic from, several types of Azure resources (using source/destination IP, port, and protocol).',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview',
    difficulty: 'beginner',
  },

  // --- Subtopic: aas-storage (Azure Storage Services & Redundancy) ---
  {
    id: 'q-aas-007',
    topicId: 'aas-storage',
    question: 'Which Azure Blob Storage access tier offers the lowest storage cost per gigabyte, but has high retrieval latency (hours) and the highest data access fee?',
    topicId: 'azure-architecture-services',
    subtopicId: 'aas-core-architecture',
    question: 'What are sovereign regions in Azure?',
    options: [
      'Regions that offer the cheapest pricing',
      'Regions that are available only during certain hours',
      'Instances of Azure isolated from the main instance, used for compliance or legal purposes',
      'Regions that only support Linux-based workloads',
    ],
    correctIndex: 2,
    explanation:
      'Sovereign regions are instances of Azure that are isolated from the main instance of Azure. You may need to use a sovereign region for compliance or legal purposes. Examples include Azure Government (US) and Azure China (operated by 21Vianet).',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-core-architectural-components-of-azure/5-describe-azure-physical-infrastructure',
    difficulty: 'intermediate',
  },

  // Subtopic: Compute and networking services
  {
    id: 'q-aas-006',
    topicId: 'azure-architecture-services',
    subtopicId: 'aas-compute-networking',
    question: 'Which Azure service allows you to run containerized applications without managing servers?',
    options: [
      'Azure Virtual Machines',
      'Azure Container Instances',
      'Azure Virtual Desktop',
      'Azure Firewall',
    ],
    correctIndex: 1,
    explanation:
      'Azure Container Instances (ACI) is the fastest and simplest way to run a container in Azure without managing virtual machines. It is a PaaS offering for running containers.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-azure-compute-networking-services/',
    difficulty: 'beginner',
  },
  {
    id: 'q-aas-007',
    topicId: 'azure-architecture-services',
    subtopicId: 'aas-compute-networking',
    question: 'What is Azure Virtual Desktop?',
    options: [
      'A tool for designing virtual environments in 3D',
      'A desktop and app virtualization service that runs on the cloud',
      'A physical desktop shipped by Microsoft to customers',
      'An alternative name for Remote Desktop Protocol',
    ],
    correctIndex: 1,
    explanation:
      'Azure Virtual Desktop is a desktop and app virtualization service that runs in the cloud. It enables users to use a cloud-hosted version of Windows from any location.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-azure-compute-networking-services/',
    difficulty: 'beginner',
  },
  {
    id: 'q-aas-008',
    topicId: 'azure-architecture-services',
    subtopicId: 'aas-compute-networking',
    question: 'Azure VPN Gateway is used to:',
    options: [
      'Host websites on Azure',
      'Store encrypted files in the cloud',
      'Send encrypted traffic between an Azure virtual network and an on-premises location over the public internet',
      'Monitor network traffic for threats',
    ],
    correctIndex: 2,
    explanation:
      'A VPN gateway is used to send encrypted traffic between an Azure virtual network and an on-premises location over the public internet. It can also send encrypted traffic between Azure virtual networks over the Microsoft network.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-azure-compute-networking-services/',
    difficulty: 'intermediate',
  },
  {
    id: 'q-aas-009',
    topicId: 'azure-architecture-services',
    subtopicId: 'aas-compute-networking',
    question: 'What does Azure ExpressRoute provide?',
    options: [
      'A free tier VPN for small businesses',
      'A private connection between your on-premises network and Azure that does not go over the public internet',
      'An automated way to deploy virtual machines',
      'A content delivery network for faster web page loading',
    ],
    correctIndex: 1,
    explanation:
      'Azure ExpressRoute extends your on-premises networks into the Microsoft cloud over a private connection facilitated by a connectivity provider. The connection does not go over the public internet, offering more reliability, faster speeds, and lower latencies.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-azure-compute-networking-services/',
    difficulty: 'intermediate',
  },
  {
    id: 'q-aas-010',
    topicId: 'azure-architecture-services',
    subtopicId: 'aas-compute-networking',
    question: 'What is the difference between a public endpoint and a private endpoint in Azure?',
    options: [
      'A public endpoint is faster than a private endpoint',
      'A public endpoint is accessible from the internet; a private endpoint is accessible only from within the virtual network',
      'There is no difference; they are interchangeable terms',
      'A private endpoint requires Azure ExpressRoute',
    ],
    correctIndex: 1,
    explanation:
      'A public endpoint has a public IP address and can be accessed from anywhere in the world. A private endpoint uses a private IP address from within a virtual network, ensuring the service is only accessible from within that network.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-azure-compute-networking-services/',
    difficulty: 'intermediate',
  },

  // Subtopic: Storage services
  {
    id: 'q-aas-011',
    topicId: 'azure-architecture-services',
    subtopicId: 'aas-storage',
    question: 'Which Azure Storage redundancy option replicates data three times within a single datacenter?',
    options: [
      'Geo-redundant storage (GRS)',
      'Zone-redundant storage (ZRS)',
      'Locally redundant storage (LRS)',
      'Read-access geo-redundant storage (RA-GRS)',
    ],
    correctIndex: 2,
    explanation:
      'Locally redundant storage (LRS) replicates your data three times within a single datacenter in the primary region. LRS provides at least 99.999999999% (11 nines) durability of objects over a year.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-azure-storage-services/',
    difficulty: 'beginner',
  },
  {
    id: 'q-aas-012',
    topicId: 'azure-architecture-services',
    subtopicId: 'aas-storage',
    question: 'Azure Blob Storage is optimized for storing:',
    options: [
      'Relational database tables',
      'Massive amounts of unstructured data, such as text and binary data',
      'Structured data with foreign key relationships',
      'Virtual machine configuration files only',
    ],
    correctIndex: 1,
    explanation:
      'Azure Blob Storage is optimized for storing massive amounts of unstructured data. Unstructured data is data that does not adhere to a particular data model or definition, such as text or binary data.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-azure-storage-services/',
    difficulty: 'beginner',
  },
  {
    id: 'q-aas-013',
    topicId: 'azure-architecture-services',
    subtopicId: 'aas-storage',
    question: 'Which storage tier offers the lowest storage cost but the highest access cost?',
    options: [
      'Hot tier',
      'Cool tier',
      'Cold tier',
      'Archive tier',
    ],
    correctIndex: 3,
    explanation: 'The Archive tier is designed for rarely accessed data stored for at least 180 days (such as long-term regulatory compliance backups). It has the lowest storage cost but requires rehydration which takes hours.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/storage/blobs/access-tiers-overview',
    difficulty: 'intermediate',
  },
  {
    id: 'q-aas-008',
    topicId: 'aas-storage',
    question: 'A financial institution requires that storage data be replicated synchronously across three distinct availability zones in the primary region. Which storage redundancy option meets this requirement?',
    options: [
      'Locally Redundant Storage (LRS)',
      'Zone-Redundant Storage (ZRS)',
      'Geo-Redundant Storage (GRS)',
      'Read-Access Geo-Redundant Storage (RA-GRS)',
    ],
    correctIndex: 1,
    explanation: 'Zone-Redundant Storage (ZRS) synchronously replicates your data across three Azure availability zones in the primary region, providing durability against individual datacenter disasters while maintaining low latency.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy',
    difficulty: 'intermediate',
  },
  {
    id: 'q-aas-009',
    topicId: 'aas-storage',
    question: 'Which Azure Storage service provides fully managed, industry-standard SMB and NFS file shares accessible simultaneously from Windows, Linux, and macOS systems?',
    options: [
      'Azure Blob Storage',
      'Azure Files',
      'Azure Table Storage',
      'Azure Queue Storage',
    ],
    correctIndex: 1,
    explanation: 'Azure Files provides serverless, enterprise-grade cloud file shares accessible via standard SMB and NFS protocols, making it seamless to replace or augment legacy on-premises file servers.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/storage/files/storage-files-introduction',
    difficulty: 'beginner',
  },

  // --- Subtopic: aas-identity-security (Entra ID, RBAC, Zero Trust) ---
  {
    id: 'q-aas-010',
    topicId: 'aas-identity-security',
    question: 'Which core security philosophy operates under the guiding principles of "Verify explicitly", "Use least privileged access", and "Assume breach"?',
    options: [
      'Perimeter-Based Defense',
      'Defense in Depth',
      'Zero Trust Security Model',
      'Demilitarized Zone (DMZ) Framework',
    ],
    correctIndex: 2,
    explanation: 'The Zero Trust model treats every request as though it originated from an uncontrolled network. It mandates explicit verification, enforces least privileged access (JIT/JEA), and assumes breach across all architecture layers.',
    sourceUrl: 'https://learn.microsoft.com/en-us/security/zero-trust/zero-trust-overview',
    difficulty: 'beginner',
  },
  {
    id: 'q-aas-011',
    topicId: 'aas-identity-security',
    question: 'You want to grant a DevOps contractor the ability to restart virtual machines in a specific Resource Group without permitting them to delete the VMs or modify network configurations. What should you use?',
    options: [
      'Azure Active Directory Domain Services (AD DS)',
      'Azure Role-Based Access Control (Azure RBAC)',
      'Management Group Lock',
      'Microsoft Defender for Cloud',
    ],
    correctIndex: 1,
    explanation: 'Azure Role-Based Access Control (Azure RBAC) enables fine-grained authorization and access management, allowing administrators to grant only the precise permissions required to perform specific tasks on designated scopes.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/role-based-access-control/overview',
    difficulty: 'beginner',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DOMAIN 3: DESCRIBE AZURE MANAGEMENT AND GOVERNANCE (11 Questions)
  // ═══════════════════════════════════════════════════════════════════════════

  // --- Subtopic: amg-cost-management (Cost Management & TCO) ---
  {
    id: 'q-amg-001',
    topicId: 'amg-cost-management',
    question: 'A company plans to migrate 50 servers from an on-premises datacenter to Azure. Before creating an Azure account, which free web tool can they use to compare total on-premises operational costs against Azure cloud costs?',
    options: [
      'Azure Cost Management + Billing',
      'Total Cost of Ownership (TCO) Calculator',
      'Azure Pricing Calculator',
      'Azure Advisor',
    ],
    correctIndex: 1,
    explanation: 'The Total Cost of Ownership (TCO) Calculator helps estimate the cost savings of migrating workloads to Azure by comparing current on-premises datacenter costs (hardware, power, labor, software) with Azure estimated expenses.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/quick-acm-cost-analysis',
    explanation:
      'The Archive tier has the lowest storage cost but the highest cost to access data. It is designed for data that can tolerate several hours of retrieval latency and will remain in the tier for at least 180 days.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-azure-storage-services/',
    difficulty: 'intermediate',
  },
  {
    id: 'q-aas-014',
    topicId: 'azure-architecture-services',
    subtopicId: 'aas-storage',
    question: 'Which tool would you use to copy files to Azure Storage from the command line?',
    options: [
      'Azure Data Box',
      'AzCopy',
      'Azure Migrate',
      'Azure Site Recovery',
    ],
    correctIndex: 1,
    explanation:
      'AzCopy is a command-line utility you can use to copy blobs or files to or from a storage account. It can be used to upload, download, copy between storage accounts, and synchronize files.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-azure-storage-services/',
    difficulty: 'beginner',
  },

  // Subtopic: Identity, access, and security
  {
    id: 'q-aas-015',
    topicId: 'azure-architecture-services',
    subtopicId: 'aas-identity-security',
    question: 'What is Microsoft Entra ID (formerly Azure Active Directory)?',
    options: [
      'A relational database service',
      'A cloud-based identity and access management service',
      'A virtual network service',
      'A code repository',
    ],
    correctIndex: 1,
    explanation:
      'Microsoft Entra ID is a cloud-based identity and access management service. It helps employees sign in and access resources like Microsoft 365, the Azure portal, and thousands of other SaaS applications.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-azure-identity-access-security/',
    difficulty: 'beginner',
  },
  {
    id: 'q-aas-016',
    topicId: 'azure-architecture-services',
    subtopicId: 'aas-identity-security',
    question: 'What is Multi-Factor Authentication (MFA)?',
    options: [
      'Using multiple passwords for the same account',
      'A process that requires two or more verification methods from different categories (something you know, have, or are)',
      'Logging in from multiple devices simultaneously',
      'Encrypting data with multiple algorithms',
    ],
    correctIndex: 1,
    explanation:
      'MFA is a process where a user is prompted during sign-in for an additional form of identification, such as a code on their phone or a fingerprint scan. MFA uses two or more of: something you know, something you have, something you are.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-azure-identity-access-security/',
    difficulty: 'beginner',
  },
  {
    id: 'q-aas-017',
    topicId: 'azure-architecture-services',
    subtopicId: 'aas-identity-security',
    question: 'What is the Zero Trust security model?',
    options: [
      'Trusting all users within the corporate network',
      'A model that assumes everything is on an open and untrusted network, verifying each request as though it originates from an uncontrolled network',
      'Blocking all external access to cloud resources',
      'A model that only applies to on-premises networks',
    ],
    correctIndex: 1,
    explanation:
      'Zero Trust assumes the worst case scenario and protects resources with that expectation. It follows three principles: verify explicitly, use least privilege access, and assume breach.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-azure-identity-access-security/',
    difficulty: 'intermediate',
  },
  {
    id: 'q-aas-018',
    topicId: 'azure-architecture-services',
    subtopicId: 'aas-identity-security',
    question: 'What is Azure Role-Based Access Control (RBAC)?',
    options: [
      'A firewall service for Azure virtual networks',
      'A system that provides fine-grained access management of Azure resources based on assigned roles',
      'A tool for monitoring application performance',
      'A database encryption feature',
    ],
    correctIndex: 1,
    explanation:
      'Azure RBAC helps you manage who has access to Azure resources, what they can do with those resources, and what areas they have access to. It is built on Azure Resource Manager and uses role assignments to control access.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-azure-identity-access-security/',
    difficulty: 'intermediate',
  },
  {
    id: 'q-aas-019',
    topicId: 'azure-architecture-services',
    subtopicId: 'aas-identity-security',
    question: 'What is the purpose of Microsoft Defender for Cloud?',
    options: [
      'To host virtual machines in a secure environment',
      'A cloud-native application protection platform that helps strengthen security posture, protect against threats, and manage security across multi-cloud and hybrid environments',
      'To provide antivirus software for on-premises servers only',
      'To manage Azure billing and subscriptions',
    ],
    correctIndex: 1,
    explanation:
      'Microsoft Defender for Cloud is a cloud-native application protection platform (CNAPP). It combines security posture management, workload protection, and threat detection across your cloud resources.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-azure-identity-access-security/',
    difficulty: 'intermediate',
  },
  {
    id: 'q-aas-020',
    topicId: 'azure-architecture-services',
    subtopicId: 'aas-identity-security',
    question: 'What does the defense-in-depth model provide?',
    options: [
      'A single, powerful firewall that blocks all threats',
      'Multiple layers of protection so that if one layer is breached, subsequent layers prevent further exposure',
      'An automated patching system for all Azure resources',
      'Physical security guards at Azure datacenters only',
    ],
    correctIndex: 1,
    explanation:
      'Defense in depth uses a series of mechanisms to slow the advance of an attack. Each layer provides protection so that if one layer is breached, a subsequent layer is already in place to prevent further exposure. Layers include physical, identity, perimeter, network, compute, application, and data.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-azure-identity-access-security/',
    difficulty: 'intermediate',
  },

  // ────────────────────────────────────────────────
  // Domain 3: Describe Azure Management and Governance (30–35%)
  // ────────────────────────────────────────────────

  // Subtopic: Cost management
  {
    id: 'q-amg-001',
    topicId: 'azure-management-governance',
    subtopicId: 'amg-cost-management',
    question: 'Which of the following factors can affect the cost of Azure resources?',
    options: [
      'The name you give your resource group',
      'Resource type, consumption, geography, and network traffic',
      'The color scheme of the Azure portal',
      'The programming language used to interact with the API',
    ],
    correctIndex: 1,
    explanation:
      'Azure costs are influenced by the type of resource, how much you use (consumption), the Azure region, and network traffic (especially outbound data transfer). Other factors include licensing model and marketplace offerings.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-cost-management-azure/',
    difficulty: 'beginner',
  },
  {
    id: 'q-amg-002',
    topicId: 'amg-cost-management',
    question: 'Which tool allows an administrator to configure automated email alerts and trigger action groups when monthly Azure cloud spending reaches 80% and 100% of an allocated department budget?',
    options: [
      'Azure Cost Management Budgets',
      'Azure Pricing Calculator',
      'Microsoft Purview',
      'Azure Service Health',
    ],
    correctIndex: 0,
    explanation: 'Azure Cost Management Budgets lets you create spending limits and alerts based on actual or forecasted cost thresholds, helping teams avoid accidental cost overruns.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-acm-create-budgets',
    difficulty: 'intermediate',
  },
  {
    id: 'q-amg-003',
    topicId: 'amg-cost-management',
    question: 'What Azure pricing model allows organizations to save up to 72% compared to pay-as-you-go prices by committing to a one-year or three-year plan for predictable compute usage?',
    options: [
      'Spot Virtual Machines',
      'Azure Reserved Instances (Reservations)',
      'Enterprise Hybrid Use Benefit',
      'Azure Free Tier',
    ],
    correctIndex: 1,
    explanation: 'Azure Reservations (Reserved Instances) offer significant cost savings over pay-as-you-go pricing when committing to 1-year or 3-year consistent compute capacity.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/cost-management-billing/reservations/save-compute-costs-reservations',
    difficulty: 'intermediate',
  },

  // --- Subtopic: amg-governance-compliance (Policy, Locks, Compliance) ---
  {
    id: 'q-amg-004',
    topicId: 'amg-governance-compliance',
    question: 'An enterprise security policy states that virtual machines may only be deployed in the "East US" and "West US" regions. Which Azure feature should be configured to automatically enforce and audit this rule?',
    options: [
      'Azure Policy',
      'Resource Locks',
      'Network Security Groups',
      'Azure Blueprint',
    ],
    correctIndex: 0,
    explanation: 'Azure Policy enforces organizational standards and assesses compliance at scale. Built-in policy definitions (such as "Allowed locations") prevent resource deployment outside authorized regions.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/governance/policy/overview',
    difficulty: 'beginner',
  },
  {
    id: 'q-amg-005',
    topicId: 'amg-governance-compliance',
    question: 'An administrator wants to prevent a production database resource from being accidentally deleted while still allowing authorized users to read and modify database records. Which Resource Lock should be applied?',
    options: [
      'ReadOnly',
      'CanNotDelete (Delete lock)',
      'AdminOnly',
      'PreventWrite',
    ],
    correctIndex: 1,
    explanation: 'A CanNotDelete lock (Delete lock) allows authorized users to read and modify a resource, but completely blocks anyone from deleting it until the lock is removed.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/lock-resources',
    topicId: 'azure-management-governance',
    subtopicId: 'amg-cost-management',
    question: 'What is the Azure Pricing Calculator used for?',
    options: [
      'To monitor the real-time cost of running resources',
      'To estimate the cost of provisioning resources in Azure before you deploy them',
      'To pay Azure invoices',
      'To compare Azure pricing with AWS',
    ],
    correctIndex: 1,
    explanation:
      'The Azure Pricing Calculator is a tool that helps you estimate the cost of Azure products. It allows you to select Azure services and configure them to see an estimated price.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-cost-management-azure/',
    difficulty: 'beginner',
  },
  {
    id: 'q-amg-003',
    topicId: 'azure-management-governance',
    subtopicId: 'amg-cost-management',
    question: 'What is the purpose of tags in Azure?',
    options: [
      'To route network traffic between resources',
      'To provide metadata that helps you organize, manage, and track costs of Azure resources',
      'To encrypt data at rest',
      'To create backups of virtual machines',
    ],
    correctIndex: 1,
    explanation:
      'Tags are name-value pairs that you apply to Azure resources. They help you organize resources, manage costs by filtering billing reports by tag, and enforce governance through policies.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-cost-management-azure/',
    difficulty: 'beginner',
  },
  {
    id: 'q-amg-004',
    topicId: 'azure-management-governance',
    subtopicId: 'amg-cost-management',
    question: 'Azure Cost Management provides which of the following capabilities?',
    options: [
      'Deploying new virtual machines',
      'Reporting, cost analysis, budgets, alerts, and recommendations to optimize spending',
      'Configuring virtual network peering',
      'Managing user identities',
    ],
    correctIndex: 1,
    explanation:
      'Azure Cost Management provides tools for reporting, cost analysis, setting budgets and alerts, and receiving recommendations that help you optimize your cloud spending.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-cost-management-azure/',
    difficulty: 'beginner',
  },

  // Subtopic: Governance and compliance
  {
    id: 'q-amg-005',
    topicId: 'azure-management-governance',
    subtopicId: 'amg-governance-compliance',
    question: 'What is the purpose of Azure Policy?',
    options: [
      'To deploy resources automatically',
      'To create and manage policies that enforce rules and effects over your resources to keep them compliant with corporate standards',
      'To monitor application performance',
      'To manage user passwords',
    ],
    correctIndex: 1,
    explanation:
      'Azure Policy helps you create, assign, and manage policies. These policies enforce different rules and effects over your resources, ensuring those resources stay compliant with your corporate standards and service level agreements.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-features-tools-azure-for-governance-compliance/',
    difficulty: 'intermediate',
  },
  {
    id: 'q-amg-006',
    topicId: 'amg-governance-compliance',
    question: 'Which Microsoft service provides unified data governance to discover, catalog, and map sensitive customer data assets across on-premises, multi-cloud, and SaaS environments?',
    options: [
      'Azure Policy',
      'Microsoft Purview',
      'Azure Advisor',
      'Azure Key Vault',
    ],
    correctIndex: 1,
    explanation: 'Microsoft Purview is a comprehensive data governance solution that helps organizations govern, protect, and manage their entire data estate across cloud and on-premises environments.',
    sourceUrl: 'https://learn.microsoft.com/en-us/purview/purview',
    difficulty: 'advanced',
  },

  // --- Subtopic: amg-managing-deploying (ARM, Bicep, CLI, Portal) ---
  {
    id: 'q-amg-007',
    topicId: 'amg-managing-deploying',
    question: 'What is Azure Resource Manager (ARM)?',
    options: [
      'A hardware load balancer installed in each Azure datacenter',
      'The consistent management and deployment layer that handles all create, read, update, and delete (CRUD) requests for Azure resources',
      'A command-line interface exclusive to macOS operating systems',
      'A software package used to configure local Hyper-V virtual switches',
    ],
    correctIndex: 1,
    explanation: 'Azure Resource Manager (ARM) is the centralized management layer for Azure. Whether you use the Azure Portal, CLI, PowerShell, or SDKs, all requests pass through ARM, which authenticates and routes operations consistently.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/overview',
    difficulty: 'intermediate',
  },
  {
    id: 'q-amg-008',
    topicId: 'amg-managing-deploying',
    question: 'Which Infrastructure as Code (IaC) domain-specific language developed by Microsoft offers cleaner syntax and modularity compared to traditional JSON ARM templates?',
    options: [
      'Azure CLI',
      'Bicep',
      'PowerShell Core',
      'Bash Scripting',
    ],
    correctIndex: 1,
    explanation: 'Bicep is a domain-specific language (DSL) that uses declarative syntax to deploy Azure resources, providing concise code, first-class modularity, and automatic dependency management while compiling down to standard ARM templates.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/overview',
    difficulty: 'intermediate',
  },
  {
    id: 'q-amg-009',
    topicId: 'amg-managing-deploying',
    question: 'You want to run Azure CLI commands directly from an internet browser without installing software or command-line tools on your local computer. What should you use?',
    options: [
      'Azure Cloud Shell',
      'Windows Terminal',
      'Azure PowerShell module',
      'Remote Desktop Connection',
    ],
    correctIndex: 0,
    explanation: 'Azure Cloud Shell is an interactive, authenticated, browser-accessible terminal for managing Azure resources. It gives you the flexibility of choosing between Bash or PowerShell and comes pre-configured with popular developer tools.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/cloud-shell/overview',
    difficulty: 'beginner',
  },

  // --- Subtopic: amg-monitoring (Azure Monitor, Log Analytics, Service Health) ---
  {
    id: 'q-amg-010',
    topicId: 'amg-monitoring',
    question: 'You receive an alert that users cannot access services in the "North Europe" region. Where can an administrator view official Microsoft status notifications regarding ongoing platform outages, planned maintenance, and service advisories?',
    options: [
      'Azure Service Health',
      'Azure Application Insights',
      'Azure Cost Management',
      'Azure Policy',
    ],
    correctIndex: 0,
    explanation: 'Azure Service Health provides personalized alerts and guidance when Azure service issues, planned maintenance, or health advisories impact your specific subscriptions and deployed resources.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/service-health/overview',
    difficulty: 'beginner',
  },
  {
    id: 'q-amg-011',
    topicId: 'amg-monitoring',
    question: 'Which query language does Azure Log Analytics use to search, filter, and aggregate log data collected from Azure Monitor?',
    options: [
      'Transact-SQL (T-SQL)',
      'GraphQL',
      'Kusto Query Language (KQL)',
      'JSONPath',
    ],
    correctIndex: 2,
    explanation: 'Azure Monitor Log Analytics uses Kusto Query Language (KQL), a powerful and expressive query language designed to quickly analyze and summarize large volumes of structured and semi-structured telemetry data.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/azure-monitor/logs/log-query-overview',
    difficulty: 'intermediate',
  },
];

export default QUESTIONS;
    topicId: 'azure-management-governance',
    subtopicId: 'amg-governance-compliance',
    question: 'What do resource locks in Azure do?',
    options: [
      'Encrypt resources at rest',
      'Prevent resources from being accidentally deleted or modified',
      'Hide resources from unauthorized users',
      'Lock the Azure portal interface',
    ],
    correctIndex: 1,
    explanation:
      'Resource locks help prevent accidental deletion or modification of Azure resources. There are two types: Delete locks (prevent deletion) and ReadOnly locks (prevent modification and deletion).',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-features-tools-azure-for-governance-compliance/',
    difficulty: 'beginner',
  },
  {
    id: 'q-amg-007',
    topicId: 'azure-management-governance',
    subtopicId: 'amg-governance-compliance',
    question: 'What is the purpose of Microsoft Purview in Azure?',
    options: [
      'To deploy containerized applications',
      'A unified data governance service that helps manage and govern on-premises, multi-cloud, and SaaS data',
      'To configure virtual network peering',
      'A cost management tool',
    ],
    correctIndex: 1,
    explanation:
      'Microsoft Purview is a family of data governance, risk, and compliance solutions. It provides a unified data governance service that helps you manage and govern your on-premises, multi-cloud, and software-as-a-service (SaaS) data.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-features-tools-azure-for-governance-compliance/',
    difficulty: 'intermediate',
  },

  // Subtopic: Managing and deploying resources
  {
    id: 'q-amg-008',
    topicId: 'azure-management-governance',
    subtopicId: 'amg-managing-deploying',
    question: 'Which Azure tool provides a web-based, unified console to manage Azure resources?',
    options: [
      'Azure CLI',
      'Azure PowerShell',
      'The Azure portal',
      'Azure Cloud Shell',
    ],
    correctIndex: 2,
    explanation:
      'The Azure portal is a web-based, unified console that provides an alternative to command-line tools. It allows you to build, manage, and monitor everything from simple web apps to complex cloud deployments.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-features-tools-manage-deploy-azure-resources/',
    difficulty: 'beginner',
  },
  {
    id: 'q-amg-009',
    topicId: 'azure-management-governance',
    subtopicId: 'amg-managing-deploying',
    question: 'What is Azure Arc?',
    options: [
      'A tool for creating curved network paths',
      'A service that extends Azure management and governance to non-Azure environments including on-premises, multi-cloud, and edge',
      'An archiving solution for old Azure resources',
      'A data visualization tool',
    ],
    correctIndex: 1,
    explanation:
      'Azure Arc simplifies governance and management by extending the Azure platform to resources hosted outside of Azure. It lets you manage servers, Kubernetes clusters, and data services running on-premises, at the edge, and in multi-cloud environments.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-features-tools-manage-deploy-azure-resources/',
    difficulty: 'intermediate',
  },
  {
    id: 'q-amg-010',
    topicId: 'azure-management-governance',
    subtopicId: 'amg-managing-deploying',
    question: 'What are ARM templates in Azure?',
    options: [
      'Templates for designing Azure portal dashboards',
      'JSON files that define the infrastructure and configuration for your Azure deployment, enabling Infrastructure as Code',
      'Email templates for Azure notifications',
      'Templates for Azure Active Directory users',
    ],
    correctIndex: 1,
    explanation:
      'Azure Resource Manager (ARM) templates are JSON files that define the infrastructure and configuration for your project. They use declarative syntax, enabling Infrastructure as Code (IaC), and allow you to deploy, update, or delete resources in a consistent, repeatable manner.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-features-tools-manage-deploy-azure-resources/',
    difficulty: 'intermediate',
  },
  {
    id: 'q-amg-011',
    topicId: 'azure-management-governance',
    subtopicId: 'amg-managing-deploying',
    question: 'What is Infrastructure as Code (IaC)?',
    options: [
      'Writing application code that runs on infrastructure',
      'Managing and provisioning infrastructure through machine-readable definition files rather than manual configuration',
      'Using code editors to manage Azure subscriptions',
      'A programming language for Azure',
    ],
    correctIndex: 1,
    explanation:
      'Infrastructure as Code (IaC) is the management of infrastructure in a descriptive model, using versioning similar to source code. When a change is made, the IaC model generates the same environment every time it is applied.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-features-tools-manage-deploy-azure-resources/',
    difficulty: 'intermediate',
  },

  // Subtopic: Monitoring tools
  {
    id: 'q-amg-012',
    topicId: 'azure-management-governance',
    subtopicId: 'amg-monitoring',
    question: 'What is Azure Advisor?',
    options: [
      'A tool that provides personalized best-practice recommendations to optimize Azure deployments for reliability, security, performance, cost, and operational excellence',
      'A human consulting service provided by Microsoft',
      'An AI chatbot for Azure support',
      'An automated deployment tool',
    ],
    correctIndex: 0,
    explanation:
      'Azure Advisor is a personalized cloud consultant that helps you follow best practices to optimize your Azure deployments. It analyzes your resource configuration and usage telemetry, then provides recommendations for reliability, security, performance, cost, and operational excellence.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-monitoring-tools-azure/',
    difficulty: 'beginner',
  },
  {
    id: 'q-amg-013',
    topicId: 'azure-management-governance',
    subtopicId: 'amg-monitoring',
    question: 'What does Azure Service Health provide?',
    options: [
      'Health monitoring for your employees',
      'A personalized view of the health of the Azure services, regions, and resources that you use',
      'A tool for deploying healthcare applications',
      'Physical security monitoring for Azure datacenters',
    ],
    correctIndex: 1,
    explanation:
      'Azure Service Health provides a personalized view of the health of Azure services and regions. It includes service issues, planned maintenance, health advisories, and helps you prepare for planned maintenance and changes that could affect availability.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-monitoring-tools-azure/',
    difficulty: 'beginner',
  },
  {
    id: 'q-amg-014',
    topicId: 'azure-management-governance',
    subtopicId: 'amg-monitoring',
    question: 'What is Azure Monitor?',
    options: [
      'A screen-sharing tool for Azure administrators',
      'A platform for collecting, analyzing, and acting on telemetry from your Azure and on-premises environments',
      'A physical security camera system for datacenters',
      'A tool for monitoring competitor pricing',
    ],
    correctIndex: 1,
    explanation:
      'Azure Monitor is a comprehensive solution for collecting, analyzing, and acting on telemetry from cloud and on-premises environments. It includes features like Log Analytics for querying data, alerts for notifications, and Application Insights for monitoring web applications.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-monitoring-tools-azure/',
    difficulty: 'beginner',
  },
  {
    id: 'q-amg-015',
    topicId: 'azure-management-governance',
    subtopicId: 'amg-monitoring',
    question: 'What is Azure Monitor Application Insights?',
    options: [
      'A tool for monitoring physical server hardware',
      'An application performance management (APM) service for live web applications that automatically detects performance anomalies',
      'A code editor plugin',
      'A tool for creating Azure Resource Manager templates',
    ],
    correctIndex: 1,
    explanation:
      'Application Insights, a feature of Azure Monitor, is an extensible APM service for developers and DevOps professionals. It monitors live web applications, automatically detects performance anomalies, and includes analytics tools to help you diagnose issues.',
    sourceUrl: 'https://learn.microsoft.com/en-us/training/modules/describe-monitoring-tools-azure/',
    difficulty: 'intermediate',
  },
];
