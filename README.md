# 🏛️ Sistema de Gestión de Iglesia

Una aplicación web moderna y responsive para la gestión integral de actividades eclesiásticas, desarrollada con React y Tailwind CSS.

## 📋 Descripción

Este sistema permite a las iglesias gestionar de manera eficiente sus eventos, voluntarios, anuncios y peticiones de oración en una interfaz intuitiva y fácil de usar. Diseñado pensando en las necesidades reales de las comunidades religiosas, ofrece una solución completa para la organización y coordinación de actividades.

## ✨ Características Principales

### 📊 Dashboard Interactivo
- Vista general de estadísticas en tiempo real
- Resumen de eventos próximos
- Anuncios recientes
- Contador de voluntarios activos y peticiones de oración

### 📅 Gestión de Eventos
- Crear y administrar eventos con fecha, hora y descripción
- Subir imágenes para cada evento
- Asignación dinámica de voluntarios
- Control de cupos necesarios vs. asignados
- Visualización en modal de imágenes

### 👥 Administración de Voluntarios
- Registro completo de voluntarios con datos de contacto
- Asignación por ministerios (Alabanza, Ujieres, Niños, Medios etc.)
- Sistema de inscripción a eventos
- Gestión de disponibilidad

### 📢 Sistema de Anuncios
- Publicación de anuncios con diferentes niveles de prioridad
- Soporte para imágenes
- Clasificación por importancia (Alta, Media, Baja)
- Fecha automática de publicación

### 🙏 Lista de Oración
- Registro de peticiones de oración
- Identificación del solicitante
- Seguimiento por fecha
- Interfaz dedicada para la gestión

### 📱 Diseño Responsive
- Adaptación perfecta a dispositivos móviles
- Menú hamburguesa para pantallas pequeñas
- Interfaz optimizada para tablets y escritorio

## 🛠️ Tecnologías Utilizadas

- **React** (v18+) - Framework de JavaScript para construir la interfaz
- **Tailwind CSS** - Framework de CSS para estilos responsive
- **Lucide React** - Biblioteca de iconos modernos
- **React Hooks** - Para manejo de estado y efectos
- **FileReader API** - Para carga y preview de imágenes

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- Node.js (v14.0.0 o superior)
- npm (v6.0.0 o superior) o yarn

## 🚀 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/iglesia-app.git
cd iglesia-app
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
```

3. Instala las dependencias específicas del proyecto:
```bash
npm install lucide-react
# o
yarn add lucide-react
```

4. Inicia la aplicación en modo desarrollo:
```bash
npm start
# o
yarn start
```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 💻 Uso

### Navegación Principal
- **Dashboard**: Vista general de toda la actividad
- **Calendario**: Gestión completa de eventos
- **Voluntarios**: Administración de personal voluntario
- **Anuncios**: Publicación y gestión de comunicados
- **Oración**: Lista de peticiones de la comunidad

### Funcionalidades Clave

#### Crear un Evento
1. Ve a la sección "Calendario"
2. Completa el formulario en el panel derecho
3. Opcionalmente, agrega una imagen
4. Haz clic en "Agregar Evento"

#### Asignar Voluntarios
1. En la vista de eventos, localiza el evento deseado
2. En la sección "Asignar Voluntario", selecciona de la lista disponible
3. El sistema validará automáticamente los cupos

#### Publicar un Anuncio
1. Navega a "Anuncios"
2. Completa título, contenido y prioridad
3. Agrega una imagen si lo deseas
4. Publica con el botón "Publicar Anuncio"

## 📁 Estructura del Proyecto

```
iglesia-app/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── App.js          # Componente principal con toda la lógica
│   ├── App.css         # Estilos globales
│   ├── index.js        # Punto de entrada
│   └── ...
├── package.json
├── README.md
└── .gitignore
```


## 🤝 Contribuciones

Las contribuciones son bienvenidas y apreciadas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guías de Contribución
- Mantén el código limpio y comentado
- Sigue las convenciones de nomenclatura existentes
- Asegúrate de que tu código sea responsive
- Prueba en diferentes navegadores antes de enviar

## 🐛 Reporte de Bugs

Si encuentras un bug, por favor abre un issue incluyendo:
- Descripción clara del problema
- Pasos para reproducirlo
- Comportamiento esperado vs. actual
- Capturas de pantalla si aplica
- Información del navegador y dispositivo

## 📄 Licencia

No definida aún.

## 👥 Autor

**Eric Castro**
- GitHub: [@ericmaster77](https://github.com/ericmaster77)

## 🙏 Agradecimientos

- A la comunidad de React por la excelente documentación
- Lucide por los hermosos iconos
- Tailwind CSS por facilitar el diseño responsive
- A todos los contribuidores que ayudan a mejorar este proyecto

---

⭐ Si este proyecto te ha sido útil, considera darle una estrella en GitHub!

## 📞 Soporte

Para soporte y preguntas:
- 📧 Email: eric.castro.leal@gmail.com
- 💬 Issues: [GitHub Issues](https://github.com/ericmaster77/Iglesia-app/issues)

---

Hecho con ❤️ para la comunidad