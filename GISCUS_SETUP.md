# Giscus Comments Setup Guide

This site uses [Giscus](https://giscus.app/) for comments, which is powered by GitHub Discussions. Follow these steps to enable comments:

## Prerequisites

- Your repository must be public
- The [giscus app](https://github.com/apps/giscus) must be installed on your repository
- GitHub Discussions must be enabled in your repository

## Setup Steps

### 1. Enable GitHub Discussions

1. Go to your repository on GitHub
2. Click on **Settings**
3. Scroll down to **Features**
4. Check the box for **Discussions**

### 2. Install Giscus App

1. Visit https://github.com/apps/giscus
2. Click **Install**
3. Select your repository

### 3. Get Your Configuration

1. Visit https://giscus.app
2. Fill in your repository in the format: `username/repo-name`
3. Select **Discussion Category** (recommended: "Announcements" or create a new "Comments" category)
4. Choose your preferred settings
5. Copy the configuration values shown

### 4. Update the Comments Component

Open `components/Comments.tsx` and replace the placeholder values:

```typescript
script.setAttribute("data-repo", "your-username/your-repo-name");
script.setAttribute("data-repo-id", "YOUR_REPO_ID");
script.setAttribute("data-category", "Announcements");  // or your category
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
