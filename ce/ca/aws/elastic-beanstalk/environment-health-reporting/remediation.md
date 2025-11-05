# Remediation

## Enable Enhanced Health Reporting

### **Using the EB CLI**

1. **Open your environment configuration in the default text editor:**

    ```sh
    ~/project$ eb config
    ```

2. **Locate the `aws:elasticbeanstalk:healthreporting:system` namespace and update the `SystemType` value to `enhanced`:**

    ```txt
    aws:elasticbeanstalk:healthreporting:system:
    SystemType: enhanced
    ```

3. **Save the configuration file and close the editor:**

    The EB CLI will automatically start an environment update to apply the changes. You can monitor the update progress in the terminal or exit safely using `Ctrl+C`:

    ```txt
    ~/project$ eb config
    Printing Status:
    INFO: Environment update is starting.
    INFO: Health reporting type changed to ENHANCED.
    INFO: Updating environment no-role-test's configuration settings.
    ```
