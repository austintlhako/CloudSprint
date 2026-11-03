import type { SubtopicId } from '../types';

export interface PracticeLab {
  id: string;
  subtopicId: SubtopicId;
  title: string;
  scenario: string;
  steps: string[];
  expectedResult: string;
}

export const practiceLabs: PracticeLab[] = [
  {
    id: 'cloud-model-selector',
    subtopicId: 'cc-cloud-computing',
    title: 'Choose the right cloud model',
    scenario: 'A retailer needs extra capacity during seasonal sales without buying permanent hardware.',
    steps: ['Identify the changing demand pattern.', 'Choose the cloud characteristic that addresses it.', 'Explain why on-demand capacity is preferable to fixed infrastructure.'],
    expectedResult: 'Elastic, consumption-based public cloud capacity is the best fit.',
  },
  {
    id: 'cloud-benefits-match',
    subtopicId: 'cc-cloud-benefits',
    title: 'Match benefits to outcomes',
    scenario: 'A startup wants to release features quickly, survive traffic spikes, and avoid a large upfront datacenter purchase.',
    steps: ['Match rapid delivery to agility.', 'Match traffic changes to scalability and elasticity.', 'Match usage-based spending to operational expenditure.'],
    expectedResult: 'The selected benefits explain why cloud services can reduce upfront cost and improve delivery speed.',
  },
  {
    id: 'service-model-advisor',
    subtopicId: 'cc-cloud-service-types',
    title: 'Select a service model',
    scenario: 'A team wants to deploy code while the provider manages the operating system and runtime.',
    steps: ['Identify what the team wants to manage.', 'Compare IaaS, PaaS, and SaaS responsibilities.', 'Select the model with a managed application platform.'],
    expectedResult: 'Platform as a service is the appropriate model.',
  },
  {
    id: 'azure-resource-hierarchy',
    subtopicId: 'aas-core-architecture',
    title: 'Build an Azure resource hierarchy',
    scenario: 'An organization needs separate billing boundaries and a shared lifecycle for application resources.',
    steps: ['Place resources inside a resource group.', 'Place the resource group inside a subscription.', 'Choose a region and availability design for resilience.'],
    expectedResult: 'The hierarchy uses a subscription, resource group, region, and availability zones appropriately.',
  },
  {
    id: 'compute-service-selector',
    subtopicId: 'aas-compute-networking',
    title: 'Choose compute and network services',
    scenario: 'A web API needs managed hosting and private connectivity to another Azure service.',
    steps: ['Choose a managed hosting option.', 'Add a virtual network for private isolation.', 'Use network security rules to control traffic.'],
    expectedResult: 'Azure App Service, a virtual network, and a network security group satisfy the requirements.',
  },
  {
    id: 'storage-service-selector',
    subtopicId: 'aas-storage',
    title: 'Design a storage solution',
    scenario: 'An application stores images, shared documents, and virtual machine disks.',
    steps: ['Map images to object storage.', 'Map shared documents to managed file shares.', 'Map VM operating system data to managed disks.'],
    expectedResult: 'Blob Storage, Azure Files, and managed disks are matched to the correct workloads.',
  },
  {
    id: 'identity-access-review',
    subtopicId: 'aas-identity-security',
    title: 'Review identity and access',
    scenario: 'A team member needs limited access to view resources without changing them.',
    steps: ['Identify the identity directory.', 'Choose a least-privilege role.', 'Verify that the role is scoped to the required resource.'],
    expectedResult: 'Microsoft Entra ID and role-based access control provide scoped, read-only access.',
  },
  {
    id: 'azure-database-selector',
    subtopicId: 'aas-storage',
    title: 'Select a data service',
    scenario: 'A global application needs a managed database with low-latency access and no server patching.',
    steps: ['Identify the need for a managed service.', 'Compare relational and NoSQL access patterns.', 'Choose a service that supports globally distributed application data.'],
    expectedResult: 'The selected managed data service matches the application data model and availability needs.',
  },
  {
    id: 'azure-cost-estimator',
    subtopicId: 'amg-cost-management',
    title: 'Investigate cloud costs',
    scenario: 'A project owner wants to forecast spending and receive an alert before exceeding the monthly budget.',
    steps: ['Group costs by subscription or resource group.', 'Create a budget for the expected monthly spend.', 'Add an alert threshold for early notification.'],
    expectedResult: 'Cost analysis, budgets, and alerts provide visibility and proactive cost control.',
  },
  {
    id: 'governance-policy-review',
    subtopicId: 'amg-governance-compliance',
    title: 'Apply governance controls',
    scenario: 'An organization must restrict deployments to approved regions and require tags on resources.',
    steps: ['Define the required organizational rules.', 'Apply policy definitions at the correct scope.', 'Check whether a sample resource complies.'],
    expectedResult: 'Azure Policy enforces location and tagging requirements consistently.',
  },
  {
    id: 'resource-deployment-plan',
    subtopicId: 'amg-managing-deploying',
    title: 'Plan repeatable deployments',
    scenario: 'A team needs to deploy the same environment consistently across development and production.',
    steps: ['Describe the desired resources declaratively.', 'Parameterize environment-specific values.', 'Validate the deployment before applying it.'],
    expectedResult: 'Infrastructure-as-code and Azure Resource Manager support repeatable, controlled deployments.',
  },
  {
    id: 'monitoring-alert-workshop',
    subtopicId: 'amg-monitoring',
    title: 'Create a monitoring response',
    scenario: 'An API is becoming slow and the operations team needs evidence before responding.',
    steps: ['Select metrics and logs that show the problem.', 'Create an alert for the agreed threshold.', 'Review the signal and identify the next action.'],
    expectedResult: 'Azure Monitor metrics, logs, and alerts provide an evidence-based response workflow.',
  },
];
