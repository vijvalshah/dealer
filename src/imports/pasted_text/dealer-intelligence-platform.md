Build a production-ready enterprise dashboard frontend in
Next.js 14 + React + TypeScript + TailwindCSS + shadcn/ui

Design style:

Enterprise analytics dashboard
Light theme
Soft gray background
White cards
Blue primary color
Subtle borders
Rounded cards
Clean typography
Medium density layout

Font:
Inter

Sizes:
24px title
16px section title
14px body
12px small

Colors:
Background #F5F7FA
Card #FFFFFF
Border #E5E7EB
Primary #2563EB
Muted #6B7280
Danger #EF4444
Success #16A34A
Warning #F59E0B

Layout:

Left sidebar
Top header
Main content
Cards grid
Map panel
Table panel
Insight panel
Tabs inside page instead of multiple pages

Product name:

Dealer Intelligence Platform

Use case:

System for ceramics company with 6000+ dealers
Goal is dealer revenue uplift, discount optimization, bundling, competitor tracking, premium SKU push, margin protection.

IMPORTANT:

Keep only 3 sidebar items.

Sidebar:

Overview
Dealer Intelligence
Recommendations

Everything else must be inside tabs, not separate pages.

PAGE 1 — Overview

Cards:

Total Dealers
Dealers Under Risk
Margin Leakage Signals
Active Recommendations

Below cards:

Dealer table

Columns:

Dealer
City
Margin Score
Discount Usage
Competitor Pressure
Bundle Score
Trend
Action Needed

Below table:

Insights panel

Common Issues:

Over discounting
Low premium sales
Competitor nearby
Low bundling
Seasonal drop

PAGE 2 — Dealer Intelligence (MAIN PAGE)

This page must have tabs.

Tabs:

Heatmap
Dealer List
Discount Optimization
Bundling Insights
Competitor Monitoring

TAB 1 — Heatmap

Map placeholder card

Right side cards:

Dealers in region
Avg margin
Competitor pressure
Alerts

Below:

AI territory briefing panel

TAB 2 — Dealer List

Table:

Dealer
City
Margin Score
Bundle %
Premium %
Discount %
Risk
Competitor
Trend

Right side detail panel:

Charts placeholders

Sales trend
SKU mix
Bundle mix

Recommendation box

TAB 3 — Discount Optimization

Table:

Dealer
Current Discount
Recommended Discount
Demand Score
Competitor Score
Margin Risk

Approve button
Reject button

TAB 4 — Bundling Insights

Cards:

Low bundle dealers
High bundle dealers
Premium heavy
Economy heavy

Table:

Dealer
Tiles %
Bathware %
Adhesive %
Bundle Score
Recommendation

TAB 5 — Competitor Monitoring

Table:

Dealer
Nearby competitors
Rating
Review count
Trend
Threat level

Use badges red yellow green

PAGE 3 — Recommendations

Feed style list

Each item:

Dealer
Issue
Recommendation
Approve
Reject

Also show:

Notifications
Alerts
Recent actions

TECH REQUIREMENTS

Use:

Next.js app router
TypeScript
TailwindCSS
shadcn/ui
Lucide icons

Components:

Sidebar
Topbar
Card
StatCard
Table
Tabs
Badge
MapPlaceholder
ChartPlaceholder
InsightPanel
RecommendationCard

Use reusable components.

No inline styles.

Return full code.