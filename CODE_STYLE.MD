# CODE STYLE

### 1. Выносить свободно валяющиеся значения в константы:

Использование констант в нашем коде дает нам несколько преимуществ:

- **Повышает читаемсоть кода:**

```javascript
TASK_LENGTH.MIN;
```

куда более информативнее чем просто число.

- **Возможность менять значения:**
  Если значение, которое мы используем в различных частях кода, должно измениться, нам придется изменить его только в одном месте вместо того, чтобы искать и заменять все его вхождения в коде.

- **Меньше шансов на ошибку:**
  Очень легко допустить ошибку в "subtasks.\_id" забыв про "\_" или написав "Id" не в том регистре. Практически невозможно допустить ошибку при использовании констант, так как ide нам все подскажет ещё до компиляции кода.

---

#### Практические примеры:

❌

```javascript
const { name, status = "To Do", priority = "High" } = req.body;
```

✔️

```javascript
const STATUS = {
  TO_DO: "To Do",
  DONE: "Done",
  IN_PROGRESS: "In Progress",
};

const PRIORITY = {
  LOW: "low",
  HIGH: "high",
};

const { name, status = STATUS.TO_DO, priority = PRIORITY.HIGH } = req.body;
```

❌

```javascript
throw new WrongTypeError("Enter the string!");
```

✔️

```javascript
const ERROR_MESSAGE = {
  NOT_A_STRING: "Enter the string!",
  TOO_SHORT: "Enter more than three characters!",
  TOO_LONG: "Enter less than 50 characters!",
  ERROR: "An error has occurred:",
  NOT_FOUND_TASK: "There is no such task ",
  CHECK_ID: "check task ID",
  FAILED_ADD: "Failed to add: ",
  FAILED_DELETE: "Failed to delete: ",
  FAILED_CHANGE: "Failed to change task priority: ",
  FAILED_GET: "Failed receiving tasks",
  ACCESS_DENIED: "Access denied",
  REQUIRED_FIELD_MISSING: "required field missing",
};

throw new WrongTypeError(ERROR_MESSAGE.NOT_A_STRING);
```

---

### 2. Именования переменных и функций

1. переменные описывающее сущность внутри, никакого транслита англ язык
   например: tasks vs zadachi

2. функция - это глагол: createTask

3. функция которая возвращает true\false - это функция предикат, должна отвечать на вопрос, обычно должна начинаться с is или has:
   - isOdd - проверка на нечетность
   - hasAcess - проверка на наличие доступа

---

### 3. Используйте ESLint и prettier

[SETUP_GUIDE](SETUP_GUIDE.MD)
