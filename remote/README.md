# Remote

Files here are used on the remote server where this website is hosted. While
there is no sensitive information in these files, if one wants to appropriate
them, you'll need to change `nginx.conf`:

- Give `nginx.conf` a better name on your server
- Change anything related to udps.nbsoftsolutions.com to whatever url you have.
- Hook up [Let's Encrypt](https://letsencrypt.org/) for your domain.

A recent version of Nginx is required to serve the pages over http2.
