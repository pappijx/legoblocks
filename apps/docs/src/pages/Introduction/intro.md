# 🧩 headless-lego

**headless-lego** is a modular React component library designed to provide developers with a comprehensive collection of reusable, **headless UI components**.  
The library follows a **"headless" architecture pattern**, meaning it delivers core functionality and state management logic **without enforcing any specific styling or visual presentation**.

---

## 🚀 Key Characteristics

### ⚙️ Modular Design

- Built as a collection of **independent, composable components**.
- Each component can be used **individually or combined** to form complex UIs.

### 🧠 Headless Architecture

- Provides **functionality and behavior only** — no built-in styles.
- Developers have **complete control over the visual design**, allowing seamless integration with any design system or CSS framework.

### 📝 TypeScript Support

- Fully written in **TypeScript** for a robust developer experience.
- Supports **customizable generic types**, ensuring flexibility and type safety.

### 🔧 Extensible Framework

- Designed to **grow over time** with additional components.
- Acts as a **flexible foundation** for building scalable, maintainable UI systems.

---

## 💡 Philosophy

**headless-lego** empowers developers to build **custom user interfaces** by leveraging **battle-tested component logic** while maintaining **full creative control** over visual styling and implementation.

---

## 🧱 Example Use Case

```tsx
import { useDropdown } from 'headless-lego';

function CustomDropdown() {
  const { isOpen, toggle, options, selectOption } = useDropdown({
    options: ['Option 1', 'Option 2', 'Option 3'],
  });

  return (
    <div>
      <button onClick={toggle}>Toggle Dropdown</button>
      {isOpen && (
        <ul>
          {options.map((opt) => (
            <li key={opt} onClick={() => selectOption(opt)}>
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```
