import os

basedir = os.path.abspath(os.path.dirname(__file__))

# Todo: Look into config options needed
class Config:
    """Non environment specific confic options are contained here"""

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    """Config settings for development environment."""

    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(basedir, "data.sqlite")


class ProductionConfig(Config):
    """Config settings for production environment."""

    # TODO
    pass


config = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    "default": DevelopmentConfig,
}
