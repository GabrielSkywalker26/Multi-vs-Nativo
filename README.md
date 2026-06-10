APPCOMPARATIVA

Comparativa técnica entre Jetpack Compose y React Native enfocada en rendimiento de procesamiento.

Estructura
- /compose: App nativa Android (Jetpack Compose).
- /react-native: App multiplataforma (React Native 0.72+).
- /snippets/benchmark-sort: Logica de ordenamiento para comparar Kotlin JVM vs TypeScript.

Benchmark de Ordenamiento
Este test procesa 50,000 productos calculando prioridad y ordenamiento descendente.

Ejecucion con Docker
1. Construir imagen: docker build -t app-comparativa-benchmark ./snippets/benchmark-sort
2. Ejecutar test: docker run --rm app-comparativa-benchmark

Ejecucion Local
cd snippets/benchmark-sort
chmod +x run.sh
./run.sh

Ejecucion de Apps

Jetpack Compose
1. Abrir carpeta /compose en Android Studio.
2. Sincronizar Gradle y ejecutar.

React Native
1. cd react-native
2. npm install
3. npm start
4. npm run android (en otra terminal)
