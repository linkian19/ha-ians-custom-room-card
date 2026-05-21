/**
 * Loads HA frontend custom elements needed by the card editor.
 *
 * Uses the mushroom-cards indirect loading pattern:
 * calling hui-tile-card.getConfigElement() triggers HA to load ha-form
 * and related editor components without direct bundle imports.
 *
 * RISK: the hui-tile-card indirect pattern is undocumented and may break
 * on HA updates. Monitor after major HA releases.
 */
export async function loadHaComponents(): Promise<void> {
  if (
    !customElements.get("ha-form") ||
    !customElements.get("hui-card-features-editor")
  ) {
    (customElements.get("hui-tile-card") as any)?.getConfigElement?.();
  }

  await Promise.all([
    customElements.whenDefined("ha-entity-picker"),
    customElements.whenDefined("ha-icon-picker"),
    customElements.whenDefined("ha-selector"),
    customElements.whenDefined("ha-form"),
    customElements.whenDefined("ha-textfield"),
  ]);
}
