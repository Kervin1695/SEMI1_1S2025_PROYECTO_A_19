# Python API Project

Este proyecto es una API RESTful desarrollada en Python utilizando Flask. La API permite gestionar usuarios, gastos y facturas, proporcionando varios endpoints para la interacción con los datos.

## Estructura del Proyecto

```
python-api-project
├── app
│   ├── __init__.py
│   ├── main.py
│   ├── controllers
│   │   ├── auth_controller.py
│   │   ├── budget_controller.py
│   │   ├── expenses_controller.py
│   │   ├── bills_controller.py
│   │   └── reports_controller.py
│   ├── models
│   │   ├── user_model.py
│   │   ├── expense_model.py
│   │   └── bill_model.py
│   ├── routes
│   │   ├── auth_routes.py
│   │   ├── budget_routes.py
│   │   ├── expenses_routes.py
│   │   ├── bills_routes.py
│   │   └── reports_routes.py
│   └── utils
│       └── db.py
├── requirements.txt
├── config.py
└── README.md
```

## Endpoints

- **/register**: Registra un nuevo usuario.
- **/login**: Inicia sesión para un usuario existente.
- **/currentBudget/<user_id>**: Obtiene el presupuesto actual del usuario.
- **/billsList/<user_id>**: Lista todas las facturas del usuario.
- **/pastExpenses/<user_id>**: Obtiene los gastos pasados del usuario.
- **/addExpense/<user_id>**: Agrega un nuevo gasto para el usuario.
- **/addBill/<user_id>**: Agrega una nueva factura para el usuario.
- **/manuals**: Proporciona documentación sobre el uso de la API.
- **/reports/expenses/<user_id>**: Genera un reporte de gastos para el usuario.
- **/reports/expensesByType/<user_id>**: Genera un reporte de gastos agrupados por tipo para el usuario.

## Instalación

1. Clona el repositorio:
   ```
   git clone <url_del_repositorio>
   cd python-api-project
   ```

2. Instala las dependencias:
   ```
   pip install -r requirements.txt
   ```

3. Configura la base de datos en `config.py`.

4. Ejecuta la aplicación:
   ```
   python app/main.py
   ```

## Uso

Una vez que la aplicación esté en funcionamiento, puedes utilizar herramientas como Postman o cURL para interactuar con los endpoints de la API. Asegúrate de enviar las solicitudes adecuadas según la documentación de cada endpoint.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.