# Deep JavaScript Docs

A modern documentation site for mastering JavaScript fundamentals without the framework tax. Deep dive into core concepts, patterns, and best practices through well-crafted articles.

## 🚀 Features

- **📚 MDX-Powered Content** - Write rich, interactive documentation with MDX
- **🎨 Beautiful Typography** - Enhanced reading experience with Tailwind Typography
- **🔍 Full-Text Search** - Fast client-side search powered by Fuse.js
- **🌙 Dark Mode** - Automatic dark mode support
- **⚡ Syntax Highlighting** - Code blocks with rehype-highlight
- **⏱️ Reading Time** - Estimated reading time for each article
- **🔗 Auto-Linked Headings** - Easy navigation with automatic anchor links
- **📱 Responsive Design** - Mobile-first, responsive layout
- **🎯 SEO Optimized** - Sitemap and RSS feed generation

## 📖 Content Topics

Current articles cover:
- JavaScript Event Loop
- React useState Internals
- Framework Knowledge & Vanilla JS
- Vanilla JavaScript Patterns

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) with App Router
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **Content**: [MDX](https://mdxjs.com/) via next-mdx-remote
- **Search**: [Fuse.js](https://fusejs.io/)
- **Syntax Highlighting**: rehype-highlight
- **Typography**: @tailwindcss/typography

## 🏃 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd deep-js-doc

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📁 Project Structure

```
deep-js-doc/
├── app/                    # Next.js App Router
│   ├── articles/          # Article pages
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── content/
│   └── articles/          # MDX article files
├── components/            # React components
├── lib/                   # Utility functions
└── public/               # Static assets
```

## ✍️ Writing Content

Articles are written in MDX format in the `content/articles/` directory.

### Article Frontmatter

```mdx
---
title: "Your Article Title"
description: "Article description for SEO"
date: "2024-11-01"
tags: ["Tag1", "Tag2"]
category: "Category Name"
author: "Author Name"
featured: true
---

# Your content here...
```

## 🚀 Deployment

This site can be deployed to any platform that supports Next.js:

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<your-repo-url>)

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

### Other Platforms

- **Netlify**: Configure build command as `npm run build` and publish directory as `.next`
- **Docker**: Use the official Next.js Docker example
- **Self-hosted**: Run `npm run build` then `npm run start`

See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [MDX Documentation](https://mdxjs.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
