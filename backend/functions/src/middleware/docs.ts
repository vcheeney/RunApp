import express, {
	Response as ExResponse,
	Request as ExRequest,
	NextFunction,
} from "express"
import swaggerUi from "swagger-ui-express"

export function generateApiDocs(app: express.Router): void {
	const docsPath = "docs"
	app.use(
		`/${docsPath}`,
		// Swagger UI requires a trailing slash. Normally it would add it automatically, but its redirection does not work properly when behind a proxy:
		// ex: http://localhost:5001/runapp-9cb90/us-central1/api/docs would redirect to http://localhost:5001/docs/
		(req: ExRequest, res: ExResponse, next: NextFunction) => {
			if (req.originalUrl === `/${docsPath}`) res.redirect(`${docsPath}/`)
			next()
		},
		swaggerUi.serve,
		async (_req: ExRequest, res: ExResponse) => {
			return res.send(
				swaggerUi.generateHTML(
					await import("../../tools/openapi-generator/swagger.json")
				)
			)
		}
	)
}
