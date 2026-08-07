# Design System Direction

## Status

This document defines planned visual and interaction principles. Exact tokens, components, graph layouts, and motion values will be established during implementation and tested on representative displays.

## Visual philosophy

Threat Loom should feel like a focused intelligence visualization product. The relationship graph is the primary visual element. Supporting interface elements should explain, filter, and navigate the graph without competing with it.

The visual foundation should use dark neutral surfaces, generous spacing, strong typography, and controlled contrast. Color, shape, line treatment, and motion must encode meaning rather than decorate empty space.

## Large-screen requirements

- Optimize primary compositions for 1920x1080 and 3840x2160 landscape displays.
- Keep key labels and controls readable at the intended viewing distance.
- Avoid critical controls at extreme screen edges where display overscan or physical framing may interfere.
- Support touch targets where possible without making desktop interaction cumbersome.
- Keep the idle visualization legible at the intended viewing distance.
- Yield immediately to pointer, touch, or keyboard interaction.
- Avoid persistent content that could cause uneven display wear where operationally relevant.

Physical display testing is required before declaring fullscreen layouts complete.

## Color semantics

Entity categories should receive distinct semantic visual treatments for threat actors, industries, malware and tools, ATT&CK techniques, campaigns, infrastructure, locations, and reports. Malware and tools may share a family while remaining distinguishable through labels or shape.

Exact colors remain open until contrast, projection, display calibration, and color-vision testing can inform token selection. The final system should:

- define colors as named semantic tokens rather than component-specific literals;
- reserve high-emphasis color for selection, focus, warnings, or important relationships;
- keep sufficient contrast against dark neutral surfaces;
- avoid relying on color alone to identify an entity or state;
- preserve consistent meaning across the graph, legends, details, and filters;
- provide neutral treatments for unknown or unsupported categories.

## Typography philosophy

- Use a highly legible sans-serif family with dependable rendering and open licensing.
- Establish a clear scale for page title, exploration context, graph labels, detail headings, body text, and metadata.
- Favor concise labels and comfortable line length over dense text.
- Use weight, size, and spacing before introducing additional colors.
- Avoid ornamental display faces for dense graph or report content.
- Test capitalization and letter spacing at distance and at 4K scaling.

An exact typeface and scale will be chosen during foundation design work.

## Spacing and layout

- Give the graph the majority of the available viewport.
- Use a small number of stable regions for navigation, graph, contextual detail, and essential controls.
- Prefer progressive disclosure over rows of permanent panels or cards.
- Maintain predictable spacing through semantic tokens.
- Keep controls grouped by task and leave enough separation for touch.
- Prevent contextual panels from obscuring the selected graph neighborhood when space allows.
- Use content density appropriate to viewing distance rather than filling all available pixels.

## Graph visualization behavior

- Every visible node and edge must represent normalized data.
- Encode entity category redundantly through color, shape, iconography, or labeling.
- Keep edge direction and relationship type understandable through line treatment, arrowheads, labels, or contextual detail.
- Make selected nodes and their relevant neighborhood clear while reducing, not erasing, surrounding context.
- Preserve selection during compatible filtering and layout changes.
- Avoid unnecessary layout resets and disorienting node movement.
- Provide useful empty and partial-data states.
- Limit labels based on focus and zoom while retaining accessible names outside the canvas.
- Offer a readable legend and direct explanations of relationship semantics.
- Do not create decorative nodes, random edges, or unsupported geographic links.

Graph density and layout thresholds will be based on measured usability with representative data.

## Interaction behavior

- Selection should have an immediate, visible result.
- Hover may preview information but cannot be required for access.
- Touch, pointer, and keyboard paths should reach the same core information.
- Controls should use familiar labels and native semantics.
- Filters must communicate what is hidden and provide a clear reset.
- External report links must be clearly identified and handled safely.
- The interface should preserve exploration context when opening and closing details.
- Idle mode must stop on the first intentional interaction.

## Motion principles

Motion should explain transitions, focus attention, or preserve spatial understanding. Planned use includes gentle entry, selection emphasis, panel transitions, and controlled graph layout changes.

- Keep durations short enough to preserve responsiveness.
- Avoid continuous ambient movement during active exploration.
- Do not flash, pulse aggressively, or animate every element.
- Respect the user's reduced-motion preference.
- Provide a low-motion idle alternative.
- Never use motion to imply unsupported real-time activity.

Motion or Framer Motion is planned for interface transitions. Cytoscape.js should own graph movement. Do not add overlapping animation systems for the same element.

## Accessibility

- Meet WCAG 2.2 AA contrast and interaction expectations where applicable.
- Use semantic HTML for controls, navigation, headings, and status messages.
- Provide visible focus and logical keyboard order.
- Expose graph selection and relationship details in a non-canvas representation that assistive technology can use.
- Do not rely on color, hover, motion, or spatial position alone.
- Support zoom and text scaling without hiding essential controls.
- Announce meaningful changes without overwhelming screen readers.
- Use plain language for relationship types and empty states.

## Responsive behavior

Large landscape screens are supported, but development and review must also work on normal desktop displays. The graph remains central at each supported size. Contextual detail may shift from a side panel to an overlay or lower region when space is constrained. Core exploration cannot depend on fullscreen dimensions.

Phone layouts are not an initial MVP target. Basic content access should fail gracefully rather than presenting an unusable fixed canvas.

## 1080p and 4K considerations

- Use relative layout and semantic type tokens rather than assuming 4K means twice the content.
- Scale for physical readability, not only pixel count.
- Test browser and operating-system scaling at the intended installation.
- Ensure graph lines, focus rings, and text remain crisp at both resolutions.
- Avoid tiny metadata that becomes technically visible but practically unreadable.
- Measure rendering performance with representative node and edge counts at both resolutions.

## Optional idle display mode

Idle mode should present curated stories or neighborhoods backed by loaded intelligence. Each sequence should have a clear subject, readable pacing, and a visible invitation to explore. It should avoid appearing live unless the displayed data is actually current and the interface states that clearly.

The planned idle-mode controller will manage inactivity, sequence order, interruption, resumption, and recovery. Exact timing should be configurable after display testing. Active interaction always takes priority.

## Visual anti-patterns

Do not use:

- Matrix backgrounds or fake terminal streams;
- random glowing hexagons or decorative network lines;
- excessive neon, bloom, or glass effects;
- flashing widgets or constant pulsing;
- meaningless world attack arcs;
- dozens of dashboard cards;
- unreadably dense graphs presented as spectacle;
- color that changes meaning between views;
- motion that suggests activity not supported by data;
- decorative elements that do not encode information or aid navigation.
