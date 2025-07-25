---
title: Private Repository
---

# Working with Private Repositories

When developing custom policies, it's beneficial to store them in a private repository. This ensures security and control over your policy development process.

## Repository Setup Options

- **Cloudaware Managed**: Request your Technical Account Manager (TAM) to create and manage the repository for you.
- **Self-Managed**: Set up and maintain the repository independently.

## Creating Your Repository

The Compliance Engine supports integration with any Git repository accessible via the internet. Ensure your repository is accessible from a public internet.

### GitHub Setup Instructions

1. **Grant Access**:
   - Provide access to the service account: [https://github.com/cloudawareComplianceEngine](https://github.com/cloudawareComplianceEngine).
   - Optionally, allow additional Cloudaware staff access by contacting your TAM.

### Non-GitHub Platforms

For repositories hosted elsewhere (including on-premises), consult your TAM for specific instructions.

## Managing Upstream Updates

Refer to this article [Git Forks and Upstreams: How-to and a cool tip](https://www.atlassian.com/git/tutorials/git-forks-and-upstreams).

To keep your policies aligned with the latest updates:

1. **Configure Upstream Remote**:

   ```bash
   git remote add upstream https://github.com/cloudaware/compliance-policies.git
   ```

2. **Fetch and Merge Changes**:

   Fetch updates using:

   ```bash
   git fetch upstream
   git checkout master
   git merge upstream/master # or git rebase upstream/master
   ```

   Consider integrating this process into your CI/CD pipeline for automated updates.

## Documentation Generation

The documentation site is built using [Docusaurus](https://docusaurus.io/), a static site generator. Here's how to generate and deploy it:

### Prerequisites

- Ensure [requirements for Docusaurus](https://docusaurus.io/docs/installation#requirements) are satisfied.
- Ensure you have `repo-manager` authentication configured.

### Step-by-Step Guide

1. **Set Up Authentication**:
   Create a `.ca` directory in your repository root and add your authentication profile:

   ```bash
   mkdir .ca
   echo '{"profiles":[{"name":"PROFILE_NAME","token":"YOUR_TOKEN","sandbox":false}]}' > .ca/profiles.json
   ```

   Where `PROFILE_NAME` - pick any name, `YOUR_TOKEN` - token from your local `.ca/profiles.json` file.

2. **Clean Previous Builds**:
   Remove existing documentation files:

   ```bash
   java -jar repo-manager.jar docs cleanup
   ```

3. **Import Type Definitions**:
   Import necessary types and optionally add custom ones:

   ```bash
   java -jar repo-manager.jar types import -p REFERENCED
   ```

   If you need specific types not referenced in policies yet use:

   ```bash
   java -jar repo-manager.jar types import -p REFERENCED -t CA10__CaAwsDynamoDbTable__c -t CA10__CaAwsCacheCluster__c
   ```

4. **Test Policies**:
   Run policy tests and collect results:

   ```bash
   java -jar repo-manager.jar policies test all
   ```

5. **Generate Documentation**:
   Create markdown files for your policies:

   ```bash
   java -jar repo-manager.jar docs generate
   ```

6. **Build the Site**:

    ```bash
    cd .docusaurus
    npm install
    npm run build
    ```

   Refer to [Docusaurus documentation](https://docusaurus.io/docs) for further customization options.

7. **Deploy Your Site**:
   - Depending on your hosting choice (e.g., Google Storage, S3), deploy the built files from `.docusaurus/build`.
   - Example for Google Cloud Storage:

        ```bash
        gsutil -m rsync -r -d .docusaurus/build gs://YOUR_BUCKET_NAME/
        ```

## Troubleshooting and Additional Resources

- **Docusaurus Documentation**: [https://docusaurus.io/docs](https://docusaurus.io/docs)
- **Repo Manager Authentication**: Refer to the [dedicated guide](developer/repo-manager/cli.md#repo-manager-auth) in our documentation.

For any issues or questions, contact your Technical Account Manager for support.
