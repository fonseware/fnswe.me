# **Static Site Redirector**

This is a free and open-source redirect static site hosted on GitHub Pages. It is incredibly easy to edit and use for your own custom short links and domain routing.

## **How It Works**

This project uses a clever GitHub Pages trick: index.html and 404.html are identical files. This is because GitHub Pages looks for a file matching your URL path, and if it fails to find it, it defaults to loading 404.html. We use this behaviour to catch all incoming parameters and paths.

For example, if this project is hosted on fnswe.me, it automatically points to a fallback domain like fonseware.com after a brief loading animation.

It supports two types of URL routing:

* **Parameter Routing:** fnswe.me?u=status \> points to \> status.fonseware.com  
* **Path Routing:** fnswe.me/status \> points to \> status.fonseware.com  
* **Directory Listing:** Accessing fnswe.me/redirects will display a paginated, searchable list of all available short links configured in your redirects.json file.

## **Getting Started**

To get your own redirector up and running, follow these steps:

1. **Fork this project** to your own GitHub account.  
2. **Edit index.html:**  
   * Open the file and scroll down to the CONFIG object in the script section.  
   * Update the following configurations to match your own details:  
     * HOST\_DOMAIN: Your redirector domain (e.g., "https://fnswe.me").  
     * FALLBACK\_URL: Your main website (e.g., "https://fonseware.com").  
     * LOGO\_URL: A direct link to your logo image.  
     * FAVICON\_URL: A direct link to your favicon.  
   * You can also customize timing, text strings, and the primary theme colors within the \<style\> block at the top of the file.  
   * *Note: You only need to edit index.html\! This project includes an automated GitHub Action that will copy your changes to 404.html for you.*  
3. **Edit redirects.json:** Add your custom paths and destinations here. The file needs to be formatted as a JSON array. We have added support for tags to help organize your links.

   \[  
     {  
       "id": "status",  
       "url": "https://status.fonseware.com/",  
       "tags": \["status"\]  
     },  
     {  
       "id": "github",  
       "url": "https://github.com/yourusername",  
       "tags": \["social", "code"\]  
     }  
   \]

## **Features & Automation**

* **Automated Sync:** To make life easy, this project already comes with a GitHub Actions workflow attached. Whenever you push changes to index.html, this action automatically copies those changes over to 404.html so you do not have to do it manually.  
* **Visual Countdown:** Users are presented with a circular progress countdown before the redirect occurs.  
* **Cancel & Review:** Users have the option to pause the redirect countdown and view a complete list of available short links right from the loading screen.  
* **Centralized Configuration:** All major settings, timings, and display texts are neatly organized in a single CONFIG object within the HTML file for easy modification.

## **Delays & Styling**

By default, the script includes a 6-second delay to display a skeleton loading animation, the countdown timer, and allow users time to cancel the redirect if needed. You can adjust this timeout by changing the TOTAL\_DELAY\_SECONDS value in the CONFIG object if you want a faster redirect. Theme colors can be easily modified in the CSS :root variables at the top of the file.

## **License**

This project is licensed under the [MIT License](https://www.google.com/search?q=LICENSE). You are totally free to fork, edit, and use this for your own projects. Attribution to the original creator is highly appreciated, but not mandatory.

*This project's documentation and code refinement have been made possible with the assistance of AI tools.*