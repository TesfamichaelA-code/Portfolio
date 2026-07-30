---
title: Building EPIC++, a language that compiles to LLVM IR
date: '2026-01-15'
tags:
  - compilers
  - llvm
  - python
summary: What actually happens between a .epp source file and machine code — two-pass compilation, lvalues vs rvalues, and the day the structs finally worked.
readingTime: 9 min
related: epic-pp
---

Every engineer has one project that rewires how they see the whole stack. Mine is EPIC++ — a statically-typed programming language I designed and built a compiler for during my advanced programming languages course at EPIC Institute of Technology. Python for the driver, ANTLR4 for the grammar, llvmlite to emit LLVM IR.

Before this project, a compiler was a black box that occasionally insulted my code. After it, every error message from gcc or rustc reads like a note from a colleague — I know roughly which pass wrote it, and what data structure it was staring at when it did.

## The shape of the machine

EPIC++ supports integers, floats, booleans, pointers, arrays, strings, and user-defined structs. The pipeline is classical, and that's the point — I wanted to build the textbook, not fight it:

```text
source (.epp)
  → ANTLR4 lexer      → tokens
  → ANTLR4 parser     → parse tree
  → visitor           → typed AST
  → pass 1: declare   → symbol table (types, functions, structs)
  → pass 2: define    → LLVM IR via llvmlite
  → llc / JIT         → machine code
```

ANTLR4 earns its keep in the first two stages. You write a grammar, it generates a lexer and parser, and you get a visitor base class to walk the tree. The grammar file is the closest thing the project has to a specification:

```text
structDecl : 'struct' ID '{' fieldDecl* '}' ;
fieldDecl  : ID ':' type ';' ;

type : 'i64' | 'f64' | 'bool' | 'string'
     | '*' type          // pointer
     | type '[' INT ']'  // array
     | ID                // struct by name
     ;
```

## Why two passes

The first hard lesson: a single pass over the AST cannot compile a program where things reference each other before they're "defined". This is legal EPIC++:

```text
fn is_even(n: i64) -> bool {
    if n == 0 { return true; }
    return is_odd(n - 1);      // is_odd doesn't exist yet…
}

fn is_odd(n: i64) -> bool {
    if n == 0 { return false; }
    return is_even(n - 1);
}
```

Mutually recursive functions, structs that contain pointers to themselves, functions used above their definition — all of it breaks a naive single-pass compiler the moment it meets a name it hasn't seen.

So the compiler makes two passes. Pass one walks the whole AST and only *declares*: every function gets its signature registered, every struct gets its layout computed, nothing gets a body. Pass two walks again and *defines*, and by then every name in the program resolves. It's maybe forty lines of orchestration code, and it's the difference between a toy and a language.

## Lvalues, rvalues, and the bug that taught me

The subtlest part of codegen wasn't types — it was deciding, at every expression, whether I needed a *location* or a *value*. Consider:

```text
x = x + 1;
```

The x on the right means "load the value stored at x". The x on the left means "the address of x, so I can store into it". Same token, two different compilations. Get it wrong one way and you assign into a temporary that evaporates; get it wrong the other way and you add 1 to a pointer.

In llvmlite this becomes a discipline: every visit method declares whether it returns an address (an alloca, a GEP into a struct) or a loaded value. Assignment visits its left side in "address mode" and its right side in "value mode":

```python
def visit_assign(self, node):
    target = self.visit_lvalue(node.target)   # pointer: where to store
    value = self.visit_rvalue(node.value)     # value: what to store
    self.builder.store(value, target)
```

The day struct field assignment worked — `person.age = 21;` lowering to a `getelementptr` and a `store` — was the day the whole language stopped feeling like an exercise:

```llvm
%field = getelementptr %struct.Person, %struct.Person* %person, i32 0, i32 1
store i64 21, i64* %field
```

## Scopes as a stack

Variable scoping fell out of one data structure: a stack of dictionaries. Enter a block, push a scope. Declare a variable, write it into the top scope. Resolve a name, walk the stack downward. Leave the block, pop — and every inner variable is unreachable, exactly as the language rules demand. Shadowing isn't a special case; it's just the lookup order doing its job.

## What llvmlite bought me

Emitting LLVM IR instead of assembly meant inheriting thirty years of other people's optimization work. My compiler emits honest, unoptimized IR — every variable an alloca, every access a load/store — and the optimizer's `-O2` turns it into something embarrassingly better than anything I would have scheduled by hand. The `mem2reg` pass alone promotes my stack traffic into SSA registers.

That division of labor is the real lesson of the backend: the frontend's job is to be *correct and typed*, and to hand the optimizer IR it can reason about. Cleverness in codegen is mostly a way to hide bugs.

## What it rewired

- **Error messages are a UX surface.** Once I had to write "expected i64, found *i64" myself, I understood why good compilers spend thousands of lines on diagnostics.
- **Type checking is the cheapest test suite you'll ever run.** Whole categories of bugs died at compile time in programs written in my language — which made me trust static types more in every language I use.
- **Nothing about compilers is magic.** Long, yes. Detailed, yes. But every stage is just a data structure and a walk.

EPIC++ remains my proudest build. Not because the language matters — nobody will ship production code in it — but because now, when I look at any system between me and the metal, I can see the passes.
