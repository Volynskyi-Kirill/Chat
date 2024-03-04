# Установка Eslint

- `npm init @eslint/config`
- `npm install -D eslint eslint-config-airbnb`

---

## Настройка .eslintrc.json

```
{
  "env": {
    "browser": true,
    "commonjs": true,
    "es2021": true,
    "jest": true
  },
  "extends": ["eslint:recommended", "airbnb", "prettier"],
  "overrides": [],
  "parserOptions": {
    "ecmaVersion": "latest"
  },
  "plugins": ["jest"],
  "rules": {
    "import/no-extraneous-dependencies": "off",
    "no-console": ["error", { "allow": ["warn", "error", "info"] }],
    "no-underscore-dangle": "off",
    "no-param-reassign": "off"
  }
}

```

---

# Установка **Prettier**

- `npm install -D --save-exact prettier eslint-config-prettier`
- `echo {}> .prettierrc.json`

---

### настройка .prettierrc.json

```
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true
}
```
