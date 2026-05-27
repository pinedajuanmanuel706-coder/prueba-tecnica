# Issue Tracker

## Descripción del proyecto

Aplicación SPA para gestionar incidencias de software. Permite iniciar sesión con un rol, listar incidencias desde un mock API, crear nuevas incidencias, editar su estado/prioridad y eliminar con confirmación.

## Tecnologías utilizadas

- React.js con Vite
- React Router Dom
- Hooks de React (`useState`, `useEffect`)
- SweetAlert2
- Tailwind CSS
- LocalStorage para sesión simulada
- JSON Server para mock API

## Instalación

1. Instala dependencias:

```bash
npm install
```

2. Ejecuta el servidor mock API:

```bash
npm run api
```

3. En otra terminal, ejecuta la aplicación:

```bash
npm run dev
```

4. Abre el navegador en la dirección que indique Vite (normalmente `http://localhost:5173`).

## Uso

- Ingresa un nombre y selecciona un rol en la pantalla de login.
- Desde el panel principal puedes crear, editar y eliminar incidencias.
- El botón de cerrar sesión limpia el LocalStorage y regresa al login.

## Despliegue

Para desplegar en producción, genera la build con:

```bash
npm run build
```

> Nota: el mock API local utiliza `json-server` en `db.json`. Para un despliegue real se debe configurar un endpoint externo compatible con la API.
