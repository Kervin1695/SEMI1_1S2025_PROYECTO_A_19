from flask import Flask

def create_app():
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object('config.Config')

    # Register blueprints
    from .routes.auth_routes import auth_bp
    from .routes.budget_routes import budget_bp
    from .routes.expenses_routes import expenses_bp
    from .routes.bills_routes import bills_bp
    from .routes.reports_routes import reports_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(budget_bp)
    app.register_blueprint(expenses_bp)
    app.register_blueprint(bills_bp)
    app.register_blueprint(reports_bp)

    return app