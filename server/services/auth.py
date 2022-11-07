import json
from urllib.request import urlopen
from dotenv import load_dotenv
from os import getenv
from authlib.oauth2.rfc7523 import JWTBearerTokenValidator
from authlib.jose.rfc7517.jwk import JsonWebKey
from authlib.integrations.flask_oauth2 import ResourceProtector

# Load environment variables from file
load_dotenv("../../.env")
AUTH0_DOMAIN = getenv("AUTH0_DOMAIN")
AUTH0_AUDIENCE = getenv("AUTH0_AUDIENCE")


# From the auth0 quickstart
class Auth0JWTBearerTokenValidator(JWTBearerTokenValidator):
    def __init__(self, domain, audience):
        issuer = f"https://{domain}/"
        jsonurl = urlopen(f"{issuer}.well-known/jwks.json")
        public_key = JsonWebKey.import_key_set(
            json.loads(jsonurl.read())
        )
        super(Auth0JWTBearerTokenValidator, self).__init__(
            public_key
        )
        self.claims_options = {
            "exp": {"essential": True},
            "aud": {"essential": True, "value": audience},
            "iss": {"essential": True, "value": issuer},
        }


require_auth = ResourceProtector()
validator = Auth0JWTBearerTokenValidator(
    AUTH0_DOMAIN,
    AUTH0_AUDIENCE
)
require_auth.register_token_validator(validator)

