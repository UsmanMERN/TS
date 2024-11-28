# What is interface

In TypeScript, an **interface** is a way to define a contract for the structure of an object. It specifies the properties and their types that an object must have. Interfaces are especially useful when working with React and TypeScript, as they help define the shape of props, states, and other data structures.

### Features of an Interface
1. **Defines Object Shape**: Specifies the structure of an object.
2. **Type Checking**: Ensures that the object adheres to the defined structure.
3. **Extensibility**: Can extend other interfaces.
4. **Optional Properties**: Use `?` to mark properties as optional.
5. **Read-Only Properties**: Use `readonly` to make properties immutable.
6. **Functions**: Can define function signatures.

---

### Basic Syntax

```typescript
interface InterfaceName {
  property1: Type;
  property2?: Type; // Optional property
  readonly property3: Type; // Read-only property
  method1(param: Type): ReturnType; // Function signature
}
```

---

### Example 1: Defining a Simple Object
```typescript
interface User {
  id: number;
  name: string;
  email?: string; // Optional property
}

const user1: User = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
};

const user2: User = {
  id: 2,
  name: "Jane Doe", // Valid even without email because it's optional
};
```

---

### Example 2: Using Interfaces with Functions
```typescript
interface Product {
  id: number;
  name: string;
  price: number;
}

function displayProduct(product: Product): string {
  return `Product: ${product.name}, Price: $${product.price}`;
}

const product: Product = { id: 101, name: "Laptop", price: 999 };
console.log(displayProduct(product));
```

---

### Example 3: Extending Interfaces
You can create a new interface that extends an existing one.

```typescript
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: number;
  department: string;
}

const employee: Employee = {
  name: "Alice",
  age: 30,
  employeeId: 12345,
  department: "IT",
};
```

---

### Example 4: Interfaces with Functions in React Props
In React, interfaces are commonly used to type props:

```tsx
import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void; // Function type
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

export default Button;
```

---

### Key Benefits of Interfaces in TypeScript
1. **Type Safety**: Prevents runtime errors by catching issues during development.
2. **Code Readability**: Makes the code self-documenting and easier to understand.
3. **Extensibility**: Interfaces can be extended to add new features without breaking existing code.