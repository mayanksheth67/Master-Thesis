#!/bin/bash
PLATFORM_WEB="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )" &&
MIRADOR_GIT="$PLATFORM_WEB/../../../../../mirador" &&
BUILT_MIRADOR="$MIRADOR_GIT/build/mirador" &&
PLATFORM_LIBRARIES="$PLATFORM_WEB" &&
PLATFORM_WEBAPP="$PLATFORM_WEB/../../../../src/main/webapp" &&
rm -r "$PLATFORM_LIBRARIES/mirador" &&
cp -r "$BUILT_MIRADOR" "$PLATFORM_LIBRARIES" &&
cp "$MIRADOR_GIT/css/material-icons.css" "$PLATFORM_LIBRARIES/mirador/css" &&
cp "$MIRADOR_GIT/node_modules/jstree/src/themes/default/32px.png" "$PLATFORM_LIBRARIES/mirador/css" &&
cp "$MIRADOR_GIT/node_modules/jstree/src/themes/default/40px.png" "$PLATFORM_LIBRARIES/mirador/css" &&
cp "$MIRADOR_GIT/node_modules/jstree/src/themes/default/throbber.gif" "$PLATFORM_LIBRARIES/mirador/css" &&
rm -r "$PLATFORM_WEBAPP/mirador" &&
mkdir "$PLATFORM_WEBAPP/mirador" &&
mv "$PLATFORM_LIBRARIES/mirador/images" "$PLATFORM_WEBAPP/mirador" &&
mv "$PLATFORM_LIBRARIES/mirador/locales" "$PLATFORM_WEBAPP/mirador" &&
# wrap whole CSS in .mirador { } scope,
# import QTip and icon fonts separately
# and set default box-sizing to content-box
sed -e '1s/^/.mirador \{\n/' -e '$s/$/\n}\n/' \
  -e '$s/$/\n@import "material-icons";\n/' \
  -e '$s/$/\n.mirador \* { box-sizing: content-box; }\n/' \
  "$PLATFORM_LIBRARIES/mirador/css/mirador-combined.css" \
  > "$PLATFORM_LIBRARIES/mirador/css/mirador.scss"
