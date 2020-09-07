# Deploy Server

1. ke config/config.json
```json
"production": {
    "use_env_variable": "DATABASE_URL"
}
```
2. package.json tambahin script di bawah
```json
 "scripts": {
    "start": "node.app.js"
  }
```
3. 