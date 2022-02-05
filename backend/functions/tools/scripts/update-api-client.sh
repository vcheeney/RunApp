#!/bin/bash
echo "API CLIENT UPDATE ⬜ (1/3) Building the project..."
npm run build
echo "API CLIENT UPDATE ✅ (1/3) Project built!"

echo "API CLIENT UPDATE ⬜ (2/3) Generating the typescript API client..."
docker-compose up --build openapi_generator
echo "API CLIENT UPDATE ✅ (2/3) TypeScript API client generated!"

echo "API CLIENT UPDATE ⬜ (3/3) Replacing the API client in the frontend code..."
cd "$(dirname "$0")"
SOURCE_FOLDER="../openapi-generator/.build"
DEST_FOLDER="../../../../frontend/services/api/generated"
rm -rf $DEST_FOLDER
mkdir -p $DEST_FOLDER
cp $SOURCE_FOLDER/**.ts $DEST_FOLDER
echo "API CLIENT UPDATE ✅ (3/3) Replaced the API client in the frontend code!"

echo "🙌 All done!"