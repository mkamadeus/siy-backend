import { getMetadataArgsStorage } from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";
import { Express } from "express";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";

export const redocLoader = (expressApp: Express) => {
  const storage = getMetadataArgsStorage();
  const schemas = validationMetadatasToSchemas({
    refPointerPrefix: "#/components/schemas/",
  });
  const spec = routingControllersToSpec(
    storage,
    {},
    { components: { schemas } }
  );

  const redocPage = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>SIY Documentation</title>
      <!-- needed for adaptive design -->
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet">
  
      <!--
      ReDoc doesn't change outer page styles
      -->
      <style>
        body {
          margin: 0;
          padding: 0;
        }
      </style>
    </head>
    <body>
      <div id="redoc"></div>
      <script src="https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js"> </script>
      </script>
      <script>
        Redoc.init(JSON.parse('${JSON.stringify(
          spec
        )}'), {}, document.getElementById('redoc'))
      </script>
    </body>
  </html>
  `;
  expressApp.use("/docs", (req, res) => {
    res.send(redocPage);
  });
};
