import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../hooks/useAnimation';
import { Code2, Cpu, HardDrive, GitBranch, ExternalLink } from 'lucide-react';

interface CodeDemo {
  id: string;
  title: string;
  description: string;
  code: string;
  language: 'c';
  output?: string;
}

const cDemos: CodeDemo[] = [
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
  },
  {
    id: 'data-structures',
    title: 'Linked List Implementation',
    description: 'Creating and manipulating a linked list data structure',
    language: 'c',
    code: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node* next;
} Node;

Node* createNode(int data) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->data = data;
    newNode->next = NULL;
    return newNode;
}

void insertAtEnd(Node** head, int data) {
    Node* newNode = createNode(data);
    
    if (*head == NULL) {
        *head = newNode;
        return;
    }
    
    Node* current = *head;
    while (current->next != NULL) {
        current = current->next;
    }
    current->next = newNode;
}

void printList(Node* head) {
    Node* current = head;
    while (current != NULL) {
        printf("%d -> ", current->data);
        current = current->next;
    }
    printf("NULL\\n");
}

int main() {
    Node* head = NULL;
    
    insertAtEnd(&head, 10);
    insertAtEnd(&head, 20);
    insertAtEnd(&head, 30);
    
    printf("Linked List: ");
    printList(head);
    
    return 0;
}`,
    output: `Linked List: 10 -> 20 -> 30 -> NULL`
  }
];

const CProgramming: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState<CodeDemo>(cDemos[0]);
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

  return (
    <section id="c-programming" className="py-20 relative">
      <div className="absolute inset-0 bg-dark-600 opacity-50" />
      <div className="container-responsive relative z-10">
        <motion.div ref={titleRef as React.RefObject<HTMLDivElement>} animate={titleAnim} className="flex flex-col items-center mb-16 text-center">
          <span className="text-primary-500 font-mono text-sm uppercase tracking-wider mb-2">Programming Expertise</span>
          <h2 className="heading-responsive font-bold mb-4">C Programming Language</h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-6" />
          <p className="max-w-3xl text-gray-300 text-responsive">
            Deep understanding of low-level programming concepts including memory management, 
            pointer arithmetic, and data structures. Experience with system programming and 
            performance-critical applications.
          </p>
        </motion.div>

        <motion.div ref={contentRef as React.RefObject<HTMLDivElement>} animate={contentAnim} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Demo Selection */}
          <div className="lg:col-span-1">
            <div className="bg-dark-700 rounded-xl border border-dark-500 p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Code2 className="text-primary-500" size={20} />
                Code Demonstrations
              </h3>
              <div className="space-y-3">
                {cDemos.map((demo) => (
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

            {/* Skills Overview */}
            <div className="bg-dark-700 rounded-xl border border-dark-500 p-6 mt-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Cpu className="text-primary-500" size={20} />
                Core Concepts
              </h3>
              <div className="space-y-3">
                                 <div className="flex items-center gap-3">
                   <HardDrive className="text-primary-400" size={16} />
                   <span className="text-gray-300">Memory Management</span>
                 </div>
                <div className="flex items-center gap-3">
                  <GitBranch className="text-primary-400" size={16} />
                  <span className="text-gray-300">Pointer Arithmetic</span>
                </div>
                <div className="flex items-center gap-3">
                  <Code2 className="text-primary-400" size={16} />
                  <span className="text-gray-300">Data Structures</span>
                </div>
                <div className="flex items-center gap-3">
                  <Cpu className="text-primary-400" size={16} />
                  <span className="text-gray-300">System Programming</span>
                </div>
              </div>
            </div>
          </div>

          {/* Code Display */}
          <div className="lg:col-span-2">
            <div className="bg-dark-700 rounded-xl border border-dark-500 overflow-hidden">
              <div className="bg-dark-800 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-sm font-mono text-gray-400">
                    {selectedDemo.title.toLowerCase().replace(' ', '_')}.c
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

            {/* Additional Information */}
            <div className="mt-6 bg-dark-700 rounded-xl border border-dark-500 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Why C Programming?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                <div>
                  <h4 className="font-semibold text-primary-400 mb-2">Performance</h4>
                  <p>Direct memory access and minimal abstraction layers for optimal performance in system-level applications.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-400 mb-2">Control</h4>
                  <p>Fine-grained control over hardware resources, memory management, and system interactions.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-400 mb-2">Portability</h4>
                  <p>Cross-platform compatibility and ability to write code that runs on various architectures.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-400 mb-2">Foundation</h4>
                  <p>Understanding of fundamental programming concepts that apply to higher-level languages.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CProgramming;
