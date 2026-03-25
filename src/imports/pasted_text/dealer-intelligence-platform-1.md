# Somany Dealer Intelligence Frontend Prompt

Build a production-ready enterprise frontend in **Next.js 14 + React + TypeScript + TailwindCSS + shadcn/ui**.

Use a clean, modern enterprise analytics style:
- light theme
- soft gray page background
- white cards
- blue primary accent
- subtle borders
- rounded 2xl cards
- Inter font
- compact but readable spacing
- dashboard density similar to SAP / Salesforce / internal enterprise portals

This is a **dealer revenue uplift platform** for Somany Ceramics.

Public source context:
- Somany has a public dealer network page with dealer and showroom listings. cite? no
- Somany also has public catalogue pages for tile collections and the product pages are partly JavaScript-rendered. Use catalogue-level collections as the UI source of truth until backend SKU inventory is wired. 
- The uploaded dealer JSON contains 32 Maharashtra dealer records.
- The uploaded catalogue JSON contains visible catalogue PDF collections, not complete SKU-level inventory.

Important product goals:
1. identify dealer performance by region
2. show nearby competitors and footfall proxies
3. recommend discount hold / discount release / bundle push / premium push
4. show AI reasoning so business teams trust the decision
5. keep everything frontend-ready so backend can fill only the live data later

## IA rules
Keep the sidebar to only 3 items:
- Overview
- Dealer Intelligence
- Recommendations

All other views must be tabs inside Dealer Intelligence.

## Pages

### 1. Overview
Show:
- total dealers
- dealers under risk
- margin leakage signals
- active recommendations

Below, a dealer table with:
- dealer
- city
- dealer type
- margin score
- discount usage
- bundle score
- competitor pressure
- trend
- action needed

Below that, a small insight panel showing:
- over discounting
- low premium sales
- competitor nearby
- low bundling
- seasonal demand drop

### 2. Dealer Intelligence
This is the main page. Add tabs:
- Heatmap
- Dealer List
- Discount Optimization
- Bundling Insights
- Competitor Monitoring

#### Heatmap tab
Left side:
- India / Maharashtra heatmap placeholder
- region selector
- territory selector

Right side cards:
- dealers in region
- avg margin
- competitor pressure
- alerts

Under that:
- AI territory briefing panel

#### Dealer List tab
Table columns:
- dealer name
- city
- dealer type
- margin score
- bundle %
- premium %
- discount %
- competitor pressure
- trend
- recommended action

Right side detail drawer:
- sales trend chart placeholder
- SKU mix chart placeholder
- bundle mix chart placeholder
- nearby competitors list
- Google reviews summary
- footfall proxy
- busy hours proxy

#### Discount Optimization tab
Table columns:
- dealer
- current discount
- recommended discount
- demand score
- competitor score
- margin loss risk
- approve
- reject

For each row, include an explanation panel:
- why hold discount
- why give discount
- why this band
- expected impact on margin
- confidence score

#### Bundling Insights tab
Cards:
- low bundle dealers
- high bundle dealers
- premium heavy dealers
- economy heavy dealers

Table columns:
- dealer
- tiles %
- bathware %
- adhesive %
- bundle score
- recommended bundle

#### Competitor Monitoring tab
Table columns:
- dealer
- nearby competitors
- competitor rating
- review count
- trend
- threat level
- footfall proxy

### 3. Recommendations
Feed-style list. Each item should show:
- dealer
- issue detected
- action recommended
- reasoning
- expected uplift
- approve
- reject

Also show:
- notifications
- alerts
- recent actions
- pending approvals

## Mandatory AI reasoning model
Every recommendation card or table row must include a visible reasoning block with these fields:

- decision
- primary drivers
- supporting evidence
- counterpoint / why not the opposite action
- confidence
- expected revenue impact
- margin impact
- recommended next action

Reasoning should sound like a business analyst, not a chatbot.

Example structure:

```json
{
  "decision": "Hold discount",
  "primary_drivers": [
    "Demand is stable",
    "Competitor pressure is moderate",
    "Historical conversion remains strong without extra discount"
  ],
  "supporting_evidence": [
    "High-premium mix",
    "High footfall proxy",
    "Repeat purchase signals"
  ],
  "counterpoint": "A promotion could lift short-term volume, but the margin cost is higher than the likely incremental conversion.",
  "confidence": 0.76,
  "expected_revenue_impact": "+4.2%",
  "margin_impact": "+1.8%",
  "recommended_next_action": "Keep discount capped and push bundle instead"
}
```

## Data model requirements for frontend
The Figma-generated frontend must include these mock data structures as visible UI content:

### Dealer record fields
- dealer_id
- dealer_name
- dealer_type
- contact_person
- state
- city_hint
- full_address
- postal_code
- region_cluster
- territory_manager
- margin_score
- discount_usage
- discount_band
- bundle_score
- premium_ratio
- competitor_pressure
- google_rating_proxy
- google_review_count_proxy
- footfall_proxy
- busy_hours_proxy
- local_competitors
- nearby_dealers
- action_recommendation
- reasoning
- confidence
- expected_uplift
- margin_saving

### Competitor record fields
- competitor_name
- distance_km
- rating_proxy
- review_count_proxy
- footfall_proxy
- busy_hours
- threat_level
- notes

### SKU / collection record fields
- collection_name
- category
- size
- region
- launch_month
- premium_or_economy
- bundle_with
- target_dealer_type
- margin_hint

## UI behavior rules
- Use blue for primary action
- Use green for healthy / good margin
- Use amber for caution
- Use red for risk
- Keep cards soft and clean
- Use badges for dealer type and threat level
- Use tables for dense data
- Use right-side detail panels for reasoning
- Include small sparkline trend lines in summary cards
- Keep the layout responsive

## What to avoid
- Do not create more than 3 sidebar pages
- Do not over-nest routes
- Do not make the UI look like a consumer app
- Do not use loud gradients
- Do not use dark theme
- Do not rely on backend for layout
- Do not leave empty panels. Populate them with realistic mock data

## Dealer dataset to render
Use the following 32 dealer rows exactly as the initial mock set. Keep the names and dealer types. Populate the rest of the columns using AI-generated realistic analytics.

| Dealer Name | Dealer Type | City Hint | Recommended Action | Discount Band | Reasoning |
|---|---|---:|---|---|---|
| Somany Experience Center | experience-center | Mumbai | Protect premium pricing | 0-3% | High-visibility experience format; customers are already in discovery mode, so the best move is premium storytelling and low/no discounting. |
| Somany Experience Center | experience-center | Pune | Protect premium pricing | 0-3% | High-visibility experience format; customers are already in discovery mode, so the best move is premium storytelling and low/no discounting. |
| Galaxy Decor | grande | Kolhapur | Push premium tiles | 3-6% | Large-format dealer in a competitive city can absorb premium SKUs if assisted by bundle offers and controlled discounting. |
| Mohan Marble Industries | grande | Amravati | Push premium tiles | 3-6% | Large-format dealer in a competitive city can absorb premium SKUs if assisted by bundle offers and controlled discounting. |
| Prabhat Ceramic | grande | Jalgaon | Push premium tiles | 3-6% | Large-format dealer in a competitive city can absorb premium SKUs if assisted by bundle offers and controlled discounting. |
| Shanikrupa Granite And Tiles | grande | Maharashtra | Increase bundle attach rate | 5-8% | In a smaller market, conversion improves more through bundles and dealer-led promotions than broad discounting. |
| Shri Ramdev Udyog | grande | Latur | Push premium tiles | 3-6% | Large-format dealer in a competitive city can absorb premium SKUs if assisted by bundle offers and controlled discounting. |
| Swastik Ceramics | grande | Nagpur | Push premium tiles | 3-6% | Large-format dealer in a competitive city can absorb premium SKUs if assisted by bundle offers and controlled discounting. |
| Rishabh Patra Depot | exclusive | Satara | Defend territory | 4-7% | Exclusive format should be treated as a protected territory. The AI should favor assortment planning and controlled offers over aggressive discounting. |
| Shivkrupa Traders | exclusive | Sangli | Defend territory | 4-7% | Exclusive format should be treated as a protected territory. The AI should favor assortment planning and controlled offers over aggressive discounting. |
| Stone Decor | exclusive | Nagpur | Defend territory | 4-7% | Exclusive format should be treated as a protected territory. The AI should favor assortment planning and controlled offers over aggressive discounting. |
| Shreenath Ceramics | duragres-lounge | Maharashtra | Lead with large-format premium tiles | 2-5% | Lounge format is suited to premium discovery, so the model should prioritize premium SKUs and showroom experience. |
| Baba Traders | studio | Sangli | Increase attachment sales | 5-9% | Studio dealers convert well on guided selling. The strongest lever is cross-sell and bundle attach rather than straight price cuts. |
| Ceramic Arts | studio | Nashik | Increase attachment sales | 5-9% | Studio dealers convert well on guided selling. The strongest lever is cross-sell and bundle attach rather than straight price cuts. |
| Ellora Traders | studio | Parbhani | Increase attachment sales | 5-9% | Studio dealers convert well on guided selling. The strongest lever is cross-sell and bundle attach rather than straight price cuts. |
| Hare Rama Building Material | studio | Malegaon | Increase attachment sales | 5-9% | Studio dealers convert well on guided selling. The strongest lever is cross-sell and bundle attach rather than straight price cuts. |
| Ridhi Building Materials And Suppli | studio | Solapur | Increase attachment sales | 5-9% | Studio dealers convert well on guided selling. The strongest lever is cross-sell and bundle attach rather than straight price cuts. |
| A.C.Roof Kraft | bath-studio | Kalyan | Cross-sell tiles with bathware | 4-8% | Bath studio format is naturally cross-sell rich. AI should recommend mixed baskets, especially tiles plus bathware plus adhesive. |
| Ashoka Homes And Tiles | bath-studio | Gondia | Cross-sell tiles with bathware | 4-8% | Bath studio format is naturally cross-sell rich. AI should recommend mixed baskets, especially tiles plus bathware plus adhesive. |
| Jay Traders | bath-studio | Pune | Cross-sell tiles with bathware | 4-8% | Bath studio format is naturally cross-sell rich. AI should recommend mixed baskets, especially tiles plus bathware plus adhesive. |
| Abdul Sattar & Co. | brand-dealer | Mumbai | Push premium assortment | 3-6% | Brand dealer in an active market should be guided toward premium SKU mix and margin protection, not blanket promotions. |
| Abhijeet Distributors | brand-dealer | Mahad | Increase basket size | 5-8% | Smaller-market brand dealer benefits more from persona-based bundles and timed promotions than from always-on discounting. |
| Abhinav Grani Ceramics Pvt Ltd | brand-dealer | Mumbai | Push premium assortment | 3-6% | Brand dealer in an active market should be guided toward premium SKU mix and margin protection, not blanket promotions. |
| Akshay Associates | brand-dealer | Maharashtra | Increase basket size | 5-8% | Smaller-market brand dealer benefits more from persona-based bundles and timed promotions than from always-on discounting. |
| Ambe Shree Sales | brand-dealer | Pune | Push premium assortment | 3-6% | Brand dealer in an active market should be guided toward premium SKU mix and margin protection, not blanket promotions. |
| Ambika Marble | brand-dealer | Ratnagiri | Push premium assortment | 3-6% | Brand dealer in an active market should be guided toward premium SKU mix and margin protection, not blanket promotions. |
| Ambika Tiles And Granite | brand-dealer | Maharashtra | Increase basket size | 5-8% | Smaller-market brand dealer benefits more from persona-based bundles and timed promotions than from always-on discounting. |
| Amit Enterprises | brand-dealer | Nagpur | Push premium assortment | 3-6% | Brand dealer in an active market should be guided toward premium SKU mix and margin protection, not blanket promotions. |
| Anand Ceramic | brand-dealer | Nashik | Push premium assortment | 3-6% | Brand dealer in an active market should be guided toward premium SKU mix and margin protection, not blanket promotions. |
| Annapurna Enterprises | brand-dealer | Sindhudurg | Increase basket size | 5-8% | Smaller-market brand dealer benefits more from persona-based bundles and timed promotions than from always-on discounting. |
| Asian Granite | brand-dealer | Thane | Push premium assortment | 3-6% | Brand dealer in an active market should be guided toward premium SKU mix and margin protection, not blanket promotions. |
| Ayush Marble | brand-dealer | Ghodegaon | Increase basket size | 5-8% | Smaller-market brand dealer benefits more from persona-based bundles and timed promotions than from always-on discounting. |

## Catalogue / SKU collection dataset to render
Use the following visible catalogue collections from Somany's public catalogue pages as the starting SKU collections. Use them as collection cards, collection filters, and recommendation seeds. Where individual SKU inventory is unavailable, show collection-level cards and mark detail rows as backend pending.

| Category | Collection | Size | Date | Region |
|---|---|---:|---|---|
| Somany Duragres/GVT Wall & Floor | Duragres Planks Unit 4 | 196x1200mm | Mar 2026 | FOR SOUTH |
| Somany Duragres/GVT Wall & Floor | Duragres Rockstone Unit 4 | 600x600mm | Mar 2026 | FOR SOUTH |
| Somany Duragres/GVT Wall & Floor | Duragres Tesoro Unit 4 | 600x1200mm | Mar 2026 | FOR SOUTH |
| Somany Duragres/GVT Wall & Floor | Duragres Bloom Unit 4 | 600x1200mm | Mar 2026 | FOR SOUTH |
| Somany Duragres/GVT Wall & Floor | Duragres Master Unit 1 | — | Mar 2026 | NORTH & EAST INDIA |
| Somany Duragres/GVT Wall & Floor | Duragres Rockstone Unit 1 | 600x600mm | Feb 2026 | NORTH & EAST INDIA |
| Somany Durastone Floor | Durastone Pavesmart Unit 3 | 500x500mm, 400x400mm & 300x300mm | Feb 2026 | ALL INDIA |
| Somany Durastone Floor | Durastone Pavezza Collection Unit 3 | 400x400mm | Sep 2025 | ALL INDIA |
| Somany Durastone Floor | Durastone Spesso Collection Unit 3 | 600x600mm | Sep 2025 | ALL INDIA |
| Somany Durastone Floor | Durastone Montaro Collection Unit 3 | 400x400mm | Sep 2025 | ALL INDIA |
| Somany Durastone Floor | Durastone Unit 3 | 300x300mm & 500x500mm | May 2025 | ALL INDIA |
| Somany Durastone Floor | Durastone AP | 400x400mm | Dec 2024 | ALL INDIA |
| Somany Vitro Floor | (not fetched / JS-rendered) | — | — | — |
| Somany Ceramic Wall & Floor | Ceramic Wood Essentia Unit 2 | 200x1200mm & 200x1000mm | Mar 2026 | ALL INDIA |
| Somany Ceramic Wall & Floor | Ceramic Orion Series Unit 4 | 300x300mm & 300x450mm | Mar 2026 | FOR SOUTH |
| Somany Ceramic Wall & Floor | Ceramic VC Shield & Slip Shield Unit 2 | 600x600mm | Mar 2026 | ALL INDIA |
| Somany Ceramic Wall & Floor | Ceramic Unit 2 | 300x300mm & 300x600mm | Mar 2026 | SOUTH, WEST & CENTRAL INDIA |
| Somany Ceramic Wall & Floor | Ceramic Master Unit 1 | — | Jan 2026 | NORTH & EAST INDIA |
| Somany Ceramic Wall & Floor | Ceramica Unit 1 | 300x600mm | Nov 2025 | NORTH & EAST INDIA |
| Coverstone Slabs | (not fetched / JS-rendered) | — | — | — |
| GVT Slabs | (not fetched / JS-rendered) | — | — | — |
| Italmarmi | (not fetched / JS-rendered) | — | — | — |
| Bathware | (not fetched / JS-rendered) | — | — | — |

## Additional frontend panels to include
### 1. Territory summary card
Show:
- assigned region
- dealers covered
- risk dealers
- top bundle opportunity
- top competitor threat
- top premium push opportunity

### 2. Dealer detail drawer
When a dealer row is clicked, open a drawer with:
- dealer overview
- revenue trend
- discount history
- bundle history
- premium mix
- competitor list
- nearby dealer map
- reasoned recommendation
- approval buttons

### 3. AI confidence explanation card
Add a small card next to each recommendation:
- confidence score
- why the model is confident
- what would change the decision
- what data is missing
- what human should verify before approval

### 4. Footfall and competitor intelligence panel
For each dealer, show:
- local competitor list
- nearby dealer list
- footfall proxy
- review velocity proxy
- rating proxy
- business hours proxy
- busy hour estimate
- threat level

### 5. Dealer action logic
The recommendation engine should prefer:
- hold discount when demand is stable and premium mix is already high
- give controlled discount when competitor pressure is high and conversion is weak
- push bundles when basket size can expand
- push premium SKUs when the dealer has discovery-driven customers or stronger market quality
- push bathware and adhesives together where basket attachment is possible

## Suggested default JSON shape for each recommendation row
```json
{
  "dealer_name": "Example Dealer",
  "city_hint": "Pune",
  "dealer_type": "brand-dealer",
  "current_discount": "6%",
  "recommended_discount": "4%",
  "decision": "Hold discount",
  "reasoning": {
    "primary_drivers": ["..."],
    "supporting_evidence": ["..."],
    "counterpoint": "..."
  },
  "confidence": 0.74,
  "expected_uplift": "+3.8%",
  "margin_saving": "+1.6%",
  "recommended_bundle": ["Tiles", "Bathware", "Adhesive"],
  "nearby_competitors": [
    {
      "name": "Competitor A",
      "distance_km": 1.8,
      "rating_proxy": 4.1,
      "review_count_proxy": 84,
      "footfall_proxy": "high",
      "busy_hours": "6pm-9pm",
      "threat_level": "medium"
    }
  ]
}
```

## SKUs and collection guidance
Use the catalogue collections already visible in the uploaded data as the UI source of truth:
- Duragres GVT Wall & Floor
- Durastone Floor
- Ceramic Wall & Floor
- and the remaining catalogue sections shown in the uploaded file

For categories where the public site is JS-rendered and no collection rows were scraped, show:
- placeholder collection cards
- “backend pending”
- “load from catalog service”
- no blank states

## Final instruction
Generate the frontend with realistic demo data, not lorem ipsum.
The result should look like a real enterprise system already in use by business teams.
It must feel like a decision support platform, not a generic admin dashboard.
