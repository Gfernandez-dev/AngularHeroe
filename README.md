# AppHeroes

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.2.


- **Servicios**:
  - Registrar un nuevo superhéroe.
  - Consultar todos los superhéroes.
  - Consultar un único superhéroe por id.
  - Consultar todos los superhéroes que contienen, en su nombre, el valor de un parámetro enviado en la petición. Por ejemplo, si enviamos “man” devolverá “Spiderman”, “Superman”, “Manolito el fuerte”, etc.
  - Modificar un superhéroe.
  - Eliminar un superhéroe.
  - Test unitario de este servicio (opcional).



## Funcionalidades y Tecnologías Usadas:

Este proyecto se ha desarrollado utilizando Angular v18, aprovechando las últimas funcionalidades disponibles en esta versión. Entre ellas se incluyen el uso de **signals** y **RxJS** para la programación reactiva, así como el empleo de componentes standalone. Estas tecnologías permiten una mejor gestión del estado de la aplicación y una comunicación eficiente entre componentes, logrando un código más limpio y mantenible.

Se destaca el uso de **Angular Material** para el diseño de la interfaz de usuario, así como la implementación de rutas y navegación para una experiencia de usuario fluida. Además, se ha desarrollado un interceptor para mostrar un elemento "loading" durante las operaciones de borrado o edición, y una directiva personalizada para que el nombre del héroe siempre se muestre en mayúscula al crear o editar.

La aplicación incluye servicios para la gestión de superhéroes, permitiendo registrar, consultar, modificar y eliminar héroes. También se ha implementado una lista paginada de héroes con opciones para añadir, editar y borrar, junto con un filtro para buscar héroes por nombre.

Se han realizado pruebas unitarias tanto para los servicios como para los componentes, asegurando la calidad y fiabilidad del código.


## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
