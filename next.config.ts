import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["ws", "bufferutil", "utf-8-validate", "@neondatabase/serverless", "@react-pdf/renderer", "pdfkit", "fontkit"],
  outputFileTracingIncludes: {
    "**/resume-pdf**": [
      "./node_modules/pdfkit/js/**/*",
      "./node_modules/@react-pdf/**/*",
      "./node_modules/fontkit/**/*",
    ],
  },
};

export default nextConfig;
