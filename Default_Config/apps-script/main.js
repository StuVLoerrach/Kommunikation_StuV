// Compiled using stuv_communitypostform 1.0.0 (TypeScript 4.9.5)
function doGet(params) {
  return HtmlService
    .createTemplateFromFile("index.html")
    .evaluate()
    .addMetaTag("viewport", "width=device-width, initial-scale=1.0");
}
