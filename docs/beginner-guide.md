# Beginner Guide

Step-by-step setup for adding your first room card to a Home Assistant dashboard.

---

## Step 1: Install via HACS

1. Open Home Assistant and go to **HACS** in the sidebar.
2. Click the three-dot menu (⋮) in the top right → **Custom Repositories**.
3. In the "Repository" field, enter:
   ```
   https://github.com/linkian19/ha-ians-custom-room-card
   ```
4. Set the category to **Dashboard**, then click **Add**.
5. Search for **Ian's Custom Room Card** and click it.
6. Click **Download** and confirm.
7. Reload your browser (or reload Lovelace resources in **Settings → Dashboard → Resources**).

---

## Step 2: Add the card to a dashboard

1. Open the dashboard you want to edit.
2. Click the **Edit** button (pencil icon, top right).
3. Click **+ Add Card** in any section.
4. Search for **Ian's Custom Room Card** and select it.

The card appears with default placeholder content. It is now ready to configure.

---

## Step 3: Set a room icon and title

The visual editor is organized into tabs: **Basic**, **Icon**, **Card**, **Buttons**, and **Actions**.

In the **Basic** tab:

1. **Title** — type your room name, e.g. `Living Room`.
2. **Icon** — click the icon field and search for an MDI icon. Try `sofa`, `bed`, `desk-lamp`, or `fridge`.
3. **Icon color** — click the color swatch to open a color picker, or type a CSS color directly.

Click **Save** to preview your changes.

---

## Step 4: Set the tap action to navigate

To make the card navigate to a room-specific dashboard view when tapped:

1. Switch to the **Actions** tab.
2. Set **Tap action** → **Navigate**.
3. Set the **Navigation path** to the view you want, e.g. `/lovelace/living-room`.

> **Tip:** If you don't have a per-room view yet, you can set the action to **More info** and pick a primary entity for the room instead.

---

## Step 5: Add a sub-button

Sub-buttons are small icons inside the card for quick access to room entities.

1. Switch to the **Buttons** tab.
2. Click **+ Add sub-button**.
3. Set the **Entity** to a light or switch in the room.
4. Enable **Show icon**.
5. Leave **Tap action** as `toggle` — tapping the sub-button will toggle the entity.

Click **Save**. The sub-button appears at the bottom of the card.

---

## Step 6: Try a background color

1. Switch to the **Card** tab.
2. Set **Background color** using the color picker.
3. Adjust **Background opacity** to control how transparent the background is (0 = invisible, 1 = solid).

A dark semi-transparent background looks good on frosted glass dashboards:
```
rgba(20, 20, 40, 0.85)
```

---

## Full example

Here is the YAML for a complete living room card. You can paste this directly using the YAML editor (click the three-dot menu → Edit in YAML):

```yaml
type: custom:ians-custom-room-card
title: Living Room
icon: mdi:sofa
icon_color: "rgb(255, 200, 50)"
background_color: "rgba(20, 20, 40, 0.85)"
global_action:
  tap_action:
    action: navigate
    navigation_path: /lovelace/living-room
sub_buttons:
  - entity: light.living_room_ceiling
    icon: mdi:lightbulb
    show_icon: true
    tap_action:
      action: toggle
  - entity: media_player.living_room_tv
    icon: mdi:television
    show_icon: true
    tap_action:
      action: more-info
```

---

## Next steps

- **Templates**: make the icon or color change based on entity state — see [advanced-guide.md](advanced-guide.md).
- **CSS customization**: frosted glass, custom icon shapes, and more — see [css-classes.md](css-classes.md).
- **Full config reference**: every available option — see the [README](../README.md).
