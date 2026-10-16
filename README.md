# 📋 Gestores & Vales Semanales — Control de Ventas y Comisiones

Sistema web integral y autónomo para el registro, liquidación y control de vales de venta emitidos por gestores a través de WhatsApp y redes sociales.

---

## 🚀 Características Principales

- **📅 Período Semanal (Lunes a Lunes):** Agrupación automática por semanas ISO para balances y pagos periódicos.
- **📝 Parser Inteligente de WhatsApp:** Pega el mensaje tal cual viene de WhatsApp (con emojis `✨`, `📝`, negritas matemáticas y formato libre) y el sistema extrae automáticamente cliente, CI, teléfono, dirección, productos y cantidades.
- **💰 Comisiones Fijas Configurables:**
  - **Equipos Pequeños:** 1,500 CUP por defecto (ollas reina, arroceras, batidoras, ventiladores, cocinas infrarrojas).
  - **Equipos Grandes:** 2,500 CUP por defecto (neveras, congeladores, splits, lavadoras, plantas eléctricas).
  - Modal integrado para ajustar tarifas en cualquier momento.
- **💵 Soporte Multi-Moneda:** Registro independiente de ventas en **USD** (dólares) y **CUP** (moneda nacional).
- **🚫 Sin Mensajerías:** Filtro estricto que ignora costos de mensajería para enfocarse puramente en el inventario vendido y comisiones del gestor.
- **📱 Visualización Literal de Vales:** Opción para ver los vales enteros tal como llegaron con sus emojis originales y botón de copiado rápido.
- **📊 Resumen Semanal y Liquidación:** Reporte consolidado por gestor con comisiones pagadas y pendientes, exportable a PDF / Impresión.
- **📑 Exportación a Excel (.xlsx):** Generación automática de hojas de cálculo con el consolidado semanal y el historial de vales.
- **💾 Auto-Guardado y Caché Robusto Multi-Capa:** Persistencia de datos en el propio archivo HTML (Quine) y respaldo redundante en almacenamiento local.

---

## 🛠️ Tecnologías Empleadas

- **HTML5 / CSS3 / JavaScript Moderno (Vanilla ES6+)**
- **Tailwind CSS (CDN)** para estilos modernos y responsivos con modo oscuro.
- **Lucide Icons** para iconografía.
- **SheetJS (xlsx.full.min.js)** para exportación a Excel.

---

## 💻 Uso

Simplemente abre el archivo `index.html` en cualquier navegador web moderno (Chrome, Edge, Firefox, Safari) en PC o móvil. No requiere servidor ni instalación de dependencias.
