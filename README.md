# APPCOMPARATIVA

Comparativa técnica entre Jetpack Compose y React Native enfocada en rendimiento de procesamiento.

## Estructura
- /compose: App nativa Android (Jetpack Compose).
- /react-native: App multiplataforma (React Native 0.72+).
- /snippets/benchmark-sort: Lógica de ordenamiento para comparar Kotlin JVM vs TypeScript.

---

## Benchmark de Ordenamiento
Este test procesa 50,000 productos calculando prioridad y ordenamiento descendente.

### Ejecución con Docker (Recomendado)

1. Construir imagen:
docker build -t app-comparativa-benchmark ./snippets/benchmark-sort

2. Ejecutar test:
docker run --rm app-comparativa-benchmark

### Ejecución Local
Requiere tener instalados node y kotlin.

1. Entrar a la carpeta:
cd snippets/benchmark-sort

2. Dar permisos de ejecución:
chmod +x run.sh

3. Ejecutar:
./run.sh

---

## Ejecución de Apps

### Jetpack Compose

1. Abrir la carpeta raíz Multi-vs-Nativo en Android Studio.
2. El módulo principal es :compose-app (ubicado en compose/app).
3. Sincronizar Gradle y ejecutar en un emulador o dispositivo.

### React Native

1. Entrar a la carpeta:
cd react-native

2. Instalar dependencias:
npm install

3. Iniciar Metro Bundler:
npm start

4. Ejecutar en Android (en otra terminal):
cd react-native
npm run android

---

### Notas de Rendimiento
- El benchmark de Kotlin utiliza la JVM.
- El benchmark de TypeScript utiliza Node.js (V8).
- Las aplicaciones móviles implementan esta misma lógica sobre sus respectivos motores (ART/Dalvik vs Hermes).
