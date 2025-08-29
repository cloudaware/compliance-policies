# Datasets Overview

Cloudaware provides customers with a suite of BigQuery datasets designed for advanced querying, reporting, and integration with your cloud data. These datasets are housed in a customer-specific Google Cloud project, often referred to as the "export project," which serves as your direct interface to the wealth of information curated by the Cloudaware platform.

A foundational understanding of BigQuery and SQL is recommended to make the most of these datasets.

## Core Datasets

While your export project may contain several datasets, the following are central to working with your CMDB and compliance data. Please note that while the actual names of your datasets may vary based on your organization's setup, they are referred to by these canonical names throughout the documentation.

- **[`sobjects`](sobjects/index.md):** The foundational dataset containing a complete replica of your Cloudaware Configuration Management Database (CMDB). It holds detailed configuration data for all your cloud resources, structured as Salesforce SObjects.
- **[`ce`](ce/index.md):** The Compliance Engine dataset. This is the primary source for all compliance-related data, including the results of policy evaluations, execution history, and framework mappings.
- **Billing Datasets:** A collection of datasets dedicated to cost management, providing the detailed data necessary for analyzing cloud expenditure, tracking budgets, and optimizing spending.
- **Performance & Metrics Datasets:** Datasets containing organizational performance data and resource utilization metrics, enabling you to monitor the health and efficiency of your cloud environments.

These datasets are designed to work together, allowing you to join compliance findings with detailed resource configurations or cost data to gain powerful, cross-domain insights into your cloud operations.
