from flask import Flask
from app.routes.auth_routes import auth_bp
from app.routes.budget_routes import budget_bp
from app.routes.expenses_routes import expenses_bp
from app.routes.bills_routes import bills_bp
from app.routes.reports_routes import reports_bp

def create_app():
    app = Flask(__name__)
    
    # Configuración de la aplicación
    app.config.from_object('config.Config')

    # Registro de Blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(budget_bp)
    app.register_blueprint(expenses_bp)
    app.register_blueprint(bills_bp)
    app.register_blueprint(reports_bp)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)