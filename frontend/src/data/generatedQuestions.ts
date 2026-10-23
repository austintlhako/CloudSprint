import type { QuizQuestion, SubtopicId } from '../types';

const CERTIFICATION_SOURCE =
  'https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/';

type Fact = {
  concept: string;
  statement: string;
  distractors: string[];
};

const UNIT_FACTS: Record<SubtopicId, Fact[]> = {
  'cc-cloud-computing': [
    { concept: 'cloud computing', statement: 'delivers computing services over the internet on demand', distractors: ['requires every workload to run in a local datacenter', 'is limited to physical servers owned by the customer', 'eliminates the need for identity controls'] },
    { concept: 'the shared responsibility model', statement: 'assigns security responsibilities between the provider and customer', distractors: ['makes the provider responsible for all customer data classification', 'applies only to private clouds', 'replaces access management with network encryption'] },
    { concept: 'a public cloud', statement: 'provides provider-owned resources to multiple customers through a shared service platform', distractors: ['requires a dedicated physical datacenter for one customer', 'can only be accessed without authentication', 'means that customers maintain the provider hardware'] },
    { concept: 'a private cloud', statement: 'dedicates cloud resources to one organization', distractors: ['always uses a free consumption model', 'must be hosted in a public cloud subscription shared by everyone', 'removes the need for disaster recovery planning'] },
    { concept: 'a hybrid cloud', statement: 'combines private or on-premises resources with public cloud resources', distractors: ['uses only one physical server', 'prevents data from moving between environments', 'is the same as a SaaS application'] },
  ],
  'cc-cloud-benefits': [
    { concept: 'elasticity', statement: 'automatically increases or decreases resources as demand changes', distractors: ['requires buying hardware for the maximum forecast', 'means data is never backed up', 'is limited to identity services'] },
    { concept: 'high availability', statement: 'keeps a service accessible through redundancy and resilient design', distractors: ['guarantees that no maintenance will ever occur', 'means a resource has no users', 'replaces monitoring with manual checks'] },
    { concept: 'scalability', statement: 'allows capacity to grow or shrink to meet workload needs', distractors: ['requires deleting the application before adding capacity', 'only applies to physical cables', 'prevents usage-based billing'] },
    { concept: 'operational expenditure', statement: 'pays for services as they are consumed rather than buying all infrastructure up front', distractors: ['always requires purchasing a datacenter', 'is another name for physical redundancy', 'applies only to employee salaries'] },
    { concept: 'agility', statement: 'helps an organization provision and change technology resources quickly', distractors: ['requires a lengthy hardware procurement cycle for every change', 'prevents experimentation', 'means all changes bypass governance'] },
  ],
  'cc-cloud-service-types': [
    { concept: 'infrastructure as a service', statement: 'provides virtualized compute, networking, and storage while the customer manages the operating system', distractors: ['delivers only a finished email application', 'removes customer control of all software', 'provides no configurable networking'] },
    { concept: 'platform as a service', statement: 'provides a managed application platform so developers can focus on application code', distractors: ['requires customers to patch provider hardware', 'is limited to buying physical disks', 'means the provider writes all customer application code'] },
    { concept: 'software as a service', statement: 'delivers a complete application managed by the provider', distractors: ['requires customers to build the runtime from bare metal', 'only provides an empty virtual network', 'always requires operating system patching by the customer'] },
    { concept: 'serverless computing', statement: 'lets developers run code without managing the underlying server infrastructure', distractors: ['means no servers exist anywhere', 'requires customers to maintain every host', 'cannot respond to events'] },
    { concept: 'a consumption-based model', statement: 'charges according to the services and resources used', distractors: ['requires identical fixed hardware for every customer', 'prevents scaling', 'is unrelated to resource usage'] },
  ],
  'aas-core-architecture': [
    { concept: 'an Azure region', statement: 'is a geographic area containing one or more Azure datacenters', distractors: ['is a user account with no physical location', 'is limited to one virtual machine', 'is a billing invoice'] },
    { concept: 'an availability zone', statement: 'is a physically separate datacenter location within an Azure region', distractors: ['is a role assignment', 'is a type of storage access key', 'is a subscription invoice'] },
    { concept: 'a resource group', statement: 'is a logical container for resources that share a lifecycle', distractors: ['is a physical datacenter cable', 'can contain resources from every unrelated tenant automatically', 'is a replacement for authentication'] },
    { concept: 'an Azure subscription', statement: 'provides a boundary for billing, access, and resource organization', distractors: ['is only a DNS record', 'contains exactly one resource', 'cannot have role assignments'] },
    { concept: 'Azure Resource Manager', statement: 'provides a consistent management layer for deploying and organizing Azure resources', distractors: ['is a physical availability zone', 'only stores application passwords', 'replaces all application monitoring'] },
  ],
  'aas-compute-networking': [
    { concept: 'an Azure virtual machine', statement: 'provides configurable compute with customer control over the guest operating system', distractors: ['is a managed office suite only', 'cannot run an operating system', 'is always serverless'] },
    { concept: 'Azure App Service', statement: 'hosts web applications and APIs on a managed platform', distractors: ['requires customers to manage physical hosts', 'only stores blobs', 'is a network firewall rule'] },
    { concept: 'Azure Functions', statement: 'runs event-driven code without requiring server management by the developer', distractors: ['is a physical router', 'requires a dedicated datacenter purchase', 'only provides archival storage'] },
    { concept: 'an Azure virtual network', statement: 'provides private network isolation and connectivity for Azure resources', distractors: ['is a user identity directory', 'is a billing report', 'only stores database backups'] },
    { concept: 'a network security group', statement: 'filters inbound and outbound network traffic using security rules', distractors: ['creates user accounts', 'compresses blob data', 'calculates monthly budgets'] },
  ],
  'aas-storage': [
    { concept: 'Azure Blob Storage', statement: 'stores large amounts of unstructured object data', distractors: ['is only an identity provider', 'runs virtual machines by itself', 'is a network routing protocol'] },
    { concept: 'Azure Files', statement: 'provides managed file shares accessible over standard file protocols', distractors: ['only stores DNS records', 'is an availability zone', 'replaces role-based access control'] },
    { concept: 'managed disks', statement: 'provide persistent block storage for Azure virtual machines', distractors: ['are temporary browser cookies', 'only contain audit identities', 'cannot be attached to compute'] },
    { concept: 'storage redundancy', statement: 'keeps copies of data to improve durability and availability', distractors: ['deletes copies to reduce reliability', 'is the same as authentication', 'prevents all access to data'] },
    { concept: 'the hot access tier', statement: 'is intended for data that is accessed frequently', distractors: ['is designed only for data that is never read', 'is a compute pricing model', 'prevents lifecycle management'] },
  ],
  'aas-identity-security': [
    { concept: 'Microsoft Entra ID', statement: 'provides cloud identity and access management', distractors: ['is an object storage tier', 'is a physical network switch', 'only calculates costs'] },
    { concept: 'multifactor authentication', statement: 'requires more than one type of verification for sign-in', distractors: ['removes the need for passwords in every scenario', 'only encrypts disks', 'grants every user administrator access'] },
    { concept: 'Azure role-based access control', statement: 'assigns permissions based on roles at defined scopes', distractors: ['replaces network connectivity', 'stores unstructured objects', 'automatically makes every resource public'] },
    { concept: 'Zero Trust', statement: 'verifies explicitly, uses least privilege, and assumes breach', distractors: ['trusts every internal request automatically', 'removes the need for monitoring', 'only applies to physical buildings'] },
    { concept: 'Azure Key Vault', statement: 'protects and manages secrets, keys, and certificates', distractors: ['is a virtual machine scale set', 'is a public DNS resolver', 'only stores application images'] },
  ],
  'amg-cost-management': [
    { concept: 'the Azure pricing calculator', statement: 'estimates expected costs for selected Azure services and configurations', distractors: ['deploys resources without authorization', 'replaces identity governance', 'is used only to inspect source code'] },
    { concept: 'Azure Cost Management', statement: 'helps analyze, monitor, and control cloud spending', distractors: ['is a container runtime', 'creates availability zones', 'only manages user passwords'] },
    { concept: 'a budget', statement: 'sets a spending threshold and can trigger alerts', distractors: ['guarantees that spending can never exceed the threshold', 'is a network route', 'automatically deletes every resource'] },
    { concept: 'tags', statement: 'add metadata to resources to help organize and report on costs', distractors: ['encrypt all network traffic', 'replace resource groups', 'are physical disks'] },
    { concept: 'a service-level agreement', statement: 'describes Microsoft commitments for service availability or performance', distractors: ['is a customer password', 'defines application source code ownership', 'is a storage access tier'] },
  ],
  'amg-governance-compliance': [
    { concept: 'Azure Policy', statement: 'enforces organizational rules and evaluates resource compliance', distractors: ['is only a virtual machine image', 'stores secrets without access rules', 'replaces all network connections'] },
    { concept: 'resource locks', statement: 'help prevent accidental deletion or modification of resources', distractors: ['encrypt every file automatically', 'create new subscriptions', 'replace backups'] },
    { concept: 'Microsoft Purview', statement: 'helps govern and discover data across data sources', distractors: ['is a compute autoscaling engine', 'is a virtual network subnet', 'only handles DNS records'] },
    { concept: 'Azure Blueprints concepts', statement: 'package governance artifacts for repeatable environment setup', distractors: ['are physical datacenter diagrams only', 'replace all monitoring', 'are user passwords'] },
    { concept: 'defense in depth', statement: 'uses multiple security layers so one control failure does not expose everything', distractors: ['depends on one perimeter control only', 'removes access reviews', 'is a billing feature'] },
  ],
  'amg-managing-deploying': [
    { concept: 'an ARM template', statement: 'describes Azure infrastructure declaratively for repeatable deployment', distractors: ['is an interactive password prompt', 'only monitors CPU usage', 'is a storage redundancy option'] },
    { concept: 'Bicep', statement: 'provides a concise language for declarative Azure resource deployment', distractors: ['is an identity verification factor', 'is a physical network cable', 'only queries billing data'] },
    { concept: 'the Azure portal', statement: 'provides a browser-based graphical interface for managing Azure', distractors: ['requires writing every request as SQL', 'is only a backup format', 'cannot display resource settings'] },
    { concept: 'Azure CLI', statement: 'provides command-line commands for managing Azure resources', distractors: ['is a storage access tier', 'is only a browser extension', 'cannot automate deployments'] },
    { concept: 'Azure Cloud Shell', statement: 'provides a browser-accessible shell with Azure management tools', distractors: ['is a dedicated physical region', 'only stores images', 'replaces all role assignments'] },
  ],
  'amg-monitoring': [
    { concept: 'Azure Monitor', statement: 'collects and analyzes metrics and logs from Azure resources and applications', distractors: ['is only an identity directory', 'deploys physical datacenters', 'replaces every backup'] },
    { concept: 'Log Analytics', statement: 'provides a workspace and query experience for collected log data', distractors: ['is a VM operating system', 'only calculates invoices', 'is a network security group'] },
    { concept: 'Kusto Query Language', statement: 'is used to query and analyze Azure Monitor log data', distractors: ['is a storage encryption algorithm', 'is an identity role', 'is a deployment template format'] },
    { concept: 'Azure Service Health', statement: 'provides personalized information about Azure service issues and maintenance', distractors: ['only measures application code coverage', 'creates user accounts', 'is a storage access tier'] },
    { concept: 'Azure Advisor', statement: 'provides recommendations for reliability, security, performance, and cost', distractors: ['is a physical router', 'only stores secrets', 'replaces all resource deployments'] },
  ],
};

const stems = [
  (concept: string) => `Which statement best describes ${concept}?`,
  (concept: string) => `A learner is reviewing AZ-900 fundamentals. What is the primary purpose of ${concept}?`,
  (concept: string) => `Which Azure fundamentals concept is represented by this description: ${concept}?`,
  (concept: string) => `An administrator wants to understand ${concept}. Which statement is accurate?`,
  (concept: string) => `Which option correctly explains ${concept}?`,
  (concept: string) => `When planning an Azure solution, which statement about ${concept} is correct?`,
  (concept: string) => `Which capability is associated with ${concept}?`,
  (concept: string) => `What should a beginner know about ${concept}?`,
  (concept: string) => `Which choice identifies the role of ${concept}?`,
  (concept: string) => `Which statement would help distinguish ${concept} from unrelated Azure services?`,
];

export function createGeneratedQuestions(): QuizQuestion[] {
  return (Object.entries(UNIT_FACTS) as [SubtopicId, Fact[]][]).flatMap(([topicId, facts]) =>
    Array.from({ length: 50 }, (_, index) => {
      const fact = facts[index % facts.length];
      const stem = stems[Math.floor(index / facts.length)];
      const options = [fact.statement, ...fact.distractors].slice(0, 4);
      const rotation = index % options.length;
      const rotated = [...options.slice(rotation), ...options.slice(0, rotation)];
      const optionExplanations = rotated.map((option) =>
        option === fact.statement
          ? `Correct. ${fact.concept} ${fact.statement}.`
          : `Incorrect. "${option}" is a distractor because it does not accurately describe ${fact.concept}. The accurate principle is that ${fact.concept} ${fact.statement}.`
      );
      return {
        id: `generated-${topicId}-${String(index + 1).padStart(3, '0')}`,
        topicId,
        question: stem(fact.concept),
        options: rotated,
        correctIndex: (options.length - rotation) % options.length,
        explanation: `${fact.concept} ${fact.statement}. This is an original, unofficial CloudSprint practice question based on the public AZ-900 skills scope.`,
        optionExplanations,
        sourceUrl: CERTIFICATION_SOURCE,
        difficulty: index % 3 === 0 ? 'beginner' : index % 3 === 1 ? 'intermediate' : 'advanced',
      };
    })
  );
}
