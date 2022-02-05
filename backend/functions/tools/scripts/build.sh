#!/bin/bash
echo "BUILD ⬜ (1/2) Generating routes with TSOA"
npx tsoa spec-and-routes
echo "BUILD ✅ (1/2) Routes generated!"

echo "BUILD ⬜ (2/2) Compiling the TypeScript"
npx tsc
echo "BUILD ✅ (2/2) TypeScript compiled!"

echo "BUILD 🏆 (2/2) PROJECT BUILT! Do not forget go update the API client (npm run update-api-client) before doing work on the frontend after changing/updating the routes."