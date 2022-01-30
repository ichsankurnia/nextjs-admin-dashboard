/** @type {import('next').NextConfig} */

const intercept = require("intercept-stdout")
const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");

// safely ignore recoil stdout warning messages 
function interceptStdout(text) {
  if (text.includes('Duplicate atom key')) {
    return ''
  }
  return text
}

// Intercept in dev and prod
intercept(interceptStdout)

module.exports = withPlugins([ [withImages] ], {
  reactStrictMode: true,
})
