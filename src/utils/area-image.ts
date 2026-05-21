import type { HomeAssistant } from "../types";

/**
 * Resolves the "area" keyword to an actual image URL from HA's area registry.
 *
 * Lookup order:
 * 1. hass.entities[entityId].area_id  → looks up area_id from entity registry
 * 2. hass.areas[area_id].picture       → reads area picture URL
 *
 * Returns undefined (no image, no error) if:
 * - entityId is not set
 * - entity has no area assigned
 * - area has no picture configured
 *
 * OPEN QUESTION: hass.areas[id]?.picture path is based on HA 2024.x API.
 * Verify via HA DevTools if this changes in future HA versions.
 */
export function resolveAreaImage(
  hass: HomeAssistant,
  entityId: string | undefined
): string | undefined {
  if (!entityId) return undefined;

  // Get area_id from entity registry (hass.entities available in HA 2022+)
  const entityEntry = hass.entities?.[entityId];
  const areaId = entityEntry?.area_id;
  if (!areaId) return undefined;

  const area = hass.areas?.[areaId];
  if (!area?.picture) return undefined;

  return area.picture;
}
