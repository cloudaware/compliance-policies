[Back](../index.md)

# Compliance Engine

Reusable MDX components based on `ce/ca/aws/account/aws-support-role` policy ID.

## Components

| Component |
| --- |
| [Policy Run Trend](policy-run-trend.mdx) |
| [Latest Policy Output](latest-policy-output.mdx) |
| [Affected Resources](affected-resources.mdx) |

## Ideas/Prototypes

### Browse Repository Navigation

[Prototype](browse-repository.mdx)

Repository navigation component for browsing folders and policy pages without depending on a generated source page.

The desired component should make repository structure discoverable, searchable, and compact enough to use on large folder pages.

### Issues

- Current prototype is hardcoded using nested MdxTable.
- There is no built-in search or quick navigation.
- Nested folders are expanded by default, which creates long pages when every child folder is rendered at once.

### Statistics/Metrics Bar Charts

[Prototype](./metrics-bar-chart.mdx)

Tiles that show normalized percent bar.

#### Issues

- Current prototype uses hardcoded values.

### Stacked and Normalized Bar Charts

Stacked bar chart for comparing multiple status values across one dimension, such as account, application, environment, or tier.

Normalized stacked bar chart should show percent per group, for example Compliant vs Incompliant as a 100% bar per account.

#### Issues

- Current charts can show multiple measures as separate series, but not as a single stacked bar.
- There is no 100% normalized stacked bar mode.

### Chart Color Coding

Charts should allow explicit color mapping for field values, for example, Incompliant = red, Compliant = green.

#### Issues

- Current chart colors are assigned automatically.
- The same value can receive different colors across pages when values appear in a different order or when some statuses are missing.
- This creates inconsistent visual language for common values.

### Page-Level Filters

Pages should support filters that apply across multiple charts and views on the page.

For example, when viewing policy outputs for one policy, the user should be able to filter the whole page by account, application, environment, or tier instead of drilling into one chart.

#### Issues

- Filtering is currently tied to each individual chart or view.
- Ability to save a filtered page state across several charts as a reusable custom view.
