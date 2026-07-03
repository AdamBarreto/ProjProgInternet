#!/usr/bin/env python3
"""Development static file server with cache disabled."""
import http.server
import socketserver

PORT = 5000


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


socketserver.TCPServer.allow_reuse_address = True

with socketserver.TCPServer(("", PORT), NoCacheHandler) as httpd:
    print(f"Serving HTTP on 0.0.0.0 port {PORT} (no-cache)...")
    httpd.serve_forever()
