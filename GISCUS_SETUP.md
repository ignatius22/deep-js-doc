# Giscus Comments Setup Guide

This site uses [Giscus](https://giscus.app/) for comments, which is powered by GitHub Discussions.

## ✅ Current Configuration

The Giscus comments system is **already configured** and ready to use:

- **Repository**: `ignatius22/deep-js-doc`
- **Repository ID**: `R_kgDOQVV0WQ`
- **Category**: `General`
- **Category ID**: `DIC_kwDOQVV0Wc4Cmv9l`

Comments will appear at the bottom of each article page.

## Prerequisites (Already Met)

- ✅ Repository is public
- ✅ The [giscus app](https://github.com/apps/giscus) is installed on your repository
- ✅ GitHub Discussions are enabled in your repository

## Configuration Details

The configuration is set in `components/Comments.tsx`:

```typescript
script.setAttribute("data-repo", "ignatius22/deep-js-doc");
script.setAttribute("data-repo-id", "R_kgDOQVV0WQ");
script.setAttribute("data-category", "General");
script.setAttribute("data-category-id", "DIC_kwDOQVV0Wc4Cmv9l");
```

## Updating Configuration (If Needed)

If you need to change the discussion category or other settings:

### 1. Visit Giscus Configuration

1. Go to https://giscus.app
2. Enter your repository: `ignatius22/deep-js-doc`
3. Select your preferred **Discussion Category**
4. Choose your preferred settings
5. Copy the generated configuration values

### 2. Update the Comments Component

Open `components/Comments.tsx` and update the values:

```typescript
script.setAttribute("data-repo", "ignatius22/deep-js-doc");
script.setAttribute("data-repo-id", "R_kgDOQVV0WQ");
script.setAttribute("data-category", "YOUR_CATEGORY");  // e.g., "Announcements"
script.setAttribute("data-category-id", "YOUR_CATEGORY_ID");
```

### 5. Verify

1. Build and run your site: `npm run dev`
2. Navigate to any article
3. Scroll to the bottom to see the comments section
4. Try posting a comment

## Customization

You can customize the appearance and behavior in `components/Comments.tsx`:

- **Theme**: Change `data-theme` to "light", "dark", or "preferred_color_scheme"
- **Position**: Change `data-input-position` to "top" or "bottom"
- **Reactions**: Set `data-reactions-enabled` to "0" to disable reactions
- **Language**: Change `data-lang` to your preferred language code

## Troubleshooting

- **Comments not showing**: Make sure the giscus app is installed and Discussions are enabled
- **Wrong theme**: The theme automatically matches your site's color scheme
- **Missing category**: Create a new category in GitHub Discussions settings

For more information, visit the [Giscus documentation](https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md).
