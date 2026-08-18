from rest_framework_simplejwt.authentication import JWTAuthentication 

  

  

class CookieJWTAuthentication(JWTAuthentication): 

    """Authenticate normal API requests from the Authorization header. 

  

    The refresh token is intentionally NOT read here. It stays in an 

    HttpOnly cookie and is used only by the refresh endpoint. 

    """ 

  

    pass 