# Launch checklist: point melcoed.com at the new site

Goal: **www.melcoed.com** serves the new site from Cloudflare Pages. **melcoed.com** forwards to it.
Email (sales@melcoed.com and every other mailbox) keeps working the whole time.

Plan on about an hour of hands-on time, plus up to a day of waiting while the internet picks up
the change. Do it on a quiet weekday morning, not a Friday afternoon.

**The one rule:** email depends on a handful of DNS records. Copy every record before you change
anything, and make sure each one exists in Cloudflare before you switch over. Nothing else in this
list can break email.

---

## Before you start

- [ ] The new site works at its Cloudflare preview address (`<project>.pages.dev`). Click through
      Home, About, Capabilities and a product page.
- [ ] **The quote form works.**
  - In Cloudflare: **Workers & Pages → (this project) → Settings → Variables and secrets**.
  - `PUBLIC_WEB3FORMS_ACCESS_KEY` must be set for **Production** (and Preview, if you test there).
  - Send a test quote from the preview site and confirm it arrives in sales@.
  - If the key is missing, the form shows "Our online form is offline for a moment…" instead of
    sending.
- [ ] You can log in to **Network Solutions** (where melcoed.com is registered) and to **Cloudflare**.
- [ ] Leave the old WordPress hosting running. Don't cancel it until two weeks after launch. It's
      your fallback.

## Step 1: Save the current DNS records (Network Solutions)

1. Log in to Network Solutions → **My Domain Names → melcoed.com → Manage → Advanced DNS Records**
   (sometimes called "Edit DNS").
2. Take screenshots of the whole page, every section.
3. Also copy each record into a spreadsheet: **type, name/host, value, priority (MX only), TTL**.
   Make sure you have all of these:
   - **MX**: where email is delivered. Usually one or two records; Microsoft 365 looks like
     `melcoed-com.mail.protection.outlook.com`.
   - **SPF**: a TXT record on `@` that starts with `v=spf1`.
   - **DKIM**: records whose name contains `_domainkey`, often `selector1._domainkey` and
     `selector2._domainkey` (CNAME or TXT).
   - **DMARC**: a TXT record named `_dmarc` that starts with `v=DMARC1`.
   - **Autodiscover**: a CNAME named `autodiscover`. Outlook and phones use it to set up mail.
   - Any **SRV** records (e.g. `_sip._tls`, `_autodiscover._tcp`) and other CNAMEs
     (`lyncdiscover`, `sip`, `enterpriseregistration`, `enterpriseenrollment`).
   - Any **verification TXT** records (`MS=…`, `google-site-verification=…`, etc.).
   - **A** records for anything besides the website (`mail`, `ftp`, `remote`, …).
   - The current **website** records for `@` and `www`. Write these down as your rollback.
4. Write down the current **nameservers** too (e.g. `ns1.worldnic.com`, `ns2.worldnic.com`).

## Step 2: Add melcoed.com to Cloudflare

1. Cloudflare dashboard → **Add a domain** → type `melcoed.com` → pick the **Free** plan.
2. Cloudflare scans and imports the existing DNS records. **Compare its list against your
   spreadsheet line by line.** Add anything it missed, exactly as written: same name, same value,
   same MX priority.
3. Set the cloud icon to **grey ("DNS only")** on every email record:
   - MX records (always DNS only)
   - `autodiscover`, `_domainkey`, `lyncdiscover`, `sip` and other mail CNAMEs
   - `mail` A records and any SRV records

   An orange cloud on a mail record breaks email.
4. **Keep** the old website records for `@` and `www` (the ones pointing at the WordPress host,
   `141.193.213.10`) for now, so the old site stays up while the nameserver change spreads. Step 4
   replaces them. Leave every other record alone.
5. Do **not** turn on Cloudflare **Email Routing**. It replaces your MX records and would stop
   Microsoft 365 mail.
6. Cloudflare then shows you **two nameservers** (like `xxx.ns.cloudflare.com`). Keep that page open.

## Step 3: Switch nameservers (Network Solutions)

1. Network Solutions → melcoed.com → **Nameservers** (sometimes "Change Where Domain Points") →
   **Custom nameservers**.
2. Replace the existing ones with the **two Cloudflare nameservers**. Save.
3. Wait. Cloudflare emails you when melcoed.com is **Active**, usually within an hour, at most 24.
   Leave the old records at Network Solutions untouched in the meantime.
4. **Test email as soon as Cloudflare says Active:**
   - From a personal Gmail or phone, send to sales@melcoed.com and confirm it arrives.
   - Reply from sales@ to that Gmail address and confirm it arrives, and not in spam.
   - Open Outlook on a desktop and on a phone and confirm mail still syncs.

   If any of this fails, compare the Cloudflare DNS list with your spreadsheet again.

## Step 4: Connect the domains to the Pages project

1. Cloudflare → **Workers & Pages → (this project) → Custom domains → Set up a custom domain**.
2. Enter `www.melcoed.com` → Continue → **Activate domain**. Cloudflare creates the DNS record itself.
3. Repeat for `melcoed.com`.
   If Cloudflare says a DNS record already exists, go to **DNS → Records**, delete the old `www`
   (or `@`) A record pointing at `141.193.213.10`, and click **Activate** again. The old site is offline
   only for that minute.
4. Wait until both show **Active** with a certificate. This takes a few minutes.

## Step 5: Forward melcoed.com to www.melcoed.com

The site's official address is `https://www.melcoed.com` (the sitemap and search listings use it),
so the bare domain should forward there.

1. Cloudflare → melcoed.com → **Rules → Redirect Rules → Create rule** → choose the template
   **"Redirect from root to WWW"**. If there's no template, set it up by hand:
   - **When:** Hostname equals `melcoed.com`
   - **Then:** Dynamic redirect to `concat("https://www.melcoed.com", http.request.uri.path)`
   - **Status code:** 301
   - **Preserve query string:** on
2. Deploy the rule.
3. **SSL/TLS → Overview:** mode **Full**. **SSL/TLS → Edge Certificates:** turn on
   **Always Use HTTPS**.

## Step 6: Test

Open each of these in a private/incognito window:

- [ ] `https://www.melcoed.com/`: the new site.
- [ ] `http://melcoed.com/` and `https://melcoed.com/about/`: each lands on the `https://www.`
      version of the same page.
- [ ] **Old WordPress links land on new pages** (see the table below).
- [ ] **Downloads work:** both catalog PDFs and the At a Glance PDF.
- [ ] **Quote form:** send one real test and confirm it reaches sales@.
- [ ] **Email:** send and receive one more time, now that the site is live.

| Old link | Should land on |
|---|---|
| `/contact-us/` | `/contact/` |
| `/capabilities/findings/` | `/findings/` |
| `/about/history/` | `/about/` |
| `/news-resources/` | `/resources/` |
| `/sell-sheet/` | `/at-a-glance/` |

All 58 old-site redirects are listed in `public/_redirects`.

**If something goes badly wrong:** at Network Solutions, put the old nameservers back (from
Step 1). The old records there were never changed, so everything returns to how it was within a
few hours.

## Step 7: After launch (same day)

**Google Search Console**
1. Go to https://search.google.com/search-console → **Add property** → **Domain** → `melcoed.com`.
2. Google gives you a TXT record. Add it in Cloudflare DNS (name `@`), then click **Verify**.
3. **Sitemaps** → enter `https://www.melcoed.com/sitemap-index.xml` → **Submit**.
4. **URL Inspection** → `https://www.melcoed.com/` → **Request indexing**.
5. Optional: Bing Webmaster Tools → **Import from Google Search Console**. It covers Bing and the
   AI search tools that use Bing.

**Cloudflare Web Analytics** (cookie-free visit counts; the privacy policy already describes it)
1. Cloudflare → **Analytics & Logs → Web Analytics → Add a site** → `www.melcoed.com`.
2. Copy the **token** from the snippet it shows. It's the long value after `"token":`.
3. **Workers & Pages → (this project) → Settings → Variables and secrets** → add
   `PUBLIC_CF_ANALYTICS_TOKEN` = that token, for Production.
4. **Deployments →** redeploy the latest production deployment. Visits show up within a few minutes.

**Everywhere else the website address appears**
- [ ] Google Business Profile: website = `https://www.melcoed.com/`. Also copy the
      **"Ask for reviews"** link into `googleReviewUrl` in `src/data/site.ts`, and the exact
      latitude/longitude into `geo`.
- [ ] LinkedIn and Facebook pages: website = `https://www.melcoed.com/`.
- [ ] Email signatures, Web3Forms dashboard, any directory listings (MJSA, ThomasNet, etc.).

## Two weeks after launch

- [ ] In Search Console, check **Pages** for errors and **Sitemaps** for "Success".
- [ ] Email still fine → cancel the old WordPress hosting. **Keep the domain registration at
      Network Solutions** and keep auto-renew on.

---

## Appendix: what a public DNS lookup showed (6 Nov 2026)

Use this to double-check your Network Solutions screenshots. Your screenshots are the real list:
public lookups can't see every record.

| Name | Type | Value | What it's for |
| --- | --- | --- | --- |
| melcoed.com | NS | `ns9.worldnic.com`, `ns10.worldnic.com` | Network Solutions DNS (your rollback) |
| melcoed.com | MX | `0 melcoed-com.mail.protection.outlook.com` | Incoming email (Microsoft 365). **Copy exactly, grey cloud.** |
| melcoed.com | TXT | `v=spf1 include:edgepilot.com include:spf.mailjet.com ~all` | SPF. **Copy exactly.** |
| autodiscover.melcoed.com | CNAME | `autodiscover.outlook.com` | Outlook setup. **Grey cloud.** |
| melcoed.com, www | A | `141.193.213.10` | Old WordPress site (WP Engine). Replaced in Step 4. |
| mail, webmail, ftp | A | `141.193.213.10` | Old WP Engine host; Microsoft 365 email doesn't use them. Copy (grey), remove after WP Engine is cancelled. |
| `*` (wildcard) | A | `141.193.213.10` | Every other subdomain goes to WP Engine. Copy (grey), remove after WP Engine is cancelled. |
| _dmarc | TXT | none found | |
| selector1/2._domainkey | CNAME | none found | |

**Email health (separate from launch, do it after):** there is no DMARC record and no Microsoft 365
DKIM, and the SPF record lists EdgePilot and Mailjet but not Microsoft 365
(`include:spf.protection.outlook.com`). That SPF can be right if all outgoing mail passes through
EdgePilot; ask whoever set it up. Without DKIM and DMARC, more quotes land in customers' spam
folders. Don't change any of this during the launch. Afterwards: turn on DKIM in Microsoft 365
(Defender → Email authentication → DKIM gives two CNAMEs to add, grey cloud), confirm SPF, then add
a monitor-only DMARC record (`v=DMARC1; p=none; rua=mailto:...`).
