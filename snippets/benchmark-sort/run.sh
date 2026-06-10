#!/bin/bash

echo "=== Benchmarking Sorting Logic (Kotlin vs TypeScript) ==="
echo ""

# Run TypeScript
if command -v ts-node >/dev/null 2>&1; then
    ts-node SortBenchmark.ts
else
    # Fallback to tsc + node
    tsc SortBenchmark.ts --target es6 --module commonjs > /dev/null
    node SortBenchmark.js
fi

echo ""

# Run Kotlin
if [ -f "SortBenchmark.kt" ]; then
    kotlinc SortBenchmark.kt -include-runtime -d SortBenchmark.jar
    java -jar SortBenchmark.jar
fi

echo ""
echo "Note: This measures pure language execution time, excluding UI rendering."
