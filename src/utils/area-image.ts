import type { HomeAssistant } from "../types";

/**
 * Resolves the "area" keyword to an actual image URL from HA's area registry.
 *
 * Lookup order:
 * 1. hass.entities[entityId].area_id   → area set directly on the entity
 * 2. hass.devices[device_id].area_id   → otherwise the entity inherits its
 *    device's area (the common case — entity area_id is only an override)
 * 3. hass.areas[area_id].picture        → reads area picture URL
 *
 * Returns undefined (no image, no error) if:
 * - entityId is not set
 * - entity has no area assigned
 * - area has no picture configured
 */
export function resolveAreaImage(
  hass: HomeAssistant,
  entityId: string | undefined
): string | undefined {
  if (!entityId) return undefined;

  const entityEntry = hass.entities?.[entityId];
  const areaId =
    entityEntry?.area_id ??
    (entityEntry?.device_id ? hass.devices?.[entityEntry.device_id]?.area_id : undefined);
  if (!areaId) return undefined;

  const area = hass.areas?.[areaId];
  if (!area?.picture) return undefined;

  return area.picture;
}
