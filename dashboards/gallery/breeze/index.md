[Back](../index.md)

# Breeze

## Breeze Coverage

Pie chart showing number of servers (of all types).

Only 2 values Installed vs Not Installed

### Issues

- ❌ Charts would not work without grouping (no columns selected as Group)
- ❌ Charts can not render a pie chart when values are provided as 2 columns. It shows 2 separate pies, instead of 1 pie with 2 sections. 

## Agents by Provider / Type

Horizontal stacked bar chart.

Each bar is a separate Cloud (or type).

Inside each bar only 2 values Installed vs Not Installed

[📊 WIP Prototype](agents-by-type.mdx)

### Issues

- ⚠️ We can not render Stacked Bar chart, only bar chart with 2 separate series. 

## Agents by Application

Similar to [Agents by Provider / Type](#agents-by-provider--type), but instead of splitting by Cloud/Object Type, each bar is a Cloudaware Application

### Issues

- ❌ Bug when aggregate table or chart uses __r field in "Group"

## Agents by Environment / Tier

Similar to [Agents by Provider / Type](#agents-by-provider--type) and [Agents by Application](#agents-by-application), but each bar is Cloudaware Application Tier. 
Provided customer uses standardized tier names across multiple applications.

### Issues

- ❌ Bug when aggregate table or chart uses __r field in "Group"

## Breeze Coverage Last 30-Days

[Breeze Coverage](#breeze-coverage), but time series, showing last 30 days

### Issues

- ❌ This chart is built using Line (or future Time Series). Obvious source object is Policy Run.
  It has to SUM over multiple policies. The issue appears when there are >1 run for a specific policy for a specific day.
  We might have to introduce the new object that averages all runs in a day first, so we can later SUM over it across multiple policies

## Breeze Active DoD Delta

Time series showing net increase or decrease of active agents. 
e.g. 30, means that number of active agents this day is 30 more than the day before.
Negative means that the number of active agents is decreased compared to previous day.

## Breeze Active MoM

Time series with a granularity of a month, that shows average number of agents that month.

## Installed / Not Installed OS Services

Horizontal stacked bar chart normalized to 100%.

Each bar is a unique OS Service name discovered in the customer's environment.

Inside each bar - # of agents where this OS Service is installed and not installed.

## OS Service Status

Pie chart. All discovered OS Services grouped by status, showing 2 values "running" and "stopped".

### Issues

- ❌ Charts would not work without grouping (no columns selected as Group)
