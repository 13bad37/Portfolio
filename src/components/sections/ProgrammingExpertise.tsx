import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../hooks/useAnimation';
import { Code2, Cpu, HardDrive, GitBranch, ExternalLink, Coffee, Zap, Database, Globe, FileText, Layers } from 'lucide-react';

interface CodeDemo {
  id: string;
  title: string;
  description: string;
  code: string;
  language: 'c' | 'javascript' | 'java' | 'csharp';
  output?: string;
}

interface LanguageInfo {
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  concepts: { icon: React.ReactNode; text: string }[];
  features: { title: string; description: string }[];
  demos: CodeDemo[];
}

const languageData: { [key: string]: LanguageInfo } = {
  c: {
    name: 'C',
    icon: <Cpu className="text-blue-400" size={20} />,
    color: 'blue',
    description: 'Deep understanding of low-level programming concepts including memory management, pointer arithmetic, and data structures. Experience with system programming and performance-critical applications.',
    concepts: [
      { icon: <HardDrive className="text-blue-400" size={16} />, text: 'Memory Management' },
      { icon: <GitBranch className="text-blue-400" size={16} />, text: 'Pointer Arithmetic' },
      { icon: <Code2 className="text-blue-400" size={16} />, text: 'Data Structures' },
      { icon: <Cpu className="text-blue-400" size={16} />, text: 'System Programming' },
    ],
    features: [
      { title: 'Performance', description: 'Direct memory access and minimal abstraction layers for optimal performance in system-level applications.' },
      { title: 'Control', description: 'Fine-grained control over hardware resources, memory management, and system interactions.' },
      { title: 'Portability', description: 'Cross-platform compatibility and ability to write code that runs on various architectures.' },
      { title: 'Foundation', description: 'Understanding of fundamental programming concepts that apply to higher-level languages.' },
    ],
    demos: [
      {
        id: 'memory-management',
        title: 'Memory Management',
        description: 'Demonstrating dynamic memory allocation and deallocation in C',
        language: 'c',
        code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    // Dynamic memory allocation
    int *ptr = (int *)malloc(5 * sizeof(int));
    
    if (ptr == NULL) {
        printf("Memory allocation failed\\n");
        return 1;
    }
    
    // Initialize array
    for (int i = 0; i < 5; i++) {
        ptr[i] = i * 10;
        printf("ptr[%d] = %d\\n", i, ptr[i]);
    }
    
    // Reallocate memory
    ptr = (int *)realloc(ptr, 10 * sizeof(int));
    
    // Free memory
    free(ptr);
    ptr = NULL;
    
    return 0;
}`,
        output: `ptr[0] = 0
ptr[1] = 10
ptr[2] = 20
ptr[3] = 30
ptr[4] = 40`
      },
      {
        id: 'pointers',
        title: 'Pointer Arithmetic',
        description: 'Understanding pointer arithmetic and memory addresses',
        language: 'c',
        code: `#include <stdio.h>

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int *ptr = arr;
    
    printf("Array elements using pointer arithmetic:\\n");
    for (int i = 0; i < 5; i++) {
        printf("*(ptr + %d) = %d\\n", i, *(ptr + i));
        printf("Address: %p\\n", (void *)(ptr + i));
    }
    
    // Pointer arithmetic
    printf("\\nPointer arithmetic:\\n");
    printf("ptr + 2 = %p\\n", (void *)(ptr + 2));
    printf("*(ptr + 2) = %d\\n", *(ptr + 2));
    
    return 0;
}`,
        output: `Array elements using pointer arithmetic:
*(ptr + 0) = 10
Address: 0x7fff5fbff8a0
*(ptr + 1) = 20
Address: 0x7fff5fbff8a4
*(ptr + 2) = 30
Address: 0x7fff5fbff8a8

Pointer arithmetic:
ptr + 2 = 0x7fff5fbff8a8
*(ptr + 2) = 30`
      }
    ]
  },
  javascript: {
    name: 'JavaScript',
    icon: <Zap className="text-yellow-400" size={20} />,
    color: 'yellow',
    description: 'Modern JavaScript development with ES6+, asynchronous programming, and frameworks. Experience with both frontend and backend JavaScript development including React, Node.js, and TypeScript.',
    concepts: [
      { icon: <Globe className="text-yellow-400" size={16} />, text: 'DOM Manipulation' },
      { icon: <Zap className="text-yellow-400" size={16} />, text: 'Async Programming' },
      { icon: <Code2 className="text-yellow-400" size={16} />, text: 'ES6+ Features' },
      { icon: <Database className="text-yellow-400" size={16} />, text: 'API Integration' },
    ],
    features: [
      { title: 'Versatility', description: 'Full-stack development capabilities from frontend interfaces to backend services and APIs.' },
      { title: 'Ecosystem', description: 'Rich ecosystem with frameworks like React, Vue, Node.js, and countless libraries.' },
      { title: 'Modern Syntax', description: 'ES6+ features including arrow functions, destructuring, modules, and async/await.' },
      { title: 'Performance', description: 'V8 engine optimizations and modern bundling tools for high-performance applications.' },
    ],
    demos: [
      {
        id: 'async-await',
        title: 'Async/Await Pattern',
        description: 'Modern asynchronous programming with async/await',
        language: 'javascript',
        code: `// Fetch data from multiple APIs
async function fetchUserData(userId) {
    try {
        const [user, posts, comments] = await Promise.all([
            fetch(\`/api/users/\${userId}\`),
            fetch(\`/api/users/\${userId}/posts\`),
            fetch(\`/api/users/\${userId}/comments\`)
        ]);
        
        const userData = await user.json();
        const userPosts = await posts.json();
        const userComments = await comments.json();
        
        return {
            ...userData,
            posts: userPosts,
            comments: userComments
        };
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

// Usage
fetchUserData(123)
    .then(data => console.log('User data:', data))
    .catch(err => console.error('Failed:', err));`,
        output: `User data: {
  id: 123,
  name: "John Doe",
  email: "john@example.com",
  posts: [...],
  comments: [...]
}`
      },
      {
        id: 'destructuring',
        title: 'Destructuring & Spread',
        description: 'ES6+ destructuring and spread operator examples',
        language: 'javascript',
        code: `// Object destructuring
const user = {
    name: 'Alice',
    age: 30,
    email: 'alice@example.com',
    address: { city: 'New York', country: 'USA' }
};

const { name, age, address: { city } } = user;
console.log(\`\${name}, \${age}, from \${city}\`);

// Array destructuring
const colors = ['red', 'green', 'blue', 'yellow'];
const [primary, secondary, ...others] = colors;

// Spread operator
const newUser = {
    ...user,
    age: 31,
    isActive: true
};

const allColors = [...colors, 'purple', 'orange'];

// Function parameter destructuring
function displayUser({ name, email, age = 'Unknown' }) {
    return \`\${name} (\${email}) - Age: \${age}\`;
}

console.log(displayUser(user));`,
        output: `Alice, 30, from New York
Alice (alice@example.com) - Age: 30`
      }
    ]
  },
  java: {
    name: 'Java',
    icon: <Coffee className="text-orange-400" size={20} />,
    color: 'orange',
    description: 'Object-oriented programming with Java, including enterprise applications, Spring framework, and design patterns. Experience with multithreading, collections, and robust application development.',
    concepts: [
      { icon: <Code2 className="text-orange-400" size={16} />, text: 'OOP Principles' },
      { icon: <Database className="text-orange-400" size={16} />, text: 'Collections Framework' },
      { icon: <Cpu className="text-orange-400" size={16} />, text: 'Multithreading' },
      { icon: <GitBranch className="text-orange-400" size={16} />, text: 'Design Patterns' },
    ],
    features: [
      { title: 'Platform Independence', description: 'Write once, run anywhere with JVM cross-platform compatibility.' },
      { title: 'Enterprise Ready', description: 'Robust frameworks like Spring Boot for enterprise-grade applications.' },
      { title: 'Performance', description: 'JIT compilation and garbage collection for optimized runtime performance.' },
      { title: 'Security', description: 'Built-in security features and comprehensive access control mechanisms.' },
    ],
    demos: [
      {
        id: 'generics-collections',
        title: 'Generics & Collections',
        description: 'Type-safe collections and generic programming',
        language: 'java',
        code: `import java.util.*;
import java.util.stream.Collectors;

public class CollectionsDemo {
    public static void main(String[] args) {
        // Generic List with Stream API
        List<String> names = Arrays.asList(
            "Alice", "Bob", "Charlie", "Diana"
        );
        
        List<String> longNames = names.stream()
            .filter(name -> name.length() > 4)
            .map(String::toUpperCase)
            .collect(Collectors.toList());
            
        System.out.println("Long names: " + longNames);
        
        // Generic Map
        Map<String, Integer> nameAges = new HashMap<>();
        nameAges.put("Alice", 25);
        nameAges.put("Bob", 30);
        nameAges.put("Charlie", 35);
        
        // Stream with Map
        nameAges.entrySet().stream()
            .filter(entry -> entry.getValue() > 28)
            .forEach(entry -> 
                System.out.println(entry.getKey() + " is " + entry.getValue())
            );
    }
}`,
        output: `Long names: [ALICE, CHARLIE]
Bob is 30
Charlie is 35`
      },
      {
        id: 'multithreading',
        title: 'Multithreading',
        description: 'Concurrent programming with threads and synchronization',
        language: 'java',
        code: `import java.util.concurrent.*;

public class ThreadDemo {
    private static final Object lock = new Object();
    private static int counter = 0;
    
    public static void main(String[] args) throws InterruptedException {
        ExecutorService executor = Executors.newFixedThreadPool(3);
        
        // Submit multiple tasks
        for (int i = 0; i < 5; i++) {
            final int taskId = i;
            executor.submit(() -> {
                processTask(taskId);
            });
        }
        
        executor.shutdown();
        executor.awaitTermination(1, TimeUnit.MINUTES);
        
        System.out.println("Final counter value: " + counter);
    }
    
    private static void processTask(int taskId) {
        synchronized(lock) {
            System.out.println("Task " + taskId + " starting");
            counter++;
            try {
                Thread.sleep(100); // Simulate work
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            System.out.println("Task " + taskId + " completed");
        }
    }
}`,
        output: `Task 0 starting
Task 0 completed
Task 1 starting
Task 1 completed
Task 2 starting
Task 2 completed
Final counter value: 5`
      }
    ]
  },
  csharp: {
    name: 'C#',
    icon: <Code2 className="text-purple-400" size={20} />,
    color: 'purple',
    description: 'Modern C# development with .NET ecosystem, including web APIs, desktop applications, and cloud services. Experience with LINQ, Entity Framework, and asynchronous programming patterns.',
    concepts: [
      { icon: <Database className="text-purple-400" size={16} />, text: 'Entity Framework' },
      { icon: <Globe className="text-purple-400" size={16} />, text: 'ASP.NET Core' },
      { icon: <Zap className="text-purple-400" size={16} />, text: 'LINQ Queries' },
      { icon: <Code2 className="text-purple-400" size={16} />, text: 'Async Patterns' },
    ],
    features: [
      { title: 'Type Safety', description: 'Strong typing system with compile-time error checking and IntelliSense support.' },
      { title: '.NET Ecosystem', description: 'Rich framework ecosystem including ASP.NET, Entity Framework, and NuGet packages.' },
      { title: 'Cross-Platform', description: '.NET Core enables development for Windows, macOS, and Linux platforms.' },
      { title: 'Performance', description: 'Compiled language with garbage collection and runtime optimizations.' },
    ],
    demos: [
      {
        id: 'linq-async',
        title: 'LINQ & Async/Await',
        description: 'Data querying with LINQ and asynchronous operations',
        language: 'csharp',
        code: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public string Category { get; set; }
}

public class ProductService
{
    private List<Product> products = new List<Product>
    {
        new Product { Id = 1, Name = "Laptop", Price = 999.99m, Category = "Electronics" },
        new Product { Id = 2, Name = "Mouse", Price = 29.99m, Category = "Electronics" },
        new Product { Id = 3, Name = "Book", Price = 15.99m, Category = "Education" }
    };
    
    public async Task<IEnumerable<Product>> GetExpensiveProductsAsync()
    {
        // Simulate async database call
        await Task.Delay(100);
        
        return products
            .Where(p => p.Price > 50)
            .OrderByDescending(p => p.Price)
            .Select(p => new Product 
            { 
                Id = p.Id, 
                Name = p.Name.ToUpper(), 
                Price = p.Price,
                Category = p.Category 
            });
    }
    
    public decimal GetAveragePrice(string category = null)
    {
        var query = products.AsQueryable();
        
        if (!string.IsNullOrEmpty(category))
            query = query.Where(p => p.Category == category);
            
        return query.Average(p => p.Price);
    }
}`,
        output: `Expensive Products:
LAPTOP - $999.99 (Electronics)

Average Electronics Price: $514.99`
      }
    ]
  },
  typescript: {
    name: 'TypeScript',
    icon: <FileText className="text-blue-500" size={20} />,
    color: 'blue',
    description: 'Advanced TypeScript development with strong typing, interfaces, and modern JavaScript features. Experience with React TypeScript projects, type definitions, and compile-time error prevention.',
    concepts: [
      { icon: <Code2 className="text-blue-500" size={16} />, text: 'Static Typing' },
      { icon: <Layers className="text-blue-500" size={16} />, text: 'Interfaces & Types' },
      { icon: <GitBranch className="text-blue-500" size={16} />, text: 'Generics' },
      { icon: <Database className="text-blue-500" size={16} />, text: 'Type Guards' },
    ],
    features: [
      { title: 'Type Safety', description: 'Catch errors at compile time with strong static typing and IDE support.' },
      { title: 'Developer Experience', description: 'Enhanced autocomplete, refactoring, and navigation in modern IDEs.' },
      { title: 'Scalability', description: 'Better code organization and maintainability for large-scale applications.' },
      { title: 'Modern Features', description: 'Latest JavaScript features with backward compatibility and polyfills.' },
    ],
    demos: [
      {
        id: 'interfaces-generics',
        title: 'Interfaces & Generics',
        description: 'Type-safe interfaces and generic programming',
        language: 'javascript',
        code: `// Generic interface for API responses
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
}

// User interface
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

// Generic service class
class ApiService<T> {
  private baseUrl: string;
  
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  
  async get(endpoint: string): Promise<ApiResponse<T[]>> {
    const response = await fetch(\`\${this.baseUrl}\${endpoint}\`);
    return response.json();
  }
  
  async getById(endpoint: string, id: number): Promise<ApiResponse<T>> {
    const response = await fetch(\`\${this.baseUrl}\${endpoint}/\${id}\`);
    return response.json();
  }
}

// Usage with type safety
const userService = new ApiService<User>('/api');

// TypeScript ensures type safety
userService.getById('/users', 123).then((response) => {
  // response.data is strongly typed as User
  console.log(\`User: \${response.data.name} (\${response.data.email})\`);
});`,
        output: `User: John Doe (john.doe@example.com)`
      },
      {
        id: 'advanced-types',
        title: 'Advanced Type Patterns',
        description: 'Union types, mapped types, and conditional types',
        language: 'javascript',
        code: `// Union types and type guards
type Status = 'loading' | 'success' | 'error';
type Theme = 'light' | 'dark' | 'auto';

interface BaseState {
  theme: Theme;
}

interface LoadingState extends BaseState {
  status: 'loading';
}

interface SuccessState extends BaseState {
  status: 'success';
  data: any[];
}

interface ErrorState extends BaseState {
  status: 'error';
  error: string;
}

type AppState = LoadingState | SuccessState | ErrorState;

// Type guard functions
function isSuccessState(state: AppState): state is SuccessState {
  return state.status === 'success';
}

function isErrorState(state: AppState): state is ErrorState {
  return state.status === 'error';
}

// Mapped types
type Optional<T> = {
  [K in keyof T]?: T[K];
};

type UserUpdate = Optional<User>;

// Usage with type safety
function handleStateChange(state: AppState) {
  if (isSuccessState(state)) {
    // TypeScript knows state.data exists
    console.log(\`Loaded \${state.data.length} items\`);
  } else if (isErrorState(state)) {
    // TypeScript knows state.error exists
    console.error(\`Error: \${state.error}\`);
  }
}`,
        output: `Loaded 25 items`
      }
    ]
  },
  python: {
    name: 'Python',
    icon: <Layers className="text-green-400" size={20} />,
    color: 'green',
    description: 'Python development for automation, data processing, and backend services. Experience with modern Python features, libraries like Flask/Django, and data manipulation tools.',
    concepts: [
      { icon: <Database className="text-green-400" size={16} />, text: 'Data Processing' },
      { icon: <Globe className="text-green-400" size={16} />, text: 'Web Frameworks' },
      { icon: <Code2 className="text-green-400" size={16} />, text: 'OOP & Functional' },
      { icon: <Zap className="text-green-400" size={16} />, text: 'Automation' },
    ],
    features: [
      { title: 'Readability', description: 'Clean, readable syntax that emphasizes code clarity and developer productivity.' },
      { title: 'Versatility', description: 'Suitable for web development, data science, automation, and system administration.' },
      { title: 'Rich Ecosystem', description: 'Extensive library ecosystem with pip package manager and virtual environments.' },
      { title: 'Rapid Development', description: 'Fast prototyping and development with dynamic typing and interactive REPL.' },
    ],
    demos: [
      {
        id: 'data-processing',
        title: 'Data Processing',
        description: 'List comprehensions and data manipulation',
        language: 'javascript',
        code: `# Data processing with list comprehensions and generators
import json
from datetime import datetime, timedelta

# Sample data
sales_data = [
    {"product": "Laptop", "price": 999.99, "quantity": 2, "date": "2024-01-15"},
    {"product": "Mouse", "price": 29.99, "quantity": 5, "date": "2024-01-16"},
    {"product": "Keyboard", "price": 79.99, "quantity": 3, "date": "2024-01-17"},
    {"product": "Monitor", "price": 299.99, "quantity": 1, "date": "2024-01-18"}
]

class SalesAnalyzer:
    def __init__(self, data):
        self.data = data
    
    def total_revenue(self):
        return sum(item["price"] * item["quantity"] for item in self.data)
    
    def top_products(self, n=3):
        # Sort by revenue (price * quantity)
        sorted_products = sorted(
            self.data, 
            key=lambda x: x["price"] * x["quantity"], 
            reverse=True
        )
        return sorted_products[:n]
    
    def daily_summary(self):
        # Group by date and calculate daily totals
        daily_totals = {}
        for item in self.data:
            date = item["date"]
            revenue = item["price"] * item["quantity"]
            daily_totals[date] = daily_totals.get(date, 0) + revenue
        return daily_totals

# Usage
analyzer = SalesAnalyzer(sales_data)
print(f"Total Revenue: $" + "{analyzer.total_revenue():.2f}")

top_products = analyzer.top_products(2)
for product in top_products:
    revenue = product["price"] * product["quantity"]
    print(f"{product['product']}: $" + "{revenue:.2f}")`,
        output: `Total Revenue: $2428.90
Laptop: $1999.98
Monitor: $299.99`
      },
      {
        id: 'decorators-context',
        title: 'Decorators & Context Managers',
        description: 'Advanced Python patterns with decorators and context managers',
        language: 'javascript',
        code: `import time
import functools
from contextlib import contextmanager

# Timing decorator
def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.4f} seconds")
        return result
    return wrapper

# Retry decorator
def retry(max_attempts=3, delay=1):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1:
                        raise e
                    print(f"Attempt {attempt + 1} failed, retrying...")
                    time.sleep(delay)
        return wrapper
    return decorator

# Context manager for database transactions
@contextmanager
def database_transaction():
    print("Starting transaction...")
    try:
        yield "db_connection"
        print("Committing transaction...")
    except Exception as e:
        print(f"Rolling back transaction: {e}")
        raise
    finally:
        print("Closing connection...")

# Usage examples
@timer
@retry(max_attempts=2)
def process_data(data):
    # Simulate processing
    time.sleep(0.1)
    return [x * 2 for x in data if x > 0]

# Using context manager
with database_transaction() as db:
    result = process_data([1, -2, 3, 4])
    print(f"Processed data: {result}")`,
        output: `Starting transaction...
process_data took 0.1024 seconds
Processed data: [2, 6, 8]
Committing transaction...
Closing connection...`
      }
    ]
  }
};

const ProgrammingExpertise: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('c');
  const [selectedDemo, setSelectedDemo] = useState<CodeDemo>(languageData.c.demos[0]);
  const [isCopied, setIsCopied] = useState(false);

  const { ref: titleRef, controls: titleAnim } = fadeIn('up');
  const { ref: contentRef, controls: contentAnim } = fadeIn('up', 0.2);

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setSelectedDemo(languageData[language].demos[0]);
  };

  const currentLanguage = languageData[selectedLanguage];

  return (
    <section id="programming-expertise" className="py-12 sm:py-16 lg:py-20 relative content-auto">
      <div className="absolute inset-0 bg-dark-600 opacity-50" />
      <div className="container-responsive relative z-10">
        <motion.div ref={titleRef as React.RefObject<HTMLDivElement>} animate={titleAnim} className="flex flex-col items-center mb-12 text-center">
          <span className="text-primary-500 font-mono text-sm uppercase tracking-wider mb-2">Programming Expertise</span>
          <h2 className="heading-responsive font-bold mb-4 heading-enhanced">Programming Languages</h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-6" />
          <p className="max-w-3xl text-gray-300 text-responsive">
            Proficiency in multiple programming languages with deep understanding of their ecosystems, 
            best practices, and real-world application development.
          </p>
        </motion.div>

        {/* Language Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(languageData).map(([key, lang]) => (
            <motion.button
              key={key}
              onClick={() => handleLanguageChange(key)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                selectedLanguage === key
                  ? 'bg-primary-500/20 border border-primary-500/50 text-primary-400'
                  : 'bg-dark-700 hover:bg-dark-600 text-gray-300 hover:text-white border border-dark-500'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {lang.icon}
              <span>{lang.name}</span>
            </motion.button>
          ))}
        </div>

        <motion.div ref={contentRef as React.RefObject<HTMLDivElement>} animate={contentAnim} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Demo Selection */}
          <div className="lg:col-span-1">
            <div className="bg-dark-700 rounded-xl border border-dark-500 p-6 mb-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                {currentLanguage.icon}
                Code Demonstrations
              </h3>
              <div className="space-y-3">
                {currentLanguage.demos.map((demo) => (
                  <motion.button
                    key={demo.id}
                    onClick={() => setSelectedDemo(demo)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                      selectedDemo.id === demo.id
                        ? 'bg-primary-500/20 border border-primary-500/50 text-primary-400'
                        : 'bg-dark-600 hover:bg-dark-500 text-gray-300 hover:text-white border border-transparent'
                    }`}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h4 className="font-semibold mb-1">{demo.title}</h4>
                    <p className="text-sm text-gray-400">{demo.description}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Core Concepts */}
            <div className="bg-dark-700 rounded-xl border border-dark-500 p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Cpu className="text-primary-400" size={20} />
                Core Concepts
              </h3>
              <div className="space-y-3">
                {currentLanguage.concepts.map((concept, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {concept.icon}
                    <span className="text-gray-300">{concept.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Code Display */}
          <div className="lg:col-span-2">
            <div className="bg-dark-700 rounded-xl border border-dark-500 overflow-hidden mb-6">
              <div className="bg-dark-800 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-sm font-mono text-gray-400">
                    {selectedDemo.title.toLowerCase().replace(' ', '_')}.{selectedDemo.language === 'csharp' ? 'cs' : selectedDemo.language === 'javascript' ? 'js' : selectedDemo.language}
                  </span>
                </div>
                <motion.button
                  onClick={() => copyCode(selectedDemo.code)}
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Copy code"
                >
                  {isCopied ? (
                    <span className="text-green-500 text-sm">Copied!</span>
                  ) : (
                    <ExternalLink size={16} />
                  )}
                </motion.button>
              </div>
              
              <div className="p-6">
                <pre className="text-gray-200 text-sm sm:text-base whitespace-pre-wrap leading-relaxed font-mono overflow-x-auto">
                  <code>{selectedDemo.code}</code>
                </pre>
                
                {selectedDemo.output && (
                  <div className="mt-6 p-4 bg-dark-800 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Output:</h4>
                    <pre className="text-green-400 text-sm whitespace-pre-wrap font-mono">
                      {selectedDemo.output}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            {/* Language Features */}
            <div className="bg-dark-700 rounded-xl border border-dark-500 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Why {currentLanguage.name}?</h3>
              <p className="text-gray-300 mb-6">{currentLanguage.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                {currentLanguage.features.map((feature, index) => (
                  <div key={index}>
                    <h4 className="font-semibold text-primary-400 mb-2">{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProgrammingExpertise;
