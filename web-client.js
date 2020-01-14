require('dotenv').config()

const PORT = process.env.PORT

const next = require('next')
const routes = require('./routes')
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handler = routes.getRequestHandler(app)

const { createServer } = require('http')
app.prepare().then(() => {
	createServer(handler).listen(PORT, err => {
		if (err) throw err
		console.log(`Ready on http://localhost:${PORT}`)
		console.log('Press Ctrl+C to close')
	})
})

process.on('SIGINT', async () => {
	console.log('Bye!')
	await dispose()
})

async function dispose() {
	process.exit()
}
