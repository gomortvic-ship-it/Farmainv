# Farmainv

App para contar inventario y controlar caducidades (BPPC / PPC) de medicamentos.
Funciona en el celular como app, sin internet, y sincroniza entre 2 dispositivos cuando hay conexión.

## Archivos (súbelos TODOS a GitHub)
index.html, data.json, sw.js, manifest.json, config.js, icon-192.png, icon-512.png, README.md

## Paso 1. Publicar en GitHub
1. Entra a github.com e inicia sesión (o crea cuenta).
2. Toca **+ → New repository**. Nombre: `farmainv`. Déjalo **Public**. Crear.
3. Toca **Add file → Upload files**, sube los 8 archivos y toca **Commit changes**.
4. Ve a **Settings → Pages**. En *Branch* elige `main` y carpeta `/ (root)`. Guarda.
5. En 1–2 minutos tu app estará en: `https://TU-USUARIO.github.io/farmainv/`

## Paso 2. Activar la sincronización entre 2 celulares (Firebase, gratis)
1. Entra a console.firebase.google.com → **Crear proyecto** (sin Analytics).
2. **Compilación → Authentication → Comenzar → Anónimo → Habilitar → Guardar.**
3. **Compilación → Firestore Database → Crear base de datos** (modo producción, cualquier ubicación).
4. En Firestore, pestaña **Reglas**, borra todo y pega esto, luego **Publicar**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tiendas/{store}/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```
5. **Configuración del proyecto (engrane) → Tus apps → Web (</>)** → registra la app y copia los 4 datos: `apiKey`, `authDomain`, `projectId`, `appId`.
6. En GitHub abre `config.js` (ícono del lápiz), pega esos datos y cambia `storeId` por un nombre único y difícil de adivinar. Guarda con **Commit changes**.
7. Espera 1–2 minutos y vuelve a abrir la app.

Los dos celulares deben usar el mismo `config.js` (es el mismo link, así que ya queda igual).

## Paso 3. Instalar en el celular
Abre el link en Chrome → menú ⋮ → **Instalar app** (o *Agregar a pantalla principal*).
**La primera vez abre la app con internet** para que guarde todo; después funciona sin conexión y se sincroniza sola al volver la señal.

## Paso 4. Tus productos
La lista de 1,802 productos (código, sal, descripción, precio público y descuento) viene en `data.json`; ya no hay que importar nada.
**Exist.** es lo que tú cuentas o encuentras en el anaquel; empieza vacío y lo escribes con el teclado de la app.
Para actualizar precios o agregar productos, pásale tu Excel nuevo a Claude para generar otro `data.json` y reemplázalo en GitHub: los conteos y caducidades guardados no se pierden.

## Cómo se usa
- **Inventario:** toca un producto, escribe la cantidad con el teclado de números. ▲ ▼ cambian de producto. ▦ escanea un código y salta al producto. 📅 agrega caducidad. ≈ muestra productos con la misma sal.
- **Caducidades:** escanea, elige mes y año, guarda. BPPC = mes actual o anteriores. PPC = meses siguientes. Colores: rojo vencido, naranja este mes, amarillo próximos 3 meses, verde con tiempo.
- **Cierres:** "Finalizar conteo" guarda el resultado con fecha y quién lo hizo; se puede bajar a Excel.
- **Exportar:** en Datos (Excel) bajas el inventario con las mismas columnas de tu Excel (Código, Sal, Descripción, Público, Descuento, Exist.).

## Notas
- Si cambias archivos en GitHub y no ves los cambios, cierra y vuelve a abrir la app 2 veces.
- Para cambiar el nombre de la app edita `manifest.json` y el `<title>` de `index.html`.
