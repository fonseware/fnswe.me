# Static Site Redirector

This is a free and open-source redirect static site hosted on GitHub Pages. It is incredibly easy to edit and use for your own custom short links and domain routing.

## How It Works
This project uses a clever GitHub Pages trick: `index.html` and `404.html` are identical files. This is because GitHub Pages looks for a file matching your URL path, and if it fails to find it, it defaults to loading `404.html`. We use this behaviour to catch all incoming parameters and paths.

For example, if this project is hosted on `fnswe.me`, it automatically points to a fallback domain like `fonseware.com` after a brief loading animation.

It supports two types of URL routing:
* **Parameter Routing:** `fnswe.me?u=status` > points to > `status.fonseware.com`
* **Path Routing:** `fnswe.me/status` > points to > `status.fonseware.com`

## Getting Started
To get your own redirector up and running, follow these steps:

1. **Fork this project** to your own GitHub account.
2. **Edit `index.html`:**
   * Open the file and scroll down to the script section. Search for `const fallbackURL = "https://fonseware.com";` and change it to your own main website.
   * Update the `favicon` link in the `<head>` and the logo `<img>` source in the `<body>` to match your own branding.
   * *Note: You only need to edit `index.html`! This project includes an automated GitHub Action that will copy your changes to `404.html` for you.*
3. **Edit `redirects.json`:** Add your custom paths and destinations here. The file needs to be formatted as a JSON array like this:
```json
   [
     {
       "id": "status",
       "url": "[https://status.fonseware.com](https://status.fonseware.com)"
     },
     {
       "id": "github",
       "url": "[https://github.com/yourusername](https://github.com/yourusername)"
     }
   ]

```

## Automation 🤖

To make life easy, this project already comes with a GitHub Actions workflow attached. Whenever you push changes to `index.html`, this action automatically copies those changes over to `404.html` so you do not have to do it manually.

## Delays & Styling

By default, the script includes a 6-second (6000ms) delay to display a skeleton loading animation while the external assets load and the redirect processes. You can adjust this timeout in the `<script>` tag if you want a faster, instant redirect.

## License

This project is licensed under the [MIT License](https://www.google.com/search?q=LICENSE). You are totally free to fork, edit, and use this for your own projects. Attribution to the original creator is highly appreciated, but not mandatory.