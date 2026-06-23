#!/bin/bash

echo "=== Benchmarking Sorting Logic (Kotlin vs TypeScript) ==="
echo ""

# Run TypeScript
echo "--- Running TypeScript (Node.js) ---"
if command -v npx >/dev/null 2>&1; then
    # Usamos --compiler-options para ignorar el error de deprecación de moduleResolution
    # y forzamos CommonJS para evitar conflictos con NodeNext en este script simple.
    npx -y ts-node --transpile-only --compiler-options '{"module": "commonjs", "moduleResolution": "node", "ignoreDeprecations": "6.0"}' SortBenchmark.ts
else
    echo "Error: 'npx' no encontrado. Por favor instala Node.js."
fi

echo ""

# Run Kotlin
echo "--- Running Kotlin (JVM) ---"
if command -v kotlinc >/dev/null 2>&1; then
    kotlinc SortBenchmark.kt -include-runtime -d SortBenchmark.jar
    java -jar SortBenchmark.jar
    rm SortBenchmark.jar
else
    echo "Error: 'kotlinc' no encontrado en el PATH."
fi

echo ""
echo "Note: This measures pure language execution time, excluding UI rendering."
