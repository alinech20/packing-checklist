run:
	pnpm dev

clean:
	rm -rf node_modules
	rm pnpm-lock.yaml
	pnpm i

test:
	pnpm test:unit:coverage
