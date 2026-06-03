export default {
    async fetch(request, env, ctx) {
        // 1. SMART CHECK
        const response = await fetch(request);

        // 2. ERROR DETECTION
        // 530 is cloudflare's standard error for tunnel/origin being down
        if (response.status === 530) {

            // 3. BROWSER CHECK
            const acceptHeader = request.headers.get("Accept");
            const isBrowser = acceptHeader && acceptHeader.includes("text/html");

            if (isBrowser) {
                const url = new URL(request.url);

                // this pulls just the domain name (e.g. 'fonseware.com') without the https://
                const siteName = url.hostname;

                // setup our default text and buttons for any normal site
                let bodyText = `it seems that the server for ${siteName} is currently unavailable. the server may be experiencing technical difficulties or is taken down for maintenance. we are working to resolve the issue as soon as possible. we apologise for any inconvenience this may cause.`;
                let primaryBtnText = "open status page";
                let primaryBtnLink = "https://status.fonseware.com";

                // SCENARIO: the status page itself is down!
                // replace the text and swap the status button for the github org button
                if (siteName === 'status.fonseware.com') {
                    bodyText = `this is awkward. usually you are supposed to see our server status page here, but it seems like that server is down. we are working to resolve the issue as soon as possible. we apologise for any inconvenience this may cause.`;
                    primaryBtnText = "check github org";
                    primaryBtnLink = "https://github.com/fonseware";
                }

                // serve the custom popup modal
                const popupHTML = `
                <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>the server for ${siteName} is down.</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="icon" type="image/x-icon" href="https://github.com/fonseware/.github/blob/main/fw_favicon.png?raw=true">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cabin:wght@400;600&family=Geist:wght@600;800&display=swap" rel="stylesheet">

    <style>
        /* background */
        body {
            font-family: 'Cabin', system-ui, sans-serif;
            background: #000000;
            margin: 0;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        /* fake message box */
        .modal {
            background: #cc99cc;
            padding: 24px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.5);
            text-align: center;
            max-width: 350px;
            width: 90%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        /* geist font for the title */
        h2 {
            font-family: 'Geist', system-ui, sans-serif;
            margin-top: 0;
            color: #990099;
            font-size: 1.3rem;
            border-radius: 4px;
        }
        /* cabin font for the body */
        p {
            color: #000000;
            margin-bottom: 24px;
            font-size: 0.95rem;
            line-height: 1.4;
            border-radius: 4px;
        }
        .button-container {
            display: flex;
            gap: 12px;
            justify-content: center;
            flex-wrap: wrap;
            width: 100%;
            margin-bottom: 16px;
        }

        /* custom button designs */
        button {
            font-family: 'Cabin', system-ui, sans-serif;
            padding: 10px 16px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            transition: 0.2s;
            flex: 1;
            min-width: 120px;
        }
        .btn-status { background: transparent; color: #990099; border: 2px solid #990099; }
        .btn-status:not(.skeleton):hover { color: #460046; border-color: #460046; }

        .btn-grass { background: #990099; color: white; }
        .btn-grass:not(.skeleton):hover { background: #460046; }

        /* styling for your image placeholder */
        .logo-placeholder {
            display: block;
            margin-top: 10px;
            pointer-events: none;
            border-radius: 8px;
            padding: 10px;
            height: 25px;
        }

        /* SLIDING SKELETON LOADING STYLES */
        .skeleton {
            color: transparent !important;
            border-color: transparent !important; /* Hides button borders */
            background: linear-gradient(90deg, #b380b3 25%, #e6b3e6 50%, #b380b3 75%);
            background-size: 200% 100%;
            animation: skeleton-slide 1.5s infinite linear;
            user-select: none;
            pointer-events: none;
        }

        /* Hide the actual image content while skeleton is active so it doesn't break the illusion */
        img.skeleton {
            content: url('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
        }

        @keyframes skeleton-slide {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
    </style>
</head>
<body>
<div class="modal">
    <h2 class="skeleton">the server for ${siteName} is down.</h2>
    <p class="skeleton">${bodyText}</p>
    <div class="button-container">
        <button class="btn-status skeleton" onclick="window.location.href='${primaryBtnLink}'">${primaryBtnText}</button>
        <button class="btn-grass skeleton" onclick="window.location.href='https://en.wikipedia.org/wiki/Grass'">touch grass</button>
    </div>
    <a href="https://fnswe.me" style="display: inline-block;">
        <img src="https://github.com/fonseware/.github/blob/main/fw_logo.png?raw=true" alt="fonseware logo" class="logo-placeholder skeleton"></a>
</div>

<!-- Script to remove skeleton classes ONLY when all external assets (fonts, images) have loaded -->
<script>
    // wait for the window load event (ensures images and stylesheets are downloaded)
    window.addEventListener("load", () => {
        // double check that external web fonts have also finished rendering
        document.fonts.ready.then(() => {
            document.querySelectorAll('.skeleton').forEach(el => {
                el.classList.remove('skeleton');
            });
        });
    });
</script>
</body>
</html>
`;

                return new Response(popupHTML, {
                    status: 530,
                    headers: {
                        "content-type": "text/html;charset=utf-8"
                    }
                });
            }
        }

        // 4. DEFAULT
        return response;
    }
};